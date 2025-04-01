import { ThemeProvider } from "@/components/theme-provider"
import { RetroNavBar } from "@/components/retro-nav-bar"
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RetroNavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}