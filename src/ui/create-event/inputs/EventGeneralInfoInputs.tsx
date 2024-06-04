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
      <EventTitleInput error={validationErrors?.EventTitle} />
      <EventLinkInput error={validationErrors?.EventLink} />
      <EventLocationInput error={validationErrors?.EventLocation} />
      <EventCategoryInput error={validationErrors?.EventCategory} />
      <div className="flex gap-8 ml-6 mb-6">
        <EventPriceInput error={validationErrors?.EventPrice} />
        <EventDateTimeInput
          error={validationErrors?.EventTime || validationErrors?.EventDate}
        />
      </div>
    </div>
  )
}
