import { Heart, Users, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Heart, title: "Health Resources", description: "Access trusted information about managing sickle cell disease.", color: "text-advocacy-red" },
  { icon: Users, title: "Peer Support", description: "Connect with others who understand your journey.", color: "text-healing-blue" },
  { icon: Sparkles, title: "Skills Training", description: "Learn baking, packaging, and business skills.", color: "text-hope-gold" },
  { icon: Mail, title: "Regular Updates", description: "Receive news, events, and opportunities directly.", color: "text-primary" },
];

const Community = () => (
  <div>
    {/* Hero */}
    <section className="relative min-h-[70vh] flex items-center bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--healing-blue)/0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--advocacy-red)/0.2),transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          Community
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95]">
          Join the<br /><span className="italic">Movement</span>
        </h1>
        <p className="mt-8 opacity-70 text-lg max-w-lg mx-auto leading-relaxed">
          Become part of a growing community of warriors, caregivers, and supporters
          working together to empower lives.
        </p>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Membership Benefits
          </p>
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Why Join <span className="italic text-primary">SECLUSA</span>?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border max-w-5xl mx-auto">
          {benefits.map((b) => (
            <div key={b.title} className="border-b border-r border-border p-8 hover:bg-card transition-colors">
              <b.icon className={`w-6 h-6 ${b.color} mb-5`} />
              <h3 className="font-display text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Get Involved */}
    <section className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-display mb-6">
          Get <span className="italic text-primary">Involved</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          Reach out to us via email or WhatsApp to join our community and receive updates, support, and resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:seclusa.org@gmail.com">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              <Mail className="w-4 h-4 mr-2" /> Email Us
            </Button>
          </a>
          <a href="https://wa.me/2349068963469" target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-none px-8 py-6 uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              WhatsApp Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Community;
