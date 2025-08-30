import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react"
import Image from "next/image"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    description: "Call us during business hours",
    action: "Call Now",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: "hello@umojathread.com", // Updated email to match African theme
    description: "We respond within 24 hours",
    action: "Send Email",
    href: "mailto:hello@umojathread.com",
  },
]

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "12:00 PM - 5:00 PM" },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/professional-african-customer-service-representative.png"
              alt="Customer Service Representative"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <CardTitle>Contact Information</CardTitle>
              <p className="text-sm text-muted-foreground">Choose the method that works best for you</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method) => (
            <div key={method.title} className="flex items-start space-x-4 p-4 rounded-lg border">
              <method.icon className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold">{method.title}</h4>
                <p className="text-sm font-medium text-primary">{method.details}</p>
                <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                <Button size="sm" variant="outline" className="bg-transparent">
                  {method.action}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/traditional-african-clock-with-cultural-patterns.png"
              alt="Business Hours"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Business Hours
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {businessHours.map((schedule) => (
            <div key={schedule.day} className="flex justify-between items-center">
              <span className="text-sm font-medium">{schedule.day}</span>
              <Badge variant="outline">{schedule.hours}</Badge>
            </div>
          ))}
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Holiday Hours:</strong> We may have modified hours during holidays. Check our website or call
              ahead.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Store Location */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/traditional-african-textile-shop-storefront.png"
              alt="Store Location"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Visit Our Store
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Zanemvula Flagship Store</h4> {/* Updated store name */}
            <address className="text-sm text-muted-foreground not-italic">
              123 Heritage Avenue
              <br />
              Cultural District
              <br />
              New York, NY 10001
              <br />
              United States
            </address>
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>

          <div className="bg-accent/10 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Free Services:</strong> Traditional garment consultations, custom fitting, and cultural styling
              guidance available by appointment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
