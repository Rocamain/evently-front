import EventTitleInput from './EventTitleInput'
import EventLinkInput from './EventLinkInput'
import EventLocationInput from './EventLocationInput'
import EventCategoryInput from './EventCategoryInput'
import EventDateTimeInput from './EventDateTimeInput'
import EventPriceInput from './EventPriceInput'
import { ValidationErrors } from '@/types/event/event'
export default function EventGeneralInfoInputs({
  validationErrors,
}: {
  validationErrors?: ValidationErrors
}) {
  return (
    <div>
      <EventTitleInput error={validationErrors?.eventTitle} />
      <EventLinkInput error={validationErrors?.eventLink} />
      <EventLocationInput
        error={
          validationErrors?.eventLocationId ||
          validationErrors?.eventLocationAddress ||
          validationErrors?.eventLocationLat ||
          validationErrors?.eventLocationLng
        }
      />
      <EventCategoryInput error={validationErrors?.eventCategory} />
      <div className="flex flex-wrap gap-8 ml-6 mb-6">
        <EventPriceInput error={validationErrors?.eventPrice} />
        <EventDateTimeInput
          error={validationErrors?.eventTime || validationErrors?.eventDate}
        />
      </div>
    </div>
  )
}
