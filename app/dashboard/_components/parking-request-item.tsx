import { CheckIcon, Cross2Icon, DashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { formatDate } from '@/app/util';
import styles from './parking-request-item.module.scss';

const PENDING = 'undecided';
const APPROVED = 'approved';
const REJECTED = 'denied';

interface ParkingRequestItemProps {
  status: 'undecided' | 'approved' | 'denied';
  timestamp: number;
}

export function ParkingRequestItem({
  status,
  timestamp,
}: ParkingRequestItemProps) {
  return (
    <div
      className={clsx(
        styles.container,
        status == PENDING && styles.pending,
        status == APPROVED && styles.approved,
        status == REJECTED && styles.rejected
      )}
    >
      <div className={styles.iconContainer}>
        {status == PENDING && <DashIcon />}
        {status == APPROVED && <CheckIcon />}
        {status == REJECTED && <Cross2Icon />}
      </div>

      <p>
        {status == PENDING && 'Pending since'}
        {status == APPROVED && 'Approved on'}
        {status == REJECTED && 'Rejected on'} {/* TODO: use text month */}
        {formatDate(new Date(timestamp))}
      </p>
    </div>
  );
}
