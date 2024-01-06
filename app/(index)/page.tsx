import Image from 'next/image';
import Link from 'next/link';

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

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
      <p>This is some cool copywriting</p>
      <p>
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
        enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
        exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit
        nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor
        minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure
        elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor
        Lorem duis laboris cupidatat officia voluptate. Culpa proident
        adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
        Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
        Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa
        et culpa duis.
      </p>

      <ul>
        <li>
          <Link href="/parking-request">parking request</Link>
        </li>
        <li>
          <Link href="/dashboard">dashboard</Link>
        </li>
      </ul>
    </main>
  );
}
