import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CompanyStory() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Our Heritage
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            At Zanemvula, we believe in the power of heritage to shape identity
            and inspire pride. Our name, which directly translates to “bring
            rain” in isiXhosa, carries a deeper meaning—rain is life, rain is
            growth, and rain is prosperity. In the same way, our work is
            dedicated to nurturing cultural pride, dignity, and renewal.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mt-3">
            We specialize in crafting authentic Xhosa regalia for men, blending
            tradition with modern craftsmanship. Each piece is designed with
            respect for the rich cultural heritage of the amaXhosa while
            embracing contemporary style and functionality. Zanemvula is more
            than a brand—it is a cultural movement that honors the past while
            celebrating the future.
          </p>
        </div>

        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/design-2-full-1.JPG"
              alt="Traditional African garments"
              className="w-full h-200 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-balance">Our Inspiration</h2>
            <p className="text-muted-foreground text-pretty">
              Our inspiration comes from the timeless beauty, wisdom, and
              strength found within Xhosa traditions. Just as rain nourishes the
              earth, culture nourishes the soul. By creating regalia that speaks
              to both heritage and modern identity, we aim to inspire men to
              wear their culture with pride and confidence.
            </p>
            <p className="text-muted-foreground text-pretty">
              We are inspired by the resilience of our ancestors, the rhythm of
              African ceremonies, and the symbolism woven into every bead,
              fabric, and pattern. Zanemvula is a celebration of prosperity,
              unity, and growth—values that continue to guide us as we bring
              tradition to life for today’s generation.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/store">View Our Garments</Link>
            </Button>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              To honor and preserve African textile traditions while creating
              custom garments that allow men to celebrate their heritage with
              pride, authenticity, and uncompromising quality in every stitch.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
