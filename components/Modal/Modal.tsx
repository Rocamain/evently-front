'use client'
import React, {
  type ElementRef,
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react'

import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: React.ReactNode }) {
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

  return (
    <dialog
      ref={dialogRef}
      className="relative shadow-lg rounded-3xl bg-red-800/30 backdrop:bg-red-800/30 backdrop:cursor-pointer overflow-visible"
      onClose={onDismiss}
      onClick={handleClick}
    >
      <div className="absolute top-4 right-[20px] z-50">
        <button ref={buttonRef} className="text-xl text-gray-500">
          ✖
        </button>
      </div>
      {children}
    </dialog>
  )
}
