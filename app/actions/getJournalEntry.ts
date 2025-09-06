'use server'
import { db } from "@/lib/db";
import { Journal } from "@/types/Journal";
import { auth } from "@clerk/nextjs/server";

async function getJournalEntry(entryId: string): Promise<{
    entry?: Journal,
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        const entry = await db.entry.findFirst({
            where: { userId, id: entryId }
        });
        if(!entry) {
            return { error: "Entry not found" };
        }
        return { entry };
    } catch (error) {
        console.error("Error fetching records:", error);
        return { error: "Failed to fetch records" };
    }
}

export default getJournalEntry;

