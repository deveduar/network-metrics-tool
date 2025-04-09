"use client"

import Link from "next/link"
import { SocialLink } from "@/components/social-link"
import { Github, Linkedin, Twitter, Globe, Heart } from "lucide-react"

export function RetroFooter() {
  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/deveduar",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/deveduar",
      label: "LinkedIn"
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      href: "https://twitter.com/deveduar",
      label: "Twitter"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      href: "https://trae-portfolio.vercel.app/",
      label: "Portfolio"
    }
  ]

  return (
    <footer className="mt-12 mb-6">
      <div className="container">
        <div className="bg-muted/30 dark:bg-muted/20 backdrop-blur-sm rounded-lg border-t-2 border-primary/10 dark:border-primary/20 p-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright and Credits */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono">© {new Date().getFullYear()}</span>
              <Link 
                href="/"
                className="font-mono tracking-wide flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00fff5]/40 dark:bg-[#00fff5]/60 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#64ffda]/40 dark:bg-[#64ffda]/60 animate-pulse delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e676]/40 dark:bg-[#00e676]/60 animate-pulse delay-150" />
                </div>
                <span>Ping Test</span>
              </Link>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-400 animate-pulse" /> by Deveduar
              </span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-3">
              <Link 
                href="/about"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <span className="text-primary/30">|</span>
              <Link 
                href="#"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
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
        </div>
      </div>
    </footer>
  )
}