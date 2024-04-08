'use client';

import useSWR from 'swr';

import Head from 'next/head';
import { AboutMeForm } from './form';

import { fetcher } from '@/app/util';

export default function ParkingRequestPage() {
  const { data, error, isLoading } = useSWR(
    '/api/v1/student/userProfile',
    fetcher
  );

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/api/v1/student/userProfile"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      {error && <div>There was an error loading your data.</div>}
      {isLoading && <div>Please wait.</div>}

      {!isLoading && <AboutMeForm data={data} />}
    </>
  );
}
