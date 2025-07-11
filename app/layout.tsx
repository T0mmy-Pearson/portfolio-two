'use client'

import './globals.css'
import type { ReactNode } from 'react'
import Footer from '../components/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}