import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';
import styles from './tabs.module.scss';

interface Tab {
  title: string;
  child: ReactNode;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const keyDownEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setTabIndex(Math.max(0, tabIndex - 1));
        break;
      case 'ArrowRight':
        setTabIndex(Math.min(tabs.length - 1, tabIndex + 1));
        break;
      case 'Home':
        setTabIndex(0);
        break;
      case 'End':
        setTabIndex(tabs.length - 1);
        break;
    }
  };

  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab, index) => (
          <div
            className={clsx(styles.tab, index == tabIndex && styles.activeTab)}
            tabIndex={index == tabIndex ? 0 : -1}
            role="tab"
            onClick={() => setTabIndex(index)}
            onKeyDown={keyDownEvent}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={styles.content} role="tabpanel">
        {tabs[tabIndex].child}
      </div>
    </div>
  );
}
