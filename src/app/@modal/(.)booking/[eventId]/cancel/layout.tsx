import React, { ReactNode } from 'react'
import Image from 'next/image'

export default function LayoutCancelEventModal({
  children,
}: {
  children: ReactNode
}) {
  return (
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
  )
}
