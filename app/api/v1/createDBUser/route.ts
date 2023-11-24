import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(request: Request) {
    await dbConnect();
    const user = await currentUser();
    const name = user?.firstName + " " + user?.lastName;
    const email = user?.emailAddresses[0].emailAddress;
    const clerkUserId = user?.id;

    if ((await User.find({ clerkUserId: clerkUserId })).length > 0) 
        return new Response("User already exists");

    await User.create({name: name, email: email, clerkUserId: clerkUserId});
    return new Response("User created");
}
