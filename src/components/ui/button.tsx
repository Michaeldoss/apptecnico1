
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-instalei-purple-800 text-white hover:bg-instalei-purple-700 font-inter shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-instalei-purple-800 bg-white text-instalei-purple-800 hover:bg-instalei-purple-800 hover:text-white font-inter shadow-sm",
        secondary:
          "bg-instalei-orange-500 text-white hover:bg-instalei-orange-400 font-inter shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-instalei-purple-800 underline-offset-4 hover:underline",
        secure: "bg-success text-white hover:bg-success-hover font-inter shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showLock?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showLock = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const shouldShowLock = showLock || variant === "secure"
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {shouldShowLock && <Lock className="h-4 w-4" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
