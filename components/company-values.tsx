import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Leaf, Users, Award, Clock } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion for Quality",
    description:
      "Every garment is crafted with meticulous attention to detail, using only the finest materials and construction techniques.",
    highlight: "Premium Materials",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "We stand behind every piece we sell with comprehensive warranties and exceptional customer service.",
    highlight: "30-Day Guarantee",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description:
      "Committed to environmentally responsible manufacturing and sourcing practices that protect our planet.",
    highlight: "Eco-Friendly",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback.",
    highlight: "Personal Service",
  },
  {
    icon: Award,
    title: "Excellence in Craftsmanship",
    description: "Our skilled artisans bring decades of experience to create clothing that stands the test of time.",
    highlight: "Expert Tailoring",
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description:
      "We create pieces that transcend trends, focusing on classic styles that remain relevant season after season.",
    highlight: "Lasting Style",
  },
]

export function CompanyValues() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What We Stand For</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our values guide everything we do, from the materials we choose to the relationships we build with our
            customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <value.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <Badge variant="secondary">{value.highlight}</Badge>
                </div>
                <CardTitle className="text-lg text-balance">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
