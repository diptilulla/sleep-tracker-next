import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"
import { User } from "@prisma/client";

export const checkUser = async () : Promise<User | null> => {
    const user = await currentUser();

    if(!user) {
        return null; //no user has signed in
    }
    //check if user exists in db

    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    if(loggedInUser) {
        return loggedInUser; //user exists in db
    }

    //if user does not exist in db, create a new user
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            email: user.emailAddresses[0]?.emailAddress, //users in clerk can have different email-addresses
            name: user.firstName + ' ' + user.lastName,
            avatarUrl: user.imageUrl
        }
    })
    return newUser;
}