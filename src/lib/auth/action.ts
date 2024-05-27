'use server'
import { AuthActionState } from '@/types/auth/auth'
import { SigninFormSchema, RegisterFormSchema } from './schemas'
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'

const { DB_URL } = process.env

export async function register(state: AuthActionState, formData: FormData) {
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password confirmation')
  const profilePicture = formData.get('profile picture')
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

    const response = await fetch(`${DB_URL}/join`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.error) {
      return { errors: undefined, message: data.error.message }
    } else {
      return { errors: undefined, message: 'Register Successful' }
    }
  } catch (e) {
    //  possible implementation to Error page.
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
  redirect('/')
}
