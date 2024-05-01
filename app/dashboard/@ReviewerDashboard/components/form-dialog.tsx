import axios from 'axios';
import { ReactNode, useState } from 'react';

import { ParkingMap } from '@/components';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ToastContainer, toast } from 'react-toastify';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

import { UserType } from '@/models/User';

import Autocomplete from '@/components/Autocomplete/autocomplete';
import { Field } from 'formik';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './form-dialog.module.scss';

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

  // Shorthand for the student user data
  const student = form.user as unknown as UserType;

  // Collected requested changes
  const requestedChanges: { [key: string]: string } = {};

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
      <img
        src={form.paymentId!}
        alt="Image attached to the payment ID field"
        key="paymentId"
      />,
      ['Payment ID is invalid'],
    ],
    "Driver's license": [
      <img
        src={student.driversLicense!}
        id="Image attached to the driver's license field"
        key="driversLicense"
      />,
      ["Learner's permit is not allowed"],
    ],
    'Parking spot': [
      <ParkingMap
        spot={form.spotNum ?? null}
        interactive={false}
        height={400}
        key="parkingSpot"
      />,
      ['Parking spot does not exist', 'Parking spot is not available'],
    ],
  };

  const valuesCar = form.vehicles.map((vehicle) => ({
    Manufacturer: [vehicle?.make, []],
    Model: [vehicle?.model, []],
    'Release year': [vehicle?.year, []],
    Color: [vehicle?.color, []],
    'License plate': [vehicle?.licensePlate, []],
  }));

  /**
   * Update the submission's decision to either approved or denied
   */
  const updateSubmission = (status: 'approved' | 'denied') => {
    const requestPromise = axios
      .patch('/api/v1/admin/parkingRequest', {
        // @ts-ignore-error: _id does exist
        requestId: form._id,
        decision: 'approved',
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
    return Object.entries(values).map(([label, [value, errors]], index) => {
      const id = label.toLocaleLowerCase().replace(' ', '-');
      const descId = id + '-desc';

      return (
        <div className={styles.formLine} key={index}>
          <Field
            id={id}
            name={label}
            type="checkbox"
            aria-describedby={descId}
          />
          <label htmlFor={id}>{label}</label>

          <p id={descId}>
            {value || (
              <strong style={{ color: 'var(--color-error)' }}>
                Missing value
              </strong>
            )}
          </p>

          {requestingChanges && (
            <Autocomplete
              value=""
              onChange={({ target }) => {
                requestedChanges[label] = target.value;
              }}
              options={errors}
            />
          )}
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
        {valuesCar.map((vehicleValues, i) => (
          <>
            {generateFromValues(vehicleValues)}

            {/* Insert a separator between sections */}
            {valuesCar.length > 1 && i !== valuesCar.length - 1 && <hr />}
          </>
        ))}
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
