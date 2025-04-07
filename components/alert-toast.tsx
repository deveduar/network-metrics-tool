"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle, Info, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertToastVariants = cva(
  "fixed bottom-4 right-4 z-50 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg transition-all duration-300 border-2 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-muted border-primary/50 dark:border-primary/60 text-foreground",
        warning: `bg-yellow-50 dark:bg-yellow-600 border-[#ffea00] text-yellow-900 dark:text-foreground
        shadow-[0_0_10px_rgba(255,234,0,0.2)]`,
        destructive: `bg-red-50 dark:bg-red-950 border-[#ff1744] text-red-900 dark:text-[#ff1744]
                     shadow-[0_0_10px_rgba(255,23,68,0.2)] dark:shadow-[0_0_15px_rgba(255,23,68,0.3)]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface AlertToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertToastVariants> {
  title: string
  description: string
  duration?: number
}

export function AlertToast({ className, variant, title, description, duration = 5000, ...props }: AlertToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  const getHoverClass = () => {
    switch (variant) {
                 case "warning":
        return "hover:bg-yellow-100 dark:hover:bg-yellow-500"
      case "destructive":
        return "hover:bg-red-100 dark:hover:bg-red-900"
      default:
        return "hover:bg-muted"
    }
  }

  return (
    <div className={cn(alertToastVariants({ variant }), className)} role="alert" {...props}>
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {variant === "destructive" ? <AlertCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      </div>
      <div className="ml-3 text-sm font-normal flex-grow">
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-xs opacity-80">{description}</div>
      </div>
      <button
        type="button"
        className={cn(
          "rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ml-2",
          getHoverClass()
        )}
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

