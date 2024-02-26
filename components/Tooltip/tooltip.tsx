import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

import styles from './tooltip.module.scss';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.TooltipProvider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content className={styles.content} {...props}>
          {content}
          <TooltipPrimitive.Arrow
            className={styles.arrow}
            width={11}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.TooltipProvider>
  );
}
