import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  if (!userDbObj.admin) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }

  const data: { requestId: string; newDecision: string, parkingSticker: string } = await request.json();

  if (data.requestId.length == 0 || data.newDecision.length == 0 || data.parkingSticker.length == 0) {
    return NextResponse.json({ error: "You are missing a required data key." });
  }

  const requests = await ParkingSpotRequest.findOneAndUpdate(
    { _id: data.requestId },
    { decision: data.newDecision, lastInteractingAdminUserId: user?.id, parkiingSticker: data.parkingSticker }
  );

  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  const data: { requestId: string } = await request.json();

  if (!userDbObj.admin) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }

  const parkingSpotRequest = await ParkingSpotRequest.findOne({
    _id: data.requestId,
  });

  return new Response(parkingSpotRequest);
}
