'use client';

import useSWR from 'swr';

import Head from 'next/head';
import { AboutMeForm } from './form';

import { fetcher } from '@/app/util';
import { StatusCard } from '@/components/StatusCard/status-card';

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

      {error && (
        <StatusCard status="error">
          There was an error loading your data.
        </StatusCard>
      )}
      {isLoading && <StatusCard status="info">Please wait.</StatusCard>}

      {!isLoading && <AboutMeForm data={data} />}
    </>
  );
}
