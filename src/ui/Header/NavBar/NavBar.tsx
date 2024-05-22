import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import { verifySession } from '@/lib/auth/session'
import { logout } from '@/lib/auth/action'
import SubmitButton from '@/ui/buttons/SubmitButton/SubmitButton'

export default async function NavBar() {
  const isVerifiedSession = await verifySession()

  return (
    <nav className="flex-grow-0">
      <ul className=" flex justify-end space-x-4 items-center">
        {isVerifiedSession ? (
          <>
            <li>
              <LinkButton variant="contained" href="/dashboard">
                Dashboard
              </LinkButton>
            </li>
            <li>
              <form action={logout}>
                <SubmitButton color="red">Logout</SubmitButton>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <LinkButton variant="contained" color="teal" href="/register">
                Register
              </LinkButton>
            </li>
            <li>
              <LinkButton variant="contained" color="red" href="/signIn">
                Log in
              </LinkButton>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
