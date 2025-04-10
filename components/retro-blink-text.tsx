"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ANIMATION_SPEEDS } from "@/components/retro-control-constants"

interface RetroBlinkTextProps {
  text: string
  className?: string
}

export function RetroBlinkText({ text, className }: RetroBlinkTextProps) {
  const [blinkState, setBlinkState] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState((prev) => !prev)
    }, ANIMATION_SPEEDS.blink)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("font-mono", className)}>
      {text}<span className="inline-block w-[1em] text-center">{blinkState ? "_" : " "}</span>
    </span>
  )
}