'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteJournalEntry(entryId: string): Promise<{
    success: boolean,
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { success: false, error: "User not found" };
    }
    try {
        //Check if entry exists and belongs to the user
        await db.entry.delete({
            where: { id: entryId, userId }
        });
        revalidatePath('/journal');
        return { success: true };
    } catch (error) {
        console.error("Error deleting entry:", error);
        return { success: false, error: "Failed to delete entry" };
    }
}

export default deleteJournalEntry;