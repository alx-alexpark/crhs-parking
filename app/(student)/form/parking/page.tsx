'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import useSWR from 'swr';

import { Stepper } from '@/components';
import Head from 'next/head';
import { ParkingRequestForm } from './form';

import { fetcher } from '@/app/util';

const steps = [
  'Introduction',
  'Parking Spot',
  'Vehicle',
  'Payment',
  'Guidelines',
];

export default function ParkingRequestPage() {
  // TODO: pull from DB (formik.formStep)
  const initialFormStep = 0;

  const [activeStep, setActiveStep] = useState(initialFormStep);
  const { data, error, isLoading } = useSWR(
    '/api/v1/student/parkingSpotRequest',
    fetcher
  );

  console.debug({ data, error, isLoading });

  const formik = useFormik({
    initialValues: data,
    // initialValues: {...RequestTemplate, data},
    onSubmit: (values) => {
      console.log('submitting', values);

      if (activeStep !== steps.length - 1) {
        setActiveStep(activeStep + 1);
      }

      if (formik.initialValues === values) {
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
    },

    // reset form when initial values change
    enableReinitialize: true,
  });

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/api/v1/student/parkingSpotRequest"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Stepper
        steps={steps}
        stepperIndex={activeStep}
        setStepperIndex={setActiveStep}
      />

      {error && <div>There was an error loading your data.</div>}
      {isLoading && <div>Please wait.</div>}

      {!isLoading && (
        <ParkingRequestForm
          formik={formik}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </>
  );
}
