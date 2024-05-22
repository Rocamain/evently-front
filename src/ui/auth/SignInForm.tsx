import FormHeader from '@/ui/auth/AuthForm/FormHeader'
import AuthWrapper from '@/ui/auth/AuthWrapper'
import { signin } from '@/lib/auth/action'
import AuthForm from '@/ui/auth/AuthForm/AuthForm'

export const metadata = {
  title: 'Evently SignIn',
  description: 'Evently signIn to your account',
}

export default function SignInForm() {
  return (
    <AuthWrapper>
      <FormHeader title="Login to your account" withPicture />
      <AuthForm action={signin} />
    </AuthWrapper>
  )
}
