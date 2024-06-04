'use client'
import React, { useState } from 'react'
import {
  CheckCircleIcon,
  IdentificationIcon,
  PencilIcon,
  PhotoIcon,
  EyeIcon,
} from '@heroicons/react/16/solid'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import EventGeneralInfoInputs from './inputs/EventGeneralInfoInputs'
import EventDescriptionInput from './inputs/eventDescrisption/EventDescriptionInput'
import StepButtons from '@/ui/create-event/buttons/StepButtons'
import { CreateEventAction } from '@/lib/create-event/actions'
import { useFormState } from 'react-dom'
import { ValidationErrors } from '@/types/event/event'
import { CreateEventState } from '@/types/event/event'

const steps = [
  {
    label: '1',
    title: 'Do you want to create an event?',
    content: ({ errors }: { errors?: ValidationErrors }) =>
      'You are about to create an event. Once created, it will be displayed on the website.',
    icon: <IdentificationIcon className="w-16 h-16 text-red-400 bg-white" />,
  },
  {
    label: '2',
    title: 'General Info',
    content: ({ errors }: { errors?: ValidationErrors }) => (
      <EventGeneralInfoInputs validationErrors={errors} />
    ),
    icon: <InformationCircleIcon className="w-16 h-16 text-red-400" />,
  },
  {
    label: '3',
    title: 'Event Description',
    icon: <PencilIcon className="w-16 h-16 text-red-400" />,
    textEditor: true,
  },
  {
    label: '4',
    title: 'Add Pictures',
    content: ({ errors }: { errors?: ValidationErrors }) => (
      <>
        <label htmlFor="EventPictures" className="sr-only">
          Upload some event pictures
        </label>
        <input
          name="EventPictures"
          type="file"
          accept="image/*"
          multiple
          className="w-full p-2 border border-gray-300 rounded"
        />
      </>
    ),
    icon: <PhotoIcon className="w-16 h-16 text-red-400" />,
  },
  {
    label: '5',
    title: 'Confirmation',
    content: ({ errors }: { errors?: ValidationErrors }) =>
      'Preview your event before publishing.',
    icon: <EyeIcon className="w-18 h-18 text-red-400" />,
  },
]

export default function CreateEventForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [state, dispatch] = useFormState<CreateEventState, FormData>(
    CreateEventAction,
    undefined,
  )

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  return (
    <form className="max-w-3xl px-8 mx-auto pt-10" action={dispatch}>
      <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {steps.map((step, index) => (
          <li key={index} className="mb-10 ml-6">
            <div>
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${currentStep > index ? 'white' : 'white'} rounded-full -left-4 ring-4 ring-white`}
              >
                {currentStep > index ? (
                  <CheckCircleIcon className="w-16 h-16 text-teal-500" />
                ) : (
                  step.icon
                )}
              </span>
              <div className="pt-[4px] mb-4 flex items-center font-bold text-lg leading-tight">
                <h6 className="text-red-500">{step.label}. </h6>
                <h6 className="text-grey-500 ml-[5px]"> {step.title}</h6>
              </div>
            </div>
            <div
              className={`mt-2 transition-all duration-500 ease-in-out transform ${
                currentStep === index
                  ? 'opacity-100 max-h-screen'
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              <div className="mb-4">
                {step.textEditor ? (
                  <EventDescriptionInput
                    isFirstStep={currentStep === 0}
                    isLastStep={currentStep === steps.length - 1}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                ) : (
                  step.content && step.content({ errors: state?.errors })
                )}
              </div>
              {!step.textEditor && (
                <StepButtons
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === steps.length - 1}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </form>
  )
}
