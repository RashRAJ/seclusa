import { useState } from "react";
import { Heart, Users, Lightbulb, BookOpen, HandHeart } from "lucide-react";

const bubbles = [
  {
    id: "health",
    title: "Health\nEducation",
    description: "Providing simple, reliable information about sickle cell disease to reduce stigma and empower patients.",
    icon: BookOpen,
    size: "w-36 h-36 md:w-44 md:h-44",
    position: "top-0 left-1/2 -translate-x-1/2",
    bg: "bg-advocacy-red",
    ring: "ring-advocacy-red/30",
  },
  {
    id: "community",
    title: "Community\nSupport",
    description: "A safe, welcoming space where warriors, caregivers, and supporters connect and find belonging.",
    icon: Users,
    size: "w-32 h-32 md:w-40 md:h-40",
    position: "top-[30%] left-[5%] md:left-[10%]",
    bg: "bg-[hsl(var(--empowerment-purple))]",
    ring: "ring-[hsl(var(--empowerment-purple)/0.3)]",
  },
  {
    id: "skills",
    title: "Skill\nEmpowerment",
    description: "Practical training in baking, packaging, and business skills to build financial independence.",
    icon: Lightbulb,
    size: "w-32 h-32 md:w-40 md:h-40",
    position: "top-[30%] right-[5%] md:right-[10%]",
    bg: "bg-[hsl(var(--hope-gold))]",
    ring: "ring-[hsl(var(--hope-gold)/0.3)]",
  },
  {
    id: "advocacy",
    title: "Advocacy &\nAwareness",
    description: "Amplifying voices and raising awareness to fight for better care, policy, and understanding.",
    icon: HandHeart,
    size: "w-28 h-28 md:w-36 md:h-36",
    position: "bottom-[5%] left-[15%] md:left-[20%]",
    bg: "bg-[hsl(var(--healing-blue))]",
    ring: "ring-[hsl(var(--healing-blue)/0.3)]",
  },
  {
    id: "care",
    title: "Holistic\nCare",
    description: "Addressing physical, emotional, and social challenges through comprehensive, person-centered support.",
    icon: Heart,
    size: "w-28 h-28 md:w-36 md:h-36",
    position: "bottom-[5%] right-[15%] md:right-[20%]",
    bg: "bg-advocacy-red/80",
    ring: "ring-advocacy-red/20",
  },
];

const BubbleDiagram = () => {
  const [active, setActive] = useState<string | null>(null);
  const activeBubble = bubbles.find((b) => b.id === active);

  return (
    <section className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] text-advocacy-red mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Focus Areas
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
            The <span className="italic text-advocacy-red">pillars</span> that
            guide everything we do
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hover over any bubble to reveal more information about each focus
            area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bubble layout */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-advocacy-red/10 border-2 border-advocacy-red/20 flex items-center justify-center z-0">
              <span className="text-xs md:text-sm font-display text-advocacy-red font-bold text-center leading-tight">
                SECLUSA
              </span>
            </div>

            {bubbles.map((bubble) => {
              const Icon = bubble.icon;
              const isActive = active === bubble.id;
              return (
                <div
                  key={bubble.id}
                  className={`absolute ${bubble.position} ${bubble.size} rounded-full ${bubble.bg} flex flex-col items-center justify-center text-primary-foreground cursor-pointer transition-all duration-300 ring-4 ${bubble.ring} ${
                    isActive
                      ? "scale-110 shadow-xl z-20 ring-8"
                      : "hover:scale-105 hover:shadow-lg z-10"
                  }`}
                  onMouseEnter={() => setActive(bubble.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === bubble.id ? null : bubble.id)}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1 opacity-90" />
                  <span className="text-[10px] md:text-xs font-bold text-center leading-tight whitespace-pre-line">
                    {bubble.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Info panel */}
          <div className="flex items-center justify-center min-h-[200px]">
            {activeBubble ? (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${activeBubble.bg} flex items-center justify-center`}
                  >
                    <activeBubble.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display">
                    {activeBubble.title.replace("\n", " ")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  {activeBubble.description}
                </p>
                <div className="w-12 h-[3px] bg-advocacy-red mt-6" />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p className="text-lg italic font-display">
                  Hover or tap a bubble to explore
                </p>
                <div className="w-8 h-[2px] bg-advocacy-red mx-auto mt-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BubbleDiagram;
