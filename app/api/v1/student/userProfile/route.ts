import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
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

  const model = new User(json);
  if (!model.validateSync()) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  await User.updateOne(
    { clerkUserId: user?.id },
    {
      phone: json.phone,
      driversLicense: json.student?.driversLicense,
      proofOfInsurance: json.vehicle?.proofOfInsurance,
    }
  );

  return NextResponse.json({ success: true });
}
