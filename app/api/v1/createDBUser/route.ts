import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: Request) {
  await dbConnect();

  const user = await currentUser();
  const name = user?.firstName + ' ' + user?.lastName;
  const email = user?.emailAddresses[0].emailAddress;

  if ((await User.find({ email: email })).length > 0)
    return new Response('User already exists');

  await User.create({ name: name, email: email });
  return new Response('User created');
}
