import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { TheStorySection } from "@/components/sections/the-story"
import { TheClubSection } from "@/components/sections/the-club"
import { TheExperienceSection } from "@/components/sections/the-experience"
import { FleetSection } from "@/components/sections/fleet"
import { MembershipSection } from "@/components/sections/membership"
import { NewportMapSection } from "@/components/sections/newport-map"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <TheClubSection />
      <TheStorySection />
      <TheExperienceSection />
      <FleetSection />
      <MembershipSection />
      <NewportMapSection />
      <Footer />
    </main>
  )
}
