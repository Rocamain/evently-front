import { cookies } from 'next/headers'
import { UserInfo } from '../../../public/types/auth'

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
