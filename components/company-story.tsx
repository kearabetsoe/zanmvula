import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CompanyStory() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Heritage</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Rooted in African tradition and crafted with pride, Zanemvula has been preserving and celebrating authentic
            African menswear since 2025, honoring our ancestors while embracing modern craftsmanship.
          </p>
        </div>

        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/traditional-african-dashiki-shirt-in-royal-blue-wi.png"
              alt="Traditional African garments"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-balance">Preserving Tradition Since 2025</h2>
            <p className="text-muted-foreground text-pretty">
              Founded by Kwame Asante, a master tailor from Ghana, Zanemvula began as a mission to preserve and share
              the rich tradition of African menswear. Growing up surrounded by the vibrant textiles and time-honored
              techniques of his homeland, Kwame envisioned bringing authentic African craftsmanship to men seeking to
              connect with their heritage.
            </p>
            <p className="text-muted-foreground text-pretty">
              Today, we continue that legacy by creating custom traditional garments using authentic patterns, premium
              fabrics, and techniques passed down through generations. Each dashiki, agbada, and boubou tells a story of
              cultural pride and artistic excellence.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/gallery">View Our Garments</Link>
            </Button>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              To honor and preserve African textile traditions while creating custom garments that allow men to
              celebrate their heritage with pride, authenticity, and uncompromising quality in every stitch.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
