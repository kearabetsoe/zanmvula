"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ShoppingCart } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = (event?: CustomEvent) => {
      console.log("[v0] Updating cart count");
      try {
        const cart = JSON.parse(localStorage.getItem("zanemvula-cart") || "[]");
        console.log("[v0] Cart from localStorage:", cart);
        setCartCount(cart.length);
        console.log("[v0] Cart count updated to:", cart.length);
      } catch (error) {
        console.error("[v0] Error reading cart from localStorage:", error);
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount as EventListener);
    window.addEventListener("storage", updateCartCount as EventListener);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount as EventListener
      );
      window.removeEventListener("storage", updateCartCount as EventListener);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/sizing", label: "Sizing Chart" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-16 items-center justify-between px-4 md:justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="p-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[60vh] p-0 bg-background rounded-t-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center p-6 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col p-6 space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex-1">{item.label}</span>
                    <div className="w-2 h-2 rounded-full bg-primary/20 opacity-0 hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <Link
                  href="/cart"
                  className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex-1">Cart ({cartCount})</span>
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center space-x-2 md:space-x-2">
          <Image
            src="/logo.svg"
            alt="Zanemvula Logo"
            width={80}
            height={80}
            className="h-12 w-12 md:h-20 md:w-20 object-contain"
          />
          <span className="text-lg md:text-xl font-bold text-primary">
            Zanemvula
          </span>
        </Link>

        <Link href="/cart" className="md:hidden relative">
          <Button variant="ghost" size="icon" className="p-2">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
