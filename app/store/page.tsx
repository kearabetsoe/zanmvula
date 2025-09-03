"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";

const products = [
  {
    id: 1,
    name: "Royal Blue Traditional Set",
    images: [
      "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
      "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
      "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
    ],
    pricing: {
      waistcoat: 89.99,
      pants: 69.99,
      full: 149.99,
    },
    category: "traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Royal Blue", "Gold Trim"],
    description:
      "Handcrafted traditional set with intricate embroidery patterns. Perfect for cultural celebrations and formal occasions.",
  },
  {
    id: 2,
    name: "Cream & Gold Ceremonial Set",
    images: [
      "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
      "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
      "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
    ],
    pricing: {
      waistcoat: 129.99,
      pants: 89.99,
      full: 199.99,
    },
    category: "traditional",
    size: ["M", "L", "XL", "XXL"],
    color: ["Cream", "Gold", "Brown"],
    description:
      "Majestic ceremonial set with traditional embroidery. Ideal for weddings, ceremonies, and special events.",
  },
  {
    id: 3,
    name: "Kente Pattern Traditional Set",
    images: [
      "/traditional-kente-vest-with-authentic-african-patt.png",
      "/traditional-kente-vest-with-authentic-african-patt.png",
      "/traditional-kente-vest-with-authentic-african-patt.png",
    ],
    pricing: {
      waistcoat: 109.99,
      pants: 79.99,
      full: 169.99,
    },
    category: "traditional",
    size: ["S", "M", "L", "XL"],
    color: ["Multi-colored Kente"],
    description:
      "Authentic kente set featuring traditional Ghanaian patterns. Each piece tells a unique cultural story.",
  },
  {
    id: 4,
    name: "Earth Tones Elegant Set",
    images: [
      "/traditional-african-boubou-kaftan-in-earth-tones.png",
      "/traditional-african-boubou-kaftan-in-earth-tones.png",
      "/traditional-african-boubou-kaftan-in-earth-tones.png",
    ],
    pricing: {
      waistcoat: 99.99,
      pants: 74.99,
      full: 159.99,
    },
    category: "traditional",
    size: ["L", "XL", "XXL"],
    color: ["Brown", "Tan", "Orange"],
    description:
      "Comfortable and elegant set in rich earth tones. Perfect for both casual and formal wear.",
  },
  {
    id: 5,
    name: "Ankara Print Traditional Set",
    images: [
      "/colorful-african-ankara-print-shirt-with-tradition.png",
      "/colorful-african-ankara-print-shirt-with-tradition.png",
      "/colorful-african-ankara-print-shirt-with-tradition.png",
    ],
    pricing: {
      waistcoat: 79.99,
      pants: 59.99,
      full: 129.99,
    },
    category: "traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Various Ankara Prints"],
    description:
      "Vibrant ankara print set featuring bold African patterns. Custom tailored for the perfect fit.",
  },
  {
    id: 6,
    name: "Grand Ceremonial White Set",
    images: [
      "/grand-ceremonial-african-boubou-in-white-with-gold.png",
      "/grand-ceremonial-african-boubou-in-white-with-gold.png",
      "/grand-ceremonial-african-boubou-in-white-with-gold.png",
    ],
    pricing: {
      waistcoat: 159.99,
      pants: 119.99,
      full: 259.99,
    },
    category: "traditional",
    size: ["L", "XL", "XXL"],
    color: ["White", "Gold", "Black"],
    description:
      "Luxurious ceremonial set with exquisite hand-embroidered details. Perfect for special occasions.",
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
