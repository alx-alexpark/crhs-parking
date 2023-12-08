'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import useSWR from 'swr';

import { Stepper } from '@/components';
import {
  DriverInformation,
  GetStarted,
  Guidelines,
  ParkingSpot,
  Payment,
  StudentInformation,
  VehicleInformation,
} from './_components';

import { ArrowRightIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useFormik } from 'formik';
import styles from './parking-request.module.scss';

const steps = [
  'Introduction',
  'Parking Spot',
  'Student',
  'Driver',
  'Vehicle',
  'Payment',
  'Guidelines',
];

const pages = [
  GetStarted,
  ParkingSpot,
  StudentInformation,
  DriverInformation,
  VehicleInformation,
  Payment,
  Guidelines,
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ParkingRequestPage() {
  // TODO: organize this section

  const searchParams = useSearchParams();
  const initialFormStep = searchParams
    ? Number(searchParams.get('step') ?? 1) - 1
    : 0;

  const [activeStep, setActiveStep] = useState(initialFormStep);
  const { data, error, isLoading } = useSWR(
    '/api/v1/student/parkingSpotRequest',
    fetcher
  );

  console.debug({ data, error, isLoading });

  // Wrap setActiveStep to also update the "step" query parameter
  const setActiveStepPage = (n: number) => {
    setActiveStep(n);
    window.history.pushState(null, '', '?step=' + (n + 1));
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      axios
        .put('/api/v1/student/parkingSpotRequest', values)
        .then((res) => {
          console.log(res);
          setActiveStepPage(activeStep + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // reset form when initial values change
    enableReinitialize: true,
  });

  return (
    <main className={styles.container}>
      <Stepper
        steps={steps}
        stepperIndex={activeStep}
        setStepperIndex={setActiveStepPage}
      />

      {error && <div>There was an error loading your data.</div>}
      {isLoading && <div>Please wait.</div>}

      {!isLoading && (
        <div className={styles.content}>
          <form className={styles.formPage} onSubmit={formik.handleSubmit}>
            {/*
            Tip:
            React.createElement is required here because it errors if you try
            to use pages[activeStep]({ ... }) instead.

            Since hooks are meant to be defined at the top-level, having a hook
            inside of a function would normally raise an error. Doing this
            tells React that this is a component and not a normal function.
            */}
            {React.createElement(pages[activeStep], {
              formik,
              children: (
                <div className={styles.actions}>
                  {activeStep > 0 && (
                    <button
                      onClick={() => void setActiveStepPage(activeStep - 1)}
                    >
                      Go back
                    </button>
                  )}

                  {activeStep < pages.length - 1 ? (
                    <button type="submit">
                      Next <ArrowRightIcon />
                    </button>
                  ) : (
                    <button onClick={() => void alert('done!')}>
                      Submit <ArrowRightIcon />
                    </button>
                  )}
                </div>
              ),
            })}
          </form>
        </div>
      )}
    </main>
  );
}
