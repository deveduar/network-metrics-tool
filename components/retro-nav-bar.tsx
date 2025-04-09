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
import { SocialLink } from "@/components/social-link"
import { HelpCircle } from "lucide-react" 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { usePathname } from "next/navigation"

export function RetroNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

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
    <nav className="my-6">
      <div className="container">
        <div className="bg-muted/40 dark:bg-muted/40 backdrop-blur-md rounded-lg border-b-2 border-primary/10 dark:border-primary/20 p-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <Link 
              href="/"
              className="font-mono text-xl font-bold tracking-wider uppercase flex items-center gap-2
                         px-4 py-1 rounded-md relative group
                         border-2 border-primary/20 dark:border-primary/30
                         bg-background/50 dark:bg-background/10
                         shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                         dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]
                         hover:translate-y-[1px]
                         hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                         dark:hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]
                         active:translate-y-[2px] active:shadow-none
                         transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#00fff5]/60 dark:bg-[#00fff5]/80 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[#64ffda]/60 dark:bg-[#64ffda]/80 animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-[#00e676]/60 dark:bg-[#00e676]/80 animate-pulse delay-150" />
                </div>
                <span>
                  Ping Test
                </span>
              </div>
            </Link>
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 px-3 font-bold tracking-wider uppercase flex items-center gap-1
                              opacity-50 cursor-not-allowed"
                  >
                    Tools <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="text-muted-foreground italic">
                    Coming Soon...
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
 

            {/* About Button */}
            <Link 
                href="#about"
                className={cn(
                  "h-8 px-4 font-bold tracking-wider uppercase flex items-center gap-2",
                  "rounded-md relative group transition-all duration-300",
                  "border-2",
                  pathname === "/about"
                    ? [
                        "border-blue-400/50 dark:border-blue-300/30",
                        "bg-blue-50/80 dark:bg-blue-900/20",
                        "translate-y-[2px]",
                        "shadow-none",
                        "text-blue-700 dark:text-blue-300",
                        "hover:border-zinc-400/30 dark:hover:border-zinc-300/20",
                        "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10",
                        "hover:text-zinc-600 dark:hover:text-zinc-400",
                        "hover:translate-y-[2px]",
                        "hover:shadow-none",
                      ]
                    : 
                     [
                        "border-zinc-400/30 dark:border-zinc-300/20",
                        "bg-zinc-50/50 dark:bg-zinc-900/10",
                        "shadow-[inset_0_-2px_0_rgba(161,161,170,0.3),0_2px_0_rgba(161,161,170,0.3)]",
                        "dark:shadow-[inset_0_-2px_0_rgba(161,161,170,0.2),0_2px_0_rgba(161,161,170,0.2)]",
                        "hover:translate-y-[1px]",
                        "hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.3),0_1px_0_rgba(161,161,170,0.3)]",
                        "dark:hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.2),0_1px_0_rgba(161,161,170,0.2)]",
                        "active:translate-y-[2px] active:shadow-none",
                        "text-zinc-600 dark:text-zinc-400",
                      ]
                )}
              >
                <HelpCircle className="w-4 h-4" />
                About
              </Link>

             {/* Social Links */}
             <div className="flex items-center gap-2 pl-2 border-l-2 border-primary/20">
             {socialLinks.map((link) => (
                    <SocialLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      icon={link.icon}
                    />

                ))}
                  <div className="pl-2 border-l-2 border-primary/20 flex items-center ">
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

              {/* Tools Section with Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="tools" className="border-none ">
                <AccordionTrigger className="border-none w-full ">
                <div className="h-8 w-full font-bold tracking-wider uppercase flex items-center gap-2 px-4
                              rounded-md relative
                              border-2 border-primary/20 dark:border-primary/30
                              bg-muted/50
                              opacity-50 ">
                    Tools
                  </div>
                </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-muted-foreground italic pl-4 mt-2">
                      Coming Soon...
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Link 
                href="#about"
                className="h-8 px-4 font-bold tracking-wider uppercase flex items-center gap-2
                         rounded-md relative group
                         border-2 border-blue-400/50 dark:border-blue-300/30
                         bg-blue-50/80 dark:bg-blue-900/20
                         shadow-[inset_0_-2px_0_rgba(59,130,246,0.5),0_2px_0_rgba(59,130,246,0.5)] 
                         dark:shadow-[inset_0_-2px_0_rgba(59,130,246,0.3),0_2px_0_rgba(59,130,246,0.3)]
                         hover:translate-y-[1px]
                         hover:shadow-[inset_0_-1px_0_rgba(59,130,246,0.5),0_1px_0_rgba(59,130,246,0.5)]
                         dark:hover:shadow-[inset_0_-1px_0_rgba(59,130,246,0.3),0_1px_0_rgba(59,130,246,0.3)]
                         active:translate-y-[2px] active:shadow-none
                         text-blue-700 dark:text-blue-300
                         transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="w-4 h-4" />
                About
              </Link>
              {/* Social Links Grid */}
              <div className="flex justify-end gap-2 pt-4 mt-2 border-t-2 border-primary/20">
                {socialLinks.map((link) => (
                  <div key={link.label} className="flex flex-col items-center gap-1">
                    <SocialLink
                      href={link.href}
                      label={link.label}
                      icon={link.icon}
                    />
                    {/* <span className="text-xs font-bold">{link.label}</span> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}