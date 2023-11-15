import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";

// TODO: change ths back to POST
export async function GET(request: Request) {
    const user = await currentUser();
    console.log("GET /api/createDBUser")
    let name = user?.firstName + " " + user?.lastName;
    User.create({name: name, email: user?.emailAddresses[0].emailAddress});
    return new Response("yes");
}