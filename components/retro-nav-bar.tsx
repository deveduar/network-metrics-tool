"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Globe } from "lucide-react"

export function RetroNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/TraeAng",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/trae-angular/",
      label: "LinkedIn"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/TraeAng",
      label: "Twitter"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      href: "https://trae-portfolio.vercel.app/",
      label: "Portfolio"
    }
  ]

  return (
    <nav className="border-b-4 border-primary/30 bg-background/50 backdrop-blur-sm mb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            href="/"
            className="font-mono text-lg font-bold tracking-wider uppercase hover:text-primary transition-colors"
          >
            Network Metrics
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/about"
              className="h-10 px-4 flex items-center justify-center font-bold tracking-wide uppercase border-2 border-primary/30 rounded-md 
                       hover:bg-primary/10 transition-colors"
            >
              About
            </Link>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center border-2 border-primary/30 rounded-md 
                           hover:bg-primary/10 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden h-10 w-10 p-2 border-2 border-primary/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="outline"
          >
            <span className={cn(
              "block w-5 h-0.5 bg-primary transition-all duration-300",
              isMenuOpen && "rotate-45 translate-y-1"
            )}></span>
            <span className={cn(
              "block w-5 h-0.5 bg-primary mt-1 transition-all duration-300",
              isMenuOpen && "-rotate-45 -translate-y-0.5"
            )}></span>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
        )}>
          <Link 
            href="/about"
            className="block py-2 px-4 font-bold tracking-wide uppercase border-2 border-primary/30 rounded-md mb-2
                     hover:bg-primary/10 transition-colors"
          >
            About
          </Link>

          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex flex-col items-center justify-center border-2 border-primary/30 rounded-md
                         hover:bg-primary/10 transition-colors"
              >
                {link.icon}
                <span className="text-xs mt-1">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}