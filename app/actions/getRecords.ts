'use server'
import { db } from "@/lib/db";
import { Record } from "@/types/Record";
import { auth } from "@clerk/nextjs/server";

async function getRecords(): Promise<{
    records?: Record[],
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        const records = await db.record.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 10 //limit to 10 records
        });
        return { records };
    } catch (error) {
        console.error("Error fetching records:", error);
        return { error: "Failed to fetch records" };
    }
}

export default getRecords;

