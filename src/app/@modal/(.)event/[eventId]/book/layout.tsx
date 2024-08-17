import React, { ReactNode } from 'react'
import Image from 'next/image'
import { getBooking } from '@/lib/booking/action'

export default async function LayoutBookEventModal({
  children,
  params: { eventId },
}: {
  children: ReactNode
  params: { eventId: string }
}) {
  const booking = await getBooking({ eventId })

  return (
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
      <div>
        {/* {booking?.bookingId ? <h2>Event already booked</h2> : children} */}
        {children}
      </div>
    </div>
  )
}
