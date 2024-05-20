/*

UNTESTED CODE!!!

*/

import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  if (!userDbObj.admin) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }

  const data: { requestId: string; stickerNum: number; } = await request.json();

  const referencedParkingSpotRequest = await ParkingSpotRequest.findOne({
    _id: data.requestId,
  });

  referencedParkingSpotRequest.update({
    stickerNum: data.stickerNum, 
    stickerClaimed: true
  });

  return NextResponse.json({ success: true });
}
