'use client'
import React, { createContext, useState, useContext } from 'react'
import { AuthState, AuthContext as Context } from '../../public/types/auth'

export const AuthContext = createContext<Context | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('No context provided')
  }
  return context
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [authState, updateAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  })

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}
