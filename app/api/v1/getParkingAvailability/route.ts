import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const parkingSpotRequests = await ParkingSpotRequest.find(
    { decision: { $in: ['approved', 'undecided']} },
    { _id: 0, spotNum: 1, decision: 1 }
  );
  // TODO: Add the rest of the reserved ranges
  return NextResponse.json({ takenByAnotherStudent: parkingSpotRequests, permanentlyReserved: [{start: 1297, end: 1304}] });
}

export const dynamic = 'force-dynamic';
