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
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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