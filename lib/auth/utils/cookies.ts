import { cookies } from 'next/headers'
import { UserInfo } from '../types/types'

// Function the set the Auth cookies
export const setCookies = (
  AccessToken: string,
  RefreshToken: string,
  userInfo: UserInfo,
  ExpiresIn: number,
) => {
  const cookiesList = cookies()

  cookiesList.set('AccessToken', AccessToken, {
    maxAge: ExpiresIn,
    httpOnly: false,
    sameSite: 'strict',
  })
  cookiesList.set('RefreshToken', RefreshToken, {
    maxAge: ExpiresIn,
    httpOnly: false,
    sameSite: 'strict',
  })
  cookiesList.set('UserInfo', JSON.stringify(userInfo), {
    maxAge: ExpiresIn,
    httpOnly: false,
    sameSite: 'strict',
  })
}
