import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Sickle Cell Education & Awareness",
    description: "We share simple, reliable information about sickle cell to help people understand the condition better, reduce stigma, and support those affected.",
  },
  {
    number: "02",
    title: "Community Support Network",
    description: "SECLUSA connects people living with sickle cell, caregivers, and supporters so they can share experiences, encouragement, and helpful resources.",
  },
  {
    number: "03",
    title: "Entrepreneurship & Skill Empowerment",
    description: "We provide practical skill training to help people become more financially independent. This includes baking training and packaging education for small businesses.",
  },
  {
    number: "04",
    title: "Baking Training & Products",
    description: "Through our baking program, we teach people how to bake simple products that they can sell to generate income. We also showcase baked goods made through our training programs.",
  },
  {
    number: "05",
    title: "Packaging Skills & Product Presentation",
    description: "We teach small business owners how to package their products professionally so they can attract more customers and grow their businesses.",
  },
];

const Services = () => (
  <div>
    {/* Hero */}
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-advocacy-red hidden lg:block" />
      <div className="absolute top-0 right-[33.33%] w-16 h-full bg-advocacy-red/60 hidden lg:block" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Services
          </p>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.95] tracking-tight">
            Education,<br />
            <span className="italic text-advocacy-red">Support</span> &<br />
            Empowerment
          </h1>
          <div className="w-16 h-[3px] bg-advocacy-red mt-8" />
        </div>
      </div>
    </section>

    {/* Services List */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {services.map((s, i) => (
          <div key={s.number} className={`grid md:grid-cols-12 gap-8 py-12 ${i < services.length - 1 ? 'border-b border-border' : ''} group hover:bg-advocacy-red/[0.02] transition-colors -mx-4 px-4`}>
            <div className="md:col-span-2">
              <span className="text-5xl font-display font-bold text-advocacy-red opacity-40 group-hover:opacity-70 transition-opacity">
                {s.number}
              </span>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-display">{s.title}</h3>
              <div className="w-8 h-[2px] bg-advocacy-red mt-3 group-hover:w-14 transition-all" />
            </div>
            <div className="md:col-span-6">
              <p className="text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Products */}
    <section className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Coming Soon
          </p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Featured <span className="italic text-advocacy-red">Products</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {["Baked Goods", "Packaging Kits", "Training Materials"].map((item) => (
            <div key={item} className="bg-background p-10 text-center group hover:shadow-lg transition-shadow border-t-2 border-advocacy-red">
              <div className="w-20 h-20 bg-advocacy-red/5 mx-auto mb-6" />
              <h3 className="font-display text-xl">{item}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Coming Soon
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-advocacy-red py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-display mb-6">
          Ready to <span className="italic">get involved</span>?
        </h2>
        <Link to="/community" className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity border-b border-primary-foreground/30 pb-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          Join the Movement <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  </div>
);

export default Services;
