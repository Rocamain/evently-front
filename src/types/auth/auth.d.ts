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

export type AuthActionState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type AuthAction = (
  state: AuthActionState,
  formData: FormData,
) => Promise<
  | {
      errors: {
        email?: string[] | undefined
        password?: string[] | undefined
      }
      message: undefined
    }
  | {
      errors: undefined
      message: string
    }
>
