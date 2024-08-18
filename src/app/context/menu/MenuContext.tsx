'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface MenuContextProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
