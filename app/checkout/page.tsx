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
      const orderReference = `ZMV-${Date.now()}`;
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
              <p className="font-semibold">
                Order Reference: #ZMV-{Date.now()}
              </p>
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
      //end div
    );
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Measurements", icon: Ruler },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              <step.icon className="h-4 w-4" />
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= step.number
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-4 ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => updateFormData("street", e.target.value)}
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      placeholder="Enter your state"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        updateFormData("zipCode", e.target.value)
                      }
                      placeholder="Enter your ZIP code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        updateFormData("country", value)
                      }
                    >
                      <SelectTrigger>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Custom Measurements
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Please provide measurements for your custom garments. Our
                  master tailors will use these for all items in your order.
                  Leave blank if unsure - we'll schedule a consultation.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="chest">Chest/Bust (inches)</Label>
                    <Input
                      id="chest"
                      value={formData.chest}
                      onChange={(e) => updateFormData("chest", e.target.value)}
                      placeholder="e.g., 42"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waist">Waist (inches)</Label>
                    <Input
                      id="waist"
                      value={formData.waist}
                      onChange={(e) => updateFormData("waist", e.target.value)}
                      placeholder="e.g., 34"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hips">Hips (inches)</Label>
                    <Input
                      id="hips"
                      value={formData.hips}
                      onChange={(e) => updateFormData("hips", e.target.value)}
                      placeholder="e.g., 40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shoulders">Shoulder Width (inches)</Label>
                    <Input
                      id="shoulders"
                      value={formData.shoulders}
                      onChange={(e) =>
                        updateFormData("shoulders", e.target.value)
                      }
                      placeholder="e.g., 19"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleeves">Arm Length (inches)</Label>
                    <Input
                      id="sleeves"
                      value={formData.sleeves}
                      onChange={(e) =>
                        updateFormData("sleeves", e.target.value)
                      }
                      placeholder="e.g., 26"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inseam">Inseam Length (inches)</Label>
                    <Input
                      id="inseam"
                      value={formData.inseam}
                      onChange={(e) => updateFormData("inseam", e.target.value)}
                      placeholder="e.g., 32"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="specialRequests">
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
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="bg-primary hover:bg-primary/90"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                Submit Order
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-muted-foreground">
                      {getComponentDisplayName(item.component)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    R{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>R{getCartTotal().toFixed(2)}</span>
              </div>

              <div className="text-xs text-muted-foreground italic">
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
