"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  User,
  MapPin,
  Ruler,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const orderReference = `ZMV-${Date.now()}`;

interface CartItem {
  id: string;
  productId: number;
  productName: string;
  component: "waistcoat" | "pants" | "full";
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  sleeves: string;
  inseam: string;
  specialRequests: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
    sleeves: "",
    inseam: "",
    specialRequests: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("zanemvula-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  const updateFormData = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getComponentDisplayName = (component: string) => {
    switch (component) {
      case "waistcoat":
        return "Waistcoat Only";
      case "pants":
        return "Pants Only";
      case "full":
        return "Full Attire Set";
      default:
        return "Full Attire Set";
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate personal information
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim()
      ) {
        alert(
          "Please fill in all personal information fields before proceeding."
        );
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    if (currentStep === 2) {
      // Validate address information
      if (
        !formData.street.trim() ||
        !formData.city.trim() ||
        !formData.state.trim() ||
        !formData.zipCode.trim() ||
        !formData.country.trim()
      ) {
        alert("Please fill in all address fields before proceeding.");
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        cart,
        formData,
        orderReference,
        total: getCartTotal(),
      };

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Order submitted successfully:", orderData);
        localStorage.removeItem("zanemvula-cart");
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit order:", result.message);
        // You could show an error message to the user here
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting your order. Please try again.");
    }
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link href="/store">
              <Button className="bg-primary hover:bg-primary/90">
                Browse Gallery
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-balance">
              Order Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              Thank you for choosing Zanemvula. Our master tailors will contact
              you within 24 hours to discuss your custom measurements and
              traditional styling preferences.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="font-semibold">Order Reference: {orderReference}</p>
              <p className="text-sm text-muted-foreground">
                Please save this reference number for your records
              </p>
            </div>
            <Link href="/store">
              <Button className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Measurements", icon: Ruler },
  ];

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/cart">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center w-full sm:w-auto">
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              <step.icon className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${
                currentStep >= step.number
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-8 h-0.5 mx-4 ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street" className="text-sm">
                    Street Address *
                  </Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => updateFormData("street", e.target.value)}
                    placeholder="Enter your street address"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Enter your city"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm">
                      State/Province *
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      placeholder="Enter your state"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode" className="text-sm">
                      Postal Code *
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        updateFormData("zipCode", e.target.value)
                      }
                      placeholder="Enter your postal code"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm">
                      Country *
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        updateFormData("country", value)
                      }
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ZA">South Africa</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Ruler className="h-4 w-4 sm:h-5 sm:w-5" />
                  Custom Measurements (Optional)
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                  Provide measurements if available for your custom garments.
                  Our master tailors will use these for all items in your order.
                  These are optional - we can schedule a consultation if you
                  prefer professional measuring.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="chest" className="text-sm">
                      Chest (centimeters)
                    </Label>
                    <Input
                      id="chest"
                      value={formData.chest}
                      onChange={(e) => updateFormData("chest", e.target.value)}
                      placeholder="e.g., 42"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waist" className="text-sm">
                      Waist (centimeters)
                    </Label>
                    <Input
                      id="waist"
                      value={formData.waist}
                      onChange={(e) => updateFormData("waist", e.target.value)}
                      placeholder="e.g., 34"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hips" className="text-sm">
                      Hips (centimeters)
                    </Label>
                    <Input
                      id="hips"
                      value={formData.hips}
                      onChange={(e) => updateFormData("hips", e.target.value)}
                      placeholder="e.g., 40"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shoulders" className="text-sm">
                      Shoulder Width (centimeters)
                    </Label>
                    <Input
                      id="shoulders"
                      value={formData.shoulders}
                      onChange={(e) =>
                        updateFormData("shoulders", e.target.value)
                      }
                      placeholder="e.g., 19"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleeves" className="text-sm">
                      Arm Length (centimeters)
                    </Label>
                    <Input
                      id="sleeves"
                      value={formData.sleeves}
                      onChange={(e) =>
                        updateFormData("sleeves", e.target.value)
                      }
                      placeholder="e.g., 26"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inseam" className="text-sm">
                      Inseam Length (centimeters)
                    </Label>
                    <Input
                      id="inseam"
                      value={formData.inseam}
                      onChange={(e) => updateFormData("inseam", e.target.value)}
                      placeholder="e.g., 32"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="specialRequests" className="text-sm">
                    Traditional Styling Preferences & Special Requests
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) =>
                      updateFormData("specialRequests", e.target.value)
                    }
                    placeholder="Specify traditional embroidery patterns, cultural significance, fit preferences (loose/fitted), ceremonial requirements, or any special customizations..."
                    rows={4}
                    className="mt-1 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto bg-transparent"
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Submit Order
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 order-first lg:order-last">
          <Card className="lg:sticky lg:top-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {item.productName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {getComponentDisplayName(item.component)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-sm flex-shrink-0">
                    R{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                <span>Total:</span>
                <span>R{getCartTotal().toFixed(2)}</span>
              </div>

              <div className="text-xs text-muted-foreground italic text-pretty">
                *Final pricing may vary based on custom measurements and
                traditional embellishments
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
