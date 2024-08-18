'use client'
import { Bars4Icon as BurgerIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useMenu } from '@/app/context/menu/MenuContext'

export default function MenuButton() {
  const { open, setOpen } = useMenu()
  if (open) {
    return (
      <XMarkIcon
        onClick={() => setOpen(false)}
        className="w-[3rem] h-[3rem] text-red-400 cursor-pointer"
      />
    )
  }
  return (
    <BurgerIcon
      onClick={() => setOpen((prev) => !prev)}
      className="w-[2.5rem] h-[2.5rem] text-teal-600 cursor-pointer"
    />
  )
}
