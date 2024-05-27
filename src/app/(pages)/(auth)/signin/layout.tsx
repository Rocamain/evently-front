import React, { ReactNode } from 'react'
export const metadata = {
  title: 'Evently SignIn',
  description: 'Evently signIn to your account',
}
export default function LayoutSignInPage({
  children,
}: {
  children: ReactNode
}) {
  return <div className="my-10">{children}</div>
}
