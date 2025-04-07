export const getMetricColor = {
    ping: (value: number) => {
      if (value >= 2000) return 'bg-[#ff1744]/80 dark:bg-[#ff1744]/90'     // Critical: Neon Red
      if (value >= 1000) return 'bg-[#ff4081]/80 dark:bg-[#ff4081]/90'     // Very High: Hot Pink
      if (value >= 500) return 'bg-[#ff9100]/80 dark:bg-[#ff9100]/90'      // High: Neon Orange
      if (value >= 150) return 'bg-[#ffea00]/80 dark:bg-[#ffea00]/90'      // Warning: Arcade Yellow
      if (value >= 50) return 'bg-[#00e676]/80 dark:bg-[#00e676]/90'       // Fair: Neon Green
      return 'bg-[#00fff5]/80 dark:bg-[#00fff5]/90'                        // Good: Cyan
    },
    jitter: (value: number) => {
      if (value >= 1600) return 'bg-[#d500f9]/80 dark:bg-[#d500f9]/90'    // Critical: Neon Purple
      if (value >= 800) return 'bg-[#651fff]/80 dark:bg-[#651fff]/90'      // Very High: Electric Purple
      if (value >= 400) return 'bg-[#3d5afe]/80 dark:bg-[#3d5afe]/90'     // High: Electric Blue
      if (value >= 100) return 'bg-[#00b0ff]/80 dark:bg-[#00b0ff]/90'     // Warning: Light Blue
      if (value >= 30) return 'bg-[#64ffda]/80 dark:bg-[#64ffda]/90'      // Fair: Turquoise
      return 'bg-[#18ffff]/80 dark:bg-[#18ffff]/90'                       // Good: Bright Cyan
    },
    packetLoss: (value: number) => {
      if (value >= 100) return 'bg-[#ff1744]/80 dark:bg-[#ff1744]/90'     // Critical: Neon Red
      if (value >= 1) return 'bg-[#ffea00]/80 dark:bg-[#ffea00]/90'       // Warning: Arcade Yellow
      return 'bg-[#00fff5]/80 dark:bg-[#00fff5]/90'                       // Good: Cyan
    }
  }

export const getMetricStatus = {
  ping: (value: number) => {
    if (value >= 2000) return 'Critical'
    if (value >= 1000) return 'Very High'
    if (value >= 500) return 'High'
    if (value >= 150) return 'Warning'
    if (value >= 50) return 'Fair'
    return 'Optimal'
  },
  jitter: (value: number) => {
    if (value >= 1600) return 'Critical'
    if (value >= 800) return 'Very High'
    if (value >= 400) return 'High'
    if (value >= 100) return 'Warning'
    if (value >= 30) return 'Fair'
    return 'Optimal'
  },
  packetLoss: (value: number) => {
    if (value >= 100) return 'Critical'
    if (value >= 50) return 'Very High'
    if (value >= 25) return 'High'
    if (value >= 1) return 'Warning'
    return 'Optimal'
  }
}

// export const getMetricBorderColor = {
//     ping: (value: number) => {
//       if (value >= 2000) return 'border-[#ff1744]'     // Critical: Neon Red
//       if (value >= 1000) return 'border-[#ff4081]'     // Very High: Hot Pink
//       if (value >= 500) return 'border-[#ff9100]'      // High: Neon Orange
//       if (value >= 150) return 'border-[#ffea00]'      // Warning: Arcade Yellow
//       if (value >= 50) return 'border-[#00e676]'       // Fair: Neon Green
//       return 'border-[#00fff5]'                        // Good: Cyan
//     },
//     jitter: (value: number) => {
//       if (value >= 1600) return 'border-[#d500f9]'    // Critical: Neon Purple
//       if (value >= 800) return 'border-[#651fff]'      // Very High: Electric Purple
//       if (value >= 400) return 'border-[#3d5afe]'     // High: Electric Blue
//       if (value >= 100) return 'border-[#00b0ff]'     // Warning: Light Blue
//       if (value >= 30) return 'border-[#64ffda]'      // Fair: Turquoise
//       return 'border-[#18ffff]'                       // Good: Bright Cyan
//     },
//     packetLoss: (value: number) => {
//       if (value >= 100) return 'border-[#ff1744]'     // Critical: Neon Red
//       if (value >= 1) return 'border-[#ffea00]'       // Warning: Arcade Yellow
//       return 'border-[#00fff5]'                       // Good: Cyan
//     }
// }

export const getMetricBorderColor = {
  ping: (value: number) => {
    if (value >= 2000) return '#ff1744'     // Critical: Neon Red
    if (value >= 1000) return '#ff4081'     // Very High: Hot Pink
    if (value >= 500) return '#ff9100'      // High: Neon Orange
    if (value >= 150) return '#ffea00'      // Warning: Arcade Yellow
    if (value >= 50) return '#00e676'       // Fair: Neon Green
    return '#00fff5'                        // Good: Cyan
  },
  jitter: (value: number) => {
    if (value >= 1600) return '#d500f9'    // Critical: Neon Purple
    if (value >= 800) return '#651fff'      // Very High: Electric Purple
    if (value >= 400) return '#3d5afe'     // High: Electric Blue
    if (value >= 100) return '#00b0ff'     // Warning: Light Blue
    if (value >= 30) return '#64ffda'      // Fair: Turquoise
    return '#18ffff'                       // Good: Bright Cyan
  },
  packetLoss: (value: number) => {
    if (value >= 100) return '#ff1744'     // Critical: Neon Red
    if (value >= 1) return '#ffea00'       // Warning: Arcade Yellow
    return '#00fff5'                       // Good: Cyan
  }
}