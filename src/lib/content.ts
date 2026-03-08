// Content Management System using localStorage

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
  },
};

const STORAGE_KEY = "seclusa_content";

export function getContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      return { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("Error loading content:", e);
  }
  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error("Error saving content:", e);
  }
}

export function resetContent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export { defaultContent };
