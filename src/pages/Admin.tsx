import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, BarChart3, FileText, Users, Eye, LogOut, Save, RotateCcw, Plus, Trash2, Home, MessageSquare, Phone, Briefcase, UserCircle, Sparkles, Image as ImageIcon } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-advocacy-red/5 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md border-none shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-6"
              >
                <img src={logo} alt="SECLUSA" className="h-16 w-auto mx-auto" />
              </motion.div>
              <CardTitle className="text-3xl font-display">Admin Panel</CardTitle>
              <CardDescription className="text-base">Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-none border-border focus-visible:ring-advocacy-red"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-none border-border focus-visible:ring-advocacy-red"
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive text-center bg-destructive/10 py-2 rounded"
                  >
                    {error}
                  </motion.p>
                )}
                <Button type="submit" className="w-full h-12 bg-advocacy-red hover:bg-advocacy-red/90 rounded-none uppercase text-xs tracking-widest font-sans">
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-advocacy-red" />
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="SECLUSA" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-display font-bold">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} className="rounded-none border-border hover:border-destructive hover:text-destructive">
              <RotateCcw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button size="sm" className="bg-advocacy-red hover:bg-advocacy-red/90 rounded-none" onClick={handleSave}>
              <Save className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Save Changes</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-8">
          <TabsList className="bg-background border border-border p-1 flex-wrap h-auto gap-1 rounded-none shadow-sm">
            <TabsTrigger value="hero" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <span className="hidden sm:inline">About</span>
              <FileText className="w-4 h-4 sm:hidden" />
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <UserCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-advocacy-red data-[state=active]:text-white rounded-none px-4">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <Home className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Hero Section</CardTitle>
                      <CardDescription>Edit the main homepage hero content</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.hero.tagline}
                      onChange={(e) => updateContent("hero", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title Line 1</label>
                      <Input
                        value={content.hero.title1}
                        onChange={(e) => updateContent("hero", "title1", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Highlighted Word</label>
                      <Input
                        value={content.hero.titleHighlight}
                        onChange={(e) => updateContent("hero", "titleHighlight", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red bg-advocacy-red/5"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title Line 2</label>
                      <Input
                        value={content.hero.title2}
                        onChange={(e) => updateContent("hero", "title2", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent("hero", "description", e.target.value)}
                      rows={3}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">CTA Button Text</label>
                    <Input
                      value={content.hero.ctaText}
                      onChange={(e) => updateContent("hero", "ctaText", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Statistics</CardTitle>
                      <CardDescription>Edit the stats displayed below the hero</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {content.stats.map((stat, i) => (
                      <div key={i} className="space-y-3 p-4 bg-muted/30 border border-border">
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Value</label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateStat(i, "value", e.target.value)}
                            placeholder="e.g., 100+"
                            className="rounded-none h-11 border-border focus-visible:ring-advocacy-red text-2xl font-bold text-center"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Label</label>
                          <Input
                            value={stat.label}
                            onChange={(e) => updateStat(i, "label", e.target.value)}
                            placeholder="Label"
                            className="rounded-none h-11 border-border focus-visible:ring-advocacy-red text-center"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">About Section</CardTitle>
                      <CardDescription>Edit the about section content</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.about.tagline}
                      onChange={(e) => updateContent("about", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title</label>
                    <Input
                      value={content.about.title}
                      onChange={(e) => updateContent("about", "title", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.about.description}
                      onChange={(e) => updateContent("about", "description", e.target.value)}
                      rows={4}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Quote</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-4xl text-advocacy-red/20 font-display">"</span>
                      <Input
                        value={content.about.quote}
                        onChange={(e) => updateContent("about", "quote", e.target.value)}
                        className="rounded-none h-14 border-border focus-visible:ring-advocacy-red pl-12 italic"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <CardTitle className="font-display">Why We Started</CardTitle>
                  <CardDescription>Edit the "Why We Started" section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.whyWeStarted.tagline}
                      onChange={(e) => updateContent("whyWeStarted", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title</label>
                    <Input
                      value={content.whyWeStarted.title}
                      onChange={(e) => updateContent("whyWeStarted", "title", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.whyWeStarted.description}
                      onChange={(e) => updateContent("whyWeStarted", "description", e.target.value)}
                      rows={4}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Quote</label>
                    <Textarea
                      value={content.whyWeStarted.quote}
                      onChange={(e) => updateContent("whyWeStarted", "quote", e.target.value)}
                      rows={2}
                      className="rounded-none border-border focus-visible:ring-advocacy-red italic"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Team Section */}
          <TabsContent value="team" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Team Section</CardTitle>
                      <CardDescription>Edit section header</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Section Tagline</label>
                    <Input
                      value={content.team.tagline}
                      onChange={(e) =>
                        setContent((p) => ({ ...p, team: { ...p.team, tagline: e.target.value } }))
                      }
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Section Title</label>
                    <Input
                      value={content.team.title}
                      onChange={(e) =>
                        setContent((p) => ({ ...p, team: { ...p.team, title: e.target.value } }))
                      }
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <CardTitle className="font-display">Team Members</CardTitle>
                  <CardDescription>Edit team member names and roles</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {content.team.members.map((member, i) => (
                      <div key={i} className="p-5 border border-border bg-background space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <div className="w-12 h-12 bg-advocacy-red/10 flex items-center justify-center text-advocacy-red font-bold text-lg">
                            {i + 1}
                          </div>
                          <span className="text-sm text-muted-foreground uppercase tracking-widest">Team Member</span>
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Name</label>
                          <Input
                            value={member.name}
                            onChange={(e) => updateTeamMember(i, "name", e.target.value)}
                            className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Role</label>
                          <Input
                            value={member.role}
                            onChange={(e) => updateTeamMember(i, "role", e.target.value)}
                            className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Testimonials</CardTitle>
                      <CardDescription>Manage testimonial quotes</CardDescription>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={addTestimonial} className="rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {content.testimonials.map((t, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-muted/30 border border-border">
                      <span className="text-4xl font-display text-advocacy-red/30 leading-none">"</span>
                      <Textarea
                        value={t.quote}
                        onChange={(e) => updateTestimonial(i, e.target.value)}
                        rows={2}
                        className="flex-1 rounded-none border-border focus-visible:ring-advocacy-red italic"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => removeTestimonial(i)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community Section */}
          <TabsContent value="community" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Community Section</CardTitle>
                      <CardDescription>Edit the community/join section</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.community.tagline}
                      onChange={(e) => updateContent("community", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title</label>
                    <Input
                      value={content.community.title}
                      onChange={(e) => updateContent("community", "title", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.community.description}
                      onChange={(e) => updateContent("community", "description", e.target.value)}
                      rows={3}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Contact Section</CardTitle>
                      <CardDescription>Edit contact information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.contact.tagline}
                      onChange={(e) => updateContent("contact", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title</label>
                    <Input
                      value={content.contact.title}
                      onChange={(e) => updateContent("contact", "title", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.contact.description}
                      onChange={(e) => updateContent("contact", "description", e.target.value)}
                      rows={2}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Email</label>
                      <Input
                        value={content.contact.email}
                        onChange={(e) => updateContent("contact", "email", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Phone</label>
                      <Input
                        value={content.contact.phone}
                        onChange={(e) => updateContent("contact", "phone", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Location</label>
                      <Input
                        value={content.contact.location}
                        onChange={(e) => updateContent("contact", "location", e.target.value)}
                        className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Services Section */}
          <TabsContent value="services" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Services Page</CardTitle>
                      <CardDescription>Edit services page header</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Tagline</label>
                    <Input
                      value={content.services.tagline}
                      onChange={(e) => updateContent("services", "tagline", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Title</label>
                    <Input
                      value={content.services.title}
                      onChange={(e) => updateContent("services", "title", e.target.value)}
                      className="rounded-none h-11 border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                    <Textarea
                      value={content.services.description}
                      onChange={(e) => updateContent("services", "description", e.target.value)}
                      rows={2}
                      className="rounded-none border-border focus-visible:ring-advocacy-red"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <CardTitle className="font-display">Service Items</CardTitle>
                  <CardDescription>Edit individual services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {content.services.items.map((service, i) => (
                    <div key={i} className="p-5 border border-border bg-background">
                      <div className="flex items-center gap-4 pb-4 border-b border-border mb-4">
                        <span className="text-4xl font-display font-bold text-advocacy-red/20">{service.number}</span>
                        <Input
                          value={service.title}
                          onChange={(e) => updateService(i, "title", e.target.value)}
                          placeholder="Service title"
                          className="flex-1 rounded-none h-12 border-border focus-visible:ring-advocacy-red font-display text-lg"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-sans">Description</label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(i, "description", e.target.value)}
                          placeholder="Service description"
                          rows={2}
                          className="rounded-none border-border focus-visible:ring-advocacy-red"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-none border-border shadow-sm overflow-hidden">
                  <div className="h-1 bg-advocacy-red" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase tracking-widest text-xs">Total Page Views</CardDescription>
                    <CardTitle className="text-4xl font-display">1,234</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-green-600">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-border shadow-sm overflow-hidden">
                  <div className="h-1 bg-[#6A1B9A]" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase tracking-widest text-xs">Community Members</CardDescription>
                    <CardTitle className="text-4xl font-display">256</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-green-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>+8 new this week</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-none border-border shadow-sm overflow-hidden">
                  <div className="h-1 bg-[#1F8ED6]" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase tracking-widest text-xs">Contact Submissions</CardDescription>
                    <CardTitle className="text-4xl font-display">42</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-amber-600">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>5 pending review</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card className="rounded-none border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-advocacy-red/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-advocacy-red" />
                    </div>
                    <div>
                      <CardTitle className="font-display">Recent Activity</CardTitle>
                      <CardDescription>Overview of recent site activity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { action: "New community signup", time: "2 hours ago", icon: Users, color: "bg-[#6A1B9A]" },
                      { action: "Contact form submitted", time: "5 hours ago", icon: FileText, color: "bg-[#1F8ED6]" },
                      { action: "Services page viewed", time: "1 day ago", icon: Eye, color: "bg-advocacy-red" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 border border-border">
                        <div className={`w-10 h-10 ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
