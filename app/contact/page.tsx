import { Navigation } from "@/components/navigation";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Connect With Us
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Have questions about our traditional garments, need custom sizing
              guidance, or want to discuss a special order? We're here to help
              you find the perfect African attire.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
    //end div
  );
}
