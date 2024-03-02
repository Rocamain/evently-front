import Link from 'next/link'
import { ButtonProps } from '../../types/components/LinkButtonType/LinkButtonType'

export default function LinkButton({
  children,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  transparent = false,
  prefetch,
}: ButtonProps) {
  const className = transparent
    ? 'py-3 px-4 text-md text-teal-600 font-bold rounded-md hover:text-teal-800 border-2 border-transparent hover:border-teal-800 hover:border-2'
    : `py-3 px-4 text-md text-white font-bold bg-teal-600 rounded-md hover:bg-teal-500 border-2 border-transparent `

  return (
    <Link
      href={href}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      className={className}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
