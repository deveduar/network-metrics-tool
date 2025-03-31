"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle, Info, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertToastVariants = cva(
  "fixed bottom-4 right-4 z-50 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow transition-opacity duration-300",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-border",
        warning: "bg-warning/15 text-warning-foreground border border-warning/20",
        destructive: "bg-destructive/15 text-destructive-foreground border border-destructive/20",
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

  return (
    <div className={cn(alertToastVariants({ variant }), className)} role="alert" {...props}>
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {variant === "destructive" ? <AlertCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      </div>
      <div className="ml-3 text-sm font-normal">
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-xs opacity-80">{description}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-muted"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

