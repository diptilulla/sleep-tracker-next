'use server'; //to protect from users using the website
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

async function getUserRecord(): Promise<{
    record?: number,
    daysWithRecords?: number,
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not logged in" };
    }
    try {
        //Fetch total sleep hours and number of days with records for the logged in user
        const records = await db.record.findMany({
            where: { userId }
        });

        const record = records.reduce((total, rec) => total + rec.amount, 0); //total sleep hours
        const daysWithRecords = records.filter((rec) => rec.amount > 0).length; //number of days with records
        return { record, daysWithRecords };
    } catch (error) {
        console.error("Error fetching user record:", error);
        return { error: "An unexpected error occured while fetching user record" };
    }
}

export default getUserRecord;