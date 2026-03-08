import { Heart } from "lucide-react";

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-16 md:py-24 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl">About SECLUSA</h1>
        <p className="mt-4 opacity-80 text-lg max-w-2xl mx-auto">
          Sickle Cell Empowerment and Care Link for the Underserved Stigmatized and Affected
        </p>
      </div>
    </section>

    {/* Founder */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-advocacy-red/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-advocacy-red" />
          </div>
          <h2 className="font-heading font-bold text-3xl">Meet the Founder</h2>
        </div>
        <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm">
          <h3 className="font-heading font-semibold text-xl text-primary mb-4">Hadiza Haruna</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            My name is Hadiza Haruna, I am the founder of SECLUSA and also a sickle cell warrior. Living with
            sickle cell has helped me understand the real challenges many people face — not just with health,
            but also with stigma, financial struggles, and lack of support.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I started SECLUSA to create a safe community where people affected by sickle cell can find support,
            access helpful information, and learn practical skills that can improve their lives.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Through SECLUSA, we are building a space where people feel seen, supported, and empowered.
          </p>
        </div>
      </div>
    </section>

    {/* Why We Started */}
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-heading font-bold text-3xl mb-6">Why We Started</h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          SECLUSA was born from both personal experience and a deep desire to help others. As someone living
          with sickle cell, I understand the physical, emotional, and social challenges that many people face.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          Many people affected by sickle cell also struggle with stigma, lack of information, and limited
          economic opportunities. I wanted to create something that goes beyond awareness — a platform that
          provides real support, community, and opportunities for empowerment.
        </p>
        <p className="text-foreground leading-relaxed text-lg font-medium">
          SECLUSA is about reminding people affected by sickle cell that their lives matter, their voices
          matter, and they deserve opportunities to thrive.
        </p>
      </div>
    </section>
  </div>
);

export default About;
