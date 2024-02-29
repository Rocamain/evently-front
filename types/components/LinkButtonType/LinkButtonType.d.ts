import { LinkProps } from 'next/link'

export interface ButtonProps extends LinkProps {
  children: React.ReactNode
  transparent?: boolean
}
