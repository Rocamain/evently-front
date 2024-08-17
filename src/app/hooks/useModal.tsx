'use client'
import {
  type ElementRef,
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react'
import { useRouter } from 'next/navigation'

export default function useModal() {
  const dialogRef = useRef<ElementRef<'dialog'>>(null)
  const buttonRef = useRef<ElementRef<'button'>>(null)
  const router = useRouter()

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      if (onDismiss) {
        if (dialogRef.current) {
          const dialogDimensions = dialogRef.current.getBoundingClientRect()
          // if click outside the dialog  then close it.
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            dialogRef.current.close()
          }
        }

        if (e.target === buttonRef.current && dialogRef.current?.open) {
          onDismiss()
        }
      }
    },
    [onDismiss, dialogRef, buttonRef],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  // Lock scroll when component mounts
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return { dialogRef, buttonRef, onDismiss, handleClick }
}
