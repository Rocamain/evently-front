'use server'

import { SigninFormSchema } from './schemas'
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'
import { AuthActionState } from '@/types/auth/auth'

export async function signin(state: AuthActionState, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

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
  const { DB_URL } = process.env

  const response = await fetch(`${DB_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (data.AccessToken && data.ExpiresIn) {
    await createSession(data.AccessToken, data.ExpiresIn)
    return { errors: undefined, message: 'Login Successful' }
  }
  return { errors: undefined, message: 'Login Unsuccessful' }
}

export async function logout() {
  deleteSession()
  redirect('/')
}
