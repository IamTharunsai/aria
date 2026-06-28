import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Providers } from "@/lib/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "ARIA — AI Voice Receptionist",
  description: "Your business never sleeps. Neither does ARIA.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
