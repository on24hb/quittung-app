'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

const PopoverContext = React.createContext<{ open: boolean; setOpen: (o: boolean) => void } | null>(null);

export const Popover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  return <PopoverContext.Provider value={{ open, setOpen }}><div className="relative inline-block">{children}</div></PopoverContext.Provider>;
};

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

// Hilfstyp für Elemente, die geklickt werden können
interface ChildProps {
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: unknown;
}

export const PopoverTrigger = ({ asChild, children }: PopoverTriggerProps) => {
  const ctx = React.useContext(PopoverContext);
  const child = asChild ? React.Children.only(children) : children;
  
  return React.cloneElement(child as React.ReactElement<ChildProps>, { 
    onClick: (e: React.MouseEvent) => {
      // Existierenden onClick Handler auch ausführen, falls vorhanden
      const childProps = child.props as ChildProps;
      if (childProps.onClick) {
        childProps.onClick(e);
      }
      ctx?.setOpen(!ctx.open);
    } 
  });
};

interface PopoverContentProps {
  className?: string;
  align?: "center" | "end" | "start";
  children: React.ReactNode;
}

export const PopoverContent = ({ className, align = "center", children }: PopoverContentProps) => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx?.open) return null;

  return (
    <div className={cn(
      "absolute z-50 w-72 rounded-md border border-slate-200 bg-white p-4 shadow-md outline-none animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
      align === "end" ? "right-0" : "left-0",
      "mt-2",
      className
    )}>
      {children}
    </div>
  );
};