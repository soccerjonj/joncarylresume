import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import nashvillePreview from "@/assets/project-nashville.jpg";
import sevenPreview from "@/assets/project-7even.jpg";
import scoreboardPreview from "@/assets/project-scoreboardrl.png";
import groceryPreview from "@/assets/project-grocery.png";
import movieClubPreview from "@/assets/project-movieclub.png";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  color: string; // HSL components e.g. "180 100% 50%"
  label: string;
};

const projects: Project[] = [
  {
    title: "ScoreboardRL",
    description:
      "The ultimate stat tracker for Rocket League players. Snap a photo of your scoreboard after your game and have AI auto-fill the stats, then explore charts, trends, and teammate comparisons.",
    tech: ["TypeScript", "React", "Tailwind", "Node.js"],
    github: "https://github.com/soccerjonj/scoreboardrl",
    live: "https://scoreboardrl.vercel.app/",
    image: scoreboardPreview,
    color: "180 100% 50%",
    label: "AI-Powered",
  },
  {
    title: "Movie Club",
    description:
      "A private movie club web app where you and your friends choose movies, guess who picked what, set up video calls for club meetings, and track what you've seen together.",
    tech: ["TypeScript", "React", "Tailwind"],
    github: "https://github.com/soccerjonj/movie-night-hub",
    live: "https://movie-club-hub.lovable.app/",
    image: movieClubPreview,
    color: "270 70% 65%",
    label: "Social",
  },
  {
    title: "Grocery List",
    description:
      "A shared household grocery list and pantry app with authentication, so everyone in your home can track what food you have at home, add, check off, and sync grocery list items in real time.",
    tech: ["TypeScript", "React", "Next.js", "Supabase"],
    github: "https://github.com/soccerjonj/grocery-list",
    live: "https://grocery-list-drab.vercel.app/",
    image: groceryPreview,
    color: "145 65% 48%",
    label: "PWA",
  },
  {
    title: "Nashville",
    description:
      "A Subway Builder mod adding a detailed map of Nashville (BNA). Built using GIS data engineering and Python to process census demand data into PMTiles.",
    tech: ["Python", "GIS", "JavaScript", "Shell"],
    github: "https://github.com/soccerjonj/Nashville",
    live: "https://subwaybuildermodded.com/railyard/maps/nashville",
    image: nashvillePreview,
    color: "38 92% 55%",
    label: "GIS / Data",
  },
  {
    title: "7even",
    description:
      "A high-intentionality dating MVP for Chicago university students. Built at DemonHacks with weekly automated matching based on personality assessments.",
    tech: ["TypeScript", "React Native", "NestJS", "Node.js"],
    github: "https://github.com/soccerjonj/7even-DemonHacks-Hackathon-",
    live: "https://devpost.com/software/7even",
    image: sevenPreview,
    color: "340 80% 62%",
    label: "Hackathon",
  },
];

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

interface ProjectCardProps {
  project: Project;
  dimmed: boolean;
  onHover: (title: string | null) => void;
}

const ProjectCard = ({ project, dimmed, onHover }: ProjectCardProps) => {
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useTransform(my, [0, 1], [6, -6]);
  const rotateY = useTransform(mx, [0, 1], [-8, 8]);
  const imgX = useTransform(mx, [0, 1], [6, -6]);
  const imgY = useTransform(my, [0, 1], [4, -4]);
  const spotlight = useTransform(
    [mx, my] as never,
    ([x, y]: [number, number]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, hsl(${project.color} / 0.5), transparent 55%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    setActive(false);
    onHover(null);
  };

  const domain = project.live ? getDomain(project.live) : "github.com";

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(project.title)}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onFocus={() => onHover(project.title)}
      onBlur={() => onHover(null)}
      onClick={() => setActive((v) => !v)}
      tabIndex={0}
      animate={{ opacity: dimmed ? 0.38 : 1, scale: dimmed ? 0.96 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative w-[240px] sm:w-[295px] md:w-[320px] shrink-0 cursor-pointer focus:outline-none [transform-style:preserve-3d]"
    >
      {/* Animated gradient border — uses project color */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin"
        style={{
          background: `conic-gradient(from var(--angle, 0deg), hsl(${project.color} / 0.75), hsl(${project.color} / 0.25), transparent 40%, transparent 60%, hsl(${project.color} / 0.75))`,
        }}
      />

      <div
        className="relative bg-navy-card border border-border rounded-xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1"
        style={{
          boxShadow: "var(--shadow-card)",
          borderColor: undefined,
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 bg-background/60 border-b border-border">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-2 px-2 py-0.5 rounded-md bg-muted/40 border border-border/60 text-[10px] font-mono-display text-muted-foreground truncate text-center">
            {domain}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.title} source on GitHub`}
            className="text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Preview viewport */}
        <div className="relative overflow-hidden aspect-video bg-muted">
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            style={{ x: imgX, y: imgY }}
            className="w-full h-full object-cover scale-110"
          />

          {/* Cursor spotlight — project-colored */}
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-soft-light"
            style={{ background: spotlight }}
          />

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,hsl(var(--background)/0.06)_2px,hsl(var(--background)/0.06)_3px)]" />

          {/* Label badge */}
          <div
            className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono-display font-semibold backdrop-blur-sm border"
            style={{
              color: `hsl(${project.color})`,
              borderColor: `hsl(${project.color} / 0.4)`,
              background: `hsl(${project.color} / 0.12)`,
            }}
          >
            {project.label}
          </div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-card/80 to-transparent" />
        </div>

        {/* Expandable description panel */}
        <div
          className={`bg-navy-card overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
            active ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3 border-t border-border/60">
            <p className="text-foreground/90 text-xs leading-snug">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono-display px-2 py-0.5 rounded border transition-colors"
                  style={{
                    color: `hsl(${project.color} / 0.9)`,
                    borderColor: `hsl(${project.color} / 0.25)`,
                    background: `hsl(${project.color} / 0.08)`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono-display text-xs hover:scale-105 transition-all"
                style={{
                  background: `hsl(${project.color})`,
                  color: "hsl(222 28% 7%)",
                  boxShadow: `0 4px 14px hsl(${project.color} / 0.35)`,
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> Try it out
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 flex items-center justify-between gap-2 bg-background/40">
          <h3 className="text-xs font-bold text-foreground font-mono-display truncate">{project.title}</h3>
          <span className="text-[10px] text-muted-foreground font-mono-display truncate">
            {project.tech.slice(0, 2).join(" · ")}
          </span>
        </div>
      </div>

      {/* Outer glow — project-colored */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
        style={{ background: `hsl(${project.color} / 0.13)` }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const marqueeProjects = [...projects, ...projects, ...projects];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  const isHoveringCardRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const SPEED = 35;

  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const hoveredProject = projects.find((p) => p.title === hoveredTitle) ?? null;

  const handleCardHover = (title: string | null) => {
    setHoveredTitle(title);
    isHoveringCardRef.current = title !== null;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const setupScroll = () => {
      el.scrollLeft = el.scrollWidth / 3;
    };
    setupScroll();

    let rafId = 0;
    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = (ts - last) / 1000;
      lastTsRef.current = ts;

      const now = performance.now();
      const paused = isHoveringCardRef.current || now < pauseUntilRef.current;
      if (!paused) {
        el.scrollLeft += SPEED * dt;
      }

      const oneThird = el.scrollWidth / 3;
      if (el.scrollLeft >= oneThird * 2) {
        el.scrollLeft -= oneThird;
      } else if (el.scrollLeft <= oneThird * 0.1) {
        el.scrollLeft += oneThird;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const pause = (ms = 1800) => {
      pauseUntilRef.current = performance.now() + ms;
    };
    const onWheel = () => pause();
    const onPointerDown = () => pause(2500);
    const onTouchStart = () => pause(2500);

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let captured = false;
    let capturedPointerId = 0;
    const DRAG_THRESHOLD = 6;
    const onDown = (e: PointerEvent) => {
      isDown = true;
      captured = false;
      capturedPointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const delta = e.clientX - startX;
      if (!captured && Math.abs(delta) > DRAG_THRESHOLD) {
        captured = true;
        el.setPointerCapture?.(capturedPointerId);
      }
      if (!captured) return;
      el.scrollLeft = startScroll - delta;
      pause(2000);
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      if (captured) el.releasePointerCapture?.(e.pointerId);
      captured = false;
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const cardWidth = (card?.offsetWidth ?? 320) + 24;
    pauseUntilRef.current = performance.now() + 2500;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24 overflow-hidden relative">
      {/* Section-level ambient glow that shifts to match hovered project */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[120px]"
            style={{ background: `hsl(${hoveredProject.color} / 0.045)` }}
          />
        )}
      </AnimatePresence>

      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono-display text-sm mb-2">// featured work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projects</h2>
        </motion.div>
      </div>

      {/* Scroller */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative group/marquee"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-40 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-40 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

        {/* Prev / Next buttons */}
        <button
          type="button"
          aria-label="Scroll projects left"
          onClick={() => scrollByCard(-1)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-navy-card/80 backdrop-blur border border-border text-foreground/80 hover:text-primary hover:border-primary/50 hover:scale-110 transition-all opacity-0 group-hover/marquee:opacity-100 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll projects right"
          onClick={() => scrollByCard(1)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-navy-card/80 backdrop-blur border border-border text-foreground/80 hover:text-primary hover:border-primary/50 hover:scale-110 transition-all opacity-0 group-hover/marquee:opacity-100 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex items-start gap-6 py-6 overflow-x-auto no-scrollbar cursor-grab select-none"
          style={{ scrollbarWidth: "none" }}
        >
          {marqueeProjects.map((project, i) => {
            const floatRange = 6;
            const duration = 3.6 + (i % 4) * 0.35;
            const delay = (i % 5) * 0.4;
            return (
              <motion.div
                key={`${project.title}-${i}`}
                data-project-card
                animate={prefersReducedMotion ? undefined : { y: [-floatRange, floatRange, -floatRange] }}
                transition={prefersReducedMotion ? undefined : { duration, delay, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.98 }}
              >
                <ProjectCard
                  project={project}
                  dimmed={hoveredTitle !== null && hoveredTitle !== project.title}
                  onHover={handleCardHover}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* "Now previewing" info bar */}
      <div className="container max-w-5xl mx-auto px-6">
        <div className="h-14 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredProject ? (
              <motion.div
                key={hoveredProject.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 flex-wrap justify-center"
              >
                <span
                  className="font-mono-display text-sm font-bold tracking-wide"
                  style={{ color: `hsl(${hoveredProject.color})` }}
                >
                  {hoveredProject.title}
                </span>
                <span className="text-border text-xs">·</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {hoveredProject.tech.map((t, idx) => (
                    <span key={t} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono-display text-muted-foreground">{t}</span>
                      {idx < hoveredProject.tech.length - 1 && (
                        <span className="text-border/60 text-[10px]">·</span>
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-border text-xs">·</span>
                <div className="flex items-center gap-2">
                  <a
                    href={hoveredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-[11px] font-mono-display"
                  >
                    <Github className="w-3 h-3" />
                    Code
                  </a>
                  {hoveredProject.live && (
                    <a
                      href={hoveredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono-display text-[11px] font-semibold transition-all hover:scale-105"
                      style={{ color: `hsl(${hoveredProject.color})` }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live demo
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground/35 text-xs font-mono-display"
              >
                hover a project · click to expand details
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/soccerjonj?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono-display text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 px-6 py-3 rounded-lg transition-all hover:bg-primary/5"
          >
            <Github className="w-4 h-4" />
            View all repositories on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
