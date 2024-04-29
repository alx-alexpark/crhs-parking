import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import sendEmail from '@/lib/sendEmail';
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

  const data: { requestId: string; message: string } = await request.json();

  const referencedParkingSpotRequest = await ParkingSpotRequest.findOne({
    _id: data.requestId,
  });

  referencedParkingSpotRequest.update({
    submitted: false,
    changesRequestedMessage: data.message,
  });

  const student = await User.findOne({
    _id: referencedParkingSpotRequest.user,
  });

  const url = '[insert link]';

  const message = `Hello, ${student.name}!

Your parking spot request was reviewed, and it was determined that it requires changes or additional information.
The reviewer attached this message: ${data.message}

Go to ${url} to see more information and make changes.
Thank You`;

  sendEmail(student.email, 'Your parking application requires changes', {
    text: message,
    html: message,
  });

  return NextResponse.json({ success: true });
}
