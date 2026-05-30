"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { isBackForwardNavigation } from "@/lib/navigation"

const heroImage = {
  src: "/club-network-main.png",
  alt: "Sapphire Life — Private Club in Newport Beach",
}

export function TheClubSection() {
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
      id="club"
      ref={sectionRef}
      className="bg-[#FAFBFC]"
    >
      <div className="py-24 md:py-36 lg:py-48">
        {/* Centered Intro */}
        <div
          className={`max-w-[680px] mx-auto px-6 sm:px-8 text-center transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-[#00AEB6] mb-6">
            THE CLUB
          </p>

          <h2
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-[26px] sm:text-[30px] md:text-[38px] lg:text-[44px] font-normal text-[#192952] tracking-[0.02em] leading-[1.15] mb-8"
          >
            A Private Network of Exceptional Standing.
          </h2>

          <div className="font-sans text-[14px] sm:text-[15px] md:text-[16px] font-light text-[#192952]/70 leading-[1.85] space-y-5">
            <p>
              Sapphire Life Club convenes executives, founders, investors,
              family offices, and globally minded families defined by integrity,
              generosity, and purpose.
            </p>
            <p>
              Within this private circle, trusted relationships give rise to
              meaningful dialogue, creative initiatives, and philanthropic
              engagement.
            </p>
          </div>
        </div>

        {/* Editorial Image Composition */}
        <div className="mt-20 md:mt-28 lg:mt-36 mx-auto max-w-[920px] px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Ambient sapphire glow behind the card */}
          <div
            className={`relative transition-all duration-[1.4s] ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-12 md:-inset-20 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(25,41,82,0.10) 0%, rgba(25,41,82,0.04) 45%, transparent 75%)",
                filter: "blur(20px)",
              }}
            />

            {/* Editorial card — natural aspect, gilded hairline, soft shadow */}
            <div
              className="relative w-full overflow-hidden ring-1 ring-[#192952]/15 shadow-[0_30px_80px_-30px_rgba(25,41,82,0.45),0_10px_30px_-15px_rgba(25,41,82,0.25)]"
              style={{ aspectRatio: "21 / 10" }}
            >
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 60%" }}
              />
              {/* Soft top-edge vignette to add depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.22) 100%)",
                }}
              />
            </div>
          </div>

          {/* Caption */}
          <p
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className={`mt-12 md:mt-16 text-center italic text-[16px] md:text-[18px] lg:text-[20px] font-light text-[#192952]/75 max-w-[560px] mx-auto leading-relaxed transition-all duration-[1.4s] ease-out delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A curated coastal community, gathered with intention.
          </p>

          {/* CTA */}
          <div
            className={`mt-12 md:mt-16 text-center transition-all duration-[1.4s] ease-out delay-[600ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/inquiry"
              className="inline-block border border-[#00AEB6] bg-transparent px-10 sm:px-14 py-4 text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#00AEB6] hover:bg-[#00AEB6] hover:text-white transition-all duration-300"
            >
              Apply for Membership
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
