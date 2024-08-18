'use client'
import { useMenu } from '@/app/context/menu/MenuContext'

export default function Menu() {
  const { open } = useMenu()

  return (
    <div
      className={`fixed mt-[90px] top-0 right-0 w-[250px] h-full bg-red-100/80 shadow-lg transition-transform ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/create-event">Create Event</a>
        </li>
      </ul>
    </div>
  )
}
