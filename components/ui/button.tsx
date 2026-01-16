import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none ring-offset-white active:scale-95";
  
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-transparent",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300",
    ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
  };
  
  const sizes = {
    default: "h-11 px-5 py-2 text-sm", // Etwas höher für bessere Touch-Targets (Base 44 Style)
    sm: "h-9 rounded-lg px-3 text-xs",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />
  );
}