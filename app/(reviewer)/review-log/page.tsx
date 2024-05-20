'use client';

import useSWR from 'swr';

import { fetcher, formatDate } from '@/app/util';
import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { UserType } from '@/models/User';

import SkeletonBox from '@/components/Skeleton/skeleton';
import Table from '@/components/Table/table';
import { useMemo } from 'react';

export default function ReviewLogPage() {
  const { data, error, isLoading } = useSWR(
    '/api/v1/admin/getPendingRequests',
    fetcher
  );

  const tableData: (string | number)[][] = useMemo(() => {
    // If the data is unavailable, return an empty array
    if (isLoading || error || !data) return [];

    return data?.requests.map((req: ParkingSpotRequestType) => [
      // @ts-expect-error: type coercion
      (req.user as UserType).name,
      // @ts-expect-error: type coercion
      (req.user as UserType).grade,
      formatDate(req.updatedAt),
      // TODO: request status
      'TODO',
    ]);
  }, [data]);

  return (
    <Table
      data={tableData}
      header={[
        ['Name', true],
        ['Grade', true],
        ['Date reviewed', true],
        ['Status', true],
      ]}
      title="Reviewed requests"
    >
      {/* Unavailable data states */}
      {data?.requests.length == 0 && <p>Wow. It's empty!</p>}
      {error && <p>{error}</p>}
      {isLoading &&
        Array.from({ length: 4 }).fill(
          <tr>
            <td>
              <SkeletonBox />
            </td>
            <td>
              <SkeletonBox />
            </td>
            <td>
              <SkeletonBox />
            </td>
            <td>
              <SkeletonBox />
            </td>
          </tr>
        )}
    </Table>
  );
}
