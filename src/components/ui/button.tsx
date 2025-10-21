
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold font-inter ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:flex-shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[#2563eb] text-white hover:bg-[#1e40af] hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-1 active:translate-y-0 active:scale-95",
        outline:
          "border-2 border-[#2563eb] bg-transparent text-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0 active:scale-95 before:absolute before:inset-0 before:bg-[#2563eb] before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10",
        secondary:
          "bg-gradient-to-r from-instalei-orange-500 to-instalei-orange-600 text-white hover:from-instalei-orange-600 hover:to-instalei-orange-700 hover:shadow-xl hover:shadow-instalei-orange-500/25 hover:-translate-y-1 active:translate-y-0 active:scale-95",
        ghost: "bg-transparent text-instalei-gray-600 hover:bg-instalei-gray-100 hover:text-instalei-gray-800 hover:-translate-y-0.5",
        link: "text-[#2563eb] underline-offset-4 hover:underline hover:text-[#1e40af] transition-colors",
        secure: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-1 active:translate-y-0 active:scale-95",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm [&_svg]:size-4",
        sm: "h-9 px-3 py-2 text-xs rounded-xl [&_svg]:size-3.5",
        lg: "h-12 px-6 py-3 text-base rounded-2xl [&_svg]:size-5",
        icon: "h-11 w-11 rounded-2xl [&_svg]:size-4",
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
