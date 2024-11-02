'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'

interface MenuContextProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    if (open) {
      // Disable scrolling on the body when the menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling on the body when the menu is closed
      document.body.style.overflow = ''
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

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
