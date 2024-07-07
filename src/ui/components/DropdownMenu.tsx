import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { cn } from "../../app/utils/cn";

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

function DropdownMenuContent({ children, className }: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)] z-[99]",
          "data-[side=bottom]:animate-slide-down-and-fade",
          "data-[side=top]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-10 outline-none flex items-center py-2 px-4 text-sm text-gray-800 rounded-2xl transition-colors cursor-pointer data-[highlighted]:bg-gray-50",
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
