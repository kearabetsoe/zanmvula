"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mensSizes = [
  { size: "XS", chest: "32-34", waist: "26-28", hips: "32-34", shoulders: "16-17" },
  { size: "S", chest: "34-36", waist: "28-30", hips: "34-36", shoulders: "17-18" },
  { size: "M", chest: "36-38", waist: "30-32", hips: "36-38", shoulders: "18-19" },
  { size: "L", chest: "38-40", waist: "32-34", hips: "38-40", shoulders: "19-20" },
  { size: "XL", chest: "40-42", waist: "34-36", hips: "40-42", shoulders: "20-21" },
  { size: "XXL", chest: "42-44", waist: "36-38", hips: "42-44", shoulders: "21-22" },
]

const womensSizes = [
  { size: "XS", chest: "30-32", waist: "24-26", hips: "32-34", shoulders: "14-15" },
  { size: "S", chest: "32-34", waist: "26-28", hips: "34-36", shoulders: "15-16" },
  { size: "M", chest: "34-36", waist: "28-30", hips: "36-38", shoulders: "16-17" },
  { size: "L", chest: "36-38", waist: "30-32", hips: "38-40", shoulders: "17-18" },
  { size: "XL", chest: "38-40", waist: "32-34", hips: "40-42", shoulders: "18-19" },
  { size: "XXL", chest: "40-42", waist: "34-36", hips: "42-44", shoulders: "19-20" },
]

export function SizingCharts() {
  const [selectedCategory, setSelectedCategory] = useState("mens")

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Size Charts</h2>
        <p className="text-muted-foreground text-pretty">
          Use these charts to find your perfect size. All measurements are in inches unless otherwise specified.
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="mens">Men's Clothing</TabsTrigger>
          <TabsTrigger value="womens">Women's Clothing</TabsTrigger>
        </TabsList>

        <TabsContent value="mens">
          <Card>
            <CardHeader>
              <CardTitle>Men's Clothing Size Chart</CardTitle>
              <p className="text-sm text-muted-foreground">All measurements in inches</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Size</th>
                      <th className="text-left p-3 font-semibold">Chest</th>
                      <th className="text-left p-3 font-semibold">Waist</th>
                      <th className="text-left p-3 font-semibold">Hips</th>
                      <th className="text-left p-3 font-semibold">Shoulders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensSizes.map((size, index) => (
                      <tr key={size.size} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-3">
                          <Badge variant="outline">{size.size}</Badge>
                        </td>
                        <td className="p-3 text-sm">{size.chest}</td>
                        <td className="p-3 text-sm">{size.waist}</td>
                        <td className="p-3 text-sm">{size.hips}</td>
                        <td className="p-3 text-sm">{size.shoulders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="womens">
          <Card>
            <CardHeader>
              <CardTitle>Women's Clothing Size Chart</CardTitle>
              <p className="text-sm text-muted-foreground">All measurements in inches</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Size</th>
                      <th className="text-left p-3 font-semibold">Bust</th>
                      <th className="text-left p-3 font-semibold">Waist</th>
                      <th className="text-left p-3 font-semibold">Hips</th>
                      <th className="text-left p-3 font-semibold">Shoulders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womensSizes.map((size, index) => (
                      <tr key={size.size} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-3">
                          <Badge variant="outline">{size.size}</Badge>
                        </td>
                        <td className="p-3 text-sm">{size.chest}</td>
                        <td className="p-3 text-sm">{size.waist}</td>
                        <td className="p-3 text-sm">{size.hips}</td>
                        <td className="p-3 text-sm">{size.shoulders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-accent mb-3">Fit Preferences</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                • <strong>Slim Fit:</strong> Choose your exact measurements
              </li>
              <li>
                • <strong>Regular Fit:</strong> Add 1-2 inches to your measurements
              </li>
              <li>
                • <strong>Relaxed Fit:</strong> Add 2-4 inches to your measurements
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-3">Still Unsure?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We offer free exchanges within 30 days if the size isn't perfect.
            </p>
            <Button variant="outline" className="bg-transparent">
              Contact Size Specialist
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
