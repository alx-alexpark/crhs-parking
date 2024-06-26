import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import ParkingSpotRequest, {
  ParkingSpotRequestType,
} from '@/models/ParkingSpotRequest';
import User from '@/models/User';
import { NextResponse } from 'next/server';

const RequestTemplate = {
  user: '',
  vehicle: {
    licensePlate: '',
    proofOfInsurance: '',
    year: undefined,
    make: '',
    model: '',
    color: '',
  },
  spotNum: undefined,
  paymentId: '',
  submitted: false,
  decision: 'undecided',
  formStep: 0,
};

export async function GET() {
  await dbConnect();

  const user = await currentUser();
  const dbUser = await User.findOne({
    clerkUserId: user?.id,
  });

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  return NextResponse.json(currentParkingSpotRequest ?? RequestTemplate);
}

// TODO: test this and make sure it works
export async function PUT(request: Request) {
  await dbConnect();

  const newJsonRaw = await request.json();
  const user = await currentUser();
  const dbUser = await User.findOne({
    clerkUserId: user?.id,
  });

  // Filter out invalid keys
  const filterObject = (ref: Object, target: Object): Object => {
    const newEntries = Object.entries(target).filter(
      ([key, value]: [string, any]) => {
        if (value.constructor === Object) {
          // @ts-expect-error @ `target[key]`: Typescript doesn't let you use
          // strings to index Objects.
          return filterObject(target[key], value);
        }
        return Object.prototype.hasOwnProperty.call(ref, key);
      }
    );

    return Object.fromEntries(newEntries);
  };

  const newJson = filterObject(
    RequestTemplate,
    newJsonRaw
  ) as ParkingSpotRequestType;

  // Prevent the user from directly setting sensitive information
  // TODO: is there benefit to setting to original values?
  newJson.decision = 'undecided';
  newJson.user = dbUser._id;

  const currentParkingSpotRequest = await ParkingSpotRequest.findOne({
    user: dbUser._id,
    submitted: false,
  });

  if (currentParkingSpotRequest === null) {
    // TODO: Check that the prerequites are fullfilled.
    await ParkingSpotRequest.create(
      { user: dbUser._id },
      // Use the template to fill in what is missing
      { ...RequestTemplate, ...newJson }
    );
  } else {
    await ParkingSpotRequest.updateOne({ user: dbUser._id }, newJson);
  }

  return NextResponse.json({ success: true });
}
