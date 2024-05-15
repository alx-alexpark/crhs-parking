import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const user = await currentUser();
  const name = user?.firstName + ' ' + user?.lastName;
  const email = user?.emailAddresses[0].emailAddress;
  const clerkUserId = user?.id;

  if (
    !(
      email?.endsWith('@students.katyisd.org') ||
      email?.endsWith('@katyisd.org')
    )
  ) {
    return NextResponse.json({ error: 'Only KatyISD students are allowed!' });
  }

  if ((await User.find({ clerkUserId: clerkUserId })).length > 0)
    return NextResponse.json({ error: 'User already exists' }, { status: 500 });

  await User.create({
    name: name,
    email: email,
    clerkUserId: clerkUserId,
    studentId: email.split('@')[0],
  });
  return NextResponse.json({ success: 'User created' });
}

export const dynamic = 'force-dynamic';
