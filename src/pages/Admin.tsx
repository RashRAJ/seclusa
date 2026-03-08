import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, BarChart3, FileText, Users, Eye, LogOut, Save, RotateCcw, Plus, Trash2, Home, MessageSquare, Phone, Briefcase, UserCircle } from "lucide-react";
import { getContent, saveContent, resetContent, SiteContent, defaultContent } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const ADMIN_EMAIL = "seclusa.org@gmail.com";
const ADMIN_PASSWORD = "SECLUSA";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const { toast } = useToast();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setContent(getContent());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const handleSave = () => {
    saveContent(content);
    toast({
      title: "Content saved!",
      description: "Your changes have been saved. Refresh the site to see updates.",
    });
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to defaults?")) {
      resetContent();
      setContent(defaultContent);
      toast({
        title: "Content reset",
        description: "All content has been reset to defaults.",
      });
    }
  };

  const updateContent = <K extends keyof SiteContent>(
    section: K,
    field: keyof SiteContent[K],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    setContent((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)),
    }));
  };

  const updateTestimonial = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t, i) => (i === index ? { quote: value } : t)),
    }));
  };

  const addTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { quote: "New testimonial..." }],
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  const updateTeamMember = (index: number, field: "name" | "role", value: string) => {
    setContent((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
      },
    }));
  };

  const updateService = (index: number, field: "title" | "description", value: string) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
      },
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-advocacy-red/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-advocacy-red" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button type="submit" className="w-full bg-advocacy-red hover:bg-advocacy-red/90">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">SECLUSA Admin</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" className="bg-advocacy-red hover:bg-advocacy-red/90" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit the main homepage hero content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.hero.tagline}
                    onChange={(e) => updateContent("hero", "tagline", e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title Line 1</label>
                    <Input
                      value={content.hero.title1}
                      onChange={(e) => updateContent("hero", "title1", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Highlighted Word</label>
                    <Input
                      value={content.hero.titleHighlight}
                      onChange={(e) => updateContent("hero", "titleHighlight", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title Line 2</label>
                    <Input
                      value={content.hero.title2}
                      onChange={(e) => updateContent("hero", "title2", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.hero.description}
                    onChange={(e) => updateContent("hero", "description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">CTA Button Text</label>
                  <Input
                    value={content.hero.ctaText}
                    onChange={(e) => updateContent("hero", "ctaText", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Edit the stats displayed below the hero</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {content.stats.map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(i, "value", e.target.value)}
                        placeholder="Value (e.g., 100+)"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(i, "label", e.target.value)}
                        placeholder="Label"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.about.tagline}
                    onChange={(e) => updateContent("about", "tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={content.about.title}
                    onChange={(e) => updateContent("about", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.about.description}
                    onChange={(e) => updateContent("about", "description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quote</label>
                  <Input
                    value={content.about.quote}
                    onChange={(e) => updateContent("about", "quote", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why We Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.whyWeStarted.tagline}
                    onChange={(e) => updateContent("whyWeStarted", "tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={content.whyWeStarted.title}
                    onChange={(e) => updateContent("whyWeStarted", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.whyWeStarted.description}
                    onChange={(e) => updateContent("whyWeStarted", "description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quote</label>
                  <Textarea
                    value={content.whyWeStarted.quote}
                    onChange={(e) => updateContent("whyWeStarted", "quote", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Section */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Section Tagline</label>
                  <Input
                    value={content.team.tagline}
                    onChange={(e) =>
                      setContent((p) => ({ ...p, team: { ...p.team, tagline: e.target.value } }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Section Title</label>
                  <Input
                    value={content.team.title}
                    onChange={(e) =>
                      setContent((p) => ({ ...p, team: { ...p.team, title: e.target.value } }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Edit team member names and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.team.members.map((member, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateTeamMember(i, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Role</label>
                        <Input
                          value={member.role}
                          onChange={(e) => updateTeamMember(i, "role", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Manage testimonial quotes</CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={addTestimonial}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.testimonials.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <Textarea
                      value={t.quote}
                      onChange={(e) => updateTestimonial(i, e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeTestimonial(i)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Section */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.community.tagline}
                    onChange={(e) => updateContent("community", "tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={content.community.title}
                    onChange={(e) => updateContent("community", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.community.description}
                    onChange={(e) => updateContent("community", "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.contact.tagline}
                    onChange={(e) => updateContent("contact", "tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={content.contact.title}
                    onChange={(e) => updateContent("contact", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.contact.description}
                    onChange={(e) => updateContent("contact", "description", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      value={content.contact.email}
                      onChange={(e) => updateContent("contact", "email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input
                      value={content.contact.phone}
                      onChange={(e) => updateContent("contact", "phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      value={content.contact.location}
                      onChange={(e) => updateContent("contact", "location", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Section */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Services Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    value={content.services.tagline}
                    onChange={(e) => updateContent("services", "tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={content.services.title}
                    onChange={(e) => updateContent("services", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={content.services.description}
                    onChange={(e) => updateContent("services", "description", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.services.items.map((service, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-advocacy-red/30">{service.number}</span>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(i, "title", e.target.value)}
                        placeholder="Service title"
                        className="flex-1"
                      />
                    </div>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateService(i, "description", e.target.value)}
                      placeholder="Service description"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Page Views</CardDescription>
                  <CardTitle className="text-3xl">1,234</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>+12% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Community Members</CardDescription>
                  <CardTitle className="text-3xl">256</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    <span>+8 new this week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Contact Submissions</CardDescription>
                  <CardTitle className="text-3xl">42</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>5 pending review</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of recent site activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New community signup", time: "2 hours ago", icon: Users },
                    { action: "Contact form submitted", time: "5 hours ago", icon: FileText },
                    { action: "Services page viewed", time: "1 day ago", icon: Eye },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-advocacy-red/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-advocacy-red" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
