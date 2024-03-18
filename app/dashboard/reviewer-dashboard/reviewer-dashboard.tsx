import { currentUser } from '@clerk/nextjs';
import Head from 'next/head';

import ReviewerList from './_reviewer-list';

export default async function ReviewerDashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/api/v1/admin/getPendingRequests"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      {user!.firstName ? (
        <h1>Hello, {user?.firstName}.</h1>
      ) : (
        <h1>Welcome back!</h1>
      )}

      <ReviewerList />
    </>
  );
}
