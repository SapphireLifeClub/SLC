"use client"

import { useEffect, useRef, useState } from "react"

const ASSET_LEVEL_OPTIONS = [
  "Under $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M - $25M",
  "$25M+",
  "Prefer not to disclose",
]

const REFERRAL_SOURCE_OPTIONS = [
  "Referred by a Member",
  "Referred by a Partner",
  "Private Event",
  "Family Office / Advisor",
  "Online Search",
  "Social Media",
  "Other",
]

const requiresReferrerName = (source: string) =>
  source === "Referred by a Member" || source === "Referred by a Partner"

export function PrivateInquirySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [referralSource, setReferralSource] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      affiliation: formData.get("affiliation") as string,
      inquiryType: formData.get("inquiryType") as string,
      assetLevel: formData.get("assetLevel") as string,
      referralSource: formData.get("referralSource") as string,
      referrerName: formData.get("referrerName") as string,
    }

    try {
      const response = await fetch("/api/private-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        formRef.current?.reset()
        setReferralSource("")
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="inquiry"
      ref={sectionRef}
      className="bg-[#FAFBFC]"
    >
      {/* Inquiry Form - Private Invitation Style, integrated heading */}
      <div className="py-24 md:py-32 lg:py-40">
        <div
          className={`mx-auto max-w-[720px] px-8 lg:px-12 transition-all duration-[1.2s] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Soft Panel Container */}
          <div className="bg-[#FDFDFB] py-12 md:py-16 px-8 md:px-14 lg:px-16 border border-[#1A3A5C]/[0.04]">
            
            {/* Section label and intro - integrated into card */}
            <div className="text-center mb-14 md:mb-16">
              <p className="font-sans text-[9px] font-light tracking-[0.3em] uppercase text-[#00AEB6] mb-6">
                PRIVATE INQUIRY
              </p>
              <p className="font-serif text-sm md:text-[15px] font-light text-[#1A3A5C]/75 leading-[1.9] mb-5">
                Membership consideration begins with a private introduction.
              </p>
              <p className="font-serif text-[13px] md:text-sm font-light text-[#1A3A5C]/55 leading-[1.8] max-w-[520px] mx-auto">
                Sapphire Life Club welcomes inquiries from executives, investors, family offices, and organizations whose values and professional standing are consistent with the standards of the club.
              </p>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              {/* Row 1: Name / Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/25"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/25"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              {/* Row 2: Phone / Affiliation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/25"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    AFFILIATION
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/25"
                    placeholder="Company or Organization"
                  />
                </div>
              </div>

              {/* Row 3: Nature of Inquiry - Full Width */}
              <div>
                <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                  NATURE OF INQUIRY
                </label>
                <select
                  name="inquiryType"
                  required
                  className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-[#1A3A5C]/25">Select Inquiry Type</option>
                  <option value="membership">Individual Membership</option>
                  <option value="corporate">Corporate Membership</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              {/* Row 4: Asset Level / Referral Source */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    ASSET LEVEL
                  </label>
                  <select
                    name="assetLevel"
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-[#1A3A5C]/25">Select Asset Level</option>
                    {ASSET_LEVEL_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    REFERRAL SOURCE
                  </label>
                  <select
                    name="referralSource"
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                    value={referralSource}
                    onChange={(event) => setReferralSource(event.target.value)}
                  >
                    <option value="" disabled className="text-[#1A3A5C]/25">How did you hear about us?</option>
                    {REFERRAL_SOURCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Referrer Name - Conditional Optional Text Input */}
              {requiresReferrerName(referralSource) && (
                <div>
                  <label className="block font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#1A3A5C]/50 mb-4">
                    NAME OF REFERRER
                  </label>
                  <input
                    type="text"
                    name="referrerName"
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[15px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/25"
                    placeholder="Name of member or partner"
                  />
                </div>
              )}

              {/* Submit Button - Centered */}
              <div className="pt-6 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00AEB6] text-white px-14 py-4 text-[10px] font-sans font-medium tracking-[0.22em] uppercase hover:bg-[#37BBD2] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Request a Private Introduction"}
                </button>
                {submitStatus === "success" && (
                  <p className="font-serif text-[13px] text-[#00AEB6]">
                    Thank you. Your inquiry has been received.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="font-serif text-[13px] text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>

            {/* Subtle Stamp Seal - Bottom Center */}
            <div className="flex justify-center mt-14 md:mt-16">
              <div className="w-[75px] h-[75px] opacity-[0.12]">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stamp-DlzIu9NKkMzSVUh4JvakRLpzDYpPjO.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Confidentiality Notice */}
          <div className="text-center mt-10 md:mt-12">
            <p className="font-serif text-[12px] md:text-[13px] font-light text-[#1A3A5C]/45 italic leading-relaxed">
              All inquiries are reviewed personally and responded to with discretion.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
