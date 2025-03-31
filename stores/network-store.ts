"use client"

import { create } from "zustand"
import type { NetworkMetrics, NetworkAlert } from "@/types/network"

interface NetworkState {
  metrics: NetworkMetrics[]
  isRunning: boolean
  alerts: NetworkAlert[]
  alertTypes: Set<string>
  startMeasurement: () => void
  stopMeasurement: () => void
  updateMetrics: (metric: NetworkMetrics) => void
  addAlert: (alert: NetworkAlert) => void
  clearAlerts: () => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
  metrics: [],
  isRunning: false,
  alerts: [],
  alertTypes: new Set<string>(),

  startMeasurement: () =>
    set({
      isRunning: true,
      metrics: [],
      alertTypes: new Set<string>(),
    }),

  stopMeasurement: () => set({ isRunning: false }),

  updateMetrics: (metric) =>
    set((state) => {
      // Keep only the last 30 data points for performance
      const newMetrics = [...state.metrics, metric]
      if (newMetrics.length > 30) {
        return { metrics: newMetrics.slice(-30) }
      }
      return { metrics: newMetrics }
    }),

  addAlert: (alert) =>
    set((state) => {
      // Check if we already have an alert of this type
      const alertType = alert.type + "-" + alert.message.split(":")[0]

      if (state.alertTypes.has(alertType)) {
        return state
      }

      // Add this alert type to the set
      const newAlertTypes = new Set(state.alertTypes)
      newAlertTypes.add(alertType)

      // Keep only the last 5 alerts
      const newAlerts = [...state.alerts, alert]
      if (newAlerts.length > 5) {
        return {
          alerts: newAlerts.slice(-5),
          alertTypes: newAlertTypes,
        }
      }

      return {
        alerts: newAlerts,
        alertTypes: newAlertTypes,
      }
    }),

  clearAlerts: () =>
    set({
      alerts: [],
      alertTypes: new Set<string>(),
    }),
}))

