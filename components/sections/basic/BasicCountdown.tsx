"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import { useIsClient } from "@/hooks/useIsClient"
import { basicDemoData } from "./data/basic-demo-data"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function BasicCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isClient = useIsClient()

  // Set your event date here - solo en cliente
  const eventDate = useRef<number | undefined>(undefined)

  // Inicializar la fecha del evento solo en cliente
  useEffect(() => {
    if (!isClient) return
    eventDate.current = new Date(basicDemoData.countdown.targetDate).getTime()
    
    // Calcular tiempo inicial inmediatamente
    const now = new Date().getTime()
    const distance = eventDate.current - now

    if (distance < 0) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    setTimeLeft({ days, hours, minutes, seconds })
  }, [isClient])

  // Contador en tiempo real - solo en cliente
  useEffect(() => {
    if (!isClient || !eventDate.current) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate.current! - now

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [isClient])

  return (
    <section className="py-16 px-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(0deg, hsl(210 45% 78% / 0.6), hsl(210 45% 78% / 0.6)), url('${basicDemoData.countdown.backgroundImage}')`,
          //backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${basicDemoData.countdown.backgroundImage}')`,
          //backgroundColor: 'lightskyblue'
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-white text-3xl md:text-4xl mb-12">Faltan:</h2>

        <div className="flex justify-center gap-4 md:gap-8">
          <div className="bg-white/20 backdrop-blur-sm p-3 md:p-6 rounded-lg w-16 md:w-24 text-center">
            <div className="text-white text-2xl md:text-4xl font-bold">
              {isClient ? String(timeLeft.days).padStart(2, "0") : "00"}
            </div>
            <div className="text-white text-xs md:text-sm mt-1">Días</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3 md:p-6 rounded-lg w-16 md:w-24 text-center">
            <div className="text-white text-2xl md:text-4xl font-bold">
              {isClient ? String(timeLeft.hours).padStart(2, "0") : "00"}
            </div>
            <div className="text-white text-xs md:text-sm mt-1">Hrs.</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3 md:p-6 rounded-lg w-16 md:w-24 text-center">
            <div className="text-white text-2xl md:text-4xl font-bold">
              {isClient ? String(timeLeft.minutes).padStart(2, "0") : "00"}
            </div>
            <div className="text-white text-xs md:text-sm mt-1">Min.</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3 md:p-6 rounded-lg w-16 md:w-24 text-center">
            <div className="text-white text-2xl md:text-4xl font-bold">
              {isClient ? String(timeLeft.seconds).padStart(2, "0") : "00"}
            </div>
            <div className="text-white text-xs md:text-sm mt-1">Seg.</div>
          </div>
        </div>
      </div>
    </section>
  )
} 