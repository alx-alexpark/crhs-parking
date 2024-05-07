import { CheckIcon, Cross2Icon, DashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { ReactNode } from 'react';
import styles from './status-card.module.scss';

interface StatusCardProps {
  status: 'success' | 'error' | 'info';
  children: ReactNode;
}

export function StatusCard({ status, children }: StatusCardProps) {
  return (
    <div
      className={clsx(
        styles.container,
        status === 'info' && styles.info,
        status === 'success' && styles.approved,
        status === 'error' && styles.rejected
      )}
    >
      <div className={styles.iconContainer}>
        {status === 'info' && <DashIcon />}
        {status === 'success' && <CheckIcon />}
        {status === 'error' && <Cross2Icon />}
      </div>

      <p>{children}</p>
    </div>
  );
}
