import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();

  const parkingSpotRequests = await ParkingSpotRequest.find(
    {},
    'spotNum decision'
  );

  return NextResponse.json({ unavailableSpots: parkingSpotRequests });
}
