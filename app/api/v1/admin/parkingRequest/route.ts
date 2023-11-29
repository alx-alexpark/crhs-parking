import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';

export async function PATCH(request: Request) {
    await dbConnect();
    const user = await currentUser();
    const userDbObj = await User.findOne({ clerkUserId: user?.id });
    if (userDbObj.admin === true) {
        const requests = await ParkingSpotRequest.findOneAndUpdate({_id: request.json().requestId}, {decision: request.json().newDecision});
        // TODO: return actual json
        return new Response("yes");
    } else {
        return new Response("Permission denied")
    }                                       
}

export async function GET(request: Request) {
    await dbConnect();
    const user = await currentUser();
    const userDbObj = await User.findOne({ clerkUserId: user?.id });
    if (userDbObj.admin === true) {
        const parkingSpotRequest = await ParkingSpotRequest.findOne({_id: request.json().requestId}) // TODO: return actual json
        return new Response(parkingSpotRequest);
    } else {
        return new Response("Permission denied")
    }                                       
}
