// ASCII art constants for the retro control panel
export const RETRO_ASCII = {
  // Header for the control panel
  header: `
╔══════════════════════════════╗
║     NETWORK CONTROL PANEL     ║
╚══════════════════════════════╝`,

  // Button states
  buttonStart: `
╔══════════════════════════════╗
║ ▶ START MEASUREMENT          ║
╚══════════════════════════════╝`,

  buttonStop: `
╔══════════════════════════════╗
║ ■ STOP MEASUREMENT           ║
╚══════════════════════════════╝`,

  // Status indicators
  statusOnline: `
╔═════════════╗
║ ● ONLINE    ║
╚═════════════╝`,

  statusOffline: `
╔═════════════╗
║ ○ OFFLINE   ║
╚═════════════╝`,

  // Connection type template
  connection: (type: string) => `
╔═════════════╗
║ ${type.padEnd(10, " ")} ║
╚═════════════╝`,

  // System status indicators
  systemActive: "▓▒░ SYSTEM ACTIVE",
  systemIdle: "░▒▓ SYSTEM IDLE",

  // Data collection status messages
  collectingData: "COLLECTING DATA... _",
  readyToMeasure: "READY TO MEASURE _",

  // Game-inspired ASCII art for different network states
  gameGood: [
    `
╔═══════════════════════╗
║ ▓▒░SPACE INVADERS░▒▓  ║
║                       ║
║    █ █   ▀█▀█▀   █ █  ║
║   █████ █████ █████   ║
║   █ █ █ █ █ █ █ █ █   ║
║                       ║
║         ▄█▄           ║
║        █████          ║
║       ▀▀█▀▀▀          ║
╚═══════════════════════╝`,
    `
╔═══════════════════════╗
║ ▓▒░SPACE INVADERS░▒▓  ║
║                       ║
║    ▄ ▄   ▄▀▄▀▄   ▄ ▄  ║
║   █████ █████ █████   ║
║   █ █ █ █ █ █ █ █ █   ║
║                       ║
║         ▄█▄           ║
║        █████          ║
║       ▀▀▀█▀▀          ║
╚═══════════════════════╝`,
  ],

  gameFair: [
    `
╔═══════════════════════╗
║ ▓▒░    TETRIS    ░▒▓  ║
║                       ║
║       ██              ║
║       ██████          ║
║           ██          ║
║                       ║
║     ████  ██████      ║
║     ████  ██  ██      ║
║           ██████      ║
╚═══════════════════════╝`,
    `
╔═══════════════════════╗
║ ▓▒░    TETRIS    ░▒▓  ║
║                       ║
║           ██          ║
║       ██████          ║
║       ██              ║
║                       ║
║     ████  ██████      ║
║     ████  ██  ██      ║
║           ██████      ║
╚═══════════════════════╝`,
  ],

  gamePoor: [
    `
╔═══════════════════════╗
║ ▓▒░    PACMAN    ░▒▓  ║
║                       ║
║                       ║
║      ᗣ···ᗧ            ║
║                       ║
║   CONNECTION LOST!    ║
║                       ║
║    INSERT COIN TO     ║
║      CONTINUE...      ║
╚═══════════════════════╝`,
    `
╔═══════════════════════╗
║ ▓▒░    PACMAN    ░▒▓  ║
║                       ║
║                       ║
║      ·ᗣ··ᗧ            ║
║                       ║
║   CONNECTION LOST!    ║
║                       ║
║    INSERT COIN TO     ║
║      CONTINUE...      ║
╚═══════════════════════╝`,
    `
╔═══════════════════════╗
║ ▓▒░    PACMAN    ░▒▓  ║
║                       ║
║                       ║
║      ··ᗣ·ᗧ            ║
║                       ║
║   CONNECTION LOST!    ║
║                       ║
║    INSERT COIN TO     ║
║      CONTINUE...      ║
╚═══════════════════════╝`,
    `
╔═══════════════════════╗
║ ▓▒░    PACMAN    ░▒▓  ║
║                       ║
║                       ║
║      ···ᗣᗧ            ║
║                       ║
║   CONNECTION LOST!    ║
║                       ║
║    INSERT COIN TO     ║
║      CONTINUE...      ║
╚═══════════════════════╝`,
  ],

  noData: `
╔════════════════════════════╗
║      NO DATA AVAILABLE     ║
║                            ║
║    PRESS START TO BEGIN    ║
║                            ║
║         GAME OVER          ║
╚════════════════════════════╝`,
}

// Thresholds for network health determination
export const NETWORK_HEALTH_THRESHOLDS = {
  ping: { warning: 100, critical: 150 },
  jitter: { warning: 20, critical: 30 },
  packetLoss: { warning: 0.5, critical: 1 },
}

// Animation speeds for different elements
export const ANIMATION_SPEEDS = {
  blink: 800,
  pacman: 300,
  spaceInvaders: 500,
  tetris: 600,
}

// Status indicators for metrics
export const STATUS_INDICATORS = {
  good: "[OK]",
  warning: "[!]",
  critical: "[X]",
}

// Helper function to get status bar based on metric values
export function getStatusBar(value: number, max: number) {
  const percentage = Math.min(100, (value / max) * 100)
  const bars = Math.floor(percentage / 10)
  return "█".repeat(bars) + "░".repeat(10 - bars)
}

// Helper function to determine network health
export function getNetworkHealth(ping: number, jitter: number, packetLoss: number) {
  if (
    ping > NETWORK_HEALTH_THRESHOLDS.ping.critical ||
    jitter > NETWORK_HEALTH_THRESHOLDS.jitter.critical ||
    packetLoss > NETWORK_HEALTH_THRESHOLDS.packetLoss.critical
  ) {
    return "poor"
  } else if (
    ping > NETWORK_HEALTH_THRESHOLDS.ping.warning ||
    jitter > NETWORK_HEALTH_THRESHOLDS.jitter.warning ||
    packetLoss > NETWORK_HEALTH_THRESHOLDS.packetLoss.warning
  ) {
    return "fair"
  } else {
    return "good"
  }
}

// Helper function to get health color classes
export function getHealthColorClasses(health: "good" | "fair" | "poor") {
  if (health === "good") return "border-success text-success"
  if (health === "fair") return "border-warning text-warning"
  return "border-destructive text-destructive"
}

