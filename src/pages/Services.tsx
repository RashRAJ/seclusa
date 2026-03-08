import { BookOpen, Users, Briefcase, ChefHat, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: BookOpen,
    title: "Sickle Cell Education & Awareness",
    description: "We share simple, reliable information about sickle cell to help people understand the condition better, reduce stigma, and support those affected.",
    color: "text-advocacy-red",
    bg: "bg-advocacy-red/10",
  },
  {
    icon: Users,
    title: "Community Support Network",
    description: "SECLUSA connects people living with sickle cell, caregivers, and supporters so they can share experiences, encouragement, and helpful resources.",
    color: "text-healing-blue",
    bg: "bg-healing-blue/10",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship & Skill Empowerment",
    description: "We provide practical skill training to help people become more financially independent. This includes baking training and packaging education for small businesses.",
    color: "text-hope-gold",
    bg: "bg-hope-gold/10",
  },
  {
    icon: ChefHat,
    title: "Baking Training & Products",
    description: "Through our baking program, we teach people how to bake simple products that they can sell to generate income. We also showcase baked goods made through our training programs.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Package,
    title: "Packaging Skills & Product Presentation",
    description: "We teach small business owners how to package their products professionally so they can attract more customers and grow their businesses.",
    color: "text-healing-blue",
    bg: "bg-healing-blue/10",
  },
];

const Services = () => (
  <div>
    <section className="bg-primary py-16 md:py-24 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl">Our Services</h1>
        <p className="mt-4 opacity-80 text-lg max-w-2xl mx-auto">
          Education, support, and empowerment — everything we offer is designed to help people affected by sickle cell thrive.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="border-none bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Products Showcase Placeholder */}
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-3xl mb-4">Featured Products</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Browse baked goods, packaging items, and training kits from our empowerment programs. Coming soon!
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {["Baked Goods", "Packaging Kits", "Training Materials"].map((item) => (
            <div key={item} className="bg-card rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-4" />
              <p className="font-heading font-semibold">{item}</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
