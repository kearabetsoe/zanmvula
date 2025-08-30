import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ruler, User, AlertCircle } from "lucide-react"

const measurementSteps = [
  {
    title: "Chest/Bust",
    description:
      "Measure around the fullest part of your chest, keeping the tape measure level and snug but not tight.",
    tip: "For women, measure around the fullest part of the bust.",
  },
  {
    title: "Waist",
    description: "Measure around your natural waistline, which is typically the narrowest part of your torso.",
    tip: "Don't suck in your stomach - breathe normally for an accurate measurement.",
  },
  {
    title: "Hips",
    description: "Measure around the fullest part of your hips, typically 7-9 inches below your natural waistline.",
    tip: "Keep your feet together and measure over your undergarments.",
  },
  {
    title: "Shoulders",
    description: "Measure from the edge of one shoulder to the edge of the other, across your back.",
    tip: "Have someone help you with this measurement for accuracy.",
  },
  {
    title: "Sleeve Length",
    description: "Measure from your shoulder point down to your wrist bone, with your arm slightly bent.",
    tip: "Measure over a well-fitting shirt for the most accurate result.",
  },
  {
    title: "Inseam",
    description: "Measure from the crotch seam down to the desired hem length along the inside of your leg.",
    tip: "Use pants that fit you well as a reference point.",
  },
]

export function MeasurementGuide() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
          <Ruler className="h-6 w-6 text-primary" />
          How to Measure Yourself
        </h2>
        <p className="text-muted-foreground text-pretty">
          Follow these steps to get accurate measurements for the perfect fit. We recommend having someone assist you
          for the most precise results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {measurementSteps.map((step, index) => (
          <Card key={step.title} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                  {index + 1}
                </Badge>
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{step.tip}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Need Help with Measurements?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you're unsure about any measurements, don't worry! Our team can help you get the perfect fit.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Leave measurement fields blank in your order and we'll contact you</li>
                <li>• Visit our store for professional fitting assistance</li>
                <li>• Contact our customer service team for guidance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
