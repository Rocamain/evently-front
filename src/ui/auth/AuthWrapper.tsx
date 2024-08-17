import React from 'react'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-5 overflow-visible flex flex-col items-center justify-center">
      <div className="relative max-w-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -rotate-6 sm:skew-y-0 sm:-rotate-6 rounded-2xl sm:rounded-3xl"></div>
        <div
          className="relative px-8 py-12 sm:p-14 bg-white shadow-lg rounded-2xl sm:rounded-3xl"
          style={{ background: '#edf2f7' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
