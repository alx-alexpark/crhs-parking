import { UploadIcon } from '@radix-ui/react-icons';
import { ChangeEvent, MutableRefObject, useRef } from 'react';
import styles from './file-input.module.scss';

interface FileInputProps extends React.HTMLAttributes<HTMLInputElement> {
  accept: string;
  name: string;
  setFile: Function;
}

export function FileInput({ setFile, ...props }: FileInputProps) {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.files) {
      const url = setFile(target.files[0]);
      inputRef.current!.value = url;
    }
  };

  return (
    <div className={styles.container}>
      <UploadIcon className={styles.icon} />

      <input
        type="file"
        className={styles.input}
        ref={inputRef}
        {...props}
        onChange={selectFile}
      />
    </div>
  );
}
