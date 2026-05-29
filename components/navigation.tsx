"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { label: "THE CLUB", href: "#club" },
  { label: "THE STORY", href: "#story" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "FLEET", href: "#fleet" },
  { label: "MEMBERSHIP", href: "#membership" },
  { label: "INQUIRY", href: "/inquiry" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links, let regular links navigate normally
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setIsMobileMenuOpen(false)
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.72)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(26, 58, 92, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 1px 12px rgba(26, 58, 92, 0.04)' : 'none',
      }}
    >
      {/* Full-width container with generous padding */}
      <div 
        className={`flex items-center justify-between w-full transition-all duration-300 ease-out ${
          isScrolled ? "h-[64px] px-8 lg:px-10 xl:px-12" : "h-[80px] px-10 lg:px-12 xl:px-14"
        }`}
      >
        {/* Logo - Left aligned */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/primary%20logo-3IPC5t1kUBdrtGdmn8Q5bkzws8KLhr.png"
            alt="Sapphire Life - Private Club in Newport Beach"
            width={200}
            height={50}
            style={{ width: 'auto' }}
            className={`transition-all duration-300 ease-out ${
              isScrolled
                ? "h-7 md:h-8 brightness-100"
                : "h-9 md:h-10 brightness-0 invert"
            }`}
            priority
          />
        </Link>

        {/* Desktop Navigation - Right aligned, grouped together */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-sans font-light uppercase transition-all duration-300 hover:text-[#00AEB6] ${
                isScrolled 
                  ? "text-[10px] tracking-[0.18em] text-[#1A3A5C]" 
                  : "text-[11px] tracking-[0.2em] text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden transition-colors duration-300 ${
            isScrolled ? "text-[#1A3A5C]" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(26, 58, 92, 0.08)',
        }}
      >
        <div className="px-10 py-10 flex flex-col gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[11px] font-sans font-light tracking-[0.2em] uppercase text-[#1A3A5C] hover:text-[#00AEB6] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
