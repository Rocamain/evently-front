import React, { ReactNode } from 'react'
import AuthWrapper from '@/ui/auth/AuthWrapper'

export const metadata = {
  title: 'Evently SignIn',
  description: 'Evently signIn to your account',
}
export default function LayoutSignInPage({
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
