"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";

const products = [
  {
    id: 1,
    name: "Cream Dark-Brown & Green Set",
    images: [
      "/design-1-full-1.JPG",
      "/design-1-full-2.JPG",
      "/design-1-top-1.JPG",
    ],
    pricing: {
      waistcoat: 550.0,
      pants: 750.0,
      fullAttire: 1300.0,
    },
    category: "traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Cream", "Dark-Brown", "Green"],
    description:
      "Handcrafted traditional set with intricate embroidery patterns. Perfect for cultural celebrations and formal occasions.",
  },
  {
    id: 2,
    name: "Cream Dark-Brown & Orange Set",
    images: [
      "/design-2-full-1.JPG",
      "/design-2-top-1.JPG",
      "/design-2-top-2.JPG",
    ],
    pricing: {
      waistcoat: 550.0,
      pants: 750.0,
      fullAttire: 1300.0,
    },
    category: "traditional",
    size: ["M", "L", "XL", "XXL"],
    color: ["Cream", "Dark-Brown", "Orange"],
    description:
      "Majestic ceremonial set with traditional embroidery. Ideal for weddings, ceremonies, and special events.",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Traditional African Menswear
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Discover our collection of authentic African traditional garments,
            each piece custom-tailored to celebrate your heritage with pride and
            elegance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} traditional garment sets - All
              custom-made to order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
