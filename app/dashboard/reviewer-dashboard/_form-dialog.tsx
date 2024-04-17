import axios from 'axios';
import { ReactNode, useState } from 'react';

import { ParkingMap } from '@/components';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ToastContainer, toast } from 'react-toastify';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

import { UserType } from '@/models/User';

import Autocomplete from '@/components/Autocomplete/autocomplete';
import { useUser } from '@clerk/nextjs';
import { Field } from 'formik';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './_form-dialog.module.scss';

interface ReviewerFormDialogProps {
  form: ParkingSpotRequestType;
  children: ReactNode;
}

export function ReviewerFormDialog({
  form,
  children,
}: ReviewerFormDialogProps) {
  // Dialog state
  const [open, setOpen] = useState(true);

  // Requesting changes state
  const [requestingChanges, setRequestingChanges] = useState(false);

  // Clerk user
  const { user } = useUser();

  // Shorthand for the student user data
  const student = form.user as unknown as UserType;

  /**
   * Values to display in the dialog
   *
   * The first element in the array is the value to display
   * The second element in the array is the suggested request messages to display
   */

  const values = {
    Name: [student.name, ['Name is incomplete']],
    'Student ID': [student.studentId, ['Student ID is incomplete']],
    'Payment ID': [
      <img src={form.paymentId!} />,
      ['Payment ID does not exist'],
    ],
    "Driver's license": [
      <img src={student.driversLicense!} />,
      ["Learner's permit is not allowed"],
    ],
    'Parking spot': [
      <ParkingMap
        spot={form.spotNum ?? null}
        interactive={false}
        height={400}
      />,
      ['Parking spot does not exist', 'Parking spot is not available'],
    ],
  };

  const valuesCar = {
    Manufacturer: [form.vehicle?.make, []],
    Model: [form.vehicle?.model, []],
    'Release year': [form.vehicle?.year, []],
    Color: [form.vehicle?.color, []],
    'License plate': [form.vehicle?.licensePlate, []],
  };

  /**
   * Update the submission's decision to either approved or denied
   */
  const updateSubmission = (status: 'approved' | 'denied') => {
    const requestPromise = axios
      .patch('/api/v1/admin/parkingRequest', {
        // @ts-ignore-error: _id does exist
        requestId: form._id,
        decision: 'approved',
        lastInteractingAdminUserId: user?.id, // TODO: this must not be falsy
      })
      // Close the dialog after the request is done
      .then(() => setOpen(false));

    toast.promise(requestPromise, {
      pending: 'Updating application',
      success: `The application has been ${status}.`,
      error: `The application could not be ${status}. Please try again.`,
    });
  };

  /**
   * Update the submission's requested changes
   */
  const updateReview = (status: string) => {
    const requestPromise = axios
      .patch('/api/v1/admin/parkingRequest', {
        // @ts-ignore-error: _id does exist
        requestId: form._id,
        decision: 'undecided',
      })
      // Close the dialog after the request is done
      .then(() => setOpen(false));

    toast.promise(requestPromise, {
      pending: 'Updating application',
      success: `The application has been ${status}.`,
      error: `The application could not be ${status}. Please try again.`,
    });
  };

  /**
   * Generate the fields from a set of values
   */
  function generateFromValues(values: Object) {
    return Object.entries(values).map(([key, [value, errors]], index) => {
      const id = key.toLocaleLowerCase().replace(' ', '-');
      const descId = id + '-desc';

      return (
        <div className={styles.formLine} key={index}>
          <Field id={id} name={key} type="checkbox" aria-describedby={descId} />
          <label htmlFor={id}>{key}</label>
          <p id={descId}>
            {value || (
              <strong style={{ color: 'var(--color-error)' }}>
                Missing value
              </strong>
            )}
          </p>

          {requestingChanges && <Autocomplete value="" options={errors} />}
        </div>
      );
    });
  }

  // Dialog content
  const content = (
    <>
      <Dialog.Title className={styles.title}>Review application</Dialog.Title>
      <Dialog.Description>
        Make sure the information on the application is valid before approving
        or denying.
      </Dialog.Description>

      <section>
        <h3 className={styles.sectionTitle}>Application</h3>
        {generateFromValues(values)}
      </section>

      <section>
        <h3 className={styles.sectionTitle}>Vehicle details</h3>
        {generateFromValues(valuesCar)}
      </section>

      <div className={styles.actionButtonContainer}>
        {requestingChanges ? (
          <button
            className={styles.actionButton}
            aria-label="Request changes"
            onClick={() => setRequestingChanges(!requestingChanges)}
          >
            Request these changes
          </button>
        ) : (
          <>
            <Dialog.Close asChild>
              <button
                className={styles.actionButton}
                aria-label="Deny application"
                onClick={() => updateSubmission('denied')}
              >
                Deny
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className={styles.actionButton}
                aria-label="Approve application"
                onClick={() => updateSubmission('approved')}
              >
                Approve
              </button>
            </Dialog.Close>
          </>
        )}
      </div>

      <Dialog.Close asChild>
        <button
          className={styles.closeButton}
          name="close"
          aria-label="Close"
          autoFocus={true}
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.trigger}>{children}</button>
      </Dialog.Trigger>
      <ToastContainer position="bottom-right" />
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>{content}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
