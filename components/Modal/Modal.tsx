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
  const overlayRef = useRef<ElementRef<'div'>>(null)
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
      className="rounded-md sm:border-solid sm:border-2 sm:border-gray-400 md:rounded-lg backdrop:bg-blue-800/30 backdrop:cursor-pointer"
      onClose={onDismiss}
      onClick={handleClick}
    >
      <button
        ref={buttonRef}
        className="block ml-auto mr-2 p-2 text-xl text-gray-500"
      >
        ✖
      </button>
      <div className="px-10 pb-6">
        <div className="sm:pt-10 sm:px-8 md:p-8 w-full md:border-solid md:border-2 md:border-gray-400 md:rounded-lg md:max-w-xl">
          {children}
        </div>
      </div>
    </dialog>
  )
}
