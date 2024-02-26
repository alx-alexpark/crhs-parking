import { currentUser, UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';

import ReviewerList from './_components/reviewer-list';

import styles from './reviewer-dashboard.module.scss';

export default async function ReviewerDashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <main>
      <Head>
        <link
          rel="preload"
          href="/api/v1/admin/getPendingRequests"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <nav>
        <span>
          <strong>CRHS Parking</strong>
        </span>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/review-log">Review log</Link>
          <UserButton />
        </div>
      </nav>

      {user!.firstName ? (
        <h1>Hello, {user?.firstName}.</h1>
      ) : (
        <h1>Welcome back!</h1>
      )}

      <ReviewerList />
    </main>
  );
}
