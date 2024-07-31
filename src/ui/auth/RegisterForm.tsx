'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import FormHeader from '@/ui/auth/AuthForm/FormHeader'
import { register } from '@/lib/auth/action'
import { useAuthForm } from '@/app/hooks/useAuthForm'
import {
  EnvelopeOpenIcon as MailIcon,
  KeyIcon as PasswordIcon,
  UserIcon as NameIcon,
  UserGroupIcon as SurnameIcon,
  CloudArrowUpIcon as ProfilePictureIcon,
} from '@heroicons/react/24/outline'
import SubmitButton from '@/ui/buttons/SubmitButton/SubmitButton'
import LinkButton from '../buttons/LinkButton/LinkButton'

export default function RegisterForm() {
  const [picturepreview, setPreview] = useState<null | string>(null)
  const { state, dispatch, formRef, inputRef, messageRef } = useAuthForm({
    action: register,
  })
  const router = useRouter()
  useEffect(() => {
    if (state?.message === 'Register Successful') router.replace('/signin')
  }, [state, router])
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

  const handlePreviewPic = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && (event.target.files[0] as File)
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }
  return (
    <>
      <FormHeader
        title="Join to evently"
        withPicture
        profilePicture={picturepreview}
      />
      <form
        ref={formRef}
        action={dispatch}
        className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div className="flex content-center">
          <label htmlFor="email" className="flex content-center mr-2">
            <NameIcon
              height="100%"
              width="38px"
              color={state?.errors?.name?.[0] ? 'red' : 'black'}
              className="block"
              title="Name icon"
            />
          </label>
          <input
            ref={inputRef}
            autoComplete="off"
            id="name"
            name="name"
            type="text"
            className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4 rounded-lg border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 placeholder:text-gray-500"
            placeholder="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex content-center">
          <label htmlFor="email" className="flex content-center mr-2">
            <SurnameIcon
              height="100%"
              width="38px"
              color={state?.errors?.surname?.[0] ? 'red' : 'black'}
              className="block"
              title="Surname icon"
            />
          </label>
          <input
            autoComplete="off"
            id="surname"
            name="surname"
            type="text"
            className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4 rounded-lg border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 placeholder:text-gray-500"
            placeholder="surname"
            onChange={handleChange}
          />
        </div>

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
            id="password confirmation"
            name="password confirmation"
            type="password"
            className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4 rounded-lg border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 placeholder:text-gray-500"
            placeholder="Password confirmation"
            onChange={handleChange}
          />
        </div>
        <div className="flex content-center">
          <label htmlFor="password" className="flex content-center mr-2">
            <ProfilePictureIcon
              height="100%"
              width="38px"
              color={state?.errors?.profilePicture?.[0] ? 'red' : 'black'}
              className="block"
              title="Profile picture icon"
            />
          </label>
          <input
            type="file"
            id="profile picture"
            name="profile picture"
            accept="image/*"
            className="flex-grow w-full h-12 sm:w-1/2 outline-none appearance-none  text-gray-600 p-3 pl-4"
            onChange={handlePreviewPic}
          />
        </div>
        <div>
          <p ref={messageRef} className="min-h-[28px] ml-[46px] text-red-500">
            {state?.errors?.email?.[0] ||
              state?.errors?.name?.[0] ||
              state?.errors?.surname?.[0] ||
              state?.errors?.password?.[0] ||
              state?.errors?.passwordConfirmation?.[0] ||
              state?.errors?.profilePicture?.[0] ||
              state?.errors?.dbError}
          </p>
        </div>
        <div>
          <div className="pl-[44px] flex gap-6">
            <SubmitButton color="red" variant="contained">
              Submit
            </SubmitButton>

            <LinkButton href="/signin" variant="contained">
              Login
            </LinkButton>
          </div>
        </div>
      </form>
    </>
  )
}
