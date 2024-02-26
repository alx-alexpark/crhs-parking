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
          className={styles.item}
          onClick={() => setStepperIndex(index)}
          key={index}
        >
          <span
            className={clsx(
              styles.icon,
              index <= stepperIndex && styles.active,
              index < stepperIndex && styles.complete
            )}
          >
            {index >= stepperIndex ? index + 1 : <CheckIcon />}
          </span>
          <p className={styles.textTitle}>{step}</p>
        </div>
      ))}
    </div>
  );
}
