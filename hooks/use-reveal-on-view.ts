"use client"

import { useEffect, useRef, useState } from "react"

export function useRevealOnView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkInView = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh && rect.bottom > 0) {
        setIsVisible(true)
        return true
      }
      return false
    }

    if (checkInView()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold }
    )
    observer.observe(el)

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) checkInView()
    }
    window.addEventListener("pageshow", onPageShow)

    return () => {
      observer.disconnect()
      window.removeEventListener("pageshow", onPageShow)
    }
  }, [threshold])

  return { ref, isVisible }
}
