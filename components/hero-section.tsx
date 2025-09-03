import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-muted to-card">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/design-2-top-2.JPG')",
        }}
      />
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
          Embrace Your Heritage
        </h1>
        <p className="text-lg md:text-xl mb-8 text-pretty text-white">
          Authentic African traditional garments crafted with pride and
          precision. Custom-made pieces that honor your culture and celebrate
          your identity with timeless elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/store">View Collection</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 border-white text-white hover:bg-white/20"
          >
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
