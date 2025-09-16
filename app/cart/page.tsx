"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  productId: number
  productName: string
  component: "waistcoat" | "pants" | "full"
  price: number
  quantity: number
  size: string
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    console.log("[v0] Loading cart from localStorage")
    const savedCart = localStorage.getItem("zanemvula-cart")
    console.log("[v0] Raw cart data:", savedCart)

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log("[v0] Parsed cart:", parsedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("[v0] Failed to load cart from localStorage:", error)
        localStorage.removeItem("zanemvula-cart")
      }
    }
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("zanemvula-cart", JSON.stringify(cart))
    } else {
      localStorage.removeItem("zanemvula-cart")
    }

    // Dispatch cart update event for navigation
    window.dispatchEvent(new Event("cartUpdated"))
  }, [cart])

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getComponentDisplayName = (component: string) => {
    switch (component) {
      case "waistcoat":
        return "Waistcoat Only"
      case "pants":
        return "Pants Only"
      case "full":
        return "Full Attire Set"
      default:
        return "Full Attire Set"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/store">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart Items ({cart.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your cart is automatically saved. Items will remain here until you're ready to checkout.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Browse our collection of traditional African attire to get started.
              </p>
              <Link href="/store">
                <Button className="bg-primary hover:bg-primary/90">Browse Gallery</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded"
                    />
                    <div className="flex-1 w-full">
                      <h4 className="font-semibold text-lg">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{getComponentDisplayName(item.component)}</p>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      <p className="text-sm font-medium text-primary mt-1">R{item.price.toFixed(2)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        <span className="font-semibold text-lg">R{(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Subtotal:</span>
                  <span className="text-2xl font-bold text-primary">R{getCartTotal().toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  *Final pricing may vary based on custom measurements and traditional embellishments
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/store" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/checkout" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
