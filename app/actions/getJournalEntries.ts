'use server'
import { db } from "@/lib/db";
import { Journal } from "@/types/Journal";
import { auth } from "@clerk/nextjs/server";

async function getJournalEntries(): Promise<{
    entries?: Journal[],
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        const entries = await db.entry.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        return { entries };
    } catch (error) {
        console.error("Error fetching records:", error);
        return { error: "Failed to fetch records" };
    }
}

export default getJournalEntries;

