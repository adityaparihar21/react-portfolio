import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AP3DMonogram from "../components/AP3DMonogram";
import { EngineeringPortfolio } from "../components/EngineeringPortfolio";
import { DebugErrorBoundary } from "../components/DebugErrorBoundary";
import { Instagram, Youtube, Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
import { siteData } from "@/lib/site-data";
import { useContent } from "@/lib/use-content";
import { ProjectDrawer, type DrawerProject } from "@/components/ProjectDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteData.brand.name} — Software Engineer` },
      {
        name: "description",
        content: "Software Engineer specializing in AI, Machine Learning, and highly performant backend architecture.",
      },
    ],
  }),
  component: Index,
});

/* ---------------- Shared motion presets ---------------- */
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* ---------------- Header ---------------- */
function Header({ data }: { data: ReturnType<typeof useContent> }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
        scrolled || menuOpen
          ? "backdrop-blur-xl bg-background/75 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="flex items-center gap-2 w-10 h-10 md:w-12 md:h-12" onClick={() => setMenuOpen(false)}>
          <div className="w-10 h-10 md:w-12 md:h-12" />
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {data.brand.nav
            .flatMap((item) => {
              if (item.label.toLowerCase() === "work") {
                return [
                  { ...item, label: "Projects" },
                  { label: "Open Source", href: "#open-source" }
                ];
              }
              if (item.label.toLowerCase() === "creative") return [];
              return item;
            })
            .map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[11px] font-medium tracking-[0.25em] uppercase transition-colors hover:text-primary ${
                  i === 0 ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.label}
              </a>
            ))}
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground hover:text-primary transition-colors p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="md:hidden w-full bg-background/95 backdrop-blur-2xl border-t border-border overflow-hidden"
        >
          <nav className="flex flex-col px-6 py-8 gap-6">
            {data.brand.nav
              .flatMap((item) => {
                if (item.label.toLowerCase() === "work") {
                  return [
                    { ...item, label: "Projects" },
                    { label: "Open Source", href: "#open-source" }
                  ];
                }
                if (item.label.toLowerCase() === "creative") return [];
                return item;
              })
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-serif font-light tracking-wide text-foreground/90 hover:text-primary transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ---------------- Shared Sub-Components ---------------- */
function SectionEyebrow({ children }: { children: string }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="flex items-center gap-4 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/80"
    >
      <div className="h-px w-6 bg-primary/40" />
      {children}
    </motion.div>
  );
}

/* ---------------- About ---------------- */
function About({ data }: { data: ReturnType<typeof useContent> }) {
  const { eyebrow, title, paragraphs, cta } = data.about;
  return (
    <section id="about" className="bg-background px-6 py-32 md:px-12 md:py-44 border-t border-[rgba(100,150,210,0.1)]">
      <div className="mx-auto max-w-[800px] flex flex-col items-start gap-16 md:gap-24">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start gap-6 w-full"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl text-[#a8c4e0]"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="mt-2 flex flex-col gap-4 text-base font-light leading-relaxed text-[rgba(168,196,224,0.8)] md:text-lg"
          >
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </motion.div>
          <motion.a
            variants={fadeUp}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            href={cta.href}
            className="mt-6 inline-flex items-center gap-3 border border-[rgba(55,138,221,0.3)] px-8 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#a8c4e0] transition-all hover:bg-[rgba(55,138,221,0.1)]"
          >
            {cta.label}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Testimonial ---------------- */
function Testimonial({ data }: { data: ReturnType<typeof useContent> }) {
  const { eyebrow, title, quote, author } = data.testimonial;
  return (
    <section className="border-b border-border bg-[#050810]/50 px-6 py-32 md:px-12 md:py-44">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center"
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="font-serif text-3xl font-medium tracking-tight md:text-4xl text-[#a8c4e0]"
        >
          {title}
        </motion.h2>
        <motion.blockquote
          variants={fadeUp}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
          className="font-serif text-2xl font-medium italic leading-[1.4] text-white/90 md:text-4xl"
        >
          <span className="text-[rgba(100,150,210,0.5)]">&ldquo;</span>
          {quote}
          <span className="text-[rgba(100,150,210,0.5)]">&rdquo;</span>
        </motion.blockquote>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="text-[11px] font-medium tracking-[0.3em] uppercase text-[rgba(120,160,200,0.6)]"
        >
          — {author}
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------------- Call to Action (Footer) ---------------- */
function CallToAction({ data }: { data: ReturnType<typeof useContent> }) {
  const ctaData = data.devCta || {};
  const { eyebrow = "", title = "", description = "", email = "", socials = [] } = ctaData;
  
  const iconFor = (label: string) =>
    label === "Instagram" ? Instagram :
    label === "YouTube" ? Youtube :
    label === "GitHub" ? Github :
    label === "LinkedIn" ? Linkedin : Mail;

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border px-6 pt-32 md:px-12 md:pt-44 pb-32 md:pb-44 bg-[#070b12]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(100,150,210,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(100,150,210,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-20">
        <motion.div variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col items-start gap-8">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <motion.h2 variants={fadeUp} transition={{ duration: 1.1, ease: EASE_OUT_EXPO }} className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight md:text-8xl font-mono text-[#a8c4e0]">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }} className="max-w-xl text-base font-light leading-relaxed md:text-lg font-mono text-[rgba(120,160,200,0.7)]">
            {description}
          </motion.p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 w-full">
            <motion.a variants={fadeUp} transition={{ duration: 0.9, ease: EASE_OUT_EXPO }} href={`mailto:${email}`} className="inline-flex max-w-full items-center gap-2 px-4 py-3 md:px-10 md:py-4 text-[10px] md:text-[11px] font-semibold tracking-[0.12em] md:tracking-[0.25em] uppercase transition-all hover:gap-4 bg-[rgba(55,138,221,0.1)] border border-[rgba(55,138,221,0.3)] text-[#a8c4e0] hover:bg-[rgba(55,138,221,0.2)]">
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              <span className="truncate">{email}</span>
            </motion.a>

            <motion.a variants={fadeUp} transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }} href="/AP_ENG_RESUME.docx" download="Aditya_Parihar_Resume.docx" className="inline-flex max-w-full items-center gap-2 px-4 py-3 md:px-10 md:py-4 text-[10px] md:text-[11px] font-semibold tracking-[0.12em] md:tracking-[0.25em] uppercase transition-all hover:gap-4 border border-[rgba(55,138,221,0.2)] text-[rgba(120,160,200,0.8)] hover:text-[#a8c4e0] hover:bg-[rgba(55,138,221,0.05)]">
              <Download className="h-4 w-4" strokeWidth={1.75} />
              <span className="truncate">Download Resume</span>
            </motion.a>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8 border-t border-[rgba(100,150,210,0.1)] pt-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-3xl italic text-white">
              {data.brand.monogram}
            </span>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-[rgba(120,160,200,0.5)]">
              {data.brand.location}
            </span>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[rgba(120,160,200,0.5)]">
              Elsewhere
            </span>
            <div className="flex gap-6">
              {socials.map((s) => {
                const Icon = iconFor(s.label);
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-light text-[rgba(168,196,224,0.7)] transition-colors hover:text-[#a8c4e0]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase md:flex-row md:items-center md:justify-between text-[rgba(120,160,200,0.3)]">
          <span>© {new Date().getFullYear()} {data.brand.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Page ---------------- */
export default function Index() {
  const data = useContent();
  const [selectedProject, setSelectedProject] = useState<DrawerProject | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <DebugErrorBoundary>
      <div className="bg-[#050810] min-h-screen text-[#a8c4e0]">
        <motion.div
          className="relative min-h-screen antialiased selection:bg-[rgba(55,138,221,0.15)] selection:text-[#b8d4f0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Header data={data} />

          <div className="relative z-10 w-full">
            <EngineeringPortfolio data={data} onOpenProject={setSelectedProject} />
          </div>

          <About data={data} />
          <Testimonial data={data} />
          <CallToAction data={data} />
        </motion.div>

        {/* 3D Monogram - Navigation Icon */}
        <motion.div
          layout
          className="fixed left-6 md:left-[48px] top-4 w-10 h-10 md:w-12 md:h-12 z-[60] pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <AP3DMonogram isMini={true} themeMode="engineering" hoverMode="none" />
        </motion.div>
        
        {/* Project Drawer Overlay */}
        <ProjectDrawer 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </DebugErrorBoundary>
  );
}
