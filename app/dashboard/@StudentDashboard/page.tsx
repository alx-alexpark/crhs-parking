'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

import { ParkingMap } from '@/components';
import { useState } from 'react';
import ParkingRequestStatus from './components/request-status';

import styles from '../dashboard.module.scss';

export default function StudentDashboardPage() {
  const [spot, setSpot] = useState<number | null>(null);

  const user = useUser().user;

  return (
    <>
      <h1>
        {user?.firstName ? `Hello, ${user?.firstName}.` : 'Welcome back!'}
      </h1>

      <div className={styles.overviewContainer}>
        <div className={styles.mapContainer}>
          <h2>Your parking spot</h2>

          <ParkingMap spot={spot} interactive={false} height={300} />
        </div>
        <div>
          <h2>Recent parking requests</h2>
          <div className={styles.requestsContainer}>
            <ParkingRequestStatus />
            <Link href="#">View older parking requests</Link>
          </div>
        </div>
      </div>
    </>
  );
}
