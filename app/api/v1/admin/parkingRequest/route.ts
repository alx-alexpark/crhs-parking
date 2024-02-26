import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

export async function PATCH(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  if (!userDbObj.admin) {
    return new Response('Permission denied');
  }

  const data: { requestId: string; newDecision: string } = await request.json();

  const requests = await ParkingSpotRequest.findOneAndUpdate(
    { _id: data.requestId },
    { decision: data.newDecision }
  );

  // TODO: return actual json
  return new Response('yes');
}

export async function GET(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  const data: { requestId: string } = await request.json();

  if (!userDbObj.admin) {
    return new Response('Permission denied');
  }

  const parkingSpotRequest = await ParkingSpotRequest.findOne({
    _id: data.requestId,
  });

  // TODO: return actual json
  return new Response(parkingSpotRequest);
}
