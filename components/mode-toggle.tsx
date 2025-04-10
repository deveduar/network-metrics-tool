"use client"
import { Moon, Sun, Monitor  } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 p-0 border-2 border-primary/20 dark:border-primary/30 rounded-md 
                       bg-background/50 dark:bg-background/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300
                       shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] 
                       dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_0_rgba(255,255,255,0.2)]
                       hover:translate-y-[1px] hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
                       dark:hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_0_rgba(255,255,255,0.2)]
                       active:translate-y-[2px] active:shadow-none
                       relative overflow-hidden"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           dark:-rotate-90 dark:scale-0" />
            <Moon className="h-4 w-4 rotate-90 scale-0 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="min-w-[120px] font-mono"
          avoidCollisions={false}
          collisionPadding={20}
        >
          <DropdownMenuItem 
            onClick={() => setTheme("light")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sun className="h-4 w-4" />
            Light
          </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}