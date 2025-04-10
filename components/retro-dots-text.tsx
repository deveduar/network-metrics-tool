"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface RetroDotTextProps {
  text: string
  className?: string
  speed?: number
}

export function RetroDotText({ text, className, speed = 300 }: RetroDotTextProps) {
  const [dotState, setDotState] = useState(0)
  
  // States: 0 -> no dots, 1 -> one dot, 2 -> two dots, 3 -> three dots, 
  // 4 -> two dots, 5 -> one dot, then back to 0
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDotState((prev) => (prev + 1) % 6)
    }, speed)

    return () => clearInterval(interval)
  }, [speed])

  // Generate dots based on the current state
  const getDots = () => {
    switch (dotState) {
      case 0: return "   "; // No dots
      case 1: return ".  "; // First dot
      case 2: return ".. "; // First and second dots
      case 3: return "..."; // All three dots
      case 4: return ".. "; // First and second dots (fading)
      case 5: return ".  "; // First dot (fading)
      default: return "   ";
    }
  }

  return (
    <span className={cn("font-mono", className)}>
      {text}<span className="inline-block min-w-[2em] text-left">{getDots()}</span>
    </span>
  )
}