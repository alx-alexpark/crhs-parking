'use client';

import { useState } from 'react';
import useSWR from 'swr';

import { ParkingRequestItem } from '../_components/parking-request-item';
import { ReviewerFormDialog } from './_form-dialog';

import { fetcher } from '@/app/util';
import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

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
