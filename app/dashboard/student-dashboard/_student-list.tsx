'use client';

import useSWR from 'swr';

import { ParkingRequestItem } from '../_components/parking-request-item';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

export default function ParkingRequestHistory() {
  const { data, error, isLoading } = useSWR(
    '/api/v1/student/getAllParkingSpotRequests',
    fetcher
  );

  // TODO: limit to 3
  if (!isLoading && !error) {
    return (
      <>
        {data?.requests.map((req: ParkingSpotRequestType, index: number) => (
          <ParkingRequestItem
            status={req.decision}
            timestamp={req.updatedAt}
            key={index}
          />
        ))}
      </>
    );
  }
}
