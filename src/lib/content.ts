// Content Management System using Lovable Cloud (Supabase)
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  hero: {
    tagline: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    description: string;
    ctaText: string;
  };
  stats: Array<{ value: string; label: string }>;
  about: {
    tagline: string;
    title: string;
    description: string;
    quote: string;
  };
  whyWeStarted: {
    tagline: string;
    title: string;
    description: string;
    quote: string;
  };
  team: {
    tagline: string;
    title: string;
    members: Array<{ name: string; role: string; image: string }>;
  };
  testimonials: Array<{ quote: string }>;
  community: {
    tagline: string;
    title: string;
    description: string;
  };
  contact: {
    tagline: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
  };
  services: {
    tagline: string;
    title: string;
    description: string;
    items: Array<{ number: string; title: string; description: string }>;
  };
  images: {
    heroImage: string;
    aboutImage: string;
    foundersImage: string;
    togetherThriveImage: string;
    communityImage: string;
    servicesHeroImage: string;
    teamImages: string[];
    galleryImages: string[];
  };
}

const defaultContent: SiteContent = {
  hero: {
    tagline: "Sickle Cell Empowerment & Care Link",
    title1: "Empowering",
    titleHighlight: "Lives",
    title2: "Through Care",
    description: "SECLUSA provides health education, community support, and entrepreneurship training to help people living with sickle cell disease thrive.",
    ctaText: "Join the Movement",
  },
  stats: [
    { value: "100+", label: "Lives Impacted" },
    { value: "5", label: "Core Programs" },
    { value: "3", label: "Focus Areas" },
  ],
  about: {
    tagline: "About SECLUSA",
    title: "Born from experience, driven by purpose",
    description: "SECLUSA was born from both personal experience and a deep desire to help others. As someone living with sickle cell, founder Hadiza Haruna understands the physical, emotional, and social challenges many people face.",
    quote: "Their lives matter, their voices matter, and they deserve opportunities to thrive.",
  },
  whyWeStarted: {
    tagline: "Our Purpose",
    title: "Why We Started",
    description: "Many people affected by sickle cell struggle with stigma, lack of information, and limited economic opportunities. We wanted to create something that goes beyond awareness.",
    quote: "SECLUSA is about reminding people that their lives matter and they deserve opportunities to thrive.",
  },
  team: {
    tagline: "Meet Our Team",
    title: "The People Behind SECLUSA",
    members: [
      { name: "Hadiza Haruna", role: "Founder", image: "" },
      { name: "Aisha Haruna Muhammad", role: "Co-Founder", image: "" },
      { name: "Muhammad Haruna Muhammad", role: "Team Member", image: "" },
      { name: "Favour Abu David", role: "Team Member", image: "" },
    ],
  },
  testimonials: [
    { quote: "SECLUSA is creating a space where people affected by sickle cell can feel understood, supported, and empowered." },
    { quote: "The combination of health awareness and skill empowerment makes SECLUSA a truly impactful initiative." },
  ],
  community: {
    tagline: "Community",
    title: "Join the Movement",
    description: "Become part of a growing community of warriors, caregivers, and supporters working together to empower lives.",
  },
  contact: {
    tagline: "Contact",
    title: "Let's Connect",
    description: "We'd love to hear from you. Reach out and let's build something meaningful together.",
    email: "seclusa.org@gmail.com",
    phone: "09068963469 · 08084479818",
    location: "Hotoro, Kano, Nigeria",
  },
  services: {
    tagline: "What We Do",
    title: "Our Services",
    description: "We combine health education, community support, and skill empowerment to help people living with sickle cell thrive.",
    items: [
      { number: "01", title: "Sickle Cell Education & Awareness", description: "We share simple, reliable information about sickle cell to help people understand the condition better, reduce stigma, and support those affected." },
      { number: "02", title: "Community Support Network", description: "SECLUSA connects people living with sickle cell, caregivers, and supporters so they can share experiences, encouragement, and helpful resources." },
      { number: "03", title: "Entrepreneurship & Skill Empowerment", description: "We provide practical skill training to help people become more financially independent, including baking training and packaging education." },
      { number: "04", title: "Baking Training & Products", description: "Through our baking program, we teach people how to bake simple products that they can sell to generate income." },
      { number: "05", title: "Packaging Skills & Presentation", description: "We teach small business owners how to package their products professionally so they can attract more customers." },
    ],
  },
  images: {
    heroImage: "",
    aboutImage: "",
    foundersImage: "",
    togetherThriveImage: "",
    communityImage: "",
    servicesHeroImage: "",
    teamImages: ["", "", "", ""],
    galleryImages: ["", "", "", "", ""],
  },
};

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("content_key", "main")
      .maybeSingle();

    if (error) {
      console.error("Error loading content:", error);
      return defaultContent;
    }

    if (data?.content) {
      return { ...defaultContent, ...(data.content as unknown as Partial<SiteContent>) };
    }
  } catch (e) {
    console.error("Error loading content:", e);
  }
  return defaultContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  try {
    const { error } = await (supabase
      .from("site_content") as any)
      .upsert({
        content_key: "main",
        content: content,
        updated_at: new Date().toISOString(),
      }, { onConflict: "content_key" });

    if (error) {
      console.error("Error saving content:", error);
      throw error;
    }
  } catch (e) {
    console.error("Error saving content:", e);
    throw e;
  }
}

export async function resetContent(): Promise<void> {
  try {
    const { error } = await supabase
      .from("site_content")
      .upsert({
        content_key: "main",
        content: defaultContent as unknown as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      }, { onConflict: "content_key" });

    if (error) throw error;
  } catch (e) {
    console.error("Error resetting content:", e);
    throw e;
  }
}

export async function uploadImage(file: File, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from("site-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage
    .from("site-images")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from("site-images")
    .remove([path]);

  if (error) throw error;
}

export { defaultContent };
