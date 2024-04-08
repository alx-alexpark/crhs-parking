import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import dbConnect from '@/lib/dbConnect';
import User, { UserType } from '@/models/User';

import ParkingSpotRequest, {
  ParkingSpotRequestType,
} from '@/models/ParkingSpotRequest';
import ReviewerDashboard from './reviewer-dashboard/reviewer-dashboard';
import StudentDashboard from './student-dashboard/student-dashboard';
import StudentTodoPage from './student-todo/student-todo';

/**
 * Return a different dashboard if the user is a student
 * or a staff member
 *
 * If the user is a student, return the to-do page.
 */
export default async function DashboardPage() {
  await dbConnect();

  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  const userDbObj = (await User.findOne({
    clerkUserId: user?.id,
  })) as UserType;

  const lastParkingRequest = (await ParkingSpotRequest.findOne({
    submitted: true,
  })) as ParkingSpotRequestType;

  if (userDbObj.admin) {
    return <ReviewerDashboard />;
  }

  if (!userDbObj.driversLicense || !lastParkingRequest) {
    return <StudentTodoPage />;
  }

  return <StudentDashboard />;
}
