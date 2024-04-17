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
          data={data}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          maxSteps={steps.length}
        />
      )}
    </>
  );
}
