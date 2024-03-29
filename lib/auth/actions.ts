'use server'
import { setCookies } from './utils/cookies'
import { SignInState } from './types/types'
import { AuthData, CustomError } from './types/types'
const { DB_URL } = process.env

export const signInUser = async (
  state: SignInState,
  signInData: FormData,
): Promise<AuthData | CustomError> => {
  const email = signInData.get('email')
  const password = signInData.get('password')

  try {
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

    const { AccessToken, RefreshToken, userInfo, ExpiresIn, message, error } =
      data

    // On Login success setCookies is called
    if (AccessToken && RefreshToken && userInfo && ExpiresIn) {
      setCookies(AccessToken, RefreshToken, userInfo, ExpiresIn)
    }

    if (error) {
      return { message: error.message }
    }

    return { message, userInfo }
  } catch (error) {
    const customError = error as CustomError

    return customError
  }
}
