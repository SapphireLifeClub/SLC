"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { isBackForwardNavigation } from "@/lib/navigation"

export function TheStorySection() {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
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
      { threshold: 0.1 }
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
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-white"
    >
      <div className="pb-16 md:pb-24 lg:pb-28">
        {/* Editorial spread — image left, sapphire manifesto panel right */}
        <div
          className={`flex flex-col lg:flex-row min-h-[560px] md:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Founder portrait — 60% on desktop, full on mobile */}
          <div className="relative w-full lg:w-[60%] h-[420px] sm:h-[520px] md:h-[600px] lg:h-auto overflow-hidden">
            <Image
              src="/founder-portrait.png"
              alt="John Shen, Founder, at Newport Harbor"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>

          {/* Sapphire manifesto panel — 40% on desktop */}
          <div className="relative w-full lg:w-[40%] bg-[#192952] text-white flex items-center">
            {/* Thin teal hairline at the seam — only on desktop */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-0 bottom-0 left-0 w-px bg-[#00AEB6]/40"
            />

            <div className="w-full px-8 sm:px-12 md:px-16 lg:px-14 xl:px-20 2xl:px-24 py-16 sm:py-20 md:py-24 lg:py-20 xl:py-24">
              <div className="max-w-[520px]">
                {/* Eyebrow */}
                <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#37BBD2] mb-8 md:mb-10">
                  From the Founder
                </p>

                {/* Lede — first sentence as headline, in serif */}
                <p
                  style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                  className="text-[22px] sm:text-[24px] md:text-[28px] lg:text-[26px] xl:text-[30px] font-light text-white tracking-[0.01em] leading-[1.3] mb-10 md:mb-12"
                >
                  Sapphire Life Club was founded in Newport Harbor for those who
                  have arrived at a stage where contribution and legacy carry
                  more weight than achievement alone.
                </p>

                {/* Follow body — single tightened paragraph */}
                <p
                  style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                  className="text-[16px] md:text-[17px] lg:text-[16px] xl:text-[18px] font-light text-white/70 leading-[1.85] mb-10 md:mb-12"
                >
                  The club exists for those who understand that the most
                  enduring value is built through trusted relationships, shared
                  experience, and a culture of integrity that extends well
                  beyond the individual.
                </p>

                {/* Italic pull-line */}
                <p
                  style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                  className="italic text-[17px] md:text-[19px] lg:text-[17px] xl:text-[20px] font-light text-white/90 leading-relaxed"
                >
                  Invitation-only. Built for the long term.
                </p>

                {/* Signature block */}
                <div className="mt-12 md:mt-14 pt-8 border-t border-white/15">
                  <p className="text-[32px] md:text-[38px] lg:text-[34px] xl:text-[40px] text-white mb-3 font-signature leading-none">
                    John Shen
                  </p>
                  <p className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.4em] uppercase text-white/55">
                    Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
