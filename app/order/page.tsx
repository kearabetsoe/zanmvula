"use client";

import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { OrderForm } from "@/components/order-form";

function OrderPageContent() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Complete Your Order
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Please provide your details and measurements to ensure the perfect
              fit
            </p>
          </div>
          <OrderForm />
        </div>
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
}
