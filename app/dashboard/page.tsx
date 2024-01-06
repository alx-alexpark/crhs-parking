import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { RedirectToSignIn, UserButton } from '@clerk/nextjs';

import styles from './student-dashboard.module.scss';

import StudentDashboard from './student-dashboard';

export default async function DashboardPage() {
  // Return a different dashboard if the user is a student
  // or a staff member
  return StudentDashboard();
}
