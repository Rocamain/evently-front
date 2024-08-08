import React from 'react'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="overflow-visible flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className="relative mx-5 max-w-md sm:max-w-lg md:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-2xl sm:rounded-3xl"></div>
          <div
            className="relative px-12 py-8 bg-white shadow-lg rounded-2xl sm:rounded-3xl sm:p-20 sm:pt-10"
            style={{ background: '#edf2f7' }}
          >
            <div className="md:pt-4 sm:pt- max-w-md mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
