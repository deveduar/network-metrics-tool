"use client"

import { useState, useEffect } from "react"

// Define NetworkInformation interface
interface NetworkInformation extends EventTarget {
  effectiveType: string;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface NetworkInfo {
  isOnline: boolean;
  connectionType: string | null;
}

export function useNetworkInfo(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isOnline: true,
    connectionType: null,
  })

  useEffect(() => {
    const updateNetworkInfo = () => {
      const nav = navigator as NavigatorWithConnection
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection

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

    const nav = navigator as NavigatorWithConnection
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection

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