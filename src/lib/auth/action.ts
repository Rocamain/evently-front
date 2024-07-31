'use server'
import { AuthActionState } from '@/types/auth/auth'
import { SigninFormSchema, RegisterFormSchema } from './schemas'
import { createSession, deleteSession } from './session'
import { processFiles } from '../create-event/utils'
const { DB_URL } = process.env

export async function register(state: AuthActionState, formData: FormData) {
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password confirmation')
  const profilePicture = formData.getAll('profile picture') as File[]

  try {
    const validatedFields = RegisterFormSchema.safeParse({
      name,
      surname,
      email,
      password,
      passwordConfirmation,
      profilePicture,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: undefined,
      }
    }
    const processedProfilePicture = await processFiles(profilePicture, {
      main: [100, 100],
    })

    formData.delete('passwordConfirmation')
    formData.delete('profile picture')
    processedProfilePicture.forEach((file) => {
      formData.append('profile_picture', file)
    })

    const response = await fetch(`${DB_URL}/join`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json() // type this

    if (!response.ok) {
      return { errors: { dbError: data.message }, message: undefined }
    }
    if (data.error) {
      return { errors: { dbError: data.error.message }, message: undefined }
    } else {
      return { errors: undefined, message: 'Register Successful' }
    }
  } catch (e) {
    return { errors: undefined, message: 'Register Unsuccessful' }
  }
}

export async function signin(state: AuthActionState, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  try {
    const validatedFields = SigninFormSchema.safeParse({
      email,
      password,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: undefined,
      }
    }

    const response = await fetch(`${DB_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.AccessToken && data.ExpiresIn) {
      await createSession(data.AccessToken, data.ExpiresIn)
      return { errors: undefined, message: 'Login Successful' }
    }
    return { errors: undefined, message: 'Login Unsuccessful' }
  } catch (e) {
    //  possible implementation to Error page.
    return { errors: undefined, message: 'Login Unsuccessful' }
  }
}

export async function logout() {
  deleteSession()
}
