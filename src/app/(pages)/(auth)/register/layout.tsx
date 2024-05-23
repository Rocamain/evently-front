import React, { ReactNode } from 'react'
export const metadata = {
  title: 'Evently Regsiter',
  description: 'Evently Register to your account',
}
export default function LayoutRegisterPage({
  children,
}: {
  children: ReactNode
}) {
  return <div className="my-10">{children}</div>
}
