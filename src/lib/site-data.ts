// Default site content — bundled at build time so SSR and the first paint
// always have data. At runtime the client fetches `/content.json` from the
// public folder; edit that file (in `public/content.json`) to update
// projects, copy, and section content without changing any code.
//
// Shape kept in sync with `public/content.json`.
import defaultContent from "../../public/content.json";

export type SiteData = {
  brand: {
    name: string;
    monogram: string;
    location: string;
    nav: { label: string; href: string }[];
  };
  selectedWork: {
    eyebrow: string;
    title: string;
    viewAll: { label: string; href: string };
    projects: {
      id: string;
      category: string;
      title: string;
      description: string;
      image: string;
      href: string;
      repo?: string;
      role?: string;
      techStack?: string[];
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: { label: string; href: string };
  };
  testimonial: {
    eyebrow: string;
    title: string;
    quote: string;
    author: string;
  };
  devCta: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    socials: { label: string; href: string }[];
  };
};

export const siteData = defaultContent as SiteData;
