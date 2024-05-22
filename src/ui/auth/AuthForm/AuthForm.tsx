'use client'
import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import {
  EnvelopeOpenIcon as MailIcon,
  KeyIcon as PasswordIcon,
} from '@heroicons/react/24/outline'
import SubmitButton from '@/ui/buttons/SubmitButton/SubmitButton'
import { AuthAction } from '@/types/auth/auth'

export default function AuthForm({ action }: { action: AuthAction }) {
  const [state, dispatch] = useFormState(action, undefined)
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
      if (state?.message === 'Login successful') {
        formRef.current.reset()
      }
    }
  }, [state])

  const handleChange = () => {
    if (state?.errors) {
      if (messageRef.current) messageRef.current.textContent = null
      state.errors.email = undefined
      state.errors.password = undefined
    }
    if (state?.message) {
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
        <label htmlFor="email" className="flex content-center mr-2">
          <MailIcon
            height="100%"
            width="38px"
            color={state?.errors?.email?.[0] ? 'red' : 'black'}
            className="block"
            title="Email icon"
          />
        </label>
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
        <label htmlFor="password" className="flex content-center mr-2">
          <PasswordIcon
            height="100%"
            width="38px"
            color={state?.errors?.password?.[0] ? 'red' : 'black'}
            className="block"
            title="Password icon"
          />
        </label>
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
        <p ref={messageRef} className="h-[28px] ml-[46px] text-red-500">
          {state?.errors?.email?.[0] ||
            state?.errors?.password?.[0] ||
            state?.message}
        </p>
      </div>
      <div className="absolute bottom-4">
        <div>
          <SubmitButton color="red" variant="contained">
            Submit
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}
