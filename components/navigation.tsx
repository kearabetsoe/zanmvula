"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/sizing", label: "Sizing Chart" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-25 md:h-40 items-center justify-between px-0 md:justify-between">
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
              {/* <div className="flex items-center justify-center p-6 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button> 
              </div> */}

              {/* Modern navigation menu */}
              <nav className="flex flex-col p-6 space-y-1 mt-10">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-3xl font-bold text-center text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 border-l-4 border-transparent hover:border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex-1">{item.label}</span>
                    <div className="w-2 h-2 rounded-full bg-primary/20 opacity-0 hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
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
            className="h-40 w-40 md:h-70 md:w-70 object-contain"
          />
        </Link>

        <div className="w-10 md:hidden"></div>

        {/* Desktop Navigation - unchanged */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-base text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
