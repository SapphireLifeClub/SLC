"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const partners = [
  { initials: "NYC", name: "NEWPORT YACHT CLUB" },
  { initials: "PMG", name: "PACIFIC MARITIME GROUP" },
  { initials: "CV", name: "COASTAL VENTURES" },
  { initials: "HCP", name: "HARBOR CAPITAL PARTNERS" },
  { initials: "RH", name: "RIVIERA HOLDINGS" },
  { initials: "MT", name: "MARITIME TRUST" },
  { initials: "BIG", name: "BALBOA INVESTMENT GROUP" },
  { initials: "OA", name: "OCEANSIDE ADVISORS" },
]

function PartnerItem({ initials, name }: { initials: string; name: string }) {
  return (
    <div className="flex items-center gap-4 px-8">
      <div className="w-10 h-10 border border-white/60 flex items-center justify-center flex-shrink-0">
        <span className="font-sans text-[10px] font-medium tracking-[0.1em] text-white">
          {initials}
        </span>
      </div>
      <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-white whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-[#00AEB6] text-white"
    >
      {/* Partners Marquee Section */}
      <div className="py-14 md:py-18 lg:py-20">
        <div
          className={`transition-all duration-[1s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* OUR PARTNERS Label */}
          <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.35em] uppercase text-white text-center mb-10 md:mb-12">
            OUR PARTNERS
          </p>

          {/* Auto-scrolling Marquee */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <PartnerItem
                  key={`first-${index}`}
                  initials={partner.initials}
                  name={partner.name}
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <PartnerItem
                  key={`second-${index}`}
                  initials={partner.initials}
                  name={partner.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-16">
        <div className="border-t border-white/20" />
      </div>

      {/* Lower Footer Content */}
      <div className="py-14 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-16 text-center">
          {/* Brand Name */}
          <h3 className="font-serif text-[24px] md:text-[28px] lg:text-[32px] font-light tracking-[0.15em] uppercase text-white mb-4">
            SAPPHIRE LIFE
          </h3>

          {/* Location */}
          <p className="font-sans text-[11px] md:text-[12px] font-light tracking-[0.25em] uppercase text-white/90 mb-3">
            Newport Harbor, California
          </p>

          {/* Tagline */}
          <p className="font-serif text-[13px] md:text-[14px] font-light italic text-white/80 mb-10 md:mb-12">
            A Private Members&apos; Club · By Introduction Only
          </p>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 md:mb-10">
            <Link
              href="#private-inquiry"
              className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              MEMBERSHIP INQUIRY
            </Link>
            <a
              href="mailto:info@sapphirelife.club"
              className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              GENERAL INQUIRY
            </a>
            <a
              href="#"
              className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              INSTAGRAM
            </a>
          </div>

          {/* Contact Line */}
          <p className="font-sans text-[11px] font-light tracking-[0.15em] text-white/90 mb-10 md:mb-12">
            info@sapphirelife.club &nbsp;|&nbsp; +1 (949) 555-0100
          </p>

          {/* Bottom Line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <p className="font-sans text-[9px] font-light tracking-[0.2em] uppercase text-white/70">
              © 2026 SAPPHIRE LIFE CLUB. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#"
                className="font-sans text-[9px] font-light tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="font-sans text-[9px] font-light tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
              >
                TERMS OF USE
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
