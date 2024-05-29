'use client'
import React, { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { IdentificationIcon } from '@heroicons/react/16/solid'
import { NewspaperIcon } from '@heroicons/react/16/solid'
import { PencilIcon } from '@heroicons/react/16/solid'
import { MapPinIcon } from '@heroicons/react/16/solid'
import { PhotoIcon } from '@heroicons/react/16/solid'
import { EyeIcon } from '@heroicons/react/16/solid'
import TextEditor from '@/ui/create-event/TextEditor'
import TitleAndCategoryInputs from '@/ui/create-event/TitleAndCategoryInputs'
import StepButtons from '@/ui/create-event/StepButtons'
const steps = [
  {
    label: '1',
    title: 'Initiate Event Creation',
    content:
      'You are about to create an event. Once created, it will be displayed on the website.',
    icon: <IdentificationIcon className="w-16 h-16" />,
  },
  {
    label: '2',
    title: 'Title and Category',
    content: <TitleAndCategoryInputs />,
    icon: <NewspaperIcon className="w-16 h-16" />,
  },
  {
    label: '3',
    title: 'Location',
    content: (
      <div>
        <label htmlFor="Location" className="ml-6 pb-4 font-medium">
          Location
        </label>
        <input
          className="mt-2 ms-6 w-full p-2 border border-gray-300 rounded mb-2"
          type="text"
          placeholder="city, place or postcode..."
          name="Location"
        />
      </div>
    ),
    icon: <MapPinIcon className="w-16 h-16" />,
  },
  {
    label: '4',
    title: 'Add Pictures',
    icon: <PencilIcon className="w-16 h-16" />,
    textEditor: true,
  },
  {
    label: '5',
    title: 'Add Pictures',
    content: (
      <input
        type="file"
        accept="image/*"
        multiple
        className="w-full p-2 border border-gray-300 rounded"
      />
    ),
    icon: <PhotoIcon className="w-16 h-16" />,
  },
  {
    label: '5',
    title: 'Confirmation',
    content: 'Preview your event before publishing.',
    icon: <EyeIcon className="w-16 h-16" />,
  },
]

const EventStepper = () => {
  const [currentStep, setCurrentStep] = useState(0)

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
    <div className="max-w-3xl px-8 mx-auto pt-10">
      <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`mb-10 ml-6 ${currentStep === index ? 'transition duration-500 ease-in-out' : ''}`}
          >
            <div>
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${currentStep > index ? 'bg-green-200 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'} rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}
              >
                {currentStep > index ? (
                  <CheckCircleIcon className="w-16 h-16 text-green-500 dark:text-green-400" />
                ) : (
                  step.icon
                )}
              </span>
              <div className="pt-2 flex items-center font-medium leading-tight">
                <h6 className="text-teal-500 "> {step.label}</h6>
                <h6 className="text-grey-500 ">. {step.title}</h6>
              </div>
            </div>
            {currentStep === index && (
              <div className="mt-2 transition-all duration-500 ease-in-out transform opacity-100 max-h-screen">
                <div className="mb-4">
                  {step.textEditor ? (
                    <TextEditor
                      isFirstStep={currentStep === 0}
                      isLastStep={currentStep === steps.length - 1}
                      handleBack={handleBack}
                      handleNext={handleNext}
                    />
                  ) : (
                    step.content
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
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function CreateEventPage() {
  return <EventStepper />
}
