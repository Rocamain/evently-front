import React, { ReactNode } from 'react'
import AuthWrapper from '@/ui/auth/AuthWrapper'

export default function LayoutBookEventPage({
  children,
}: {
  children: ReactNode
}) {
  return <AuthWrapper>{children}</AuthWrapper>
}
