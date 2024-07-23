import React from 'react'
import { EventInput } from '../EventInput/EventInput'

interface EventTitleProps {
  eventTitle: string
  isOwner: boolean
}

export const EventTitle: React.FC<EventTitleProps> = ({
  eventTitle,
  isOwner,
}) => {
  const className = 'p-2 text-2xl xl:text-3xl font-bold'
  return (
    <div className="flex gap-5">
      {
        // If the user is the owner of the event, render an EventInput component that allows editing the EventTitle
        isOwner ? (
          <EventInput
            className={
              className +
              ' rounded-lg p-2 w-inherit overflow-hidden focus:outline-none focus:ring focus:border-blue-400 focus:rounded-lg'
            }
            name="eventTitle"
            type="text"
            pattern="^(.{8,40})$"
            data={eventTitle}
          />
        ) : (
          // If the user is not the owner, display the EventTitle as plain text
          <h3 className={className}>{eventTitle}</h3>
        )
      }
    </div>
  )
}
