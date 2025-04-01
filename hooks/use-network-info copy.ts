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
    // Set initial values
    setNetworkInfo({
      isOnline: navigator.onLine,
      connectionType: getConnectionType(),
    })

    // Update when online/offline status changes
    const handleOnline = () => {
      setNetworkInfo((prev) => ({
        ...prev,
        isOnline: true,
      }))
    }

    const handleOffline = () => {
      setNetworkInfo((prev) => ({
        ...prev,
        isOnline: false,
      }))
    }

    // Update when connection type changes (if supported)
    const handleConnectionChange = () => {
      setNetworkInfo((prev) => ({
        ...prev,
        connectionType: getConnectionType(),
      }))
    }

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Add connection change listener if supported
    if ("connection" in navigator) {
      // @ts-ignore - TypeScript doesn't know about navigator.connection
      navigator.connection?.addEventListener("change", handleConnectionChange)
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)

      if ("connection" in navigator) {
        // @ts-ignore - TypeScript doesn't know about navigator.connection
        navigator.connection?.removeEventListener("change", handleConnectionChange)
      }
    }
  }, [])

  return networkInfo
}

// Helper function to get connection type
function getConnectionType(): string | null {
  if (!("connection" in navigator)) {
    return null
  }

  // @ts-ignore - TypeScript doesn't know about navigator.connection
  const connection = navigator.connection

  if (!connection) {
    return null
  }

  // Get effective connection type if available
  if (connection.effectiveType) {
    const type = connection.effectiveType.toUpperCase()
    return type === "4G" ? "WIFI/4G" : type
  }

  // Fallback to connection type
  if (connection.type) {
    return connection.type.toUpperCase()
  }

  return null
}

