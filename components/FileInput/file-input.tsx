import { UploadIcon } from '@radix-ui/react-icons';
import { ChangeEvent } from 'react';
import styles from './file-input.module.scss';

interface FileInputProps extends React.HTMLAttributes<HTMLInputElement> {
  accept: string;
  name: string;
  setFile: Function;
}

export function FileInput({ setFile, ...props }: FileInputProps) {
  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.files) {
      setFile(target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <UploadIcon className={styles.icon} />

      <input
        type="file"
        className={styles.input}
        {...props}
        onChange={selectFile}
      />
    </div>
  );
}
