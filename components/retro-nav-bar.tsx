"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter, Globe, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

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
    <nav className="my-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-muted/40 dark:bg-muted/40 backdrop-blur-md rounded-lg border-2 border-primary/20 dark:border-primary/30 p-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link 
              href="/"
              className="font-mono text-xl font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ping Test
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 px-3 font-bold tracking-wider uppercase flex items-center gap-1"
                  >
                    Tools <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link href="/about">About</Link>
                  </DropdownMenuItem>
                  {/* Add more tools here */}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Social Links */}
              <div className="flex items-center gap-1 pl-2 border-l-2 border-primary/20">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 flex items-center justify-center
                             hover:bg-primary/10 rounded-md transition-all duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
                <div className="pl-1 border-l border-primary/20">
                  <ModeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <Button
                className="h-10 w-10 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden transition-all duration-300 overflow-hidden",
            isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          )}>
            <div className="grid gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    Tools <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem>
                    <Link href="/about" className="w-full">About</Link>
                  </DropdownMenuItem>
                  {/* Add more tools here */}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="grid grid-cols-4 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2
                             hover:bg-primary/10 rounded-md transition-all duration-300"
                  >
                    {link.icon}
                    <span className="text-xs mt-1">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}