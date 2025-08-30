"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  category: string
  size: string[]
  color: string[]
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isLiked ? "text-red-500" : "text-gray-600"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-balance">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 text-pretty line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-muted-foreground">Available Sizes:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.size.slice(0, 4).map((size) => (
                  <Badge key={size} variant="outline" className="text-xs">
                    {size}
                  </Badge>
                ))}
                {product.size.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.size.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground">Colors:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.color.slice(0, 3).map((color) => (
                  <Badge key={color} variant="secondary" className="text-xs">
                    {color}
                  </Badge>
                ))}
                {product.color.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.color.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/order?product=${product.id}`}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Order Now
          </Link>
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
