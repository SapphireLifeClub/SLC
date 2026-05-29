"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saphire%20Life%20-%20%20Lorenzo%20Guerra%20030%28JB_19425%29-Mr5QGRjQB1t5xjm4kyxXlN26uVCraA.jpg"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/My_Movie1_v0_under20mb-rWj8mUK47SPa9uimYCDT1sFf35QVbq.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(25,41,82,0.32) 0%, rgba(25,41,82,0.08) 38%, rgba(25,41,82,0.18) 75%, rgba(25,41,82,0.55) 100%)',
          }}
        />
      </div>

      {/* Content - Simplified Editorial Hero */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <div
          className={`transition-all duration-[1.5s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Eyebrow */}
          <p className="font-sans text-[10px] font-light tracking-[0.4em] uppercase text-white/70 mb-8">
            NEWPORT HARBOR, CALIFORNIA
          </p>

          {/* Main Headline - Larger, more spacious */}
          <h1 
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-normal text-white tracking-[0.12em] leading-[1.15] mb-7 max-w-4xl uppercase"
          >
            A PRIVATE COMMUNITY<br className="hidden md:block" /> ON THE WATER
          </h1>

          {/* Subline */}
          <p
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-base md:text-lg lg:text-xl font-light italic text-white/85 mb-12 max-w-[640px] mx-auto leading-relaxed"
          >
            A curated coastal life — private socializing, family warmth,
            and butler-style service by the sea.
          </p>

          {/* CTA - Minimal and refined */}
          <a
            href="#inquiry"
            className={`inline-block border border-white/60 px-10 py-3.5 text-[10px] font-sans font-light tracking-[0.25em] uppercase text-white/90 hover:bg-white/10 hover:border-white/80 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Request a Private Introduction
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-[#00AEB6] to-transparent" />
      </div>
    </section>
  )
}
