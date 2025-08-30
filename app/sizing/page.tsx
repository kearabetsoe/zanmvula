import { Navigation } from "@/components/navigation"
import { SizingCharts } from "@/components/sizing-charts"
import { MeasurementGuide } from "@/components/measurement-guide"

export default function SizingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Traditional Garment Sizing</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Find your perfect fit for authentic African traditional wear. Our comprehensive guide ensures your custom
              dashiki, agbada, or boubou fits with traditional elegance and modern comfort.
            </p>
          </div>

          <div className="space-y-12">
            <MeasurementGuide />
            <SizingCharts />
          </div>
        </div>
      </main>
    </div>
  )
}
