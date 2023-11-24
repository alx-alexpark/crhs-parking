'use client';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Stepper } from '@/components';
import {
  DriverInformation,
  GetStarted,
  ParkingSpot,
  StudentInformation,
  VehicleInformation,
  Payment,
  Guidelines,
} from './_components';

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
  <GetStarted />,
  <ParkingSpot />,
  <StudentInformation />,
  <DriverInformation />,
  <VehicleInformation />,
  <Payment />,
  <Guidelines />,
];

export default function ParkingRequestPage() {
  const searchParams = useSearchParams();
  const initialFormStep = (Number(searchParams.get('step')) ?? 1) - 1;

  const [activeStep, setActiveStep] = useState(initialFormStep);

  // Wrap setActiveStep to also update the "step" query parameter
  const setActiveStepPage = (n: number) => {
    setActiveStep(n);
    window.history.pushState(null, "", "?step=" + (n + 1));
  }

  return (
    <main className={styles.container}>
      <Stepper
        steps={steps}
        stepperIndex={activeStep}
        setStepperIndex={setActiveStepPage}
      />

      <section className={styles.formPage}>
        <div className={styles.content}>{pages[activeStep]}</div>

        <div className={styles.actions}>
          {activeStep < pages.length - 1 ? (
            <button onClick={() => void setActiveStepPage(activeStep + 1)}>
              Next <ArrowForwardIcon />
            </button>
          ) : (
            <button onClick={() => void alert('done!')}>
              Submit <ArrowForwardIcon />
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
