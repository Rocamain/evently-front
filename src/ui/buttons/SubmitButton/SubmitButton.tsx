'use client'
import { useFormStatus } from 'react-dom'
import { ServerButtonProps } from '@/types/components/Buttons'
import { styles } from '../buttonsStyles'
export default function SubmitButton({
  children,
  variant = 'outlined',
  color = 'teal',
}: ServerButtonProps) {
  const { pending } = useFormStatus()

  const className = styles[variant][color]

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
