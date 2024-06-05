import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/ui/Header/Header'

const inter = Inter({ subsets: ['latin'] })

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
  // const isMain = pathname === '/'

  return (
    <html lang="en">
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
    </html>
  )
}
