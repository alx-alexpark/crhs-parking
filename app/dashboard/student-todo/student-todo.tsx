import clsx from 'clsx';
import useSWR from 'swr';

import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { fetcher } from '@/app/util';
import User, { UserType } from '@/models/User';

import ParkingSpotRequest, {
  ParkingSpotRequestType,
} from '@/models/ParkingSpotRequest';
import { currentUser } from '@clerk/nextjs';
import styles from './student-todo.module.scss';

const steps = [
  <>
    Update your <Link href="/form/about-me">user information</Link>.
  </>,
  <>
    Make your <Link href="parking">parking request</Link>.
  </>,
];
const dataStepKeys = ['about', 'parkingRequest'];

export default async function StudentTodoPage() {
  let activeStep = true;

  const user = await currentUser();

  const userDbObj = (await User.findOne({
    clerkUserId: user?.id,
  })) as UserType;

  const lastParkingRequest = (await ParkingSpotRequest.findOne({
    submitted: true,
  })) as ParkingSpotRequestType;

  const finished = !userDbObj.driversLicense || !lastParkingRequest;

  return (
    <div className={styles.container}>
      <h1>Are you ready?</h1>
      <ol className={styles.stepsContainer}>
        {steps.map((step, i) => {
          const complete =
            // @ts-expect-error: These keys are hardcoded to match the schema
            (data?.todoSteps && data.todoSteps[dataStepKeys[i]]) === true;

          const active = activeStep;
          activeStep = false;

          return (
            <li
              className={clsx(styles.step, !active && styles.incomplete)}
              key={i}
            >
              {/* https://www.radix-ui.com/primitives/docs/utilities/accessible-icon */}
              <div
                className={clsx(
                  styles.checkIcon,
                  complete && styles.iconComplete
                )}
              >
                <CheckIcon />
              </div>
              <p>{step}</p>
            </li>
          );
        })}
      </ol>
      <button
        disabled={!finished}
        className={clsx(
          styles.dashboardButton,
          !finished && styles.disabledButton
        )}
        onClick={() => {
          if (!finished) return;
          window.location.reload();
        }}
      >
        Open dashboard <ArrowRightIcon />
      </button>
    </div>
  );
}
