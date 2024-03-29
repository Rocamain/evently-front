'use client'
import { useFormState } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import {
  EnvelopeOpenIcon as MailIcon,
  KeyIcon as PasswordIcon,
} from '@heroicons/react/24/outline'
import SubmitButton from './SubmitButton'
import { useAuth } from '@/lib/context/AuthProvider'

import { SignInFormProps } from '@/lib/auth/types/types'

type FormLoginProps = SignInFormProps

export default function Form({ formAction, initialState }: FormLoginProps) {
  const [data, dispatch] = useFormState<any, FormData>(formAction, initialState)
  const { updateAuthState, authState } = useAuth()
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  useEffect(() => {
    if (formRef.current) {
      if (data.message === 'Login successful') {
        updateAuthState({ isAuthenticated: true, user: data.userInfo })
      } else {
        // updateUser(null)
      }
      formRef.current.reset()
    }
  }, [data])

  const handleChange = () => {
    if (data.message) {
      if (messageRef.current) messageRef.current.textContent = null
    }
  }

  return (
    <form
      ref={formRef}
      action={dispatch}
      className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
    >
      <div className="flex content-center">
        <label htmlFor="email" />
        <div>
          <MailIcon
            height="100%"
            width="38px"
            color="black"
            className="block mr-2"
            title="Email icon"
          />
        </div>
        <input
          ref={inputRef}
          autoComplete="off"
          id="email"
          name="email"
          type="text"
          className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4 rounded-lg border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 placeholder:text-gray-500"
          placeholder="Email address"
          onChange={handleChange}
        />
      </div>
      <div className="flex content-center">
        <label htmlFor="password" />
        <div>
          <PasswordIcon
            height="100%"
            width="38px"
            color="black"
            className="block mr-2"
            title="Password icon"
          />
        </div>
        <input
          autoComplete="off"
          id="password"
          name="password"
          type="password"
          className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4 rounded-lg border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 placeholder:text-gray-500"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div>
        <p ref={messageRef}>{data.message}</p>
      </div>
      <div className="pt-6">
        <div>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
