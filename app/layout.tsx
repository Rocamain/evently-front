import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import AuthProvider from '@/lib/context/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evently Next',
  description: 'Create and Join to events',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  // const isMain = pathname === '/'

  return (
    <html lang="en">
      <AuthProvider>
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
      </AuthProvider>
    </html>
  )
}
