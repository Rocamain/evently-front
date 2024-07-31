import React, { ReactNode } from 'react'
import AuthWrapper from '@/ui/auth/AuthWrapper'
export const metadata = {
  title: 'Evently Regsiter',
  description: 'Evently Register to your account',
}
export default function LayoutRegisterPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="my-10">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  )
}
