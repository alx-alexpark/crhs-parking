import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';

import styles from './confirm-submit.module.scss';

interface ConfirmSubmitProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function ConfirmSubmit({
  children,
  onSubmit,
}: ConfirmSubmitProps) {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Overlay className={styles.overlay} />
        <Content className={styles.content}>
          <Title className={styles.title}>Are you ready to submit?</Title>
          <Description className={styles.description}>
            Make sure all your information is correct before submitting. You
            won't be able to make changes after you submit.
          </Description>
          <div className={styles.actions}>
            <Cancel asChild>
              <button className={styles.actionCancel}>Cancel</button>
            </Cancel>
            <Action asChild>
              <button className={styles.actionSubmit} onClick={onSubmit}>
                Yes, submit
              </button>
            </Action>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
