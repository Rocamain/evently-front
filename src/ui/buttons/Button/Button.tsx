'use client'
import { ButtonProps } from '@/types/components/Buttons'
import { styles } from '../buttonsStyles'

export default function Button({
  children,
  variant = 'outlined',
  color = 'teal',
  size = 'big',
  clickHandler,
}: ButtonProps) {
  const className = styles[variant][color][size]

  return (
    <button onClick={clickHandler} className={className}>
      {children}
    </button>
  )
}
