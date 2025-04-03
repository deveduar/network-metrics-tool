"use client"

import { useEffect, useState } from "react"
import { useNetworkStore } from "@/stores/network-store"
import { NetworkChart } from "@/components/charts/network-chart"
import { ControlPanel } from "@/components/panels/control-panel"
import { MetricsPanel } from "@/components/panels/metrics-panel"
import { AlertToast } from "@/components/ui/alert-toast"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import ConnectionMood from "@/components/connection-mood"
import HappinessMeter from "@/components/happiness-meter"
import { RetroControlPanel } from "@/components/panels/retro-control-panel"
import { RetroGamePanel } from "@/components/panels/retro-game-panel"


export function NetworkDashboard() {
  const { toast } = useToast()
  const [worker, setWorker] = useState<Worker | null>(null)
  const { metrics, isRunning, alerts, startMeasurement, stopMeasurement, updateMetrics, addAlert, clearAlerts } =
    useNetworkStore()

  // Initialize web worker
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create a blob URL for the worker code
      const workerCode = `
    // Network measurement worker
    // This runs in a separate thread to avoid blocking the UI
    
    // Define the test endpoints for ping measurements
    const PING_ENDPOINTS = [
      'https://www.google.com',
      'https://www.cloudflare.com',
      'https://www.microsoft.com',
      'https://www.amazon.com',
      'https://www.apple.com'
    ]
    
    // Constants for measurements
    const MAX_STORED_VALUES = 30 // Maximum number of values to store for calculations
    
    // State variables
    let isRunning = false
    let intervalId = null
    let pings = 0
    let pongs = 0
    let pingValues = []
    let jitterValues = []
    let prevTimestamp = null
    
    // Initialize
    self.onmessage = (event) => {
      const { command } = event.data
      
      if (command === 'start') {
        startMeasurements()
      } else if (command === 'stop') {
        stopMeasurements()
      }
    }
    
    function startMeasurements() {
      if (isRunning) return
      
      isRunning = true
      pings = 0
      pongs = 0
      pingValues = []
      jitterValues = []
      prevTimestamp = performance.now()
      
      // Run immediately once
      runMeasurements()
      
      // Then set interval
      intervalId = self.setInterval(runMeasurements, 2000)
    }
    
    function stopMeasurements() {
      if (!isRunning) return
      
      isRunning = false
      
      if (intervalId !== null) {
        self.clearInterval(intervalId)
        intervalId = null
      }
    }
    
    async function runMeasurements() {
      try {
        // Measure ping and jitter
        const pingResult = await measurePing()
        const ping = pingResult.ping
        const jitter = pingResult.jitter
        const packetLoss = pingResult.packetLoss
        
        // Send results back to main thread
        self.postMessage({
          type: 'metrics',
          data: {
            ping,
            jitter,
            download: 0, // Disabled for now
            upload: 0, // Disabled for now
            packetLoss,
            timestamp: Date.now()
          }
        })
      } catch (error) {
        self.postMessage({
          type: 'error',
          data: {
            message: error instanceof Error ? error.message : 'Unknown error during measurement'
          }
        })
      }
    }
    
    async function measurePing() {
      // Select a random endpoint for this test
      const endpoint = PING_ENDPOINTS[Math.floor(Math.random() * PING_ENDPOINTS.length)]
      
      const start = performance.now()
      pings++
      
      try {
        // Use a cache-busting parameter to prevent caching
        await fetch(\`\${endpoint}?cachebust=\${Date.now()}\`, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store'
        })
        
        const end = performance.now()
        pongs++
        
        // Calculate ping time
        const pingTime = end - start
        
        // Add to ping values
        if (pingValues.length >= MAX_STORED_VALUES) {
          pingValues.shift()
        }
        pingValues.push(pingTime)
        
        // Calculate jitter (time difference between pings)
        const now = performance.now()
        if (prevTimestamp !== null) {
          const timeDiff = Math.abs(now - prevTimestamp - 2000) // Difference from expected interval
          
          if (jitterValues.length >= MAX_STORED_VALUES) {
            jitterValues.shift()
          }
          jitterValues.push(timeDiff)
        }
        prevTimestamp = now
        
        // Calculate average ping
        const avgPing = calculateAverage(pingValues)
        
        // Calculate jitter (average deviation)
        const avgJitter = calculateAverage(jitterValues)
        
        // Calculate packet loss
        const packetLoss = Math.abs(((pongs / Math.max(1, pings)) * 100) - 100)
        
        return {
          ping: avgPing,
          jitter: avgJitter,
          packetLoss: packetLoss
        }
      } catch (error) {
        // If fetch fails, count as packet loss
        const now = performance.now()
        if (prevTimestamp !== null) {
          const timeDiff = Math.abs(now - prevTimestamp - 2000)
          
          if (jitterValues.length >= MAX_STORED_VALUES) {
            jitterValues.shift()
          }
          jitterValues.push(timeDiff)
        }
        prevTimestamp = now
        
        // Calculate average ping from existing values or use a high value
        const avgPing = pingValues.length > 0 ? calculateAverage(pingValues) : 2000
        
        // Calculate jitter
        const avgJitter = calculateAverage(jitterValues)
        
        // Calculate packet loss
        const packetLoss = Math.abs(((pongs / Math.max(1, pings)) * 100) - 100)
        
        return {
          ping: avgPing,
          jitter: avgJitter,
          packetLoss: packetLoss
        }
      }
    }
    
    function calculateAverage(values) {
      if (values.length === 0) return 0
      
      const sum = values.reduce((acc, val) => acc + val, 0)
      return sum / values.length
    }
  `

      const blob = new Blob([workerCode], { type: "application/javascript" })
      const networkWorker = new Worker(URL.createObjectURL(blob), { type: "module" })

      networkWorker.onmessage = (event) => {
        const { type, data } = event.data

        if (type === "metrics") {
          updateMetrics(data)

          // Check thresholds and create alerts
          if (data.ping > 150) {
            addAlert({
              id: `high-ping-${Date.now()}`,
              type: "warning",
              message: `High ping detected: ${data.ping.toFixed(0)}ms`,
              timestamp: Date.now(),
            })
          }

          if (data.jitter > 30) {
            addAlert({
              id: `high-jitter-${Date.now()}`,
              type: "warning",
              message: `High jitter detected: ${data.jitter.toFixed(0)}ms`,
              timestamp: Date.now(),
            })
          }

          if (data.packetLoss > 1) {
            addAlert({
              id: `packet-loss-${Date.now()}`,
              type: "error",
              message: `Packet loss detected: ${data.packetLoss.toFixed(1)}%`,
              timestamp: Date.now(),
            })
          }
        } else if (type === "error") {
          toast({
            title: "Measurement Error",
            description: data.message,
            variant: "destructive",
          })
        }
      }

      setWorker(networkWorker)

      return () => {
        networkWorker.terminate()
      }
    }
  }, [updateMetrics, addAlert, toast])

  // Handle start/stop
  const handleToggleMeasurement = () => {
    if (isRunning) {
      if (worker) {
        worker.postMessage({ command: "stop" })
      }
      stopMeasurement()
    } else {
      if (worker) {
        worker.postMessage({ command: "start" })
      }
      startMeasurement()
      clearAlerts()
    }
  }
  const handleReset = () => {
    if (worker && isRunning) {
      worker.postMessage({ command: "stop" });
      worker.postMessage({ command: "start" });
      clearAlerts();
    }
  };

  return (
    <div className="space-y-6">
    <div className="">


      <div className="grid grid-cols-1 md:grid-cols-1 ">
   {/* Control Panel Section */}
   <Card className="backdrop-blur-md border-0">
        <CardContent className="p-0">
        <RetroControlPanel 
          isRunning={isRunning} 
          onToggle={handleToggleMeasurement}
          onReset={handleReset}
          metrics={metrics.length > 0 ? {
            packetLoss: metrics[metrics.length - 1].packetLoss
          } : undefined}
        />
        {/* <RetroGamePanel 
          metrics={metrics}
          isRunning={isRunning}
          onToggle={handleToggleMeasurement}
          config={{
            asciiStyle: "rpg",
            animationSpeed: 400
          }}
        /> */}

        </CardContent>
        </Card>
          {/* Chart Section */}
          <Card className="p-0 backdrop-blur-md  border-0 md:col-span-2">
          <NetworkChart 
            metrics={metrics} 
            isRunning={isRunning} 
            onToggle={handleToggleMeasurement}
          />
          </Card>
      </div>
    </div>

      {alerts.map((alert) => (
        <AlertToast
          key={alert.id}
          title={alert.type === "error" ? "Critical Alert" : "Warning"}
          description={alert.message}
          variant={alert.type === "error" ? "destructive" : "warning"}
        />
      ))}
    </div>
  )
}

