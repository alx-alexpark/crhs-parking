<<<<<<< HEAD
import dbConnect from "@/lib/dbConnect";
import ParkingSpotRequest from "@/models/ParkingSpotRequest";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";

// TODO: test this and make sure it works
export async function PUT(request: Request) {
    await dbConnect();
    const newJson = request.json();
    const user = await currentUser();
    const dbUser = await User.findOne({email: user?.emailAddresses[0].emailAddress})
    let currentParkingSpotRequest = await ParkingSpotRequest.findOne({user: dbUser._id, submitted: false});
    if (currentParkingSpotRequest != undefined) {
        await ParkingSpotRequest.updateOne({user : dbUser._id}, newJson);
    } else {
        await ParkingSpotRequest.create({user: dbUser._id, ...newJson});
    }
    return new Response("yes");
}
=======
import { currentUser } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

// TODO: test this and make sure it works
export async function PUT(request: Request) {
  await dbConnect();

  const newJson = request.json();
  const user = await currentUser();
  const dbUser = await User.findOne({
    email: user?.emailAddresses[0].emailAddress,
  });

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  if (currentParkingSpotRequest != undefined) {
    await ParkingSpotRequest.updateOne({ user: dbUser._id }, newJson);
  } else {
    await ParkingSpotRequest.create({ user: dbUser._id, ...newJson });
  }

  return new Response('yes');
}
>>>>>>> a89935f7704d05918212a9d55b035c33a2f10efd
