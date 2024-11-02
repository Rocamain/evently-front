'use client'
import { Bars4Icon as BurgerIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useMenu } from '@/app/context/menu/MenuContext'

export default function MenuButton() {
  const { open, setOpen } = useMenu()
  if (open) {
    return (
      <div className=" w-[3rem] h-[3rem]">
        <XMarkIcon
          onClick={() => setOpen(false)}
          className="w-full h-full text-red-400 cursor-pointer"
          viewBox="2 2 12 12"
        />
      </div>
    )
  }
  return (
    <div className="w-[3rem] h-[3rem] flex items-center">
      <BurgerIcon
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-full text-teal-600 cursor-pointer"
      />
    </div>
  )
}
