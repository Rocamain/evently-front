import Link from 'next/link'
import { LinkButtonProps } from '@/types/components/Buttons'
import { styles } from '../buttonsStyles'
export default function LinkButton({
  children,
  variant = 'outlined',
  color = 'teal',
  ...props
}: LinkButtonProps) {
  const className = styles[variant][color]

  return (
    <Link {...props} className={className} style={{ letterSpacing: '0.01em' }}>
      {children}
    </Link>
  )
}
