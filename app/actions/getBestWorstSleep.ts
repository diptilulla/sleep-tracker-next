'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getBestWorstSleep(): Promise<{
    bestSleep?: number,
    worstSleep?: number
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { error: "User not authenticated" };
    }
    try {
        //Fetch all records for the logged in user
        const records = await db.record.findMany({
            where: { userId }
        });
        if(!records || records.length === 0) {
            return { bestSleep: 0, worstSleep: 0 }; //no records found
        }
        //Calculate best and worst sleep
        const amounts = records.map(rec => rec.amount);
        const bestSleep = Math.max(...amounts);
        const worstSleep = Math.min(...amounts);
        return { bestSleep, worstSleep };
    } catch (error) {
        console.error("Error fetching best and worst sleep:", error);
        return { error: "An unexpected error occured while fetching best and worst sleep" };
    }
}

export default getBestWorstSleep;