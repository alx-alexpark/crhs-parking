import clsx from 'clsx';
import { createElement, useState } from 'react';
import * as Yup from 'yup';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import {
  GetStarted,
  Guidelines,
  ParkingSpot,
  Payment,
  VehicleInformation,
} from './_components';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { Form, Formik } from 'formik';

import ConfirmSubmit from '../_components/confirm-submit';
import SubmittedPage from './submitted';

import axios from 'axios';
import styles from '../form.module.scss';

const pages = [
  { page: GetStarted, validationSchema: undefined },
  {
    page: ParkingSpot,
    validationSchema: Yup.object().shape({
      spotNum: Yup.number().required('Please select a parking spot'),
    }),
  },
  {
    page: VehicleInformation,
    validationSchema: Yup.object().shape({
      vehicle: Yup.object().shape({
        make: Yup.string().required('Vehicle make is required').max(50),
        model: Yup.string().required('Vehicle model is required').max(50),
        year: Yup.number().required('Vehicle year is required'),
        color: Yup.string().required('Vehicle color is required').max(50),
        licensePlate: Yup.string()
          .required('License plate is required')
          .max(50),
      }),
    }),
  },
  {
    page: Payment,
    validationSchema: Yup.object().shape({
      paymentId: Yup.string().required('Payment ID is required'),
    }),
  },
  { page: Guidelines, validationSchema: Yup.object().shape({}) },
];

interface ParkingRequestFormProps {
  data: ParkingSpotRequestType;
  activeStep: number;
  setActiveStep: Function;
  maxSteps: number;
}

export function ParkingRequestForm({
  data,
  activeStep,
  setActiveStep,
  maxSteps,
}: ParkingRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <SubmittedPage />;
  }

  return (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        setSubmitted(true);

        console.log('submitting', values);

        if (activeStep !== maxSteps - 1) {
          setActiveStep(activeStep + 1);
        }

        // Don't PUT to API if initial values don't differ from submitted values
        if (data === values) {
          console.log('Skip submit');
          return;
        }

        axios
          .put('/api/v1/student/parkingSpotRequest', values)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
      validationSchema={pages[activeStep].validationSchema}
      enableReinitialize={true}
    >
      {(formik) => (
        <Form className={styles.formPage}>
          <input
            name="formStep"
            type="number"
            value={activeStep}
            hidden={true}
            readOnly={true}
          />

          <div>
            {/*
        Tip:
        React.createElement is required here because it errors if you try
        to use pages[activeStep]({ ... }) instead.

        Since hooks are meant to be defined at the top-level, having a hook
        inside of a function would normally raise an error. Doing this
        tells React that this is a component and not a normal function.
        */}
            {createElement(pages[activeStep].page, { formik })}
          </div>
          <div className={styles.actions}>
            <button
              className={clsx(
                activeStep === 0 && styles.hiddenButton,
                styles.backButton
              )}
              onClick={() => void setActiveStep(activeStep - 1)}
              type="button"
            >
              <ArrowLeftIcon /> Go back
            </button>

            {activeStep < pages.length - 1 ? (
              <button
                className={styles.nextButton}
                onClick={() => void setActiveStep(activeStep + 1)}
                type="submit"
              >
                Next <ArrowRightIcon />
              </button>
            ) : (
              <ConfirmSubmit onSubmit={formik.submitForm}>
                <button className={styles.backButton} type="button">
                  Submit
                </button>
              </ConfirmSubmit>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
