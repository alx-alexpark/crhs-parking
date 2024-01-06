import { CheckIcon, Cross2Icon, DashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import styles from './parking-request-item.module.scss';

interface ParkingRequestItemProps {
  status: ParkingRequestStatus;
  timestamp: number;
}

export enum ParkingRequestStatus {
  PENDING,
  APPROVED,
  REJECTED,
}

export function ParkingRequestItem({
  status,
  timestamp,
}: ParkingRequestItemProps) {
  return (
    <div
      className={clsx(
        styles.container,
        status == ParkingRequestStatus.PENDING && styles.pending,
        status == ParkingRequestStatus.APPROVED && styles.approved,
        status == ParkingRequestStatus.REJECTED && styles.rejected
      )}
    >
      <div className={styles.iconContainer}>
        {status == ParkingRequestStatus.PENDING && <DashIcon />}
        {status == ParkingRequestStatus.APPROVED && <CheckIcon />}
        {status == ParkingRequestStatus.REJECTED && <Cross2Icon />}
      </div>

      <p>
        {status == ParkingRequestStatus.PENDING && 'Pending since'}
        {status == ParkingRequestStatus.APPROVED && 'Approved on'}
        {status == ParkingRequestStatus.REJECTED && 'Rejected on'}{' '}
        {/* TODO: use text month */}
        {new Date(timestamp).toISOString().split('T')[0]}
      </p>
    </div>
  );
}
