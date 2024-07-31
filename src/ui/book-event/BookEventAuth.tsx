// 'use client'
import React, { useState, useEffect } from 'react'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

export default function BookEventAuth() {
  return (
    <div className="p-6 h-[400px] w-[400px]">
      <div className="pb-6">
        <h1 className="text-xl font-semibold">
          To book this event you need to register or login into your account.
        </h1>
      </div>

      <div className="flex gap-5">
        <LinkButton prefetch={true} href={'/signin'}>
          Login
        </LinkButton>
        <LinkButton prefetch={true} href={'/register'}>
          Register
        </LinkButton>
      </div>
    </div>
  )
}
