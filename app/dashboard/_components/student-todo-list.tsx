'use client';

import { CheckIcon } from '@radix-ui/react-icons';
import * as Progress from '@radix-ui/react-progress';
import Link from 'next/link';

import useSWR from 'swr';

import { UserType } from '@/models/User';

import style from './student-todo-list.module.scss';

const steps = [
  <>
    Update your <Link href="/form/about-me">user information</Link>.
  </>,
  <>
    Make your <Link href="parking">parking request</Link>.
  </>,
];
const dataStepKeys = ['about', 'parkingRequest', 'approved'];
const totalSteps = steps.length;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StudentTodoList() {
  const {
    data,
    error,
    isLoading,
  }: { data: UserType; error: any; isLoading: boolean } = useSWR(
    '/api/v1/student/userProfile',
    fetcher
  );

  if (error) {
    console.error(error);
  }

  const progress = data?.todoSteps
    ? Object.values(data.todoSteps).filter((e) => e === true).length
    : 0;

  return (
    <div className={style.container}>
      {/* <Progress.Root */}
      {/*   className={style.progress} */}
      {/*   value={!isLoading ? progress : undefined} */}
      {/*   max={totalSteps} */}
      {/* > */}
      {/*   {!isLoading && ( */}
      {/*     <Progress.Indicator */}
      {/*       className={style.progressIndicator} */}
      {/*       style={{ */}
      {/*         transform: `translateX(-${(100 / totalSteps) * (totalSteps - progress)}%)`, */}
      {/*       }} */}
      {/*     /> */}
      {/*   )} */}
      {/* </Progress.Root> */}

      <p className={style.title}>What to do next</p>
      <ol className={style.stepsContainer}>
        {steps.map((step, i) => (
          <li className={style.step} key={i}>
            {/* https://www.radix-ui.com/primitives/docs/utilities/accessible-icon */}
            <div
              data-state={
                // @ts-expect-error: These keys are hardcoded to match the schema
                (data?.todoSteps && data.todoSteps[dataStepKeys[i]]) === true &&
                'complete'
              }
              className={style.checkIcon}
            >
              <CheckIcon />
            </div>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <br />
      <p>
        Once finished, come back to this page or check your email to see when
        your request has been reviewed.
      </p>
    </div>
  );
}
