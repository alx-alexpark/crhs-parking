import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const dbUser = await User.findOne({
    clerkUserId: user?.id,
  });

  return NextResponse.json(dbUser);
}

export async function PUT(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const json = await request.json();
  await User.updateOne(
    { clerkUserId: user?.id },
    { phone: json.phone, driversLicense: json.license }
  );

  return NextResponse.json({ sucess: true });
}