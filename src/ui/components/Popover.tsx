import * as RdxPopover from '@radix-ui/react-popover';
import React from 'react';
import { cn } from '../../app/utils/cn';

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

function PopoverContent({ children, className }: PopoverProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)] z-[99]',
          'data-[side=bottom]:animate-slide-down-and-fade',
          'data-[side=top]:animate-slide-up-and-fade',
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
