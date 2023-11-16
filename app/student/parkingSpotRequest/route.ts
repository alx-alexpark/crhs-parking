import dbConnect from "@/lib/dbConnect";
import ParkingSpotRequest from "@/models/ParkingSpotRequest";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";

// TODO: test this and make sure it works
export async function PUT(request: Request) {
    await dbConnect();
    const { newJson } = request.body;
    const user = await currentUser();
    const dbUser = await User.findOne({email: user?.emailAddresses[0].emailAddress})
    if (await ParkingSpotRequest.findOne({user: dbUser._id, submitted: false}) != undefined) {
        await ParkingSpotRequest.updateOne({user : dbUser._id}, newJson);
    } else {
        await ParkingSpotRequest.create({user: dbUser._id, ...newJson});
    }
    return new Response("yes");
}