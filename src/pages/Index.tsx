import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "100+", label: "Lives Impacted", color: "text-advocacy-red" },
  { value: "5", label: "Core Programs", color: "text-primary" },
  { value: "3", label: "Focus Areas", color: "text-healing-blue" },
];

const focusAreas = [
  {
    number: "01",
    title: "Health Education",
    description: "Simple, reliable information about sickle cell disease to reduce stigma, empower patients, and support families.",
    accent: "border-advocacy-red",
    color: "text-advocacy-red",
  },
  {
    number: "02",
    title: "Community Support",
    description: "A safe and welcoming space where warriors, caregivers, and supporters connect, share, and find belonging.",
    accent: "border-healing-blue",
    color: "text-healing-blue",
  },
  {
    number: "03",
    title: "Skill Empowerment",
    description: "Practical training in baking, packaging, and business skills to build financial independence and dignity.",
    accent: "border-hope-gold",
    color: "text-hope-gold",
  },
];

const Index = () => (
  <div>
    {/* Hero — editorial, clean white with dramatic type */}
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      {/* Decorative accent shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary hidden lg:block" />
      <div className="absolute top-0 right-[33.33%] w-32 h-full bg-advocacy-red hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Sickle Cell Empowerment & Care Link
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95] tracking-tight text-foreground">
            Empowering
            <br />
            <span className="italic text-primary">Lives</span> Through
            <br />
            <span className="text-advocacy-red">Care</span>
          </h1>
          
          <p className="mt-8 text-muted-foreground text-lg max-w-lg leading-relaxed">
            SECLUSA provides health education, community support, and entrepreneurship 
            training to help people living with sickle cell disease thrive.
          </p>
          
          <div className="mt-10 flex items-center gap-6">
            <Link to="/community">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 uppercase text-xs tracking-widest"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Join the Movement
              </Button>
            </Link>
            <Link to="/about" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>

    {/* Stats Bar */}
    <section className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-5xl md:text-6xl font-display font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest mt-2 opacity-50"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* What We Do — editorial grid */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
            Three pillars of <span className="italic">support</span> for those affected
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t border-border">
          {focusAreas.map((area) => (
            <div key={area.number} className={`border-b md:border-b-0 md:border-r last:border-r-0 border-border p-8 md:p-10 group hover:bg-card transition-colors`}>
              <span className={`text-5xl font-display font-bold ${area.color} opacity-30`}>
                {area.number}
              </span>
              <h3 className="text-2xl font-display mt-4 mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Story Section — editorial split */}
    <section className="bg-card">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
              Born from <span className="italic text-primary">experience</span>, driven by <span className="italic text-advocacy-red">purpose</span>
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              SECLUSA was born from both personal experience and a deep desire to help others.
              As someone living with sickle cell, founder Hadiza Haruna understands the physical,
              emotional, and social challenges many people face.
            </p>
            <p className="text-foreground leading-relaxed text-lg font-medium">
              "Their lives matter, their voices matter, and they deserve opportunities to thrive."
            </p>
            <Link to="/about" className="group inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Read the full story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials — large quote */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-healing-blue mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          What People Say
        </p>
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-tight max-w-4xl mx-auto text-foreground">
          "SECLUSA is creating a space where people affected by sickle cell can feel
          <span className="text-primary"> understood</span>,
          <span className="text-healing-blue"> supported</span>, and
          <span className="text-hope-gold"> empowered</span>."
        </blockquote>
        <div className="mt-8 w-12 h-[2px] bg-primary mx-auto" />
      </div>
    </section>

    {/* CTA — full-bleed purple */}
    <section className="bg-primary py-24 md:py-32 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--advocacy-red)/0.3),transparent_50%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-display mb-6">
          Be Part of the <span className="italic">Change</span>
        </h2>
        <p className="opacity-70 max-w-lg mx-auto mb-10 text-lg">
          Join our growing community of warriors, caregivers, and supporters working together
          to empower lives affected by sickle cell disease.
        </p>
        <Link to="/community">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-10 py-6 uppercase text-xs tracking-widest"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Join the Movement <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
