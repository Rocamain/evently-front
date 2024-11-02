import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import { verifySession } from '@/lib/auth/session'
import { logout } from '@/lib/auth/action'
import SubmitButton from '@/ui/buttons/SubmitButton/SubmitButton'
import MenuButton from '../Menu/MenuButton'

export default async function NavBar() {
  const isVerifiedSession = await verifySession()

  return (
    <nav className="flex-grow-0">
      <ul className=" flex justify-end md:space-x-4 items-center">
        {isVerifiedSession ? (
          <>
            <li>
              <MenuButton />
            </li>
            <li className="hidden md:block">
              <form action={logout}>
                <SubmitButton size="small" color="red">
                  Logout
                </SubmitButton>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <LinkButton
                size="small"
                variant="contained"
                color="teal"
                href="/register"
              >
                Register
              </LinkButton>
            </li>
            <li>
              <LinkButton
                size="small"
                variant="contained"
                color="red"
                href="/signin"
              >
                Log in
              </LinkButton>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
