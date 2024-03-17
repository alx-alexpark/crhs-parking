'use client';

import { useState } from 'react';
import useSWR from 'swr';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { ParkingRequestItem } from './parking-request-item';
import { ReviewerFormDialog } from './reviewer-form-dialog';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewerList() {
  const [dialogClosed, setDialogClosed] = useState(true);

  const { data, error, isLoading } = useSWR(
    dialogClosed ? '/api/v1/admin/getPendingRequests' : null,
    fetcher
  );

  if (isLoading) return <p>spinner</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {data?.requests.length == 0 && <p>Wow. It's empty!</p>}

      {data?.requests.map((req: ParkingSpotRequestType, index: number) => (
        <ReviewerFormDialog form={req}>
          <ParkingRequestItem
            status={'undecided'}
            // @ts-expect-error: timestamps are weird
            timestamp={req.updatedAt}
            key={index}
          />
        </ReviewerFormDialog>
      ))}
    </div>
  );
}
