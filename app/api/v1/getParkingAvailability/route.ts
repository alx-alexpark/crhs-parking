import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const parkingSpotRequests = await ParkingSpotRequest.find(
    { decision: 'approved' },
    'spotNum decision'
  );

  return NextResponse.json({ unavailableSpots: parkingSpotRequests });
}
