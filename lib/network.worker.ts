// Define types for the worker
type WorkerCommand = 'start' | 'stop';

interface WorkerMessage {
  command: WorkerCommand;
}

interface PingResult {
  ping: number;
  jitter: number;
  packetLoss: number;
}

interface MetricsData {
  ping: number;
  jitter: number;
  download: number;
  upload: number;
  packetLoss: number;
  timestamp: number;
}

interface ErrorData {
  message: string;
}

type WorkerResponse = 
  | { type: 'metrics'; data: MetricsData }
  | { type: 'error'; data: ErrorData };

// Network measurement worker
// This runs in a separate thread to avoid blocking the UI
const worker = () => {
  // Define the test endpoints for ping measurements
  const PING_ENDPOINTS = [
    'https://www.google.com',
    'https://www.cloudflare.com',
    'https://www.microsoft.com',
    'https://www.amazon.com',
    'https://www.apple.com'
  ];
  
  // Constants for measurements
  const MAX_STORED_VALUES = 30; // Maximum number of values to store for calculations
  
  // State variables
  let isRunning = false;
  let intervalId: number | null = null;
  let pings = 0;
  let pongs = 0;
  let pingValues: number[] = [];
  let jitterValues: number[] = [];
  let prevTimestamp: number | null = null;
  
  // Initialize
  self.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const { command } = event.data;
    
    if (command === 'start') {
      startMeasurements();
    } else if (command === 'stop') {
      stopMeasurements();
    }
  };
  
  function startMeasurements(): void {
    if (isRunning) return;
  
    isRunning = true;
    pings = 0;
    pongs = 0;
    pingValues = [];
    jitterValues = [];
    prevTimestamp = performance.now();
  
    // Run immediately once
    runMeasurements();
  
    // Then set interval - using setInterval in the worker context
    intervalId = self.setInterval(runMeasurements, 2000) as unknown as number;
  }
  
  function stopMeasurements(): void {
    if (!isRunning) return;
  
    isRunning = false;
  
    if (intervalId !== null) {
      self.clearInterval(intervalId as unknown as number);
      intervalId = null;
    }
  }
  
  async function runMeasurements(): Promise<void> {
    try {
      // Measure ping and jitter
      const pingResult = await measurePing();
      const ping = pingResult.ping;
      const jitter = pingResult.jitter;
      const packetLoss = pingResult.packetLoss;
      
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
      } as WorkerResponse);
    } catch (error) {
      self.postMessage({
        type: 'error',
        data: {
          message: error instanceof Error ? error.message : 'Unknown error during measurement'
        }
      } as WorkerResponse);
    }
  }
  
  async function measurePing(): Promise<PingResult> {
    // Select a random endpoint for this test
    const endpoint = PING_ENDPOINTS[Math.floor(Math.random() * PING_ENDPOINTS.length)];
  
    const start = performance.now();
    pings++;
  
    try {
      // Use a cache-busting parameter to prevent caching
      await fetch(`${endpoint}?cachebust=${Date.now()}`, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      });
      
      const end = performance.now();
      pongs++;
      
      // Calculate ping time
      const pingTime = end - start;
      
      // Add to ping values
      if (pingValues.length >= MAX_STORED_VALUES) {
        pingValues.shift();
      }
      pingValues.push(pingTime);
      
      // Calculate jitter (time difference between pings)
      const now = performance.now();
      if (prevTimestamp !== null) {
        const timeDiff = Math.abs(now - prevTimestamp - 2000); // Difference from expected interval
        
        if (jitterValues.length >= MAX_STORED_VALUES) {
          jitterValues.shift();
        }
        jitterValues.push(timeDiff);
      }
      prevTimestamp = now;
      
      // Calculate average ping
      const avgPing = calculateAverage(pingValues);
      
      // Calculate jitter (average deviation)
      const avgJitter = calculateAverage(jitterValues);
      
      // Calculate packet loss
      const packetLoss = Math.abs(((pongs / Math.max(1, pings)) * 100) - 100);
      
      return {
        ping: avgPing,
        jitter: avgJitter,
        packetLoss: packetLoss
      };
    } catch (error) {
      // If fetch fails, count as packet loss
      const now = performance.now();
      if (prevTimestamp !== null) {
        const timeDiff = Math.abs(now - prevTimestamp - 2000);
        
        if (jitterValues.length >= MAX_STORED_VALUES) {
          jitterValues.shift();
        }
        jitterValues.push(timeDiff);
      }
      prevTimestamp = now;
      
      // Calculate average ping from existing values or use a high value
      const avgPing = pingValues.length > 0 ? calculateAverage(pingValues) : 2000;
      
      // Calculate jitter
      const avgJitter = calculateAverage(jitterValues);
      
      // Calculate packet loss
      const packetLoss = Math.abs(((pongs / Math.max(1, pings)) * 100) - 100);
      
      return {
        ping: avgPing,
        jitter: avgJitter,
        packetLoss: packetLoss
      };
    }
  }
  
  function calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }
};

// Export the worker function in a way that's compatible with worker-loader
export default worker;