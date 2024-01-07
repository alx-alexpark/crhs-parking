import { currentUser } from '@clerk/nextjs';
import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { NextResponse } from 'next/server';

let RequestTemplate = {
  user: "",
  vehicle: {
    licensePlate: '',
    proofOfInsurance: '',
    year: 0,
    make: '',
    model: '',
    color: '',
  },
  student: {
    driversLicense: '',
    legalFirstName: '',
    legalLastName: '',
  },
  quadrant: '',
  paymentId: '',
  submitted: false,
  decision: 'undecided',
};

export async function GET(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const dbUser = await User.findOne({
    clerkUserId: user?.id
  });
  RequestTemplate.user = dbUser._id;

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  return NextResponse.json(currentParkingSpotRequest ?? RequestTemplate);
}

// TODO: test this and make sure it works
export async function PUT(request: Request) {
  await dbConnect();

  const newJson = await request.json();
  const user = await currentUser();
  const dbUser = await User.findOne({
    clerkUserId: user?.id
  });

  // Prevent the user from directly setting the submitted value or decision status
  newJson.submitted = false;
  newJson.decicion = 'undecided';
  newJson.user = dbUser._id;

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  if (currentParkingSpotRequest === undefined) {
    await ParkingSpotRequest.create(
      { user: dbUser._id },
      { ...RequestTemplate, ...newJson }
    );
  } else {
    await ParkingSpotRequest.updateOne({ user: dbUser._id }, newJson);
  }

  return new Response('OK');
}
