"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { isBackForwardNavigation } from "@/lib/navigation"

const vessels = [
  {
    name: "AEOLUS",
    eyebrow: "THE FLEET",
    category: "Excess 15 Catamaran",
    description: "A contemporary sailing catamaran offering exceptional space and stability for coastal entertaining.",
    mainImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lagoon-60-slider-06-1920x720_0-uky4za90XKl1hZWqBruZNaXamC5v4i.jpg",
    accentImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20059%28JB_19845%29-MS54FtxD70XO1aDTEo2bmLGWcQcrZ2.jpg",
    mainPosition: "center center",
    accentPosition: "center center",
  },
  {
    name: "FAN CLUB",
    eyebrow: "THE FLEET",
    category: "Premium Sailing Vessel",
    description: "Classic sailing heritage combined with modern luxury for intimate coastal experiences.",
    mainImage: "/fan-club-main.png",
    accentImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG1543-4WobMtNocgABlJA3coN2TizZsnm4Sy.jpg",
    mainPosition: "center center",
    accentPosition: "center center",
  },
  {
    name: "OCEAN HEART",
    eyebrow: "THE FLEET",
    category: "Luxury Motor Yacht",
    description: "Refined motor yacht accommodations for executive gatherings and seamless client hospitality.",
    mainImage: "/ocean-heart-main.png",
    accentImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG1540-rYqAuYCnMkPpSSKQSSpBBLEF3cqbOG.jpg",
    mainPosition: "center center",
    accentPosition: "center center",
  },
  {
    name: "PEDAZO FINO",
    eyebrow: "THE FLEET",
    category: "Executive Day Cruiser",
    description: "Agile and refined. Perfect for spontaneous excursions throughout the harbor.",
    mainImage: "/pedazo-fino-aerial.png",
    accentImage: "/pedazo-fino-accent.png",
    mainPosition: "center center",
    accentPosition: "center 65%",
    accentScale: 2.2,
  },
]

function VesselSpread({ vessel, index }: { vessel: typeof vessels[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const spreadRef = useRef<HTMLDivElement>(null)
  
  // Vessels 0, 2 = main image LEFT; Vessels 1, 3 = main image RIGHT
  const mainImageLeft = index % 2 === 0

  useEffect(() => {
    const el = spreadRef.current
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
    <div
      ref={spreadRef}
      className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20"
    >
      {/* Desktop: Cinematic 2-column layout - 66% image / 34% editorial */}
      {/* Mobile: Single column with reordered content: image → text → accent */}
      <div className={`flex flex-col lg:flex-row lg:items-stretch gap-8 md:gap-12 lg:gap-20 xl:gap-24 ${
        mainImageLeft ? '' : 'lg:flex-row-reverse'
      }`}>

        {/* Large Main Image - Dominant cinematic visual */}
        <div
          className={`w-[94vw] md:w-full lg:w-[66%] mx-auto md:mx-0 flex-shrink-0 transition-all duration-[1.4s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative w-full overflow-hidden h-[340px] sm:h-[400px] md:h-[520px] lg:h-auto">
            <img
              src={vessel.mainImage}
              alt={vessel.name}
              className="w-full h-full object-cover lg:min-h-[clamp(560px,62vw,780px)]"
              style={{ objectPosition: vessel.mainPosition }}
            />
          </div>
        </div>

        {/* Right/Left Column: Text + Accent Image */}
        <div
          className={`w-full lg:w-[34%] flex flex-col lg:pt-6 xl:pt-10 transition-all duration-[1.4s] ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Small Accent Image - Hidden on mobile, shown on desktop */}
          <div
            className="hidden md:block w-full max-w-[260px] xl:max-w-[280px] mb-10 lg:mb-14"
            style={{ marginLeft: mainImageLeft ? '0' : 'auto', marginRight: mainImageLeft ? 'auto' : '0' }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={vessel.accentImage}
                alt={`${vessel.name} detail`}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: vessel.accentPosition,
                  transform: vessel.accentScale ? `scale(${vessel.accentScale})` : undefined,
                  transformOrigin: vessel.accentPosition,
                }}
              />
            </div>
          </div>

          {/* Text Block - Centered on mobile, aligned on desktop */}
          <div
            className={`max-w-[440px] md:max-w-[520px] mx-auto md:mx-0 text-center md:text-left ${mainImageLeft ? 'lg:text-left' : 'lg:text-right'}`}
            style={{ marginLeft: mainImageLeft ? undefined : 'auto', marginRight: mainImageLeft ? 'auto' : undefined }}
          >
            {/* Eyebrow */}
            <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#00AEB6] mb-6 md:mb-7">
              {vessel.eyebrow}
            </p>

            {/* Vessel Name */}
            <h3
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[32px] sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[60px] font-light text-[#192952] tracking-[0.03em] mb-5 md:mb-6 leading-[1.05]"
            >
              {vessel.name}
            </h3>

            {/* Category */}
            <p
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[16px] md:text-[18px] lg:text-[19px] font-light text-[#192952]/55 italic mb-8 md:mb-9"
            >
              {vessel.category}
            </p>

            {/* Description */}
            <p className="font-sans text-[15px] md:text-[16px] lg:text-[17px] font-light text-[#192952]/70 leading-[1.85]">
              {vessel.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CaptainBand() {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const ref = useRef<HTMLDivElement>(null)

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
      { threshold: 0.2 }
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
    <div className="bg-[#FAFBFC] py-24 md:py-36 lg:py-48">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 transition-all duration-[1.4s] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-20 lg:gap-28">
          {/* Tall editorial portrait — 4:5 aspect to preserve the framing */}
          <div className="flex-shrink-0 mx-auto md:mx-0 w-full max-w-[320px] sm:max-w-[360px] md:w-[340px] lg:w-[400px] xl:w-[440px]">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '4 / 5' }}
            >
              <Image
                src="/captain-mike.png"
                alt="Captain Mike Freeman at the helm"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
          </div>

          {/* Editorial text block — vertically centered against the portrait */}
          <div className="flex-1 max-w-[560px] text-center md:text-left">
            <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#00AEB6] mb-7">
              HARBOR STEWARDSHIP
            </p>
            <h3
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] font-light text-[#192952] tracking-[0.03em] mb-8 leading-[1.05]"
            >
              Captain Mike
            </h3>
            <div className="font-sans text-[15px] md:text-[16px] lg:text-[17px] font-light text-[#192952]/70 leading-[1.85] space-y-5">
              <p>
                Michael &ldquo;Captain Mike&rdquo; Freeman is a U.S. Coast Guard&ndash;licensed
                100-Ton Master, marine entrepreneur, certified ASA Instructor, and
                founder of Freeman Marine Institute.
              </p>
              <p>
                As a partner in Sapphire Life, Captain Mike brings decades of
                experience in commercial vessel ownership, private yachting, fleet
                operations, international passage-making, marine education, and
                professional seamanship to the club&rsquo;s private member experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [headerVisible, setHeaderVisible] = useState(() => isBackForwardNavigation())
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh && rect.bottom > 0) {
      setHeaderVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setHeaderVisible(true)
    }
    window.addEventListener("pageshow", onPageShow)
    return () => {
      observer.disconnect()
      window.removeEventListener("pageshow", onPageShow)
    }
  }, [])

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="bg-white"
    >
      {/* Chapter Header — Vessel Intro */}
      <div className="pt-24 md:pt-36 lg:pt-48">
        <div
          ref={headerRef}
          className={`mx-auto max-w-[1400px] px-6 sm:px-8 md:px-12 lg:px-16 text-center transition-all duration-[1.4s] ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#00AEB6] mb-7">
            THE FLEET
          </p>
          <h2
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] xl:text-[58px] font-light text-[#192952] tracking-[0.02em] leading-[1.1] max-w-[820px] mx-auto"
          >
            Four Vessels. One Standard of Stewardship.
          </h2>
        </div>
      </div>

      {/* Vertically Stacked Editorial Vessel Spreads */}
      <div className="flex flex-col gap-28 md:gap-44 lg:gap-56 pt-20 md:pt-32 lg:pt-44 pb-24 md:pb-36 lg:pb-48">
        {vessels.map((vessel, index) => (
          <VesselSpread
            key={vessel.name}
            vessel={vessel}
            index={index}
          />
        ))}
      </div>

      {/* Captain Mike — closing stewardship note, before ON MEMBERSHIP */}
      <CaptainBand />
    </section>
  )
}
