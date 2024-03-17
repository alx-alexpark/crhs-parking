'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

import clsx from 'clsx';

import { ParkingMap } from '@/components';
import { useState } from 'react';
import ParkingRequestHistory from './_components/student-list';
import StudentTodoList from './_components/student-todo-list';
import styles from './student-dashboard.module.scss';

export default function StudentDashboardPage() {
  const [spot, setSpot] = useState<number | null>(null);

  const bubbleStyle = false;

  const user = useUser().user;

  return (
    <main>
      <nav>
        <span>
          <strong>CRHS Parking</strong>
        </span>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/parking-request">New request</Link>
          <UserButton />
        </div>
      </nav>

      {/* TODO: hide if all items are completed **on page load** */}
      <section>
        <StudentTodoList />
      </section>

      {/* TODO: determine if this is a good style */}
      {/*       or wrap in div and add heropattern */}
      {user?.firstName ? (
        <h1>
          Hello,{' '}
          <span className={clsx(bubbleStyle && styles.highlight)}>
            {user?.firstName}
          </span>
          .
        </h1>
      ) : (
        <h1>Welcome back!</h1>
      )}

      <div className={styles.overviewContainer}>
        <div className={styles.mapContainer}>
          <h2>Your parking spot</h2>

          <ParkingMap spot={spot} interactive={false} height={300} />
        </div>
        <div>
          <h2>Recent parking requests</h2>
          <div className={styles.requestsContainer}>
            <ParkingRequestHistory />
            <Link href="#">View older parking requests</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
