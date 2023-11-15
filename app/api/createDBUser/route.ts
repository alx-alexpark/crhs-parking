import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";

export async function POST(request: Request) {
    await dbConnect();
    const user = await currentUser();
    // console.log("GET /api/createDBUser")
    let name = user?.firstName + " " + user?.lastName;
    User.create({name: name, email: user?.emailAddresses[0].emailAddress});
    return new Response("User created");
}