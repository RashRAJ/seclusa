import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowRight, Heart, Users, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import foundersImage from "@/assets/founders.webp";
import founderImage from "@/assets/founder.jpg";
import cofounderImage from "@/assets/cofounder.jpg";
import teamMuhammadImage from "@/assets/team-muhammad.jpg";
import teamFavourImage from "@/assets/team-favour.jpg";
import student1Image from "@/assets/student1.jpg";
import student2Image from "@/assets/student2.jpg";
import student3Image from "@/assets/student3.jpg";
import togetherThriveImage from "@/assets/together-thrive.jpg";
import { getContent, SiteContent } from "@/lib/content";

/* ── animation helper ── */
const Section = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Counter animation hook ── */
const useCounter = (end: number, duration: number = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);
  
  return count;
};

/* ── Animated stat component ── */
const AnimatedStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g., "100+" -> 100, "+")
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  
  const animatedCount = useCounter(numericValue, 2000, inView);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="text-5xl md:text-6xl font-display font-bold">
        {animatedCount}{suffix}
      </p>
      <p className="text-xs uppercase tracking-widest mt-2 opacity-60 font-sans">{label}</p>
    </motion.div>
  );
};

const teamImagesDefaults = [founderImage, cofounderImage, teamMuhammadImage, teamFavourImage];

const Index = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  if (!content) return null;

  // Use custom images if set, otherwise use defaults
  const img = {
    hero: content.images.heroImage || student1Image,
    about: content.images.aboutImage || student2Image,
    founders: content.images.foundersImage || foundersImage,
    togetherThrive: content.images.togetherThriveImage || togetherThriveImage,
    community: content.images.communityImage || foundersImage,
    teamImages: content.images.teamImages.map((t, i) => t || teamImagesDefaults[i] || founderImage),
  };

  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section id="home" className="relative min-h-screen flex items-center bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-advocacy-red hidden lg:block" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-8 font-sans">
              {content.hero.tagline}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95] tracking-tight text-foreground">
              {content.hero.title1}
              <br />
              <span className="italic text-advocacy-red">{content.hero.titleHighlight}</span> {content.hero.title2}
            </h1>
            <p className="mt-8 text-muted-foreground text-lg max-w-lg leading-relaxed">
              {content.hero.description}
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a href="#community">
                <Button className="bg-advocacy-red text-primary-foreground hover:bg-advocacy-red/90 rounded-none px-8 py-6 uppercase text-xs tracking-widest font-sans">
                  {content.hero.ctaText}
                </Button>
              </a>
              <a href="#about" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-advocacy-red transition-colors font-sans">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Hero placeholder image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute top-0 right-0 w-1/3 h-full hidden lg:block overflow-hidden"
        >
          <img
            src={img.hero}
            alt="Community support"
            className="w-full h-full object-cover mix-blend-multiply opacity-40"
          />
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="bg-advocacy-red text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
            {content.stats.map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Section>
              <div className="relative group">
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  <img
                    src={img.about}
                    alt="SECLUSA founder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-advocacy-red/0 group-hover:bg-advocacy-red/20 transition-colors duration-300" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-advocacy-red transition-transform duration-300 group-hover:scale-110" />
              </div>
            </Section>
            <Section delay={0.2}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4 font-sans">{content.about.tagline}</p>
                <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
                  Born from <span className="italic text-advocacy-red">experience</span>, driven by purpose
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  {content.about.description}
                </p>
                <p className="text-foreground leading-relaxed text-lg font-medium border-l-4 border-advocacy-red pl-6">
                  "{content.about.quote}"
                </p>
                <div className="w-16 h-[3px] bg-advocacy-red mt-8" />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ═══════ WHY WE STARTED ═══════ */}
      <section className="bg-card py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-advocacy-red hidden md:block" />
        <div className="container mx-auto px-4 max-w-4xl">
          <Section>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4 font-sans">{content.whyWeStarted.tagline}</p>
              <h2 className="text-4xl md:text-5xl font-display leading-tight">
                Why We <span className="italic text-advocacy-red">Started</span>
              </h2>
            </div>
          </Section>
          <Section delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {content.whyWeStarted.description}
                </p>
                <div className="border-l-4 border-advocacy-red pl-6">
                  <p className="text-foreground font-display text-xl italic leading-snug">
                    {content.whyWeStarted.quote}
                  </p>
                </div>
              </div>
              <div className="aspect-square bg-muted overflow-hidden group">
                <img
                  src={img.founders}
                  alt="SECLUSA Founder and Co-Founder"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-advocacy-red/0 group-hover:bg-advocacy-red/20 transition-colors duration-300" />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════ TEAM ═══════ */}
      <section id="team" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <Section>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4 font-sans">{content.team.tagline}</p>
              <h2 className="text-4xl md:text-5xl font-display leading-tight">
                The <span className="italic text-advocacy-red">People</span> Behind SECLUSA
              </h2>
            </div>
          </Section>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {content.team.members.map((member, i) => (
              <Section key={i} delay={(i + 1) * 0.1}>
                <div className="group">
                  <div className="aspect-[3/4] bg-muted overflow-hidden mb-6 relative">
                    <img
                      src={img.teamImages[i]}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-advocacy-red/0 group-hover:bg-advocacy-red/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-display">{member.name}</h3>
                  <p className="text-advocacy-red text-sm uppercase tracking-wider font-sans">{member.role}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ IMAGE BREAK ═══════ */}
      <Section>
        <div className="relative h-[50vh] overflow-hidden group">
          <img
            src={img.togetherThrive}
            alt="Women united together"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-advocacy-red/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-display text-primary-foreground text-center italic"
            >
              Together We Thrive
            </motion.h2>
          </div>
        </div>
      </Section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section id="testimonials" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <Section>
            <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-8 font-sans text-center">
              What People Say
            </p>
          </Section>
          {content.testimonials.map((t, i) => (
            <Section key={i} delay={i * 0.2}>
              <div className={`py-16 ${i < content.testimonials.length - 1 ? "border-b border-border" : ""}`}>
                <div className="flex items-start gap-6">
                  <span className="text-8xl font-display text-advocacy-red/30 leading-none hidden md:block">"</span>
                  <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-snug text-foreground">
                    {t.quote}
                  </blockquote>
                </div>
                <div className="mt-8 w-16 h-[3px] bg-advocacy-red md:ml-20" />
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ═══════ COMMUNITY ═══════ */}
      <section id="community" className="bg-advocacy-red py-24 md:py-32 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--empowerment-purple)/0.3),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Section>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-6 font-sans">{content.community.tagline}</p>
                <h2 className="text-4xl md:text-6xl font-display leading-tight mb-6">
                  Join the <span className="italic">Movement</span>
                </h2>
                <p className="opacity-70 text-lg max-w-lg leading-relaxed mb-8">
                  {content.community.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: "Health Resources" },
                    { icon: Users, label: "Peer Support" },
                    { icon: Sparkles, label: "Skills Training" },
                    { icon: Mail, label: "Regular Updates" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-3 py-3">
                      <b.icon className="w-5 h-5 opacity-70" />
                      <span className="text-sm font-sans opacity-90">{b.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <a href={`mailto:${content.contact.email}`}>
                    <Button className="bg-background text-foreground hover:bg-background/90 rounded-none px-8 py-6 uppercase text-xs tracking-widest font-sans">
                      <Mail className="w-4 h-4 mr-2" /> Email Us
                    </Button>
                  </a>
                  <a href="https://wa.me/2349068963469" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-none px-8 py-6 uppercase text-xs tracking-widest border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-sans">
                      WhatsApp Us <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </Section>
            <Section delay={0.3}>
              <div className="aspect-[4/5] bg-primary-foreground/10 overflow-hidden group relative">
                <img
                  src={img.community}
                  alt="Community members"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-60 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary-foreground/0 group-hover:bg-primary-foreground/10 transition-colors duration-300" />
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
            <Section>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4 font-sans">{content.contact.tagline}</p>
                <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
                  Let's <span className="italic text-advocacy-red">Connect</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-10">
                  {content.contact.description}
                </p>

                <div className="space-y-8">
                  {[
                    { icon: Mail, title: "Email", detail: content.contact.email, href: `mailto:${content.contact.email}` },
                    { icon: Phone, title: "Phone / WhatsApp", detail: content.contact.phone },
                    { icon: MapPin, title: "Location", detail: content.contact.location },
                  ].map((c) => (
                    <div key={c.title} className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-advocacy-red/10 flex items-center justify-center shrink-0">
                        <c.icon className="w-5 h-5 text-advocacy-red" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg mb-1">{c.title}</h3>
                        {c.href ? (
                          <a href={c.href} className="text-muted-foreground hover:text-advocacy-red transition-colors">{c.detail}</a>
                        ) : (
                          <p className="text-muted-foreground">{c.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-sans">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/khady_bakes_and_sweets_venture" target="_blank" rel="noreferrer"
                      className="w-12 h-12 border border-advocacy-red/20 flex items-center justify-center hover:bg-advocacy-red/5 hover:border-advocacy-red transition-colors">
                      <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/1CH2rer3yN/" target="_blank" rel="noreferrer"
                      className="w-12 h-12 border border-advocacy-red/20 flex items-center justify-center hover:bg-advocacy-red/5 hover:border-advocacy-red transition-colors">
                      <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Section>

            <Section delay={0.2}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-8 font-sans">Send a Message</p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Name</label>
                    <Input placeholder="Your full name" className="bg-background border-border rounded-none h-12 focus-visible:ring-advocacy-red" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Email</label>
                    <Input type="email" placeholder="your@email.com" className="bg-background border-border rounded-none h-12 focus-visible:ring-advocacy-red" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Message</label>
                    <Textarea placeholder="Tell us more..." rows={5} className="bg-background border-border rounded-none focus-visible:ring-advocacy-red" />
                  </div>
                  <Button type="submit" className="w-full bg-advocacy-red text-primary-foreground hover:bg-advocacy-red/90 rounded-none h-12 uppercase text-xs tracking-widest font-sans">
                    Send Message <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
