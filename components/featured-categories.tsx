import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  {
    name: "Dashiki & Shirts",
    description: "Traditional African shirts with authentic patterns",
    image: "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
    href: "/gallery",
  },
  {
    name: "Agbada & Robes",
    description: "Elegant flowing robes for special occasions",
    image: "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
    href: "/gallery",
  },
  {
    name: "Kente & Vests",
    description: "Handwoven Kente patterns in traditional vests",
    image: "/traditional-kente-vest-with-authentic-african-patt.png",
    href: "/gallery",
  },
  {
    name: "Boubou & Kaftans",
    description: "Comfortable traditional wear for daily elegance",
    image: "/traditional-african-boubou-kaftan-in-earth-tones.png",
    href: "/gallery",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Traditional African Garments</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our authentic collection of handcrafted African traditional wear, each piece telling a story of
            heritage and pride
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={category.href}>View Garments</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
