'use client';

import Link from 'next/link';

import { SignedIn, SignedOut } from '@clerk/nextjs';

import { ParkingMap } from '@/components';
import styles from './index.module.scss';

export default function IndexPage() {
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
          </SignedIn>
        </div>
      </nav>

      <h1>Need to park at CRHS?</h1>
      <p>Click where you'd like to park, and we'll get you started!</p>

      <ParkingMap className={styles.map} />
    </main>
  );
}
