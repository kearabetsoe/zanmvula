"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Package,
  User,
  MapPin,
  Ruler,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/components/cart-context";

interface OrderFormData {
  // Customer Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Address
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Product Details
  size: string;
  quantity: number;

  // Measurements
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  sleeves: string;
  inseam: string;
  specialRequests: string;

  // Component Selection
  component: "waistcoat" | "pants" | "full";
}

export function OrderForm() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const componentParam =
    (searchParams.get("component") as "waistcoat" | "pants" | "full") || "full";
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<Omit<OrderFormData, "color">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    size: "",
    quantity: 1,
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
    sleeves: "",
    inseam: "",
    specialRequests: "",
    component: componentParam,
  });

  useEffect(() => {
    if (productId) {
      const product = items.find((p) => p.id === productId);
      if (product) {
        // setSelectedProduct(product)
      }
    }
    setFormData((prev) => ({ ...prev, component: componentParam }));
  }, [productId, componentParam]);

  const updateFormData = (
    field: keyof Omit<OrderFormData, "color">,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Order submitted:", { items, formData });
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-balance">
            Asante! Order Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-6 text-pretty">
            Thank you for choosing Zanemvula. Our master tailors will contact
            you within 24 hours to discuss your custom measurements and
            traditional styling preferences.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold">Order Reference: #ZMV-{Date.now()}</p>
            <p className="text-sm text-muted-foreground">
              Please save this reference number for your records
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = "/gallery")}
            className="bg-primary hover:bg-primary/90"
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="p-8">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some traditional garments to your cart to continue with your
            order.
          </p>
          <Button
            onClick={() => (window.location.href = "/gallery")}
            className="bg-primary hover:bg-primary/90"
          >
            Browse Gallery
          </Button>
        </CardContent>
      </Card>
    );
  }

  const steps = [
    { number: 1, title: "Cart Review", icon: Package },
    { number: 2, title: "Personal Info", icon: User },
    { number: 3, title: "Address", icon: MapPin },
    { number: 4, title: "Measurements", icon: Ruler },
  ];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4 mb-8 px-2">
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
                className={`hidden sm:block w-4 lg:w-8 h-0.5 mx-2 lg:mx-4 ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Cart Review */}
      {currentStep === 1 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Review Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-muted rounded-lg"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.productName}
                  className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded"
                />
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-lg sm:text-base">
                    {item.productName}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-primary">
                        ${item.price}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.component === "full"
                          ? "Full Attire"
                          : item.component}{" "}
                        - Size: {item.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive bg-transparent"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                *Final pricing may vary based on custom measurements and
                traditional embellishments
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Personal Information */}
      {currentStep === 2 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
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

      {/* Step 3: Address */}
      {currentStep === 3 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
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
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="Enter your ZIP code"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => updateFormData("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
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

      {/* Step 4: Measurements */}
      {currentStep === 4 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Custom Measurements
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Please provide measurements for your custom garments. Our master
              tailors will use these for all items in your order.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id}>
                  {(item.component === "waistcoat" ||
                    item.component === "full") && (
                    <>
                      <div>
                        <Label htmlFor={`chest-${item.id}`}>
                          Chest/Bust (inches)
                        </Label>
                        <Input
                          id={`chest-${item.id}`}
                          value={formData.chest}
                          onChange={(e) =>
                            updateFormData("chest", e.target.value)
                          }
                          placeholder="e.g., 42"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`shoulders-${item.id}`}>
                          Shoulder Width (inches)
                        </Label>
                        <Input
                          id={`shoulders-${item.id}`}
                          value={formData.shoulders}
                          onChange={(e) =>
                            updateFormData("shoulders", e.target.value)
                          }
                          placeholder="e.g., 19"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`sleeves-${item.id}`}>
                          Arm Length (inches)
                        </Label>
                        <Input
                          id={`sleeves-${item.id}`}
                          value={formData.sleeves}
                          onChange={(e) =>
                            updateFormData("sleeves", e.target.value)
                          }
                          placeholder="e.g., 26"
                        />
                      </div>
                    </>
                  )}

                  {(item.component === "pants" ||
                    item.component === "full") && (
                    <>
                      <div>
                        <Label htmlFor={`waist-${item.id}`}>
                          Waist (inches)
                        </Label>
                        <Input
                          id={`waist-${item.id}`}
                          value={formData.waist}
                          onChange={(e) =>
                            updateFormData("waist", e.target.value)
                          }
                          placeholder="e.g., 34"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`hips-${item.id}`}>Hips (inches)</Label>
                        <Input
                          id={`hips-${item.id}`}
                          value={formData.hips}
                          onChange={(e) =>
                            updateFormData("hips", e.target.value)
                          }
                          placeholder="e.g., 40"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`inseam-${item.id}`}>
                          Inseam Length (inches)
                        </Label>
                        <Input
                          id={`inseam-${item.id}`}
                          value={formData.inseam}
                          onChange={(e) =>
                            updateFormData("inseam", e.target.value)
                          }
                          placeholder="e.g., 32"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
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

            <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-sm">
                    {item.productName} -{" "}
                    {item.component === "full" ? "Full Attire" : item.component}{" "}
                    × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-lg text-primary">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between px-2 sm:px-0 gap-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="bg-transparent flex-1 sm:flex-none"
        >
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={nextStep}
            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
          >
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
}
