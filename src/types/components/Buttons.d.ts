import { LinkProps, ButtonProps } from 'next/link'
import { ButtonHTMLAttributes } from 'react'

interface Button {}

export interface LinkButtonProps extends LinkProps {
  children: React.ReactNode
  variant?: 'contained' | 'outlined'
  color?: 'red' | 'teal'
  size?: 'small' | 'big'
}

export interface ServerButtonProps extends ButtonHTMLAttributes {
  children: React.ReactNode
  variant?: 'contained' | 'outlined'
  color?: 'red' | 'teal'
  size?: 'small' | 'big'
}
