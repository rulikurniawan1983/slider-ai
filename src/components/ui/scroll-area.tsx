import * as React from "react";
import { cn } from "@/components/ui/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function ScrollBar({ orientation = "vertical", className }: ScrollBarProps) {
  return (
    <div
      className={cn(
        orientation === "vertical" ? "flex h-full w-2.5 flex-col" : "flex w-full h-2.5 flex-row",
        "absolute right-0 bottom-0",
        className
      )}
    />
  );
}
