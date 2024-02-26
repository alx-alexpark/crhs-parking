import { currentUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import clsx from 'clsx';

import ParkingRequestHistory from './_components/student-list';
import styles from './student-dashboard.module.scss';

export default async function StudentDashboardPage() {
  const bubbleStyle = false;

  const user = await currentUser();

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

      {/* TODO: determine if this is a good style */}
      {/*       or wrap in div and add heropattern */}
      {user!.firstName ? (
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
          <p>You park in the [object Object] Quadrant.</p>

          {/* <Map /> */}
          <div
            style={{
              background: 'var(--color-primary)',
              width: '100%',
              height: '250px',
              borderRadius: 'var(--border-container)',
            }}
          ></div>
          {/* <Map /> */}
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
