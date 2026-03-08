import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "SECLUSA is creating a space where people affected by sickle cell can feel understood, supported, and empowered.",
  },
  {
    quote: "The combination of health awareness and skill empowerment makes SECLUSA a truly impactful initiative.",
  },
];

const Testimonials = () => (
  <div>
    <section className="bg-primary py-16 md:py-24 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl">Testimonials</h1>
        <p className="mt-4 opacity-80 text-lg max-w-2xl mx-auto">
          Hear from people who have experienced the impact of SECLUSA.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none bg-card">
              <CardContent className="p-8 md:p-10">
                <Quote className="w-10 h-10 text-accent mb-4" />
                <p className="text-foreground leading-relaxed italic text-xl">"{t.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Testimonials;
