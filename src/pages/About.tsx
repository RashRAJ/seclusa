import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => (
  <div>
    {/* Hero */}
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-1/4 h-full bg-advocacy-red hidden lg:block" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="md:ml-[30%]">
          <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            About SECLUSA
          </p>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.95] tracking-tight">
            Sickle Cell<br />
            <span className="italic text-advocacy-red">Empowerment</span><br />
            & Care Link
          </h1>
          <p className="mt-8 text-muted-foreground text-lg max-w-lg leading-relaxed">
            For the Underserved, Stigmatized, and Affected — building bridges of hope and opportunity.
          </p>
          <div className="w-16 h-[3px] bg-advocacy-red mt-8" />
        </div>
      </div>
    </section>

    {/* Founder */}
    <section className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              The Founder
            </p>
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              Hadiza<br /><span className="italic text-advocacy-red">Haruna</span>
            </h2>
            <div className="w-12 h-[3px] bg-advocacy-red mt-6" />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              My name is Hadiza Haruna, I am the founder of SECLUSA and also a sickle cell warrior.
              Living with sickle cell has helped me understand the real challenges many people face —
              not just with health, but also with stigma, financial struggles, and lack of support.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I started SECLUSA to create a safe community where people affected by sickle cell can
              find support, access helpful information, and learn practical skills that can improve their lives.
            </p>
            <p className="text-foreground leading-relaxed font-medium italic font-display text-xl border-l-4 border-advocacy-red pl-6">
              "Through SECLUSA, we are building a space where people feel seen, supported, and empowered."
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Why We Started */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Purpose
          </p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Why We <span className="italic text-advocacy-red">Started</span>
          </h2>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            SECLUSA was born from both personal experience and a deep desire to help others. As someone
            living with sickle cell, I understand the physical, emotional, and social challenges that many
            people face.
          </p>
          <p className="text-muted-foreground">
            Many people affected by sickle cell also struggle with stigma, lack of information, and limited
            economic opportunities. I wanted to create something that goes beyond awareness — a platform that
            provides real support, community, and opportunities for empowerment.
          </p>
          <div className="border-l-4 border-advocacy-red pl-8 py-4">
            <p className="text-foreground font-display text-2xl md:text-3xl italic leading-snug">
              SECLUSA is about reminding people affected by sickle cell that their lives matter,
              their voices matter, and they deserve opportunities to thrive.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/services" className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-advocacy-red hover:text-advocacy-red/80 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Explore our services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
