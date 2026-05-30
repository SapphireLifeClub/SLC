"use client"

import { useEffect, useRef, useState } from "react"
import { isBackForwardNavigation } from "@/lib/navigation"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(() => isBackForwardNavigation())
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)

    const tryPlay = () => {
      const v = videoRef.current
      if (!v) return
      v.muted = true
      v.defaultMuted = true
      const p = v.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
    }
    tryPlay()
    const rafId = requestAnimationFrame(tryPlay)
    const retry = setTimeout(tryPlay, 300)

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setIsVisible(true)
      tryPlay()
    }
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay()
    }
    const onFirstTouch = () => {
      tryPlay()
    }
    window.addEventListener("pageshow", onPageShow)
    document.addEventListener("visibilitychange", onVisibility)
    document.addEventListener("touchstart", onFirstTouch, { once: true, passive: true })
    document.addEventListener("click", onFirstTouch, { once: true })
    return () => {
      clearTimeout(timer)
      clearTimeout(retry)
      cancelAnimationFrame(rafId)
      window.removeEventListener("pageshow", onPageShow)
      document.removeEventListener("visibilitychange", onVisibility)
      document.removeEventListener("touchstart", onFirstTouch)
      document.removeEventListener("click", onFirstTouch)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // @ts-ignore - non-standard but required for iOS WebKit
          webkit-playsinline="true"
          // @ts-ignore - non-standard but required for some Android browsers
          x5-playsinline="true"
          disablePictureInPicture
          onLoadedMetadata={(e) => {
            const v = e.currentTarget
            v.muted = true
            const p = v.play()
            if (p && typeof p.catch === "function") p.catch(() => {})
          }}
          onCanPlay={(e) => {
            const v = e.currentTarget
            if (v.paused) {
              const p = v.play()
              if (p && typeof p.catch === "function") p.catch(() => {})
            }
          }}
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover bg-[#192952]"
        >
          <source src="/hero.mp4" type="video/mp4" />
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-8 text-center w-full">
        <div
          className={`transition-all duration-[1.5s] ease-out w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Eyebrow */}
          <p className="font-sans text-[10px] sm:text-[12px] md:text-[13px] font-light tracking-[0.35em] sm:tracking-[0.5em] uppercase text-white/80 mb-6 sm:mb-10">
            NEWPORT HARBOR · CALIFORNIA
          </p>

          {/* Main Headline */}
          <h1
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-[30px] sm:text-[40px] md:text-[60px] lg:text-[78px] xl:text-[88px] font-normal text-white tracking-[0.04em] sm:tracking-[0.08em] leading-[1.15] mb-6 sm:mb-10 max-w-5xl uppercase mx-auto"
          >
            A Private Community<br className="hidden md:block" /> On the Water
          </h1>

          {/* Subline */}
          <p
            style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
            className="text-[15px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-light italic text-white/90 mb-10 sm:mb-14 max-w-[720px] mx-auto leading-[1.55] px-2 sm:px-0"
          >
            A curated coastal life — private socializing, family warmth, and butler-style service by the sea.
          </p>

          {/* CTA */}
          <a
            href="/inquiry"
            className="group relative inline-flex items-center gap-2 sm:gap-3 overflow-hidden border border-white/70 px-6 sm:px-12 py-3 sm:py-4 text-[10px] sm:text-[12px] md:text-[13px] font-sans font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white transition-[border-color,color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white hover:text-[#1A3A5C] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white/90 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            <span className="relative">Apply for Membership</span>
            <span
              aria-hidden
              className="relative inline-block translate-x-0 opacity-70 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:opacity-100"
            >
              →
            </span>
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
