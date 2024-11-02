'use client'
import { useMenu } from '@/app/context/menu/MenuContext'
import Link from 'next/link'
import { XMarkIcon, PowerIcon } from '@heroicons/react/16/solid'
import {
  HomeIcon,
  PaintBrushIcon,
  IdentificationIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  TicketIcon,
} from '@heroicons/react/24/outline'
import LogoutButton from './LogoutButton'
import { logout } from '@/lib/auth/action'

export default function Menu() {
  const { open, setOpen } = useMenu()

  return (
    <div
      className={`fixed z-50 top-[89px] md:top-22 left-0 w-full sm:w-[450px] h-100 bg-gray-100 border-y-2 border-gray-300 shadow-lg transition-transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex">
        <div className="border-r-2 mt-2 border-gray-300">
          <XMarkIcon
            onClick={() => setOpen(false)}
            className="w-[3rem] h-[3rem] text-red-400 cursor-pointer"
          />
        </div>
        <ul className="flex-grow flex flex-col text-lg/loose">
          <li>
            <div className="border-b-2 border-r-2 border-gray-300">
              <Link
                href="/"
                className="group py-3 px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Home
                <div className="w-[30px] h-[30px]">
                  <HomeIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="border-r-2 border-b-2 border-gray-300">
              <Link
                href="/create-event"
                className="group py-3 px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Create event
                <div className="w-[28px] h-[28px]">
                  <PaintBrushIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="border-r-2 border-b-2 border-gray-300">
              <Link
                href="/dashboard"
                className="group py-3 px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Dashboard
                <div className="w-[29px] h-[29px]">
                  <IdentificationIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="border-r-2 border-b-2 border-gray-300">
              <Link
                href="/profile"
                className="group py-3 px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Profile
                <div className="w-[30px] h-[30px]">
                  <UserCircleIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="py-3 border-r-2 border-b-2 border-gray-300">
              <Link
                href="/profile"
                className="group px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Your events
                <div className="w-[30px] h-[30px]">
                  <CalendarDaysIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="py-3 border-r-2 border-gray-300">
              <Link
                href="/profile"
                className="group px-2 mx-1 flex justify-between align-bottom font-semibold text-base/1 text-teal-600 hover:text-teal-500 tracking-wide"
                onClick={() => setOpen(false)}
              >
                Your bookings
                <div className="w-[30px] h-[30px]">
                  <TicketIcon className="text-gray-400 group-hover:text-teal-500" />
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <form
        action={async () => {
          await logout()
          setOpen(false)
        }}
        className="px-3 py-4 border-2 border-gray-300"
      >
        <LogoutButton />
      </form>
    </div>
  )
}
