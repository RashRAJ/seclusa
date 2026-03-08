import { Heart, Users, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  { icon: Heart, title: "Health Resources", description: "Access trusted information about managing sickle cell disease." },
  { icon: Users, title: "Peer Support", description: "Connect with others who understand your journey." },
  { icon: Sparkles, title: "Skills Training", description: "Learn baking, packaging, and business skills." },
  { icon: Mail, title: "Regular Updates", description: "Receive news, events, and opportunities directly." },
];

const Community = () => (
  <div>
    <section className="bg-gradient-to-br from-primary to-healing-blue py-16 md:py-24 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl">Join the Movement</h1>
        <p className="mt-4 opacity-80 text-lg max-w-2xl mx-auto">
          Become part of a growing community of warriors, caregivers, and supporters
          working together to empower lives affected by sickle cell disease.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-3xl text-center mb-12">Why Join SECLUSA?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <Card key={b.title} className="border-none bg-card text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Join Form */}
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="font-heading font-bold text-3xl mb-4">Get Involved</h2>
        <p className="text-muted-foreground mb-8">
          Reach out to us via email or WhatsApp to join our community and receive updates, support, and resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:seclusa.org@gmail.com">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground font-heading">
              <Mail className="w-4 h-4 mr-2" /> Email Us
            </Button>
          </a>
          <a href="https://wa.me/2349068963469" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-heading">
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Community;
