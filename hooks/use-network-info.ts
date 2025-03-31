"use client"

import { useState, useEffect } from "react"

interface NetworkInfo {
  isOnline: boolean
  connectionType: string | null
}

export function useNetworkInfo(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isOnline: true,
    connectionType: null,
  })

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = navigator.connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

      setNetworkInfo({
        isOnline: navigator.onLine,
        connectionType: connection ? connection.effectiveType : null,
      })
    }

    // Initial update
    updateNetworkInfo()

    // Event listeners
    window.addEventListener("online", updateNetworkInfo)
    window.addEventListener("offline", updateNetworkInfo)

    const connection = navigator.connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
      connection.addEventListener("change", updateNetworkInfo)
    }

    return () => {
      window.removeEventListener("online", updateNetworkInfo)
      window.removeEventListener("offline", updateNetworkInfo)

      if (connection) {
        connection.removeEventListener("change", updateNetworkInfo)
      }
    }
  }, [])

  return networkInfo
}

