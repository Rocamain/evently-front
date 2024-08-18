'use client'
import { useState, useEffect, useRef } from 'react'
import ChevronBtn from './ChevronBtn'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import CardOnline from './CardOnline'
const ONLINE_EVENTS = [
  {
    dateTime: ['25/07/2023', '11:00'],
    title: 'The Healing Clinic',
    link: '#',
    photo: '/images/online/yoann-boyer-i14h2xyPr18-unsplash.jpg',
    users: [
      { name: 'Alba', link: '#' },
      { name: 'John Doe', link: '#' },
      { name: 'Albert', link: '#' },
      { name: 'Lucas Bean', link: '#' },
      { name: 'Rory Lee', link: '#' },
      { name: 'Charlotte Smith', link: '#' },
    ],
  },
  {
    dateTime: ['25/07/2023', '15:00'],
    title: 'Price of Persia',
    link: '#',
    photo: '/images/online/zoltan-tasi-5SZP8OTK9wo-unsplash.jpg',
    users: [
      { name: 'Charlotte Smith', link: '#' },
      { name: 'Rory Lee', link: '#' },
      { name: 'Jamie Stock', link: '#' },
    ],
  },
  {
    dateTime: ['28/07/2023', '18:00'],
    title: 'Brew house',
    link: '#',
    photo: '/images/online/timothy-dykes-Lq1rOaigDoY-unsplash.jpg',
    users: [
      { name: 'Lucas Bean', link: '#' },
      { name: 'Rory Lee', link: '#' },
      { name: 'Charlotte Smith', link: '#' },
      { name: 'Rory Lee', link: '#' },
      { name: 'Jamie Stock', link: '#' },
    ],
  },
  {
    dateTime: ['28/07/2023', '18:00'],
    title: 'Spaghetti Code',
    photo: '/images/online/timothy-dykes-Lq1rOaigDoY-unsplash.jpg',
    link: '#',
    users: [
      { name: 'Jamie Stock', link: '#' },
      { name: 'Lucas Bean', link: '#' },
      { name: 'Charlotte Smith', link: '#' },
      { name: 'Rory Lee', link: '#' },
    ],
  },
  {
    dateTime: ['25/07/2023', '11:00'],
    title: 'The Healing Clinic 2',
    link: '#',
    photo: '/images/online/yoann-boyer-i14h2xyPr18-unsplash.jpg',
    users: [
      { name: 'Alba', link: '#' },
      { name: 'John Doe', link: '#' },
      { name: 'Albert', link: '#' },
      { name: 'Lucas Bean', link: '#' },
      { name: 'Rory Lee', link: '#' },
      { name: 'Charlotte Smith', link: '#' },
    ],
  },
]
const CARD_WIDTH = 274

export default function OnlineEvents() {
  const [slide, setSlide] = useState(0)
  const [carouselWidthDiff, setCarouselWidthDiff] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) {
        const boxWidth = ref.current.getBoundingClientRect().width

        const calculatedCarouselWidth = ONLINE_EVENTS.length * CARD_WIDTH - 24
        const newCarouselWidthDiff = calculatedCarouselWidth - boxWidth
        setCarouselWidthDiff(newCarouselWidthDiff)
      }
    })

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleClick = (isLeft: boolean) => {
    if ((isLeft && slide > 0) || (!isLeft && slide < carouselWidthDiff)) {
      const step = isLeft ? -CARD_WIDTH : CARD_WIDTH
      const isLastStep = isLeft
        ? slide - CARD_WIDTH <= 0
        : carouselWidthDiff - slide < CARD_WIDTH
      setSlide((prev) => (isLastStep ? prev + step : prev + step))
    }
  }

  return (
    <section id="online_events" className="mb-20">
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-semibold text-2xl sm:text-3xl mb-2">
          Next Online Events
        </h3>
        <LinkButton href="#">More events</LinkButton>
      </div>
      <div className="flex justify-between items-center relative">
        <div ref={ref} className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform"
            style={{ transform: `translateX(${-slide}px)` }}
          >
            {ONLINE_EVENTS.map((card) => (
              <CardOnline key={card.title} {...card} />
            ))}
          </div>
        </div>
        <ChevronBtn left clickHandler={handleClick} />
        <ChevronBtn right clickHandler={handleClick} />
      </div>
    </section>
  )
}
