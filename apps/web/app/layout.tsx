import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Providers } from "@/lib/providers"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "ARIA — AI Voice Receptionist",
  description: "Your business never sleeps. Neither does ARIA.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard/onboarding"
    >
      <html lang="en" className={`h-full antialiased ${jakarta.variable}`}>
        <body className="min-h-full flex flex-col font-(family-name:--font-jakarta)">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
