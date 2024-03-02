import LinkButton from '@/components/LinkButton/LinkButton'

export default function NavBar() {
  return (
    <nav className="flex-grow-0">
      <ul className=" flex justify-end space-x-4 items-center">
        <li>
          <LinkButton href="/register" transparent={true}>
            Register
          </LinkButton>
        </li>
        <li>
          <LinkButton href="/signIn">Log in</LinkButton>
        </li>
      </ul>
    </nav>
  )
}
