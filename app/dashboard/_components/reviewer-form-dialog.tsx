import { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { UserType } from '@/models/User';

import styles from './reviewer-form-dialog.module.scss';

interface ReviewerFormDialogProps {
  form: ParkingSpotRequestType;
  children: ReactNode;
}

function generateFromValues(values: Object) {
  return Object.entries(values).map(([key, value], index) => (
    <div className={styles.formLine} key={index}>
      <span>{key}</span>
      <p>
        {value || (
          <strong style={{ color: 'var(--color-error)' }}>Missing value</strong>
        )}
      </p>
    </div>
  ));
}

export function ReviewerFormDialog({
  form,
  children,
}: ReviewerFormDialogProps) {
  const user = form.user as unknown as UserType;

  const values = {
    Name: user.name,
    'Student ID': user.studentId,
    'Payment ID': form.paymentId,
    'Parking spot': form.spotNum,
  };

  const valuesCar = {
    'Car make': form.vehicle?.make,
    'Car model': form.vehicle?.model,
    'Car color': form.vehicle?.color,
    'License plate': form.vehicle?.licensePlate,
  };

  const content = (
    <>
      <Dialog.Title className={styles.title}>Review application</Dialog.Title>
      <Dialog.Description>
        Make sure the information on the application is valid before approving
        or denying.
      </Dialog.Description>

      <section>{generateFromValues(values)}</section>

      <section>{generateFromValues(valuesCar)}</section>

      <div className={styles.actionButtonContainer}>
        <Dialog.Close asChild>
          <button
            className={styles.actionButton}
            name="close"
            aria-label="Close"
          >
            Approve
          </button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <button
            className={styles.actionButton}
            name="close"
            aria-label="Close"
          >
            Deny
          </button>
        </Dialog.Close>
      </div>

      <Dialog.Close asChild>
        <button className={styles.closeButton} name="close" aria-label="Close">
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </>
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>{content}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
