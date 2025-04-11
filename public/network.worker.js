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
const MAX_STORED_VALUES = 100 // Maximum number of values to store for calculations

// State variables
let isRunning = false
let intervalId = null
let pings = 0
let pongs = 0
let pingValues = []
let jitterValues = []
let prevTimestamp = null
// Add a paused state variable
let isPaused = false

// Message handler for commands from the main thread
self.onmessage = function(e) {
  const { command } = e.data
  
  if (command === 'start') {
    startMeasurements()
  } 
  else if (command === 'stop') {
    stopMeasurements()
  }
  else if (command === 'pause') {
    isPaused = true
    if (intervalId !== null) {
      self.clearInterval(intervalId)
      intervalId = null
    }
  } 
  else if (command === 'resume') {
    if (isRunning && isPaused) {
      isPaused = false
      // Run immediately once
      runMeasurements()
      // Then set interval
      intervalId = self.setInterval(runMeasurements, 2000)
    }
  }
}
  
function startMeasurements() {
  if (isRunning) return

  isRunning = true
  isPaused = false
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
  isPaused = false

  if (intervalId !== null) {
    self.clearInterval(intervalId)
    intervalId = null
  }
}

async function runMeasurements() {
  if (isPaused) return
  
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
    await fetch(`${endpoint}?cachebust=${Date.now()}`, {
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