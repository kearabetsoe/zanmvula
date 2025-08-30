"use client"

import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Dashiki Shirt - Royal Blue",
    price: 89.99,
    category: "traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Royal Blue", "Gold Trim"],
    image: "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
    description:
      "Handcrafted traditional dashiki shirt with intricate embroidery patterns. Perfect for cultural celebrations and formal occasions.",
  },
  {
    id: 2,
    name: "Agbada Robe - Cream & Gold",
    price: 249.99,
    category: "traditional",
    size: ["M", "L", "XL", "XXL"],
    color: ["Cream", "Gold", "Brown"],
    image: "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
    description:
      "Majestic flowing agbada robe with traditional embroidery. Ideal for weddings, ceremonies, and special events.",
  },
  {
    id: 3,
    name: "Kente Vest - Traditional Pattern",
    price: 129.99,
    category: "traditional",
    size: ["S", "M", "L", "XL"],
    color: ["Multi-colored Kente"],
    image: "/traditional-kente-vest-with-authentic-african-patt.png",
    description:
      "Authentic kente vest featuring traditional Ghanaian patterns. Each piece tells a unique cultural story.",
  },
  {
    id: 4,
    name: "Boubou Kaftan - Earth Tones",
    price: 179.99,
    category: "traditional",
    size: ["L", "XL", "XXL"],
    color: ["Brown", "Tan", "Orange"],
    image: "/traditional-african-boubou-kaftan-in-earth-tones.png",
    description: "Comfortable and elegant boubou kaftan in rich earth tones. Perfect for both casual and formal wear.",
  },
  {
    id: 5,
    name: "Ankara Print Shirt",
    price: 69.99,
    category: "traditional",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Various Ankara Prints"],
    image: "/colorful-african-ankara-print-shirt-with-tradition.png",
    description: "Vibrant ankara print shirt featuring bold African patterns. Custom tailored for the perfect fit.",
  },
  {
    id: 6,
    name: "Grand Boubou - Ceremonial",
    price: 299.99,
    category: "traditional",
    size: ["L", "XL", "XXL"],
    color: ["White", "Gold", "Black"],
    image: "/grand-ceremonial-african-boubou-in-white-with-gold.png",
    description:
      "Luxurious ceremonial grand boubou with exquisite hand-embroidered details. Perfect for special occasions.",
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Traditional African Menswear</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Discover our collection of authentic African traditional garments, each piece custom-tailored to celebrate
            your heritage with pride and elegance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} traditional garments - All custom-made to order
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
  )
}
