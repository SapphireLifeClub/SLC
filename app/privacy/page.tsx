import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Sapphire Life Club",
  description:
    "How Sapphire Life Club collects, uses, and protects personal information submitted through our website and membership inquiry process.",
}

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "We collect information you voluntarily provide through our membership inquiry form, including your name, email address, phone number, professional or family affiliation, the nature of your inquiry, indicated asset level (optional), and how you were referred to us. We do not require asset disclosure and you may select \"Prefer not to disclose.\"",
      "We may also collect limited technical information automatically when you visit our website, such as your IP address, browser type, device type, and pages visited. This information is used to maintain site security and improve the visitor experience.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "Information submitted through the inquiry form is used solely to evaluate prospective members, respond to your inquiry, and communicate with you about Sapphire Life Club. We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
      "Aggregate, non-identifying analytics may be used to understand how visitors interact with our site and to improve our content and offerings.",
    ],
  },
  {
    heading: "How We Share Your Information",
    body: [
      "Your information is shared only with members of our membership review team and trusted service providers (such as email and form processing platforms) bound by appropriate confidentiality obligations.",
      "We may disclose information when required by law, court order, or to protect the rights, property, or safety of Sapphire Life Club, our members, or others.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain inquiry information for as long as reasonably necessary to evaluate your application and maintain our member relationship records. You may request deletion of your information at any time by contacting us at hello@sapphirelife.org.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the use of your personal information. California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what categories of information we collect and the right to request deletion.",
      "To exercise any of these rights, please contact us at hello@sapphirelife.org. We will respond within the timeframe required by applicable law.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We employ reasonable administrative, technical, and physical safeguards designed to protect the information you provide. However, no method of transmission over the Internet is fully secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses minimal cookies, primarily to support site functionality and basic analytics. You may disable cookies through your browser settings without affecting your ability to browse the public portions of the site.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The \"Last updated\" date below reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions or requests related to this Privacy Policy may be directed to hello@sapphirelife.org or +1 (562) 449-0139.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />
      <article className="mx-auto max-w-[820px] px-6 sm:px-10 lg:px-14 pt-32 md:pt-40 pb-24 md:pb-32">
        <p className="font-sans text-[11px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-[#00AEB6] mb-7">
          Legal
        </p>
        <h1
          style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
          className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-light text-[#192952] tracking-[0.02em] leading-[1.1] mb-6 md:mb-8"
        >
          Privacy Policy
        </h1>
        <p className="font-sans text-[13px] md:text-[14px] font-light text-[#192952]/55 mb-16 md:mb-20">
          Last updated: June 1, 2026
        </p>

        <div className="space-y-12 md:space-y-16">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2
                style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                className="text-[22px] md:text-[26px] lg:text-[28px] font-light text-[#192952] tracking-[0.01em] leading-[1.25] mb-5 md:mb-6"
              >
                {section.heading}
              </h2>
              <div className="space-y-4 md:space-y-5">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    style={{ fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif" }}
                    className="text-[16px] md:text-[17px] font-light text-[#192952]/75 leading-[1.85]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  )
}
