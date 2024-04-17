import { CheckIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import styles from './stepper.module.scss';

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[];
  stepperIndex: number;
  setStepperIndex: Function;
}

export function Stepper({
  steps,
  stepperIndex,
  setStepperIndex,
}: StepperProps) {
  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <div
          className={clsx(
            styles.item,
            index > stepperIndex && styles.inactive,
            index == stepperIndex && styles.active,
            index < stepperIndex && styles.complete
          )}
          key={index}
        >
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}
