import {
  GetStarted,
  Guidelines,
  ParkingSpot,
  Payment,
  VehicleInformation,
} from './_components';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import clsx from 'clsx';

import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import { FormikProps } from 'formik';
import { createElement } from 'react';
import styles from './parking-request.module.scss';

const pages = [
  GetStarted,
  ParkingSpot,
  VehicleInformation,
  Payment,
  Guidelines,
];

interface ParkingRequestFormProps {
  formik: FormikProps<ParkingSpotRequestType>;
  activeStep: number;
  setActiveStep: Function;
}

export function ParkingRequestForm({
  formik,
  activeStep,
  setActiveStep,
}: ParkingRequestFormProps) {
  return (
    <form className={styles.formPage} onSubmit={formik.handleSubmit}>
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
        {createElement(pages[activeStep], {
          formik,
        })}
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
          <button className={styles.nextButton} type="submit">
            Next <ArrowRightIcon />
          </button>
        ) : (
          <button
            className={styles.backButton}
            onClick={() => void alert('done!')}
            type="submit"
          >
            Submit <ArrowRightIcon />
          </button>
        )}
      </div>
    </form>
  );
}
