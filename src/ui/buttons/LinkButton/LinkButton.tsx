import Link from 'next/link'
import { LinkButtonProps } from '@/types/components/Buttons'
import { styles } from '../buttonsStyles'
export default function LinkButton({
  children,
  variant = 'outlined',
  color = 'teal',
  size = 'big',
  ...props
}: LinkButtonProps) {
  const className = styles[variant][color][size]

  return (
    <div className="flex justify-center">
      <Link
        {...props}
        className={className + ' whitespace-nowrap'}
        style={{ letterSpacing: '0.01em' }}
      >
        {children}
      </Link>
    </div>
  )
}
