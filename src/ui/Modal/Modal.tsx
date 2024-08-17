'use client'
import React from 'react'
import useModal from '@/app/hooks/useModal'

export default function Modal({ children }: { children: React.ReactNode }) {
  const { dialogRef, buttonRef, onDismiss, handleClick } = useModal()
  return (
    <dialog
      ref={dialogRef}
      className="relative shadow-lg rounded-3xl bg-red-800/30 backdrop:bg-red-800/30 backdrop:cursor-pointer overflow-visible"
      onClose={onDismiss}
      onClick={handleClick}
    >
      <div className="absolute top-8 right-10 z-50">
        <button ref={buttonRef} className="text-xl text-gray-500">
          ✖
        </button>
      </div>
      {children}
    </dialog>
  )
}
