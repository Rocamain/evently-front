import React, { ReactNode } from 'react'
import AuthWrapper from '@/ui/auth/AuthWrapper'
import Image from 'next/image'
import { getBooking } from '@/lib/booking/action'

export default async function LayoutBookEventPage({
  children,
  params: { eventId },
}: {
  children: ReactNode
  params: { eventId: string }
}) {
  const booking = await getBooking({ eventId })

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image
            src="/images/Logo.png"
            alt="Evently logo"
            width={150}
            height={70}
            priority={true}
          />
        </div>
        <div className="p-6">{children}</div>
      </div>
    </AuthWrapper>
  )
}
