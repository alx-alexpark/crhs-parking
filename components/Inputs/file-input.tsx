import { UploadIcon } from '@radix-ui/react-icons';
import {
  ChangeEvent,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './file-input.module.scss';

interface FileInputProps extends React.HTMLAttributes<HTMLInputElement> {
  accept: string;
  name: string;
  onSetFile: Function;
}

interface FileInputRef extends HTMLInputElement {
  changeUrl: (url: string) => void;
}

export function FileInput({ onSetFile, ...props }: FileInputProps) {
  // Allow the input's value to be mutated
  const inputRef: MutableRefObject<FileInputRef | null> = useRef(null);
  useImperativeHandle(
    inputRef,
    // @ts-expect-error: Not all HTMLInputElement properties will be set
    () => ({
      changeUrl: (url: string) => {
        inputRef.current!.value = url;
      },
    }),
    []
  );

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.files) {
      const url = onSetFile(target.files[0]);
      inputRef.current!.changeUrl(url);
    }
    console.log('selectFile done');
  };

  return (
    <div className={styles.container}>
      <UploadIcon className={styles.icon} />

      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        {...props}
        onChange={selectFile}
      />
    </div>
  );
}
