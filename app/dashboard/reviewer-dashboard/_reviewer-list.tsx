'use client';

import useSWR from 'swr';

import { ParkingRequestItem } from '../_components/parking-request-item';
import { ReviewerFormDialog } from './_form-dialog';

import { fetcher, formatDate } from '@/app/util';
import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { UserType } from '@/models/User';

import SkeletonBox from '@/components/Skeleton/skeleton';
import Table from '@/components/Table/table';
import { useMemo } from 'react';
import styles from './_reviewer-list.module.scss';

export default function ReviewerList() {
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
        ['Name', false],
        ['Grade', true],
        ['Date created', true],
        ['Status', true],
      ]}
      title="Pending requests"
      bodyWrapper={(child: React.ReactNode, index: number) => (
        <ReviewerFormDialog form={data?.requests[index]} key={index}>
          {child}
        </ReviewerFormDialog>
      )}
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
