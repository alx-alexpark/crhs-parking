import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  const user = await currentUser();

  const parkingSpotRequests = await ParkingSpotRequest.find({
    user: user?.id,
  });

  return NextResponse.json({ requests: parkingSpotRequests });
}
