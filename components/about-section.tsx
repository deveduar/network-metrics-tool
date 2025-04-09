"use client"

import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Globe, Heart } from "lucide-react"
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
      <div className="font-mono p-6 rounded-lg 
                    bg-muted/30 dark:bg-muted/20 
                    shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] 
                    dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_0_rgba(255,255,255,0.2)]">
        
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
        <div className="space-y-8 max-w-6xl mx-auto">
          <section 
            id="what-is-this" 
            className="p-4 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30"
            role="region"
            aria-labelledby="what-is-this-heading"
          >
            <h2 
              id="what-is-this-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              What is this?
            </h2>
            <p className="text-sm leading-relaxed">
              Network Metrics is a real-time network monitoring tool that helps you understand your connection quality. 
              It measures latency, jitter, and packet loss in a retro-gaming inspired interface.
            </p>
          </section>

          <section 
            id="features" 
            className="p-4 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30"
            role="region"
            aria-labelledby="features-heading"
          >
            <h2 
              id="features-heading" 
              className="text-xl font-bold uppercase mb-3 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Features
            </h2>
            <ul className="text-sm space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2" role="list">
              {["Real-time monitoring", "Latency tracking", "Packet loss detection", "Jitter analysis", "Retro UI interface"].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-primary" aria-hidden="true">►</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section 
            id="how-to-use" 
            className="p-4 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30"
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
            <div className="text-sm space-y-3">
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
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section 
              id="faq" 
              className="p-4 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30"
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
              <div className="text-sm space-y-4">
                <div role="article">
                  <p className="font-bold text-primary" aria-hidden="true">► How accurate are the measurements?</p>
                  <p className="ml-4">Measurements are based on real network requests and provide a good indication of your connection quality.</p>
                </div>
                <div role="article">
                  <p className="font-bold text-primary" aria-hidden="true">► Does it work offline?</p>
                  <p className="ml-4">No, an active internet connection is required for network measurements.</p>
                </div>
                <div role="article">
                  <p className="font-bold text-primary" aria-hidden="true">► Can I export the data?</p>
                  <p className="ml-4">Currently, data export is not supported but may be added in future updates.</p>
                </div>
              </div>
            </section>

            <section 
              id="privacy" 
              className="p-4 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30"
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
              <div className="text-sm space-y-2">
                <p>This application:</p>
                <ul className="space-y-1 ml-4" role="list">
                  <li className="flex items-center gap-2">
                    <span className="text-primary" aria-hidden="true">►</span>
                    Does not store any personal data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary" aria-hidden="true">►</span>
                    Uses local storage only for app preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary" aria-hidden="true">►</span>
                    No third-party tracking cookies
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Developer section */}
          <section 
            id="developer" 
            className="p-6 bg-accent dark:bg-muted/40 rounded-md shadow-sm border border-primary/30 relative overflow-hidden"
            role="region"
            aria-labelledby="developer-heading"
          >
            <h2 
              id="developer-heading" 
              className="text-xl font-bold uppercase mb-4 flex items-center gap-2 border-b border-primary/20 pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Developer Info
            </h2>
            
            <div className="text-sm relative z-10">
              <div className="space-y-4 max-w-2xl">
                <p className="flex items-center gap-2 font-medium text-base">
                  Created with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> by Deveduar
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="text-muted-foreground whitespace-nowrap">Connect with me:</p>
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
          </section>
        </div>
      </div>
    </div>
  )
}