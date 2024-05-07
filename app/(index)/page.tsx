'use client';

import { useState } from 'react';

import { ParkingMap } from '@/components';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import styles from './index.module.scss';

export default function IndexPage() {
  const [spot, setSpot] = useState<number | null>(null);

  return (
    <main>
      <nav>
        <span>
          <strong>CRHS Parking</strong>
        </span>
        <div className="nav-links">
          <SignedOut>
            <Link href="/login">Login</Link>
            <Link className={styles.highlightLink} href="/sign-up">
              Sign up
            </Link>
          </SignedOut>
          <SignedIn>
            <Link className={styles.highlightLink} href="/dashboard">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      <h1>Need to park at CRHS?</h1>
      <p>Click where you'd like to park, and we'll get you started!</p>

      <ParkingMap
        spot={spot}
        setSpot={setSpot}
        height={400}
        className={styles.map}
        interactive={true} // TODO: check if student or reviewer
      />
    </main>
  );
}
