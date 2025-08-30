"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "formal", label: "Formal Wear" },
  { value: "casual", label: "Casual Wear" },
  { value: "evening", label: "Evening Wear" },
  { value: "accessories", label: "Accessories" },
]

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex items-center justify-center">
            <Badge variant="outline">
              ${priceRange[0]} - ${priceRange[1]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              onCategoryChange("all")
              onPriceRangeChange([0, 500])
            }}
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
