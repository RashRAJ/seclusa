import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => (
  <div>
    <section className="bg-primary py-16 md:py-24 text-primary-foreground text-center">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl">Contact Us</h1>
        <p className="mt-4 opacity-80 text-lg max-w-2xl mx-auto">
          We'd love to hear from you. Reach out and let's connect.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6">Get in Touch</h2>
            <div className="space-y-5">
              <Card className="border-none bg-card">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">Email</p>
                    <a href="mailto:seclusa.org@gmail.com" className="text-muted-foreground text-sm hover:text-primary">
                      seclusa.org@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none bg-card">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-healing-blue/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-healing-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">Phone / WhatsApp</p>
                    <p className="text-muted-foreground text-sm">09068963469</p>
                    <p className="text-muted-foreground text-sm">08084479818</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none bg-card">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-hope-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-hope-gold" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm">Location</p>
                    <p className="text-muted-foreground text-sm">Hotoro, Kano, Nigeria</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/khady_bakes_and_sweets_venture" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1CH2rer3yN/" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Name" className="bg-card" />
              <Input type="email" placeholder="Your Email" className="bg-card" />
              <Input placeholder="Subject" className="bg-card" />
              <Textarea placeholder="Your Message" rows={5} className="bg-card" />
              <Button type="submit" size="lg" className="w-full font-heading font-semibold">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
