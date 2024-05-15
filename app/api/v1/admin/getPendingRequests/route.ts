import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const user = await currentUser();
  const userDbObj = await User.findOne({ clerkUserId: user?.id });

  if (userDbObj.admin === false) {
    return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
  }

  const requests = await ParkingSpotRequest.find({
    submitted: true,
    decision: 'undecided',
  });

  return NextResponse.json({ requests: requests });
}

export const dynamic = 'force-dynamic';
