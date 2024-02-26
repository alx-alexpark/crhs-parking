import * as TabsPrimitive from '@radix-ui/react-tabs';

import { ReactNode } from 'react';

import styles from './tabs.module.scss';

export interface Tab {
  title: string;
  content: ReactNode | JSX.Element;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={'0'}>
      <TabsPrimitive.List className={styles.tabs}>
        {tabs.map((tab, index) => (
          <TabsPrimitive.Trigger
            className={styles.tab}
            value={String(index)}
            key={index}
          >
            {tab.title}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab, index) => (
        <TabsPrimitive.Content
          className={styles.content}
          value={String(index)}
          key={index}
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
