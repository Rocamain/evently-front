'use client'

import { useEffect, useRef, useState } from 'react'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

interface ButtonCarouselProps {
  buttons: { title: string; href: string }[]
}

export default function ButtonCarousel({ buttons }: ButtonCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout | undefined

    const calculateScrollSpeed = (screenWidth: number): number => {
      const breakpoints = [
        { width: 480, speed: 2 }, // Mobile devices
        { width: 768, speed: 3 }, // Tablets
        { width: 1024, speed: 4 }, // Small laptops
        { width: 1440, speed: 6 }, // Large laptops
        { width: 1920, speed: 9 }, // Desktops and higher
      ]

      // Find the matching breakpoint or the closest lower one
      for (let i = breakpoints.length - 1; i >= 0; i--) {
        if (screenWidth >= breakpoints[i].width) {
          return breakpoints[i].speed
        }
      }

      // Default to the smallest speed if no breakpoints match
      return breakpoints[0].speed
    }

    const screenWidth = window.innerWidth
    const scrollSpeed = calculateScrollSpeed(screenWidth)

    const handleScroll = () => {
      if (carouselRef.current) {
        const maxScrollLeft = carouselRef.current.scrollWidth / 2 // Halfway point for the infinite loop

        // If the user reaches the end of the first button set, snap back to the beginning
        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollLeft = 0 // Snap back to the original position
        }
      }
    }

    if (!isHovered && carouselRef.current) {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({
            left: scrollSpeed, // Use variable speed
            behavior: 'smooth',
          })

          handleScroll() // Check and handle looping
        }
      }, 20) // Interval remains the same
    }

    return () => clearInterval(scrollInterval) // Cleanup interval on hover
  }, [isHovered])

  return (
    <section className="relative w-full py-8 mb-8 overflow-hidden">
      <div
        className="flex flex-nowrap gap-x-6 sm:gap-x-8 gap-y-3 overflow-x-scroll hide-scrollbar"
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Render the buttons twice to create the infinite scroll effect */}
        {[...buttons, ...buttons, ...buttons, ...buttons].map(
          (button, index) => (
            <div key={index} className="flex items-center">
              <LinkButton href={button.href}>{button.title}</LinkButton>
            </div>
          ),
        )}
      </div>

      {/* Left Fade */}
      <div className="absolute top-0 -left-2 w-16 h-full pointer-events-none bg-gradient-to-r from-white via-transparent to-transparent"></div>

      {/* Right Fade */}
      <div className="absolute top-0 -right-2 w-16 h-full pointer-events-none bg-gradient-to-l from-white via-transparent to-transparent"></div>
    </section>
  )
}
