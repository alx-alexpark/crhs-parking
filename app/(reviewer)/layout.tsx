import dbConnect from '@/lib/dbConnect';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import User, { UserType } from '@/models/User';

export default async function ValidateIsAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  await dbConnect();

  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  const userDbObj = (await User.findOne({
    clerkUserId: user?.id,
  })) as UserType;

  if (!userDbObj.admin) {
    return redirect('/');
  }

  return <main>{children}</main>;
}
