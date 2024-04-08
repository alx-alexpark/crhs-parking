import axios from 'axios';
import { ReactNode, useState } from 'react';

import { ParkingMap } from '@/components';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ToastContainer, toast } from 'react-toastify';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';

import { UserType } from '@/models/User';

import { Field, Formik } from 'formik';
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
  const [checkboxesVisible, setCheckboxesVisibility] = useState(false);
  const [requestingChanges, setRequestingChanges] = useState(false);

  const user = form.user as unknown as UserType;

  const values = {
    Name: user.name,
    'Student ID': user.studentId,
    'Payment ID': form.paymentId,
    'Parking spot': (
      <ParkingMap
        spot={form.spotNum ?? null}
        interactive={false}
        height={400}
      />
    ),
    // 'Parking spot': form.spotNum,
  };

  const valuesCar = {
    Manufacturer: form.vehicle?.make,
    Model: form.vehicle?.model,
    'Release year': form.vehicle?.year,
    Color: form.vehicle?.color,
    'License plate': form.vehicle?.licensePlate,
  };

  const updateSubmission = (status: string) => {
    const requestPromise = axios.patch('/api/v1/admin/parkingRequest', {
      // @ts-ignore-error: _id does exist
      requestId: form._id,
      decision: 'approved',
    });

    toast.promise(requestPromise, {
      pending: 'Updating application',
      success: `The application has been ${status}.`,
      error: `The application could not be ${status}. Please try again.`,
    });
  };

  function generateFromValues(values: Object) {
    return Object.entries(values).map(([key, value], index) => {
      const id = key.toLocaleLowerCase().replace(' ', '-');
      const descId = id + '-desc';

      return (
        <div className={styles.formLine} key={index}>
          {checkboxesVisible && (
            <Field
              id={id}
              name={key}
              type="checkbox"
              aria-describedby={descId}
            />
          )}
          <label htmlFor={id}>{key}</label>
          <p id={descId}>
            {value || (
              <strong style={{ color: 'var(--color-error)' }}>
                Missing value
              </strong>
            )}
          </p>
        </div>
      );
    });
  }

  const content = (
    <>
      <Dialog.Title className={styles.title}>Review application</Dialog.Title>
      <Dialog.Description>
        Make sure the information on the application is valid before approving
        or denying.
      </Dialog.Description>

      <Formik
        initialValues={values}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        <section>
          <h3 className={styles.sectionTitle}>Application</h3>
          {generateFromValues(values)}
        </section>

        <section>
          <h3 className={styles.sectionTitle}>Vehicle details</h3>
          {generateFromValues(valuesCar)}
        </section>

        <div className={styles.actionButtonContainer}>
          <button
            className={styles.actionButton}
            aria-label="Request changes"
            onClick={() => setRequestingChanges(!requestingChanges)}
          >
            {requestingChanges ? '' : 'Request changes'}
          </button>
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
        </div>
      </Formik>

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
    <Dialog.Root>
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
