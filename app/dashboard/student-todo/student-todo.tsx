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

export default async function StudentTodoPage() {
  let activeStep = true;
  const isActiveStep = () => {
    const active = activeStep;
    activeStep = false;
    return active;
  };

  const user = await currentUser();

  const userDbObj = (await User.findOne({
    clerkUserId: user?.id,
  })) as UserType;

  const lastParkingRequest = (await ParkingSpotRequest.findOne({
    submitted: true,
  })) as ParkingSpotRequestType;

  const completedUserForm = Boolean(userDbObj.driversLicense);
  const completedParkingForm = Boolean(lastParkingRequest);

  return (
    <div className={styles.container}>
      <h1>Are you ready?</h1>
      <ol className={styles.stepsContainer}>
        <li
          className={clsx(
            styles.step,
            !isActiveStep() && !completedUserForm && styles.incomplete
          )}
        >
          <div
            className={clsx(
              styles.checkIcon,
              completedUserForm && styles.iconComplete
            )}
          >
            <CheckIcon />
          </div>
          <p>
            Update your <Link href="/form/about-me">user information</Link>.
          </p>
        </li>
        <li
          className={clsx(
            styles.step,
            !completedParkingForm && styles.incomplete
          )}
        >
          <div
            className={clsx(
              styles.checkIcon,
              completedParkingForm && styles.iconComplete
            )}
          >
            <CheckIcon />
          </div>
          <p>
            Make your <Link href="parking">parking request</Link>.
          </p>
        </li>
      </ol>
      <button
        disabled={!(completedUserForm && completedParkingForm)}
        className={styles.dashboardButton}
        // onClick={() => {
        //   if (!finished) return;
        //   window.location.reload();
        // }}
      >
        Open dashboard <ArrowRightIcon />
      </button>
    </div>
  );
}
