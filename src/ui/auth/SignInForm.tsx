'use client'
import FormHeader from '@/ui/auth/AuthForm/FormHeader'
import AuthWrapper from '@/ui/auth/AuthWrapper'
import { signin } from '@/lib/auth/action'
import { useAuthForm } from '@/app/hooks/useAuthForm'
import {
  EnvelopeOpenIcon as MailIcon,
  KeyIcon as PasswordIcon,
} from '@heroicons/react/24/outline'
import SubmitButton from '@/ui/buttons/SubmitButton/SubmitButton'

export default function SignInForm() {
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

  const { state, dispatch, formRef, inputRef, messageRef } = useAuthForm({
    action: signin,
  })

  return (
    <AuthWrapper>
      <FormHeader title="Login to your account" withPicture />
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
    </AuthWrapper>
  )
}
