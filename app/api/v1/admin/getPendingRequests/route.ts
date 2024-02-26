import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  if (userDbObj.admin === false) {
    return new Response('Permission denied');
  }

  const requests = await ParkingSpotRequest.find({
    submitted: true,
    decision: 'undecided',
  });

  return Response.json({ requests: requests });
}
