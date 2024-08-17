import React, { ReactNode } from 'react'
import Image from 'next/image'
import AuthWrapper from '@/ui/auth/AuthWrapper'

export default function LayoutCancelEventPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <Image
            src="/images/Logo.png"
            alt="Evently logo"
            width={150}
            height={70}
            priority={true}
          />
        </div>
        {children}
      </div>
    </AuthWrapper>
  )
}
