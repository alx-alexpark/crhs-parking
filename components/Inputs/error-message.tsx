import clsx from 'clsx';
import { ErrorMessageProps, ErrorMessage as FormikErrorMessage } from 'formik';

import styles from './error-message.module.scss';

export default function ErrorMessage({ ...props }: ErrorMessageProps) {
  return (
    <FormikErrorMessage
      {...props}
      className={clsx(props.className, styles.errorMessage)}
    />
  );
}
