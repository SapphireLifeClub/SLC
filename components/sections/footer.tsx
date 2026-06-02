"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { isBackForwardNavigation } from "@/lib/navigation"

const partners = [
  { name: "American Lending Center", src: "/partners/american-lending-center.png", scale: 1 },
  { name: "American Sailing", src: "/partners/american-sailing.png", scale: 1.3 },
  { name: "Freeman Marine Services", src: "/partners/freeman-marine-services.png", scale: 2.6 },
  { name: "Lynn Marie The Artist", src: "/partners/lynn-marie.png", scale: 2.1 },
  { name: "Sunstone", src: "/partners/sunstone.png", scale: 1 },
]

function PartnerItem({ name, src, scale }: { name: string; src: string; scale: number }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={src}
        alt={name}
        width={320}
        height={120}
        style={{ height: `clamp(${scale * 2.25}rem, ${scale * 5}vw, ${scale * 3.5}rem)` }}
        className="w-auto object-contain brightness-0 invert opacity-90"
      />
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
      {/* Partners Section */}
      <div className="py-14 md:py-16 lg:py-20">
        <div
          className={`transition-all duration-[1s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* OUR PARTNERS Label — matches eyebrow style used elsewhere on the site */}
          <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-white/70 text-center mb-10 md:mb-12">
            Our Partners
          </p>

          {/* Static 5-up row — evenly distributed across full width */}
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-y-10 gap-x-6 md:gap-x-8 lg:gap-x-10">
              {partners.map((partner, index) => (
                <PartnerItem
                  key={index}
                  name={partner.name}
                  src={partner.src}
                  scale={partner.scale}
                />
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
            <a
              href="https://www.instagram.com/sapphirelifeclub?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] md:text-[13px] font-medium tracking-[0.3em] uppercase text-white hover:text-white/70 transition-colors duration-300"
            >
              INSTAGRAM
            </a>
          </div>

          {/* Contact Line — stacked on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-sans text-[14px] md:text-[15px] font-light tracking-normal sm:tracking-[0.15em] text-white/90 mb-14 md:mb-16">
            <a href="mailto:hello@sapphirelife.org" className="hover:text-white transition-colors">
              hello@sapphirelife.org
            </a>
            <span aria-hidden className="hidden sm:inline text-white/40">|</span>
            <a href="tel:+15624490139" className="hover:text-white transition-colors">
              +1 (562) 449-0139
            </a>
          </div>

          {/* Bottom Line */}
          <div className="flex flex-col items-center gap-4 sm:gap-3">
            <div className="flex items-center gap-5 sm:gap-7">
              <Link
                href="/privacy"
                className="font-sans text-[11px] md:text-[12px] font-light tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <span aria-hidden className="text-white/35 text-[10px]">·</span>
              <Link
                href="/terms"
                className="font-sans text-[11px] md:text-[12px] font-light tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
            <p className="font-sans text-[11px] md:text-[12px] font-light tracking-[0.25em] uppercase text-white/70 text-center">
              © 2026 SAPPHIRE LIFE CLUB. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
