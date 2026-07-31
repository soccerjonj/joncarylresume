import { useRef, useState } from "react";
import { Github, ExternalLink, ChevronDown, Coffee, Music, type LucideIcon } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import nashvillePreview from "@/assets/project-nashville.jpg";
import sevenPreview from "@/assets/project-7even.jpg";
import scoreboardPreview from "@/assets/project-scoreboardrl.png";
import groceryPreview from "@/assets/project-grocery.png";
import movieClubPreview from "@/assets/project-movieclub.png";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  liveLabel?: string;
  image?: string;
  icon?: LucideIcon;
  color: string; // HSL components e.g. "180 100% 50%"
  label: string;
};

const projects: Project[] = [
  {
    title: "Coffee Journal",
    description:
      "A coffee brew-tracking PWA with dial-in diagnosis, freshness tracking, and brewing-streak scoring, plus procedurally generated bean bag art instead of photo uploads. Runs on Supabase, or fully offline in a local demo mode.",
    tech: ["React", "TypeScript", "Supabase", "TanStack Query"],
    icon: Coffee,
    color: "20 75% 52%",
    label: "Generative UI",
  },
  {
    title: "Songwriters Notebook",
    description:
      "A real-time collaborative songwriting app built on Tiptap and Yjs, with a standalone Hocuspocus server handling multi-cursor CRDT sync and a hand-rolled pitch-detection tuner. Source is private, try the public demo.",
    tech: ["Next.js", "Supabase", "Yjs"],
    live: "https://the-songwriters-notebook.vercel.app/demo",
    liveLabel: "Try the demo",
    icon: Music,
    color: "230 75% 65%",
    label: "Real-time Collab",
  },
  {
    title: "ScoreboardRL",
    description:
      "The ultimate stat tracker for Rocket League players. Snap a photo of your scoreboard after your game and have AI auto-fill the stats, then explore charts, trends, and teammate comparisons.",
    tech: ["TypeScript", "React", "Supabase", "Gemini Vision"],
    github: "https://github.com/soccerjonj/scoreboardrl",
    live: "https://scoreboardrl.vercel.app/",
    liveLabel: "Try the app",
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
    live: "https://the-movie-club-hub.vercel.app/",
    liveLabel: "Open the club",
    image: movieClubPreview,
    color: "270 70% 65%",
    label: "Social",
  },
  {
    title: "Our Pantry",
    description:
      "A shared household grocery list and pantry app with authentication, so everyone in your home can track what food you have at home, add, check off, and sync grocery list items in real time.",
    tech: ["TypeScript", "React", "Next.js", "Supabase"],
    github: "https://github.com/soccerjonj/grocery-list",
    live: "https://our-pantry.vercel.app/",
    liveLabel: "See it live",
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
    liveLabel: "View the map",
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
    liveLabel: "View on Devpost",
    image: sevenPreview,
    color: "340 80% 62%",
    label: "Hackathon",
  },
];

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
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
  };

  const domain = project.live
    ? getDomain(project.live)
    : project.github
      ? getDomain(project.github)
      : "offline-ready";

  const Icon = project.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={() => setActive((v) => !v)}
      tabIndex={0}
      className="group relative w-full h-full cursor-pointer focus:outline-none"
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
        style={{ boxShadow: "var(--shadow-card)" }}
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
          {project.github && (
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
          )}
        </div>

        {/* Preview viewport */}
        <div className="relative overflow-hidden aspect-video bg-muted">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              loading="lazy"
              className="w-full h-full object-cover scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(${project.color} / 0.22), hsl(222 28% 7%))`,
              }}
            >
              {Icon && (
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `hsl(${project.color} / 0.15)`,
                    border: `1px solid hsl(${project.color} / 0.4)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: `hsl(${project.color})` }} />
                </div>
              )}
            </div>
          )}

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

        {/* Title bar / expand trigger */}
        <div className="px-3 py-2 flex items-center justify-between gap-2 bg-background/40">
          <h3 className="text-xs font-bold text-foreground font-mono-display truncate">{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground font-mono-display truncate">
              {project.tech.slice(0, 2).join(" · ")}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${
                active ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </div>
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
                <ExternalLink className="w-3.5 h-3.5" /> {project.liveLabel}
              </a>
            )}
          </div>
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
  return (
    <section id="projects" className="py-24 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
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
