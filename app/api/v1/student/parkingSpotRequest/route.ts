import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest from '@/models/ParkingSpotRequest';
import User from '@/models/User';

const RequestTemplate = {
  user: {
    name: '',
    email: '',
    phone: 0,
    studentId: '',
    admin: false,
    grade: 0,
    clerkUserId: '',
  },
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
    email: user?.emailAddresses[0].emailAddress,
  });

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  return Response.json(currentParkingSpotRequest ?? RequestTemplate);
}

// TODO: test this and make sure it works
export async function PUT(request: Request) {
  await dbConnect();

  const newJson = await request.json();
  const user = await currentUser();
  const dbUser = await User.findOne({
    email: user?.emailAddresses[0].emailAddress,
  });

  // Prevent the user from directly setting the submitted value
  newJson.submitted = false;

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
