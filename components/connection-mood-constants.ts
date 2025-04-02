// Types for mood states
export type MoodType = "happy" | "neutral" | "sad"
export type AsciiStyle = "boxed" | "rpg" | "emoticon"

// ASCII frames for each mood state - Boxed style
export const BOXED_ASCII_FRAMES = {
  happy: [
    `
╭───────────────╮
│   (◕‿◕)      │
│  OPTIMAL     │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (^‿^)      │
│  OPTIMAL     │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (⌒‿⌒)      │
│  OPTIMAL     │
╞═══════════════╡
╰───────────────╯`,
  ],
  neutral: [
    `
╭───────────────╮
│   (•‿•)      │
│   DEGRADED    │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (•_•)      │
│   DEGRADED    │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (•-•)      │
│   DEGRADED    │
╞═══════════════╡
╰───────────────╯`,
  ],
  sad: [
    `
╭───────────────╮
│   (×﹏×)      │
│  CRITICAL!    │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (>_<)      │
│  CRITICAL!    │
╞═══════════════╡
╰───────────────╯`,
    `
╭───────────────╮
│   (╯︵╰,)     │
│  CRITICAL!    │
╞═══════════════╡
╰───────────────╯`,
  ],
}

// RPG style frames
export const RPG_ASCII_FRAMES = {
  happy:  [
    "♥♥♥♥♥",
    "♥♥♥♥♥",
    "♥♥♥♥♥"
  ],
  neutral: [
    "♥♥♡♡♡",
    "♡♥♥♡♡",
    "♡♡♥♥♡",
    "♡♡♡♥♥",
    "♥♡♡♡♥"
  ],
  sad:[
    "♥♡♡♡♡",
    "♡♥♡♡♡",
    "♡♡♥♡♡",
    "♡♡♡♥♡",
    "♡♡♡♡♥"
  ],
};

// Simple emoticon frames
export const EMOTICON_FRAMES = {
  happy: ["⤹(^ᗜ^)⤸", "(•̀ᴗ•́)و", "(◕‿◕)"],
  neutral: ["(•‿•)", "(•_•)", "(•-•)"],
  sad: ["(>_<)", "(╯︵╰,)", "(×﹏×)"],
}

// Status indicators for metrics
export const STATUS_INDICATORS = {
  ok: "[OK]",
  warn: "[!]",
  crit: "[X]",
}

// Thresholds for determining metric status
export const THRESHOLDS = {
  ping: { warning: 100, critical: 150 },
  jitter: { warning: 20, critical: 30 },
  packetLoss: { warning: 0.5, critical: 1 },
}

// Helper function to get frames based on style and mood
export function getFramesByStyle(style: AsciiStyle, mood: MoodType): string[] {
  switch (style) {
    case "rpg":
      return RPG_ASCII_FRAMES[mood]
    case "emoticon":
      return EMOTICON_FRAMES[mood]
    default:
      return BOXED_ASCII_FRAMES[mood]
  }
}

// Helper function to get status for a metric
export function getMetricStatus(value: number, thresholds: { warning: number; critical: number }) {
  if (value > thresholds.critical) {
    return { class: "text-destructive", indicator: STATUS_INDICATORS.crit }
  } else if (value > thresholds.warning) {
    return { class: "text-warning", indicator: STATUS_INDICATORS.warn }
  } else {
    return { class: "text-success", indicator: STATUS_INDICATORS.ok }
  }
}

// Helper function to determine mood based on metrics
export function determineMood(metrics: { ping: number; jitter: number; packetLoss: number }): MoodType {
  const statusCount = { critical: 0, warning: 0 }

  // Check ping status
  if (metrics.ping > THRESHOLDS.ping.critical) statusCount.critical++
  else if (metrics.ping > THRESHOLDS.ping.warning) statusCount.warning++

  // Check jitter status
  if (metrics.jitter > THRESHOLDS.jitter.critical) statusCount.critical++
  else if (metrics.jitter > THRESHOLDS.jitter.warning) statusCount.warning++

  // Check packet loss status
  if (metrics.packetLoss > THRESHOLDS.packetLoss.critical) statusCount.critical++
  else if (metrics.packetLoss > THRESHOLDS.packetLoss.warning) statusCount.warning++

  // Determine overall mood
  if (statusCount.critical > 0) return "sad"
  if (statusCount.warning >= 1) return "neutral" // Changed from >= 2 to >= 1
  return "happy"
}

// Helper function to get background color based on mood
export function getMoodBackgroundColor(mood: MoodType): string {
  return mood === "happy"
    ? "bg-success/5 border-success/20"
    : mood === "neutral"
      ? "bg-warning/5 border-warning/20"
      : "bg-destructive/5 border-destructive/20"
}

// Helper function to get text color based on mood
export function getMoodTextColor(mood: MoodType): string {
  return mood === "happy" ? "text-success" : mood === "neutral" ? "text-warning" : "text-destructive"
}

