import clsx from 'clsx';

import styles from './skeleton.module.scss';

export default function SkeletonBox(props: any) {
  return <div {...props} className={clsx(styles.skeleton, props?.className)} />;
}
