import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

export async function GET(request: Request) {
  await dbConnect();
  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });
  if (userDbObj.admin === true) {
    const requests = await ParkingSpotRequest.find({
      submitted: true,
      decision: 'undecided',
    });
    return new Response.json({ requests: requests });
  } else {
    return new Response('Permission denied');
  }
}
