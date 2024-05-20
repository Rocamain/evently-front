export interface UserInfo {
  email: string
  email_verified: string
  family_name: string
  name: string
  sub: string
  picture: string
}

export type User = UserInfo | null

type AuthState = {
  isAuthenticated: boolean
  user: User
}

export type AuthContext = {
  authState: AuthState
  updateAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}

export interface CustomError extends Error {
  message: string
}

type SignInState = {
  message: string | null
  userInfo: UserInfo | null
}

export interface AuthData {
  message: string | undefined
  error?: { message: string }
  AccessToken?: string
  RefreshToken?: string
  ExpiresIn?: number
  userInfo?: UserInfo
}

export type SignInFormProps = {
  formAction: (
    prevState: SignInState,
    singInFormData: FormData,
  ) => Promise<AuthData | CustomError>
  initialState: SignInState
}
