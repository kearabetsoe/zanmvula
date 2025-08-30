"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, User, MapPin, Ruler } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Royal Blue Dashiki",
    price: 189.99,
    image: "/traditional-african-dashiki-shirt-in-royal-blue-wi.png",
    category: "dashiki",
    description: "Traditional West African dashiki with intricate embroidery",
  },
  {
    id: 2,
    name: "Elegant Agbada Robe",
    price: 349.99,
    image: "/elegant-african-agbada-robe-in-cream-with-gold-emb.png",
    category: "agbada",
    description: "Flowing ceremonial robe with gold embroidery",
  },
  {
    id: 3,
    name: "Kente Pattern Vest",
    price: 129.99,
    image: "/traditional-kente-vest-with-authentic-african-patt.png",
    category: "kente",
    description: "Authentic Kente cloth vest with traditional patterns",
  },
  {
    id: 4,
    name: "Earth Tone Boubou",
    price: 249.99,
    image: "/traditional-african-boubou-kaftan-in-earth-tones.png",
    category: "boubou",
    description: "Comfortable kaftan-style boubou in natural earth tones",
  },
  {
    id: 5,
    name: "Ankara Print Shirt",
    price: 89.99,
    image: "/colorful-african-ankara-print-shirt-with-tradition.png",
    category: "ankara",
    description: "Vibrant Ankara print shirt with traditional motifs",
  },
  {
    id: 6,
    name: "Ceremonial Grand Boubou",
    price: 449.99,
    image: "/grand-ceremonial-african-boubou-in-white-with-gold.png",
    category: "ceremonial",
    description: "Grand ceremonial boubou for special occasions",
  },
]

interface OrderFormData {
  // Customer Details
  firstName: string
  lastName: string
  email: string
  phone: string

  // Address
  street: string
  city: string
  state: string
  zipCode: string
  country: string

  // Product Details
  size: string
  color: string
  quantity: number

  // Measurements
  chest: string
  waist: string
  hips: string
  shoulders: string
  sleeves: string
  inseam: string
  specialRequests: string
}

export function OrderForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

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
    size: "",
    color: "",
    quantity: 1,
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
    sleeves: "",
    inseam: "",
    specialRequests: "",
  })

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === Number.parseInt(productId))
      if (product) {
        setSelectedProduct(product)
      }
    }
  }, [productId])

  const updateFormData = (field: keyof OrderFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log("Order submitted:", { product: selectedProduct, formData })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-balance">Asante! Order Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-6 text-pretty">
            Thank you for choosing Zanemvula. Our master tailors will contact you within 24 hours to discuss your custom
            measurements and traditional styling preferences.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold">Order Reference: #ZMV-{Date.now()}</p>
            <p className="text-sm text-muted-foreground">Please save this reference number for your records</p>
          </div>
          <Button onClick={() => (window.location.href = "/gallery")} className="bg-primary hover:bg-primary/90">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    )
  }

  const steps = [
    { number: 1, title: "Product Details", icon: Package },
    { number: 2, title: "Personal Info", icon: User },
    { number: 3, title: "Address", icon: MapPin },
    { number: 4, title: "Measurements", icon: Ruler },
  ]

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
                currentStep >= step.number ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-4 lg:w-8 h-0.5 mx-2 lg:mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Product Details */}
      {currentStep === 1 && (
        <Card className="mx-2 sm:mx-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Traditional Garment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
            {selectedProduct && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-muted rounded-lg">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full sm:w-20 h-48 sm:h-20 object-cover rounded"
                />
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-lg sm:text-base">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedProduct.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-2xl font-bold text-primary">${selectedProduct.price}</p>
                    <Badge variant="outline" className="capitalize w-fit">
                      {selectedProduct.category}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="size">Base Size (for reference)</Label>
                <Select value={formData.size} onValueChange={(value) => updateFormData("size", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select base size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">Small (36-38)</SelectItem>
                    <SelectItem value="M">Medium (40-42)</SelectItem>
                    <SelectItem value="L">Large (44-46)</SelectItem>
                    <SelectItem value="XL">X-Large (48-50)</SelectItem>
                    <SelectItem value="XXL">XX-Large (52-54)</SelectItem>
                    <SelectItem value="XXXL">XXX-Large (56-58)</SelectItem>
                    <SelectItem value="Custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color">Color Preference</Label>
                <Select value={formData.color} onValueChange={(value) => updateFormData("color", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Royal Blue">Royal Blue</SelectItem>
                    <SelectItem value="Deep Red">Deep Red</SelectItem>
                    <SelectItem value="Forest Green">Forest Green</SelectItem>
                    <SelectItem value="Golden Yellow">Golden Yellow</SelectItem>
                    <SelectItem value="Earth Brown">Earth Brown</SelectItem>
                    <SelectItem value="Cream White">Cream White</SelectItem>
                    <SelectItem value="Traditional Kente">Traditional Kente Pattern</SelectItem>
                    <SelectItem value="Ankara Print">Ankara Print</SelectItem>
                    <SelectItem value="Custom">Custom Color/Pattern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => updateFormData("quantity", Number.parseInt(e.target.value) || 1)}
                />
              </div>
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
                <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
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
              Please provide your measurements in inches for a perfect traditional fit. Our master tailors will use
              these for your custom garment. Leave blank if unsure - we'll schedule a consultation.
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
                <Label htmlFor="inseam">Garment Length (inches)</Label>
                <Input
                  id="inseam"
                  value={formData.inseam}
                  onChange={(e) => updateFormData("inseam", e.target.value)}
                  placeholder="e.g., 48 (for full length)"
                />
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="specialRequests">Traditional Styling Preferences & Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => updateFormData("specialRequests", e.target.value)}
                placeholder="Specify traditional embroidery patterns, cultural significance, fit preferences (loose/fitted), ceremonial requirements, or any special customizations..."
                rows={4}
              />
            </div>

            {selectedProduct && (
              <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm sm:text-base">
                    {selectedProduct.name} × {formData.quantity}
                  </span>
                  <span className="font-bold text-lg">${(selectedProduct.price * formData.quantity).toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1 break-words">
                  Base Size: {formData.size || "Not selected"} | Color: {formData.color || "Not selected"}
                </div>
                <div className="text-xs text-muted-foreground mt-2 italic">
                  *Final pricing may vary based on custom measurements and traditional embellishments
                </div>
              </div>
            )}
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
          <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none">
            Next Step
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none">
            Submit Order
          </Button>
        )}
      </div>
    </div>
  )
}
