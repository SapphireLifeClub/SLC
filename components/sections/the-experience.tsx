"use client"

import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    number: "01",
    title: "PRIVATE HARBOR CRUISING",
    subtitle: "Exclusive coastal experiences.",
    image: "/private-harbor-cruising.png",
    video: "/private-harbor-cruising.mp4",
    objectPosition: "center center",
  },
  {
    number: "02",
    title: "EXECUTIVE HOSPITALITY",
    subtitle: "A refined private environment.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20023%28JB_19332%29-OgHDFspxku9bI8avjqeqltsol6IAds.jpg",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executive_hospitality_under20mb-H3Dh7Q0DWJfCW0fSYfXocHloEUrd5q.mp4",
    objectPosition: "center center",
  },
  {
    number: "03",
    title: "CREATIVE BUSINESS INITIATIVES",
    subtitle: "Ideas exchanged. Partnerships formed.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20028%28JB_19384%29-C5XnJtWmNWvmDyMC87hXlMRE7y5lPA.jpg",
    objectPosition: "center 35%",
  },
  {
    number: "04",
    title: "PHILANTHROPY & COMMUNITY",
    subtitle: "Meaningful engagement.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20112%28JB_10269%29-9TUcth5vYoFnj5K8VMaazlN58So0kn.jpg",
    objectPosition: "center center",
  },
  {
    number: "—",
    title: "ON THE WATER",
    subtitle: "A protected harbor of warm currents.",
    image: "/harbor-aerial.jpeg",
    objectPosition: "center center",
  },
  {
    number: "05",
    title: "SEASONAL MEMBER GATHERINGS",
    subtitle: "Curated experiences and traditions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20005%28JB_19098%29-8qmBdRuRzqzLhZ1lNwnjpSDNpk0mPE.jpg",
    objectPosition: "center 35%",
  },
  {
    number: "—",
    title: "QUIET MOMENTS",
    subtitle: "Unhurried hours by the sea.",
    image: "/quiet-moments.jpeg",
    objectPosition: "center 30%",
  },
  {
    number: "06",
    title: "CONCIERGE COORDINATION",
    subtitle: "Complete discretion.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20091%28JB_10102%29-6PYkRyhFG2lX5oGZL2tABro1i5PEk3.jpg",
    objectPosition: "center 40%",
  },
]

function ExperienceModule({ experience }: { experience: typeof experiences[0] }) {
  const [isVisible, setIsVisible] = useState(false)
  const moduleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (moduleRef.current) {
      observer.observe(moduleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={moduleRef}
      className="relative w-full h-[100svh]"
    >
      {/* Full-Bleed Background - Video or Image */}
      <div className="absolute inset-0">
        {experience.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={experience.image}
            className="w-full h-full object-cover"
            style={{ objectPosition: experience.objectPosition }}
          >
            <source src={experience.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: experience.objectPosition }}
          />
        )}
        {/* Subtle bottom gradient only - keeps media bright */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[35%]"
          style={{
            background: 'linear-gradient(to top, rgba(26, 58, 92, 0.5) 0%, rgba(26, 58, 92, 0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Bottom-Center Text Content - Centered, minimal, luxury */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 z-20 text-center transition-all duration-[1s] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          bottom: 'clamp(48px, 7vh, 64px)',
          width: '96%',
        }}
      >
        {/* Subtitle - Centered, Poppins Bold, subtle */}
        {experience.subtitle && (
          <p 
            className="font-sans text-[10px] md:text-[11px] lg:text-[12px] font-bold text-white/85 uppercase tracking-[0.2em] mb-3 md:mb-4"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            {experience.subtitle}
          </p>
        )}
        
        {/* Title - Ogg Thin, centered, 25% larger scale, single line on desktop */}
        <h3 
          style={{ 
            fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif",
            fontWeight: 100,
            textShadow: '0 2px 8px rgba(0,0,0,0.25)'
          }}
          className="text-[25px] sm:text-[30px] md:text-[52px] lg:text-[70px] xl:text-[80px] text-white tracking-[0.03em] sm:tracking-[0.04em] uppercase leading-[1.15] sm:leading-[1.05] lg:whitespace-nowrap"
        >
          {experience.title}
        </h3>
      </div>
    </div>
  )
}

export function TheExperienceSection() {
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
    <section id="experience" ref={sectionRef} className="bg-white">
      {/* Chapter Header — editorial transition into the image slides */}
      <div
        className={`mx-auto max-w-[820px] px-6 sm:px-8 text-center py-24 md:py-36 lg:py-44 transition-all duration-[1.4s] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#00AEB6] mb-7">
          THE EXPERIENCE
        </p>
        <h2
          style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
          className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] xl:text-[62px] font-light text-[#192952] tracking-[0.02em] leading-[1.1] mb-8"
        >
          A coastal life, curated.
        </h2>
        <p
          style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
          className="italic text-[16px] md:text-[18px] lg:text-[20px] font-light text-[#192952]/65 max-w-[560px] mx-auto leading-relaxed"
        >
          A year of private harbor cruising, hospitality, philanthropy, and
          quiet ritual &mdash; lived together.
        </p>
      </div>

      {experiences.map((experience) => (
        <ExperienceModule
          key={experience.title}
          experience={experience}
        />
      ))}
    </section>
  )
}
