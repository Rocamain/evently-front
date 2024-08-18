import { LinkProps } from 'next/link'
import { ButtonHTMLAttributes } from 'react'
import React from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'contained' | 'outlined'
  color?: 'red' | 'teal'
  size?: 'small' | 'big'
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface LinkButtonProps extends LinkProps {
  children: React.ReactNode
  variant?: 'contained' | 'outlined'
  color?: 'red' | 'teal'
  size?: 'small' | 'big'
  target?: string
}

export interface ServerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'contained' | 'outlined'
  color?: 'red' | 'teal'
  size?: 'small' | 'big'
}
