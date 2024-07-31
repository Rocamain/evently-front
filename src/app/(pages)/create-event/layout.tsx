import React, { ReactNode } from 'react'
import { verifySession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Evently Create Event',
  description: 'Create your event in Evently',
}
export default async function LayoutCreateEventPage({
  children,
}: {
  children: ReactNode
}) {
  const isUser = await verifySession()
  if (!isUser) {
    redirect('/')
  }
  return <div>{children}</div>
}
