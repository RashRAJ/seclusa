import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Sparkles, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import giftBoxesImage from "@/assets/gift-boxes.jpg";
import chinchinImage from "@/assets/chinchin.jpg";
import pyramidBoxesImage from "@/assets/pyramid-boxes.jpg";
import eventsImage from "@/assets/events.jpg";
import giftBagsImage from "@/assets/gift-bags.jpg";
import { getContent, SiteContent } from "@/lib/content";

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

const serviceIcons = [BookOpen, Users, Lightbulb, Sparkles, Heart];
const defaultGalleryImages = [eventsImage, giftBagsImage, chinchinImage, giftBoxesImage, pyramidBoxesImage];

const Services = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    setContent(getContent());
  }, []);

  if (!content) return null;

  const servicesHeroImg = content.images.servicesHeroImage || eventsImage;
  const gallery = defaultGalleryImages.map((def, i) => content.images.galleryImages[i] || def);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4 font-sans">{content.services.tagline}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[0.95] tracking-tight">
                Our <span className="italic text-advocacy-red">Services</span>
              </h1>
              <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed">
                {content.services.description}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={servicesHeroImg}
                  alt="SECLUSA community event"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-advocacy-red/0 group-hover:bg-advocacy-red/20 transition-colors duration-300" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-advocacy-red transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {content.services.items.map((s, i) => {
            const Icon = serviceIcons[i] || BookOpen;
            return (
              <Section key={s.number} delay={i * 0.1}>
                <div className={`grid md:grid-cols-12 gap-8 py-12 items-center ${i < content.services.items.length - 1 ? "border-b border-border" : ""} group`}>
                  <div className="md:col-span-2">
                    <span className="text-5xl font-display font-bold text-advocacy-red/20">{s.number}</span>
                  </div>
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-advocacy-red" />
                      <h3 className="text-2xl font-display">{s.title}</h3>
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-muted-foreground leading-relaxed text-lg">{s.description}</p>
                  </div>
                </div>
              </Section>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <Section>
            <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
              Our <span className="italic text-advocacy-red">Work</span> in Action
            </h2>
          </Section>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.map((img, i) => (
              <Section key={i} delay={i * 0.1}>
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Section>
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
          <Link to="/#community" className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity border-b border-primary-foreground/30 pb-1 font-sans">
            Join the Movement <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
