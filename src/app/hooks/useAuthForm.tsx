'use client'
import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import { AuthAction } from '@/types/auth/auth'
export const useAuthForm = ({ action }: { action: AuthAction }) => {
  const [state, dispatch] = useFormState(action, undefined)
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  useEffect(() => {
    if (formRef.current) {
      if (state?.message === 'Login successful') {
        formRef.current.reset()
      }
    }
  }, [state])

  return { state, dispatch, formRef, inputRef, messageRef }
}
