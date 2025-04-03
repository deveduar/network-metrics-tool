"use client"

import { cn } from "@/lib/utils"
import { SocialLink } from "@/components/social-link"
import { Github, Linkedin, Twitter, Globe } from "lucide-react"

export default function AboutPage() {
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
      href: "https://trae-portfolio.vercel.app/",
      label: "Portfolio"
    }
  ]

  return (
    <div className="container mx-auto px-4 max-w-5xl my-8">
      <div className="font-mono p-6 rounded-lg border-2 border-primary/20 dark:border-primary/30
                    bg-muted/40 dark:bg-muted/40 backdrop-blur-md
                    shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] 
                    dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_0_rgba(255,255,255,0.2)]">
        
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wider uppercase mb-2
                       px-4 py-2 rounded-md inline-block
                       border-2 border-primary/20 dark:border-primary/30
                       bg-background/50 dark:bg-background/10
                       shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                       dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            About Ping Test
          </h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <section className="p-4 rounded-md border-2 border-dashed border-primary/30">
            <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              What is this?
            </h2>
            <p className="text-sm leading-relaxed">
              Network Metrics is a real-time network monitoring tool that helps you understand your connection quality. 
              It measures latency, jitter, and packet loss in a retro-gaming inspired interface.
            </p>
          </section>

          <section className="p-4 rounded-md border-2 border-dashed border-primary/30">
            <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Features
            </h2>
            <ul className="text-sm space-y-2">
              {["Real-time monitoring", "Latency tracking", "Packet loss detection", "Jitter analysis", "Retro UI interface"].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-primary">►</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-4 rounded-md border-2 border-dashed border-primary/30">
            <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              How to Use
            </h2>
            <div className="text-sm space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-primary">1.</span>
                Click "Start Test" to begin monitoring
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">2.</span>
                Watch real-time metrics in the dashboard
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">3.</span>
                Toggle between different metrics views
              </p>
            </div>
          </section>

          <section className="p-4 rounded-md border-2 border-dashed border-primary/30 mt-6">
          <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            FAQ
          </h2>
          <div className="text-sm space-y-4">
            <div>
              <p className="font-bold text-primary">► How accurate are the measurements?</p>
              <p className="ml-4">Measurements are based on real network requests and provide a good indication of your connection quality.</p>
            </div>
            <div>
              <p className="font-bold text-primary">► Does it work offline?</p>
              <p className="ml-4">No, an active internet connection is required for network measurements.</p>
            </div>
            <div>
              <p className="font-bold text-primary">► Can I export the data?</p>
              <p className="ml-4">Currently, data export is not supported but may be added in future updates.</p>
            </div>
          </div>
        </section>

        <section className="p-4 rounded-md border-2 border-dashed border-primary/30 mt-6">
          <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Privacy & Cookies
          </h2>
          <div className="text-sm space-y-2">
            <p>This application:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-center gap-2">
                <span className="text-primary">►</span>
                Does not store any personal data
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">►</span>
                Uses local storage only for app preferences
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">►</span>
                No third-party tracking cookies
              </li>
            </ul>
          </div>
        </section>

        <section className="p-4 rounded-md border-2 border-dashed border-primary/30 mt-6">
          <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Developer Info
          </h2>
          <div className="text-sm">
            <p className="mb-4">Created with ♥ by Deveduar. Connect with me:</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </div>
        </section>
      {/* Mantener el botón Back existente */}
      <div className="text-center mt-8">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 text-sm font-bold tracking-wider uppercase
                     border-2 border-primary/20 dark:border-primary/30 rounded-md
                     bg-background/50 dark:bg-background/10
                     shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                     dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]
                     hover:translate-y-[1px] hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)]
                     active:translate-y-[2px] active:shadow-none
                     transition-all duration-300">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}