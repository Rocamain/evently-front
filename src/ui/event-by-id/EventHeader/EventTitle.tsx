import React from 'react'
import { EventInput } from '../EventInput/EventInput'

interface EventTitleProps {
  eventTitle: string
}

export const EventTitle: React.FC<EventTitleProps> = ({ eventTitle }) => {
  const className = 'p-2 text-2xl xl:text-3xl font-bold'
  return (
    <div className="flex gap-5">
      <h3 className={className}>{eventTitle}</h3>
    </div>
  )
}
