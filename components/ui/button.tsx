import * as React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Hilfsfunktion direkt hier oder importieren, falls in lib/utils vorhanden. 
// Zur Sicherheit definieren wir es lokal oder nutzen den Import, falls er existiert.
// Da du keine Fehler zu 'cn' gemeldet hast, gehe ich davon aus, dass der Import klappt.
import { cn } from "@/lib/utils"

// Definition der Styles ohne externe Library
const buttonVariants = {
  variant: {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 shadow-sm",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-11 px-8",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  }
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Wir ignorieren 'asChild' hier bewusst, um Abstürze wegen fehlendem Radix UI zu vermeiden.
    // Der Button wird immer als <button> gerendert.
    
    const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default
    const sizeClass = buttonVariants.size[size] || buttonVariants.size.default
    
    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    return (
      <button
        className={cn(baseClass, variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }