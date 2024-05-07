import Image from 'next/image';

import styles from './auth-pages.module.scss';
import './auth-pages.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.container}>
      {children}

      <Image
        className={styles.background}
        src="/assets/john-matychuk-yvfp5YHWGsc-unsplash.jpg"
        alt="Aerial view of cars parked on parking lot"
        role="presentation"
        layout="fill"
      />
      <span className={styles.attribution}>
        Photo by <a href="https://unsplash.com/@john_matychuk">John Matychuk</a>{' '}
        on{' '}
        <a href="https://unsplash.com/photos/aerial-view-of-cars-parked-on-parking-lot-yvfp5YHWGsc">
          Unsplash
        </a>
      </span>
    </main>
  );
}
