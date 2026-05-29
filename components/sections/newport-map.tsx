"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

/**
 * Map panel — light editorial paper aesthetic.
 * Map image is pale; white overlay text doesn't work. Instead we use the
 * map as a backdrop and place the editorial text on a sapphire side panel
 * (desktop) or a soft-cream caption strip (mobile). RH-style cartography.
 */
function MapPanel() {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="bg-white">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-14 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-0 lg:gap-0 shadow-[0_1px_24px_rgba(25,41,82,0.06)]">
          {/* Map — dominant left/top */}
          <div
            className={`w-full lg:w-[68%] relative transition-all duration-[1.4s] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '5 / 4' }}
            >
              <Image
                src="/harbor-map.png"
                alt="Newport Beach map showing Sapphire Life Club's harbor location on the Balboa Peninsula"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1020px, 100vw"
              />
            </div>
          </div>

          {/* Editorial sapphire panel — right on desktop, bottom on mobile */}
          <div
            className={`w-full lg:w-[32%] bg-[#192952] text-white flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-12 xl:px-16 py-14 lg:py-0 transition-all duration-[1.4s] ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-white/65 mb-7">
              OUR HARBOR
            </p>
            <h2
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[38px] xl:text-[46px] font-light tracking-[0.02em] leading-[1.1] mb-7"
            >
              Newport Beach,
              <br />
              California.
            </h2>
            <p
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="italic text-[16px] md:text-[18px] lg:text-[17px] xl:text-[19px] font-light text-white/80 leading-relaxed mb-8"
            >
              Anchored on the Balboa Peninsula at the mouth of Newport Harbor.
            </p>

            {/* Coordinates / location detail — small editorial flourish */}
            <div className="pt-7 border-t border-white/15">
              <p className="font-sans text-[11px] font-medium tracking-[0.35em] uppercase text-white/55 mb-2">
                33.6°N · 117.9°W
              </p>
              <p
                style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                className="italic text-[14px] font-light text-white/55"
              >
                Pacific Ocean &mdash; Newport Harbor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NewportMapSection() {
  return (
    <section className="bg-white">
      <MapPanel />
    </section>
  )
}
