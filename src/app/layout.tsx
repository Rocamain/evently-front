import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/ui/Header/Header'
import Script from 'next/script'
import { GoogleMapsProvider } from './hooks/GoogleMapsContext'

const inter = Inter({
  subsets: ['latin'],
  preload: true,
})
export const metadata: Metadata = {
  title: 'Evently',
  description: 'Create and Join to events',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>

      <GoogleMapsProvider>
        <body className={inter.className + ' overscroll-none'}>
          <Header />
          <main id={'background-blob'} className="min-h-full">
            {children}
            {modal}
          </main>
          <footer
            style={{
              height: '25vh',
              backgroundColor: 'black',
              color: 'white',
            }}
          ></footer>
        </body>
      </GoogleMapsProvider>
    </html>
  )
}
