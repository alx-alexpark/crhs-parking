import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import sendEmail from '@/lib/sendEmail';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const name = user?.firstName + ' ' + user?.lastName;
  const email = user?.emailAddresses[0].emailAddress;
  const clerkUserId = user?.id;

  if ((await User.find({ clerkUserId: clerkUserId })).length > 0)
    return NextResponse.json({error: 'User already exists'}, {status: 403});

  await User.create({ name: name, email: email, clerkUserId: clerkUserId });
  return NextResponse.json({success: 'User created'});
}
