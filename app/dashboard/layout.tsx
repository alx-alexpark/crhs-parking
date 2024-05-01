import dbConnect from '@/lib/dbConnect';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import User, { UserType } from '@/models/User';
import { ReactNode } from 'react';

import ParkingSpotRequest, {
  ParkingSpotRequestType,
} from '@/models/ParkingSpotRequest';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

interface DashboardLayoutProps {
  ReviewerDashboard: ReactNode;
  StudentDashboard: ReactNode;
  StudentTodoPage: ReactNode;
}

/**
 * Return a different dashboard if the user is a student
 * or a staff member
 *
 * If the user is a student, return the to-do page.
 */
export default async function DashboardLayout({
  ReviewerDashboard,
  StudentDashboard,
  StudentTodoPage,
}: DashboardLayoutProps) {
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

  // If the user is a reviewer, show the reviewer dashboard
  if (userDbObj.admin) {
    return (
      <main>
        <nav>
          <span>
            <Link href="/">
              <strong>CRHS Parking</strong>
            </Link>
          </span>
          <div className="nav-links">
            <Link href="/review-log">Review log</Link>
            <UserButton />
          </div>
        </nav>
        {ReviewerDashboard}
      </main>
    );
  }

  // Show either the student dashboard or the todo page if the user has not completed the form
  return (
    <main>
      <span>
        <Link href="/">
          <strong>CRHS Parking</strong>
        </Link>
      </span>
      <div className="nav-links">
        <UserButton />
      </div>
      {!userDbObj.driversLicense || !lastParkingRequest
        ? StudentTodoPage
        : StudentDashboard}
    </main>
  );
}
