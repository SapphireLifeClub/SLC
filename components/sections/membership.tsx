"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { isBackForwardNavigation } from "@/lib/navigation"

export function MembershipSection() {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const checkInView = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh) {
        setIsVisible(true)
        return true
      }
      return false
    }
    if (checkInView()) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
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
      id="membership"
      ref={sectionRef}
      className="bg-white"
    >
      {/* Membership — one editorial moment */}
      <div className="py-28 md:py-40 lg:py-52">
        <div className="mx-auto max-w-[920px] px-6 sm:px-8 lg:px-16 w-full">
          <div
            className={`text-center transition-all duration-[1.4s] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Eyebrow */}
            <p className="font-sans text-[10px] md:text-[11px] font-light tracking-[0.4em] uppercase text-[#00AEB6] mb-10">
              ON MEMBERSHIP
            </p>

            {/* Display Headline */}
            <h2
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[36px] md:text-[52px] lg:text-[64px] font-normal text-[#1A3A5C] tracking-[0.03em] leading-[1.05] mb-16"
            >
              By Introduction.<br />
              <span className="italic">By Invitation.</span>
            </h2>

            {/* Single body line */}
            <p className="font-serif text-[18px] md:text-[20px] lg:text-[22px] font-light text-[#1A3A5C]/75 leading-[1.8] mb-16 max-w-[640px] mx-auto">
              A community small by design, and quietly so. Those who join tend to stay. Their families tend to follow.
            </p>

            {/* CTA Button */}
            <Link
              href="/inquiry"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-[#00AEB6] bg-transparent px-14 py-5 text-[11px] md:text-[12px] font-sans font-medium tracking-[0.3em] uppercase text-[#00AEB6] transition-[color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-15px_rgba(0,174,182,0.45)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#00AEB6] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span className="relative">Apply for Membership</span>
              <span
                aria-hidden
                className="relative inline-block opacity-70 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
