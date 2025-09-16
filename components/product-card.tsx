"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  images: string[];
  pricing: {
    waistcoat: number;
    pants: number;
    fullAttire: number;
  };
  category: string;
  size: string[];
  color: string[];
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<
    "waistcoat" | "pants" | "fullAttire"
  >("fullAttire");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.size[0] || "M");
  const [quantity, setQuantity] = useState(1);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const getSelectedPrice = () => {
    return product.pricing[selectedComponent];
  };

  const getComponentLabel = (component: string) => {
    switch (component) {
      case "waistcoat":
        return "Waistcoat";
      case "pants":
        return "Pants";
      case "fullAttire":
        return "2 Piece Set";
      default:
        return component;
    }
  };

  const handleAddToCart = () => {
    console.log("[v0] Adding item to cart:", {
      productId: product.id,
      selectedComponent,
      selectedSize,
      quantity,
      price: getSelectedPrice(),
    });

    const cartItem = {
      id: `${product.id}-${selectedComponent}-${selectedSize}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      component:
        selectedComponent === "fullAttire" ? "full" : selectedComponent,
      price: getSelectedPrice(),
      quantity: quantity,
      size: selectedSize,
      image: product.images[0],
    };

    console.log("[v0] Cart item created:", cartItem);

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("zanemvula-cart") || "[]"
      );
      console.log("[v0] Existing cart:", existingCart);

      const updatedCart = [...existingCart, cartItem];
      console.log("[v0] Updated cart:", updatedCart);

      localStorage.setItem("zanemvula-cart", JSON.stringify(updatedCart));
      console.log("[v0] Cart saved to localStorage");

      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);

      const cartEvent = new CustomEvent("cartUpdated", {
        detail: { cart: updatedCart, newItem: cartItem },
      });
      window.dispatchEvent(cartEvent);
      console.log("[v0] Cart updated event dispatched");
    } catch (error) {
      console.error("[v0] Error adding item to cart:", error);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-tl-lg rounded-tr-lg -mt-6">
          <div className="relative h-145">
            <img
              src={product.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isLiked ? "text-red-500" : "text-gray-600"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button> */}
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-balance">
            {product.name}
          </h3>
          {/* <p className="text-sm text-muted-foreground mb-3 text-pretty line-clamp-2">
            {product.description}
          </p> */}

          <div className="mb-4">
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
              Choose Item:
            </span>
            <div className="grid grid-cols-3 gap-1">
              {(["waistcoat", "pants", "fullAttire"] as const).map(
                (component) => (
                  <Button
                    key={component}
                    variant={
                      selectedComponent === component ? "default" : "outline"
                    }
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setSelectedComponent(component)}
                  >
                    {getComponentLabel(component)}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
              Select Size:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.size.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-8 min-w-[40px]"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs font-medium text-muted-foreground mb-2 block">
              Quantity:
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium min-w-[20px] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">
              R{(getSelectedPrice() * quantity).toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {getComponentLabel(selectedComponent)} × {quantity}
            </span>
          </div>

          <div className="mb-3 p-2 bg-muted/50 rounded-lg">
            <span className="text-xs font-medium text-muted-foreground block mb-1">
              Pricing Options:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-medium">Waistcoat</div>
                <div className="text-primary font-bold">
                  R{product.pricing.waistcoat}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Pants</div>
                <div className="text-primary font-bold">
                  R{product.pricing.pants}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">2 Piece Set</div>
                <div className="text-primary font-bold">
                  R {product.pricing.fullAttire}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-muted-foreground">
                Available Sizes:
              </span>
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
              <span className="text-xs font-medium text-muted-foreground">
                Colors:
              </span>
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
        <Button
          className={`w-full transition-all duration-300 ${
            isAddedToCart
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary/90"
          }`}
          onClick={handleAddToCart}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart - R{(getSelectedPrice() * quantity).toFixed(2)}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
