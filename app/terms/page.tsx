import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Terms of Use | Sapphire Life Club",
  description:
    "Terms governing use of the Sapphire Life Club website, membership inquiries, and related communications.",
}

const sections = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing or using the Sapphire Life Club website (the \"Site\"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.",
    ],
  },
  {
    heading: "Nature of the Site",
    body: [
      "The Site provides general information about Sapphire Life Club and the opportunity to submit a membership inquiry. The Site is informational in nature and does not constitute an offer of membership, financial advice, or any other professional service.",
      "Membership in Sapphire Life Club is by invitation only and subject to a review process. Submitting an inquiry does not guarantee acceptance, and Sapphire Life Club reserves the right to decline any inquiry at its sole discretion without explanation.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All content on the Site — including text, imagery, video, design, logos, the Sapphire Life Club seal, and all associated marks — is owned by Sapphire Life Club or its licensors and is protected by United States and international intellectual property laws.",
      "You may view and print Site content for personal, non-commercial reference. Any other use, including reproduction, distribution, modification, or commercial use, requires our prior written permission.",
    ],
  },
  {
    heading: "Acceptable Use",
    body: [
      "You agree not to use the Site in any way that is unlawful, fraudulent, or harmful. You will not attempt to gain unauthorized access to any portion of the Site, interfere with its operation, or use it to transmit malicious code, spam, or harassing communications.",
    ],
  },
  {
    heading: "Inquiry Submissions",
    body: [
      "Information you submit through the inquiry form must be accurate and current. By submitting an inquiry, you authorize us to contact you using the information you have provided.",
      "We treat inquiry information in accordance with our Privacy Policy.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "The Site may contain links to third-party websites operated by partners or service providers. We are not responsible for the content, privacy practices, or terms of those external sites. Visiting them is at your own discretion.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The Site is provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, Sapphire Life Club disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Sapphire Life Club and its officers, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the Site, even if advised of the possibility of such damages.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms are governed by the laws of the State of California, without regard to its conflict-of-law principles. Any dispute arising under or relating to these Terms or your use of the Site will be resolved exclusively in the state or federal courts located in Orange County, California.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. The \"Last updated\" date below reflects the most recent revision. Continued use of the Site after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these Terms may be directed to hello@sapphirelife.org or +1 (562) 449-0139.",
    ],
  },
]

export default function TermsPage() {
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
          Terms of Use
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
