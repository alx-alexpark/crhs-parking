import styles from './parking-request.module.scss';

export default function ParkingRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.containerMargins}>
      <main className={styles.container}>{children}</main>
    </div>
  );
}
