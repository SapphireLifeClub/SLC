"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { NewportMapSection } from "@/components/sections/newport-map"
import { Footer } from "@/components/sections/footer"

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

export default function InquiryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "",
    inquiryType: "",
    assetLevel: "",
    referralSource: "",
    referrerName: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.inquiryType) newErrors.inquiryType = "Please select inquiry type"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/private-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          affiliation: "",
          inquiryType: "",
          assetLevel: "",
          referralSource: "",
          referrerName: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "referralSource" && !requiresReferrerName(value) ? { referrerName: "" } : {}),
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <main className="bg-white">
      <Navigation />
      
      {/* Spacer for fixed nav */}
      <div className="h-20" />
      
      {/* Premium Full-Width Inquiry Section */}
      <section className="min-h-screen">
        {/* Header Area - Clean white background */}
        <div className="pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-20">
          <div
            className={`mx-auto max-w-[900px] px-8 lg:px-12 text-center transition-all duration-[1.2s] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-[#00AEB6] mb-6">
              PRIVATE INQUIRY
            </p>
            <h1 
              style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
              className="text-[28px] md:text-[36px] lg:text-[42px] font-normal text-[#1A3A5C] tracking-[0.04em] leading-[1.15] uppercase mb-8"
            >
              Apply for Membership
            </h1>
            <p className="font-serif text-[15px] md:text-[16px] font-light text-[#1A3A5C]/65 leading-[1.85] max-w-[620px] mx-auto">
              Membership consideration begins with a private introduction. All inquiries are reviewed personally and handled with complete discretion.
            </p>
          </div>
        </div>

        {/* Form Area - Wide horizontal layout, premium editorial contact page */}
        <div className="bg-white pb-20 md:pb-28 lg:pb-32">
          <div
            className={`mx-auto max-w-[1100px] px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 transition-all duration-[1.2s] ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {submitStatus === "success" ? (
              <div className="text-center py-16 md:py-24">
                <p className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#00AEB6] mb-6">
                  INQUIRY RECEIVED
                </p>
                <h2 
                  style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                  className="text-[24px] md:text-[30px] font-normal text-[#1A3A5C] tracking-[0.04em] leading-[1.2] mb-6"
                >
                  Thank you for your inquiry.
                </h2>
                <p className="font-serif text-[15px] font-light text-[#1A3A5C]/60 leading-[1.8] max-w-[480px] mx-auto">
                  We have received your request and will respond with discretion within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-14 md:space-y-16 lg:space-y-18">
                {/* Row 1: Name / Email - Wide horizontal layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      NAME <span className="text-[#00AEB6]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/30"
                      placeholder="Full Name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-[11px] font-sans text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      EMAIL <span className="text-[#00AEB6]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/30"
                      placeholder="Email Address"
                    />
                    {errors.email && (
                      <p className="mt-2 text-[11px] font-sans text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone / Affiliation - Wide horizontal layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/30"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      AFFILIATION
                    </label>
                    <input
                      type="text"
                      name="affiliation"
                      value={formData.affiliation}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/30"
                      placeholder="Company or Organization"
                    />
                  </div>
                </div>

                {/* Row 3: Nature of Inquiry - Full Width */}
                <div>
                  <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                    NATURE OF INQUIRY <span className="text-[#00AEB6]">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(26,58,92,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0 center',
                    }}
                  >
                    <option value="" disabled className="bg-white text-[#1A3A5C]/40">Select Inquiry Type</option>
                    <option value="Individual Membership" className="bg-white text-[#1A3A5C]">Individual Membership</option>
                    <option value="Corporate Membership" className="bg-white text-[#1A3A5C]">Corporate Membership</option>
                    <option value="General Inquiry" className="bg-white text-[#1A3A5C]">General Inquiry</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="mt-2 text-[11px] font-sans text-red-500">{errors.inquiryType}</p>
                  )}
                </div>

                {/* Row 4: Asset Level / Referral Source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      ASSET LEVEL
                    </label>
                    <select
                      name="assetLevel"
                      value={formData.assetLevel}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(26,58,92,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0 center',
                      }}
                    >
                      <option value="" disabled className="bg-white text-[#1A3A5C]/40">Select Asset Level</option>
                      {ASSET_LEVEL_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-white text-[#1A3A5C]">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      REFERRAL SOURCE
                    </label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors appearance-none cursor-pointer"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(26,58,92,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0 center',
                      }}
                    >
                      <option value="" disabled className="bg-white text-[#1A3A5C]/40">How did you hear about us?</option>
                      {REFERRAL_SOURCE_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-white text-[#1A3A5C]">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {requiresReferrerName(formData.referralSource) && (
                  <div>
                    <label className="block font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A3A5C]/45 mb-4">
                      NAME OF REFERRER
                    </label>
                    <input
                      type="text"
                      name="referrerName"
                      value={formData.referrerName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A3A5C]/15 pb-3 font-serif text-[16px] text-[#1A3A5C] focus:outline-none focus:border-[#00AEB6] transition-colors placeholder:text-[#1A3A5C]/30"
                      placeholder="Name of member or partner"
                    />
                  </div>
                )}

                {/* Submit Button + Error State */}
                <div className="pt-6 md:pt-8 flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border border-[#00AEB6] bg-transparent text-[#00AEB6] px-14 py-5 text-[11px] font-sans font-medium tracking-[0.22em] uppercase hover:bg-[#00AEB6] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Apply for Membership"}
                  </button>
                  
                  {submitStatus === "error" && (
                    <p className="text-[12px] font-sans text-red-500">
                      There was an error submitting your inquiry. Please try again.
                    </p>
                  )}
                </div>

                {/* Confidentiality Notice */}
                <div className="text-center pt-8">
                  <p className="font-serif text-[12px] font-light text-[#1A3A5C]/35 italic leading-relaxed">
                    All inquiries are reviewed personally and responded to with discretion.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* Newport Harbor Map Section */}
      <NewportMapSection />

      <Footer />
    </main>
  )
}
