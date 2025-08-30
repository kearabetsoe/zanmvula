import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Creative Director",
    bio: "With over 15 years in fashion design, Sarah brings her passion for timeless elegance to every StyleHub collection.",
    image: "/professional-woman-fashion-designer.png",
    specialties: ["Design", "Quality Control", "Brand Vision"],
  },
  {
    name: "Marcus Chen",
    role: "Head of Operations",
    bio: "Marcus ensures every order is processed with care and delivered on time, managing our supply chain and logistics.",
    image: "/professional-operations-manager.png",
    specialties: ["Operations", "Logistics", "Customer Service"],
  },
  {
    name: "Elena Rodriguez",
    role: "Master Tailor",
    bio: "Elena's expertise in traditional tailoring techniques ensures every custom piece meets our exacting standards.",
    image: "/professional-woman-tailor-seamstress.png",
    specialties: ["Tailoring", "Alterations", "Custom Fitting"],
  },
  {
    name: "David Park",
    role: "Customer Experience Manager",
    bio: "David leads our customer service team, ensuring every interaction reflects our commitment to excellence.",
    image: "/professional-man-customer-service-manager.png",
    specialties: ["Customer Care", "Problem Solving", "Team Leadership"],
  },
]

export function TeamSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            The passionate professionals behind StyleHub who work tirelessly to bring you exceptional clothing and
            service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member) => (
            <Card key={member.name} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">{member.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Unique Designs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
