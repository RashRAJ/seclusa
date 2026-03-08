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
    {/* Hero */}
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-advocacy-red hidden lg:block" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="md:ml-[30%]">
          <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Testimonials
          </p>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.95] tracking-tight">
            Words That<br />
            <span className="italic text-advocacy-red">Inspire</span> Us
          </h1>
          <div className="w-16 h-[3px] bg-advocacy-red mt-8" />
        </div>
      </div>
    </section>

    {/* Quotes */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {testimonials.map((t, i) => (
          <div key={i} className={`py-20 ${i < testimonials.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="flex items-start gap-6">
              <span className="text-8xl font-display text-advocacy-red/30 leading-none hidden md:block">"</span>
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-snug text-foreground">
                {t.quote}
              </blockquote>
            </div>
            <div className="mt-8 w-16 h-[3px] bg-advocacy-red md:ml-20" />
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-advocacy-red py-20 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display mb-4">
          Your story <span className="italic">matters</span> too
        </h2>
        <p className="opacity-60 text-lg">Join SECLUSA and share your voice with the community.</p>
      </div>
    </section>
  </div>
);

export default Testimonials;
