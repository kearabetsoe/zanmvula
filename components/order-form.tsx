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
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  User,
  MapPin,
  Ruler,
  ShoppingCart,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Royal Blue Dashiki",
    pricing: {
      waistcoat: 189.99,
      pants: 149.99,
      full: 299.99,
    },
    image: "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
    category: "dashiki",
    description: "Traditional West African dashiki with intricate embroidery",
  },
  {
    id: 2,
    name: "Elegant Agbada Robe",
    pricing: {
      waistcoat: 249.99,
      pants: 199.99,
      full: 399.99,
    },
    image: "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
    category: "agbada",
    description: "Flowing ceremonial robe with gold embroidery",
  },
  {
    id: 3,
    name: "Kente Pattern Vest",
    pricing: {
      waistcoat: 159.99,
      pants: 129.99,
      full: 249.99,
    },
    image: "/traditional-kente-vest-with-authentic-african-patt.png",
    category: "kente",
    description: "Authentic Kente cloth vest with traditional patterns",
  },
  {
    id: 4,
    name: "Earth Tone Boubou",
    pricing: {
      waistcoat: 199.99,
      pants: 159.99,
      full: 319.99,
    },
    image: "/traditional-african-boubou-kaftan-in-earth-tones.png",
    category: "boubou",
    description: "Comfortable kaftan-style boubou in natural earth tones",
  },
  {
    id: 5,
    name: "Ankara Print Shirt",
    pricing: {
      waistcoat: 119.99,
      pants: 99.99,
      full: 189.99,
    },
    image: "/colorful-african-ankara-print-shirt-with-tradition.png",
    category: "ankara",
    description: "Vibrant Ankara print shirt with traditional motifs",
  },
  {
    id: 6,
    name: "Ceremonial Grand Boubou",
    pricing: {
      waistcoat: 349.99,
      pants: 299.99,
      full: 599.99,
    },
    image: "/grand-ceremonial-african-boubou-in-white-with-gold.png",
    category: "ceremonial",
    description: "Grand ceremonial boubou for special occasions",
  },
];

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

  // Measurements
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  sleeves: string;
  inseam: string;
  specialRequests: string;
}

export function OrderForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const componentParam =
    (searchParams.get("component") as "waistcoat" | "pants" | "full") || "full";
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [formData, setFormData] = useState<OrderFormData>({
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

  const [currentItem, setCurrentItem] = useState({
    component: componentParam as "waistcoat" | "pants" | "full",
    quantity: 1,
    size: "",
  });

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === Number.parseInt(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
    setCurrentItem((prev) => ({ ...prev, component: componentParam }));
  }, [productId, componentParam]);

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

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("zanemvula-cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("zanemvula-cart");
    }
  }, [cart]);

  const updateFormData = (
    field: keyof OrderFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCurrentItem = (
    field: keyof typeof currentItem,
    value: string | number
  ) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    const cartItem: CartItem = {
      id: `${selectedProduct.id}-${currentItem.component}-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      component: currentItem.component,
      price: selectedProduct.pricing[currentItem.component],
      quantity: currentItem.quantity,
      size: currentItem.size,
      image: selectedProduct.image,
    };

    setCart((prev) => [...prev, cartItem]);

    setCurrentItem({
      component: "full",
      quantity: 1,
      size: "",
    });

    alert("Item added to cart successfully!");
    setTimeout(() => {
      window.location.href = "/gallery";
    }, 1000);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
    console.log("Order submitted:", { cart, formData });
    localStorage.removeItem("zanemvula-cart");
    setIsSubmitted(true);
  };

  const getCurrentPrice = () => {
    if (!selectedProduct) return 0;
    return selectedProduct.pricing[currentItem.component];
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

  const steps = [
    { number: 1, title: "Cart & Items", icon: ShoppingCart },
    { number: 2, title: "Personal Info", icon: User },
    { number: 3, title: "Address", icon: MapPin },
    { number: 4, title: "Measurements", icon: Ruler },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2 sm:px-0">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/gallery")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>
      </div>

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

      {currentStep === 1 && (
        <div className="space-y-6">
          {selectedProduct && (
            <Card className="mx-2 sm:mx-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Item to Cart
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-muted rounded-lg">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded"
                  />
                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-lg sm:text-base">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedProduct.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex flex-col">
                        <p className="text-2xl font-bold text-primary">
                          ${getCurrentPrice()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getComponentDisplayName(currentItem.component)}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize w-fit">
                        {selectedProduct.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Select Component</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                      {(["waistcoat", "pants", "full"] as const).map(
                        (component) => (
                          <div
                            key={component}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              currentItem.component === component
                                ? "border-primary bg-primary/5"
                                : "border-muted hover:border-primary/50"
                            }`}
                            onClick={() =>
                              updateCurrentItem("component", component)
                            }
                          >
                            <div className="text-center">
                              <p className="font-medium capitalize">
                                {component === "full"
                                  ? "Full Attire"
                                  : component}
                              </p>
                              <p className="text-sm text-primary font-semibold">
                                ${selectedProduct.pricing[component]}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="size">Base Size (for reference)</Label>
                      <Select
                        value={currentItem.size}
                        onValueChange={(value) =>
                          updateCurrentItem("size", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select base size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="S">Small (36-38)</SelectItem>
                          <SelectItem value="M">Medium (40-42)</SelectItem>
                          <SelectItem value="L">Large (44-46)</SelectItem>
                          <SelectItem value="XL">X-Large (48-50)</SelectItem>
                          <SelectItem value="XXL">XX-Large (52-54)</SelectItem>
                          <SelectItem value="XXXL">
                            XXX-Large (56-58)
                          </SelectItem>
                          <SelectItem value="Custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={currentItem.quantity}
                        onChange={(e) =>
                          updateCurrentItem(
                            "quantity",
                            Number.parseInt(e.target.value) || 1
                          )
                        }
                      />
                    </div>
                  </div>

                  <Button
                    onClick={addToCart}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!currentItem.size}
                  >
                    Add to Cart - $
                    {(getCurrentPrice() * currentItem.quantity).toFixed(2)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mx-2 sm:mx-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart ({cart.length} items)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your cart is automatically saved. You can continue shopping and
                come back anytime.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty. Browse our gallery to add items.</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => (window.location.href = "/gallery")}
                  >
                    Browse Gallery
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
                      />
                      <div className="flex-1 w-full">
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {getComponentDisplayName(item.component)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

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

      {currentStep === 4 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Custom Measurements
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Please provide measurements for your custom garments. Our master
              tailors will use these for all items in your cart. Leave blank if
              unsure - we'll schedule a consultation.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
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
                  onChange={(e) => updateFormData("shoulders", e.target.value)}
                  placeholder="e.g., 19"
                />
              </div>
              <div>
                <Label htmlFor="sleeves">Arm Length (inches)</Label>
                <Input
                  id="sleeves"
                  value={formData.sleeves}
                  onChange={(e) => updateFormData("sleeves", e.target.value)}
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

            {cart.length > 0 && (
              <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>
                        {item.productName} -{" "}
                        {getComponentDisplayName(item.component)} ×{" "}
                        {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 italic">
                  *Final pricing may vary based on custom measurements and
                  traditional embellishments
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
            disabled={currentStep === 1 && cart.length === 0}
          >
            {currentStep === 1 ? "Proceed to Checkout" : "Next Step"}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
            disabled={cart.length === 0}
          >
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
}
