'use client';

import React, { useState } from 'react';

import useSWR from 'swr';

import { Stepper } from '@/components';

import axios from 'axios';
import { useFormik } from 'formik';
import { ParkingRequestForm } from './form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
    onSubmit: (values) => {
      setActiveStep(activeStep + 1);

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
