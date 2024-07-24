'use client'
import { useFormStatus } from 'react-dom'
import { ServerButtonProps } from '@/types/components/Buttons'
import { styles } from '../buttonsStyles'
export default function SubmitButton({
  children,
  variant = 'outlined',
  color = 'teal',
  size = 'big',
}: ServerButtonProps) {
  const { pending } = useFormStatus()

  const className = styles[variant][color][size]

  return (
    <button
      className={className}
      style={{ letterSpacing: '0.01em' }}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {children}
    </button>
  )
}
