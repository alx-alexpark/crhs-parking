'use client';

import { redirect, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import axios from 'axios';
import clsx from 'clsx';
import { useFormik } from 'formik';
import useSWR from 'swr';

import { Stepper } from '@/components';
import {
  GetStarted,
  Guidelines,
  ParkingSpot,
  Payment,
  VehicleInformation,
} from './_components';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import styles from '../form.module.scss';

const steps = ['Introduction', 'Parking', 'Vehicle', 'Payment', 'Guidelines'];

const pages = [
  GetStarted,
  ParkingSpot,
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
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // reset form when initial values change
    enableReinitialize: true,
  });

  const submitForm = () => {
    axios
      .post('/api/v1/student/parkingSpotRequest')
      .then((res) => {
        console.log(res);
        redirect('/dashboard');
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <form className={styles.formPage} onSubmit={formik.handleSubmit}>
          {/*
            Tip:
            React.createElement is required here because it errors if you try
            to use pages[activeStep]({ ... }) instead.

            Since hooks are meant to be defined at the top-level, having a hook
            inside of a function would normally raise an error. Doing this
            tells React that this is a component and not a normal function.
            */}
          {React.createElement(
            pages[Math.max(0, Math.min(pages.length - 1, activeStep))],
            { formik }
          )}
          <div className={styles.actions}>
            <button
              className={clsx(
                activeStep === 0 && styles.hiddenButton,
                styles.backButton
              )}
              onClick={() => void setActiveStepPage(activeStep - 1)}
              type="submit"
            >
              <ArrowLeftIcon /> Go back
            </button>

            {activeStep < pages.length - 1 ? (
              activeStep === 0 ? (
                <button
                  type="button"
                  onClick={() => void setActiveStepPage(activeStep + 1)}
                >
                  Continue <ArrowRightIcon />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => void setActiveStepPage(activeStep + 1)}
                >
                  Save and continue <ArrowRightIcon />
                </button>
              )
            ) : (
              <button type="button" onClick={submitForm}>
                Submit <ArrowRightIcon />
              </button>
            )}
          </div>
        </form>
      )}
    </main>
  );
}
