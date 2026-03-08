import { Link } from "react-router-dom";
import { Heart, Users, Briefcase, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const focusAreas = [
  {
    icon: Heart,
    title: "Health Education",
    description: "Simple, reliable information about sickle cell to reduce stigma and support those affected.",
    color: "text-advocacy-red",
    bg: "bg-advocacy-red/10",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "A safe space where people living with sickle cell, caregivers, and supporters connect and share.",
    color: "text-healing-blue",
    bg: "bg-healing-blue/10",
  },
  {
    icon: Briefcase,
    title: "Skill Empowerment",
    description: "Practical training in baking, packaging, and business skills for financial independence.",
    color: "text-hope-gold",
    bg: "bg-hope-gold/10",
  },
];

const testimonials = [
  {
    quote: "SECLUSA is creating a space where people affected by sickle cell can feel understood, supported, and empowered.",
  },
  {
    quote: "The combination of health awareness and skill empowerment makes SECLUSA a truly impactful initiative.",
  },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-empowerment-purple py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--healing-blue)/0.15),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="inline-block bg-accent/20 text-accent font-heading text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Sickle Cell Empowerment & Care Link
        </span>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight max-w-4xl mx-auto">
          Empowering Lives Affected by Sickle Cell Through{" "}
          <span className="text-accent">Care, Community & Opportunity</span>
        </h1>
        <p className="mt-6 text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
          SECLUSA provides health education, community support, and entrepreneurship training
          to help people living with sickle cell disease thrive.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/community">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold text-base px-8">
              Join the Movement
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Focus Areas */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">What We Do</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Three pillars of support for individuals and families affected by sickle cell disease.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {focusAreas.map((area) => (
            <Card key={area.title} className="group hover:shadow-lg transition-shadow border-none bg-card">
              <CardContent className="p-8 text-center">
                <div className={`w-14 h-14 rounded-2xl ${area.bg} flex items-center justify-center mx-auto mb-5`}>
                  <area.icon className={`w-7 h-7 ${area.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* About Preview */}
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          SECLUSA was born from both personal experience and a deep desire to help others. As someone
          living with sickle cell, founder Hadiza Haruna understands the physical, emotional, and social
          challenges many people face. SECLUSA is about reminding people that their lives matter, their
          voices matter, and they deserve opportunities to thrive.
        </p>
        <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all">
          Read the full story <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">What People Say</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none bg-card">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <p className="text-foreground leading-relaxed italic text-lg">"{t.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-gradient-to-r from-healing-blue to-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Be Part of the Change</h2>
        <p className="opacity-80 max-w-xl mx-auto mb-8">
          Join our growing community of warriors, caregivers, and supporters working together
          to empower lives affected by sickle cell disease.
        </p>
        <Link to="/community">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-semibold px-8">
            Join the Movement
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
