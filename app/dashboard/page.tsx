import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User, { UserType } from '@/models/User';
import ReviewerDashboard from './reviewer-dashboard';
import StudentDashboard from './student-dashboard';

export default async function DashboardPage() {
  await dbConnect();

  // Return a different dashboard if the user is a student
  // or a staff member
  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  const userDbObj = (await User.findOne({
    clerkUserId: user?.id,
  })) as UserType;

  return userDbObj.admin ? <ReviewerDashboard /> : <StudentDashboard />;
}
