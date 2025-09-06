'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteRecord(recordId: string): Promise<{
    success: boolean,
    error?: string
}> {
    const { userId } = await auth();
    //user not logged in
    if(!userId) {
        return { success: false, error: "User not found" };
    }
    try {
        //Check if record exists and belongs to the user
        await db.record.delete({
            where: { id: recordId, userId }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error deleting record:", error);
        return { success: false, error: "Failed to delete record" };
    }
}

export default deleteRecord;