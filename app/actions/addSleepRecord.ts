'use server'; //to protect from users using the website
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache"; //after making any changes in db, i.e. submitting form, we need to update rest of the ui on the home page

interface RecordData {
  date: string;
  text: string;
  amount: number;
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

async function addSleepRecord(formData: FormData): Promise<RecordResult> {
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");
    const dateValue = formData.get("date");

    //input validation
    if(!textValue || !amountValue || !dateValue) {
        return { error: "Text, Amount or Date is missing" };
    }
    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString()); //parsing string to number
    //Convert date to ISO-8601 format
    let date: string;
    try {
        date = new Date(dateValue.toString()).toISOString();
    } catch (error) {
        console.error("Invalid date format:", error);
        return { error: "Invalid date format" };
    }

    //Get logged in user
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        //Check if a record already exists for the given date and user
        const existingRecord = await db.record.findFirst({
            where: {
                userId,
                date
            }
        });

        let recordData: RecordData;
        if(existingRecord) {
            //Update existing record
            const updatedRecord = await db.record.update({
                where: { id: existingRecord.id },
                data: {
                    text,
                    amount
                }
            });

            recordData = {
                date: updatedRecord.date?.toISOString() || date,
                text: updatedRecord.text,
                amount: updatedRecord.amount
            };
        } else {
            //Create new record
            const newRecord = await db.record.create({
                data: {
                    userId,
                    date,
                    text,
                    amount
                }
            });
            recordData = {
                date: date,
                text: newRecord.text,
                amount: newRecord.amount
            };
        }
        revalidatePath("/"); //update the ui on homepage after adding new record
        return { data: recordData };
    } catch (error) {
        console.error("Error adding sleep record:", error);
        return { error: "An unexpected error occured while adding sleep record" };
    }
}

export default addSleepRecord;

//Note: This is a server action, so it can only be called from the server components or client components with "use server" directive at the top
//Also, it can only be called from form submission or other server actions
//It cannot be called from client side event handlers like onClick, onChange etc.