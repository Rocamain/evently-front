'use client'
import React, { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { IdentificationIcon } from '@heroicons/react/16/solid'
import { PencilIcon } from '@heroicons/react/16/solid'
import { PhotoIcon } from '@heroicons/react/16/solid'
import { EyeIcon } from '@heroicons/react/16/solid'
import TextEditor from '@/ui/create-event/TextEditor'

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
    title: 'Create Event Header',
    content: (
      <div>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-2"
          type="text"
          placeholder="Event Title"
        />
        <br />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Location"
        />
      </div>
    ),
    icon: <PencilIcon className="w-16 h-16" />,
  },
  {
    label: '3',
    title: 'Add Event Description',
    icon: <PencilIcon className="w-16 h-16" />,
    textEditor: true,
  },
  {
    label: '4',
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

const Buttons = ({
  currentStep,
  handleBack,
  handleNext,
}: {
  currentStep: number
  handleBack: () => void
  handleNext: () => void
}) => (
  <div className="flex justify-between">
    <button
      onClick={handleBack}
      disabled={currentStep === 0}
      className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      Back
    </button>
    <button
      onClick={handleNext}
      disabled={currentStep === steps.length - 1}
      className={`px-4 py-2 rounded ${currentStep === steps.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      Continue
    </button>
  </div>
)

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
              <h3 className="pt-2 flex items-center font-medium leading-tight">
                {step.label}. {step.title}
              </h3>
            </div>
            {currentStep === index && (
              <div className="mt-2 transition-all duration-500 ease-in-out transform opacity-100 max-h-screen">
                <div className="mb-4">
                  {step.textEditor ? (
                    <TextEditor
                      Buttons={
                        <Buttons
                          currentStep={currentStep}
                          handleBack={handleBack}
                          handleNext={handleNext}
                        />
                      }
                    />
                  ) : (
                    step.content
                  )}
                </div>
                {!step.textEditor && (
                  <Buttons
                    currentStep={currentStep}
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
