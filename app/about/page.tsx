import { Navigation } from "@/components/navigation"
import { CompanyStory } from "@/components/company-story"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <CompanyStory />
      </main>
    </div>
  )
}
