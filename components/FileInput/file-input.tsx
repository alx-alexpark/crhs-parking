import { UploadIcon } from '@radix-ui/react-icons';
import styles from './file-input.module.scss';

interface FileInputProps extends React.HTMLAttributes<HTMLInputElement> {
  accept: string;
  name: string;
}

export function FileInput({ ...props }: FileInputProps) {
  return (
    <div className={styles.container}>
      <UploadIcon className={styles.icon} />

      <input type="file" className={styles.input} {...props} />
    </div>
  );
}
