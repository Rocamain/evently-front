export interface EventAddressInfo {
  info: string
  types: string[]
}

interface EventLocation {
  eventLocationId: string
  eventLocationAddress: string
  eventLocationLat: number
  eventLocationLng: number
}

export interface ValidationErrors {
  eventTitle?: string[] | undefined
  eventLink?: string[] | undefined
  eventLocation?: string[] | undefined
  eventLocationId?: string[] | undefined
  eventLocationAddress?: string[] | undefined
  eventLocationLng?: string[] | undefined
  eventLocationLat?: string[] | undefined
  eventGeoHash?: string[] | undefined
  eventCategory?: string[] | undefined
  eventPrice?: string[] | undefined
  eventTime?: string[] | undefined
  eventDate?: string[] | undefined
  eventDescription?: string[] | undefined
  eventPictures?: string[] | undefined
  serverError?: string | undefined
}

interface Event {
  error?: { name: string; message: string }

  data: {
    createdAt: string
    type: string
    eventOwnerId: string
    eventOwnerName: string
    eventOwnerEmail: string
    eventOwnerPicture: string
    eventTitle: string
    eventDescription: string
    eventCategory: string
    eventLocationId: string
    eventLocationAddress: string
    eventLocationLat: string
    eventLocationLng: string
    eventGeoHash: string
    eventDateAndTime: string
    eventPrice: number
    eventLink: string
    eventPictures: string[]
    userId: string
    eventId: string
    error?: { name: string; message: string }
  }
}

interface Evento {
  createdAt: string
  type: string
  eventOwnerId: string
  eventOwnerName: string
  eventOwnerEmail: string
  eventOwnerPicture: string
  eventTitle: string
  eventDescription: string
  eventCategory: string
  eventLocationId: string
  eventLocationAddress: string
  eventLocationLat: string
  eventLocationLng: string
  eventGeoHash: string
  eventDateAndTime: string
  eventPrice: number
  eventLink: string
  eventPictures: string[]
  userId: string
  eventId: string
}
interface Booking {
  createdAt: string
  type: string
  userId: string
  userName: string
  userEmail: string
  userPicture: string
  eventId: string
  eventDateAndTime: string
  eventOwnerName: string
  eventOwnerId: string
  eventTitle: string
  eventCategory: string
  bookingId: string
}

interface EventWithBookings {
  event: Evento
  bookings: Booking[]
}

type Events = EventWithBookings[]

interface EventByID {
  data: { items: Array<Evento | Booking | Attendee>; count: number }
}
export type CreateEventState =
  | {
      errors: ValidationErrors
      message?: undefined
      eventId?: undefined
    }
  | {
      errors?: undefined
      message: string
      eventId?: string
    }
  | undefined
export interface Attendee {
  bookingId?: string
  userId: string
  userName: string
  userEmail: string
  userPicture: string
  isHost?: boolean
}
