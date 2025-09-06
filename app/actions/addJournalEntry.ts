'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface JournalData {
  date: string;
  title: string;
  mood: string;
  content: string;
}

interface JournalResult {
  data?: JournalData;
  error?: string;
}

async function addJournalEntry(formData: FormData): Promise<JournalResult> {
    const titleValue = formData.get("title");
    const moodValue = formData.get("mood");
    const contentValue = formData.get("content");
    const dateValue = formData.get("date");

    //input validation
    if(!titleValue || !moodValue || !dateValue || !contentValue) {
        return { error: "Title, Mood, Content or Date is missing"};
    }
    const title: string = titleValue.toString();
    const mood: string = moodValue.toString();
    const content: string = contentValue.toString();

    //Convert date to ISO-8601 format
    let date: string;
    try {
        date = new Date(dateValue.toString()).toISOString();
    } catch (error) {
        console.error("Invalid date format:", error);
        return { error: "Invalid date format" };
    }
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        const newEntry = await db.entry.create({
            data: {
                title,
                mood,
                content,
                date,
                userId
            }
        });
        const entryData: JournalData = {
            date: newEntry.date?.toISOString() || date,
            title: newEntry.title,
            mood: newEntry.mood,
            content: newEntry.content
        };
        revalidatePath('/journal');
        return { data: entryData };
    } catch (error) {
        console.error("Error adding journal entry:", error);
        return { error: "An unexpected error occured while adding journal entry" };
    }
}

export default addJournalEntry;