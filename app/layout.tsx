'use client'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import type { ReactNode } from 'react'
import Footer from '../components/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  )
}