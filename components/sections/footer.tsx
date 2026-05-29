"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { isBackForwardNavigation } from "@/lib/navigation"

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

function PartnerItem({ name }: { initials: string; name: string }) {
  return (
    <div className="flex items-center px-10 md:px-14">
      <span
        style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
        className="text-[20px] md:text-[26px] lg:text-[30px] font-light tracking-[0.18em] uppercase text-white whitespace-nowrap"
      >
        {name}
      </span>
    </div>
  )
}

function PartnerSeparator() {
  return (
    <div className="flex items-center px-2">
      <span className="text-white/50 text-[14px]">·</span>
    </div>
  )
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
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
    <footer
      ref={footerRef}
      className="relative bg-[#00AEB6] text-white overflow-hidden"
    >
      {/* Harbor aerial — subtle watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/harbor-aerial.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
          mixBlendMode: "soft-light",
        }}
      />
      {/* Sapphire wash to keep type legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,174,182,0.6) 0%, rgba(0,140,150,0.75) 100%)",
        }}
      />
      {/* Foreground content wrapper */}
      <div className="relative z-10">
      {/* Partners Marquee Section */}
      <div className="py-20 md:py-24 lg:py-28">
        <div
          className={`transition-all duration-[1s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* OUR PARTNERS Label */}
          <p className="font-sans text-[14px] md:text-[16px] lg:text-[17px] font-medium tracking-[0.5em] uppercase text-white text-center mb-14 md:mb-20">
            OUR PARTNERS
          </p>

          {/* Auto-scrolling Marquee — editorial serif names */}
          <div className="relative overflow-hidden">
            <div className="flex items-center animate-marquee">
              {partners.map((partner, index) => (
                <div key={`first-${index}`} className="flex items-center">
                  <PartnerItem initials={partner.initials} name={partner.name} />
                  <PartnerSeparator />
                </div>
              ))}
              {partners.map((partner, index) => (
                <div key={`second-${index}`} className="flex items-center">
                  <PartnerItem initials={partner.initials} name={partner.name} />
                  <PartnerSeparator />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-16">
        <div className="border-t border-white/25" />
      </div>

      {/* Lower Footer Content — editorial scale */}
      <div className="py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-16 text-center">
          {/* Brand Logo */}
          <div className="flex justify-center mb-8 md:mb-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/primary%20logo-3IPC5t1kUBdrtGdmn8Q5bkzws8KLhr.png"
              alt="Sapphire Life"
              width={320}
              height={80}
              style={{ width: 'auto' }}
              className="h-12 md:h-16 lg:h-20 brightness-0 invert"
            />
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-12 md:mb-14">
            <Link
              href="/inquiry"
              className="font-sans text-[12px] md:text-[13px] font-medium tracking-[0.3em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              APPLY FOR MEMBERSHIP
            </Link>
            <span className="font-sans text-[12px] md:text-[13px] font-medium tracking-[0.3em] uppercase text-white">
              INSTAGRAM
            </span>
          </div>

          {/* Contact Line */}
          <p className="font-sans text-[14px] md:text-[15px] font-light tracking-[0.15em] text-white/90 mb-14 md:mb-16">
            hello@sapphirelife.org &nbsp;|&nbsp; +1 (949) 555-0100
          </p>

          {/* Bottom Line */}
          <p className="font-sans text-[11px] md:text-[12px] font-light tracking-[0.25em] uppercase text-white/70 text-center">
            © 2026 SAPPHIRE LIFE CLUB. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
      </div>
    </footer>
  )
}
