import { clsx } from 'clsx';
import styles from './file-input.module.scss';

interface FileInputProps extends React.HTMLAttributes<HTMLInputElement> {
  accept: string;
}

export function FileInput({
  ...props
}: FileInputProps) {
  return (
    <div className={styles.container}>
      {/* Adapted from Chakra UI's DownloadIcon */}
      <svg className={styles.icon} viewBox="0 0 14 14" focusable="false" role="img">
        <path fill="currentColor" d="M11.2857 5.37143L10.0857 6.57143L7.85714 4.28071V10.4286H6.14286V4.28071L3.91429 6.57143L2.71429 5.37143L7 1L11.2857 5.37143ZM1 11.2857V13H13V11.2857H1Z"></path>
      </svg>

      <input
        type="file"
        className={styles.input}
        {...props}
      />
    </div>
  );
}

