import Link from "next/link"

interface SocialLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}

export function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 p-0 flex items-center justify-center
               border-2 border-primary/20 dark:border-primary/30 rounded-md 
               bg-background/50 dark:bg-background/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300
               shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] 
               dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_0_rgba(255,255,255,0.2)]
               hover:translate-y-[1px] hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
               dark:hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_0_rgba(255,255,255,0.2)]
               active:translate-y-[2px] active:shadow-none"
      aria-label={label}
    >
      <div className="flex items-center justify-center w-full h-full">
        {icon}
      </div>
    </Link>
  )
}