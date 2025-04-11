"use client"

import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Globe, Heart, Zap, Monitor, BarChart3, ChevronRight } from "lucide-react"
import Link from "next/link"

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/deveduar",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/deveduar",
      label: "LinkedIn"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/deveduar",
      label: "Twitter"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      href: "https://deveduar-portfolio.vercel.app/",
      label: "Portfolio"
    }
  ]

  return (
    <div className={cn("", className)} id="about">
      <div className="font-mono p-6 rounded-lg  bg-muted/30 dark:bg-muted/20 ">
        
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wider uppercase mb-2
                       px-4 py-2 rounded-md inline-block
                       border border-primary/30
                       bg-background/50 dark:bg-background/10
                       shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                       dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#00fff5]/60 dark:bg-[#00fff5]/80 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#64ffda]/60 dark:bg-[#64ffda]/80 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-[#00e676]/60 dark:bg-[#00e676]/80 animate-pulse delay-150" />
              </div>
              About Ping Test
            </div>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            A retro-inspired network monitoring tool
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-2 max-w-6xl mx-auto bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30">
          
        <section 
            id="what-is-this" 
            className="p-4"
            role="region"
          >
            <h2 
              id="what-is-this-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ping Test Tool
            </h2>
            <div className="">
              <div className="py-3 space-y-4">
                {/* <p className="font-medium text-primary border-b border-primary/10 pb-1 mb-2">Ping Test Tool</p> */}
                <p className="text-sm text-muted-foreground">
                  A real-time network monitoring tool that helps you understand your connection quality through a retro-gaming inspired interface.
                </p>
              </div>
              <h3 className=" text-sm font-medium text-primary my-2">Features </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Zap className="w-5 h-5" />
                    <p className="font-medium border-b border-primary/10 pb-1 w-full">Instant Feedback</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Measures latency, jitter, and packet loss in real-time for immediate network insights
                  </p>
                </div>

                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Monitor className="w-5 h-5" />
                    <p className="font-medium border-b border-primary/10 pb-1 w-full">Browser-Based</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No installation required - works directly in your web browser with a clean interface
                  </p>
                </div>

                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <BarChart3 className="w-5 h-5" />
                    <p className="font-medium border-b border-primary/10 pb-1 w-full">Visual Analysis</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Intuitive graphs and indicators help identify connection issues at a glance
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="how-to-use" 
            className="p-4"
            role="region"
            aria-labelledby="how-to-use-heading"
          >
            <h2 
              id="how-to-use-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              How to Use
            </h2>
            <div className="text-sm space-y-6">
              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <p className="flex items-center gap-2 font-medium mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">1</span>
                    Start Test
                  </p>
                  <p className="text-muted-foreground text-xs">Click "Start Test" to begin monitoring your network</p>
                </div>
                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <p className="flex items-center gap-2 font-medium mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">2</span>
                    Watch Metrics
                  </p>
                  <p className="text-muted-foreground text-xs">Observe real-time metrics in the dashboard</p>
                </div>
                <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                  <p className="flex items-center gap-2 font-medium mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs">3</span>
                    Toggle Views
                  </p>
                  <p className="text-muted-foreground text-xs">Switch between different metrics visualizations</p>
                </div>
              </div>

              {/* Metrics Explanation */}
              <div>
                <h3 className="font-medium text-primary mb-3">Understanding Your Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                    <p className="flex items-center gap-2 font-medium text-primary border-b border-primary/10 pb-1 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs">L</span>
                      Latency
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">Measures network response time between your device and remote servers</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff1744]/80" />
                        <p className="text-xs">Critical: ≥2000ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff4081]/80" />
                        <p className="text-xs">Very High: ≥1000ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff9100]/80" />
                        <p className="text-xs">High: ≥500ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ffea00]/80" />
                        <p className="text-xs">Warning: ≥150ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00e676]/80" />
                        <p className="text-xs">Fair: ≥50ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00fff5]/80" />
                        <p className="text-xs">Optimal: &le;50ms</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                    <p className="flex items-center gap-2 font-medium text-primary border-b border-primary/10 pb-1 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs">J</span>
                      Jitter
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">Tracks variation between ping measurements to assess connection stability</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#d500f9]/80" />
                        <p className="text-xs">Critical: &ge;1600ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#651fff]/80" />
                        <p className="text-xs">Very High: &ge;800ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#3d5afe]/80" />
                        <p className="text-xs">High: &ge;400ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00b0ff]/80" />
                        <p className="text-xs">Warning: &ge;100ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#64ffda]/80" />
                        <p className="text-xs">Fair: &ge;30ms</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#18ffff]/80" />
                        <p className="text-xs">Optimal: &le;30ms</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-background/30 rounded-md border border-primary/20">
                    <p className="flex items-center gap-2 font-medium text-primary border-b border-primary/10 pb-1 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs">P</span>
                      Packet Loss
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">Estimates lost packets from failed requests to evaluate connection reliability</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff1744]/80" />
                        <p className="text-xs">Critical: 100%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff4081]/80" />
                        <p className="text-xs">Very High: ≥50%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff9100]/80" />
                        <p className="text-xs">High: ≥25%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ffea00]/80" />
                        <p className="text-xs">Warning: ≥1%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00fff5]/80" />
                        <p className="text-xs">Optimal: 0%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section 
              id="faq" 
              className="p-4 "
              role="region"
              aria-labelledby="faq-heading"
            >
              <h2 
                id="faq-heading" 
                className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                FAQ
              </h2>
              <div className="text-sm space-y-3 p-2">
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">How accurate are the measurements?</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Measurements are based on real network requests and provide a good indication of your connection quality, though they are subject to the limitations described in the Limitations section.
                  </p>
                </div>
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">Does it work offline?</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    No, an active internet connection is required for network measurements since the tool needs to send requests to remote servers.
                  </p>
                </div>
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">Can I export the data?</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Currently, data export is not supported but may be added in future updates. All measurements are displayed in real-time on the dashboard.
                  </p>
                </div>
              </div>
            </section>

            <section 
              id="privacy" 
              className="p-4"
              role="region"
              aria-labelledby="privacy-heading"
            >
              <h2 
                id="privacy-heading" 
                className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Privacy & Cookies
              </h2>
              <div className="text-sm space-y-3 p-2">
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">No Personal Data Collection</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    This application does not collect or store any personal information from its users.
                  </p>
                </div>
                
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">Local Storage Usage</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Only uses browser local storage for saving UI preferences and settings. No data is sent to external servers.
                  </p>
                </div>
                
                <div role="article" className="p-2 bg-background/30 rounded-md border border-primary/20">
                  <p className="font-medium text-primary border-b border-primary/10 pb-1">No Third-Party Tracking</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We don't use any analytics tools or tracking cookies. Your privacy is respected and maintained.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Limitations section */}
          <section 
            id="limitations" 
            className="p-4 "
            role="region"
            aria-labelledby="limitations-heading"
          >
            <h2 
              id="limitations-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Limitations
            </h2>
            <div className="text-sm space-y-4">
              <p className="text-muted-foreground">
                While we strive to provide accurate measurements, there are inherent limitations to browser-based network testing:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div role="article" className="space-y-3 p-3 bg-background/30 rounded-md border border-primary/20">
                  <h3 className="font-medium text-primary border-b border-primary/10 pb-1">Ping Measurement</h3>
                  <ul className="space-y-2" role="list">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Uses HEAD requests to remote endpoints which may be affected by server load and internet routing</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Relies on public services that could experience downtime</p>
                    </li>
                  </ul>
                </div>
                
                <div role="article" className="space-y-3 p-3 bg-background/30 rounded-md border border-primary/20">
                  <h3 className="font-medium text-primary border-b border-primary/10 pb-1">Ping Measurement</h3>
                  <ul className="space-y-2" role="list">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Uses HEAD requests to remote endpoints which may be affected by server load and internet routing</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Relies on public services that could experience downtime</p>
                    </li>
                  </ul>
                </div>
                

                <div role="article" className="space-y-3 p-3 bg-background/30 rounded-md border border-primary/20">
                  <h3 className="font-medium text-primary border-b border-primary/10 pb-1">Measurement Scope</h3>
                  <ul className="space-y-2" role="list">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Only tests against remote servers, not local network quality</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Cannot identify specific network issues like bottlenecks</p>
                    </li>
                  </ul>
                </div>
                
                <div role="article" className="space-y-3 p-3 bg-background/30 rounded-md border border-primary/20">
                  <h3 className="font-medium text-primary border-b border-primary/10 pb-1">Technical Constraints</h3>
                  <ul className="space-y-2" role="list">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Uses no-cors mode which limits detailed response metrics</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">Fixed 2-second measurement intervals may affect accuracy during network fluctuations</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Developer section */}
          <section 
            id="developer" 
            className="p-4"
            role="region"
            aria-labelledby="developer-heading"
          >
            <h2 
              id="developer-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Developer Info
            </h2>
            
            <div className="text-sm p-2 flex  ">
              <div className="p-3  ">
                <div className="space-y-4 text-left">
                  <p className="flex items-center gap-2 font-medium text-base ">
                    Created with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> by Deveduar
                  </p>
                  <div className="flex flex-col  gap-3">
                    <p className="text-muted-foreground">Connect with me:</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {socialLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded-md 
                                   bg-background/50 dark:bg-background/20 
                                   border border-primary/20 dark:border-primary/20
                                   hover:bg-primary/10 dark:hover:bg-primary/10
                                   transition-colors duration-200
                                   font-medium"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}