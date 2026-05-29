"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export function MembershipSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="bg-white"
    >
      {/* Minimal Membership Block - Centered, elevated, elegant */}
      <div className="py-24 md:py-36 lg:py-48">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-8 lg:px-16 w-full">
          <div
            className={`text-center transition-all duration-[1.4s] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Eyebrow */}
            <p className="font-sans text-[10px] md:text-[11px] font-light tracking-[0.35em] uppercase text-[#00AEB6] mb-12">
              ON MEMBERSHIP
            </p>
            
            {/* Body Text */}
            <p className="font-serif text-[22px] md:text-[26px] lg:text-[30px] font-light text-[#1A3A5C]/80 leading-[1.85] mb-10 max-w-[860px] mx-auto">
              The community is small by design. Members are assessed on professional standing, demonstrated integrity, and a commitment to creating value for others.
            </p>
            
            {/* Italic Line */}
            <p 
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[22px] md:text-[26px] lg:text-[30px] font-normal text-[#1A3A5C] italic leading-relaxed mb-16 md:mb-20"
            >
              Those who join tend to stay. Their families tend to follow.
            </p>
            
            {/* CTA Button */}
            <Link
              href="/inquiry"
              className="inline-block border border-[#00AEB6] bg-transparent px-16 py-6 text-[12px] font-sans font-medium tracking-[0.25em] uppercase text-[#00AEB6] hover:bg-[#00AEB6] hover:text-white transition-all duration-300"
            >
              Request a Private Introduction
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
