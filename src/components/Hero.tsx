import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ROLES = [
  "CS Student @ DePaul",
  "Full-Stack Developer",
  "AI Builder",
  "Creator",
];
const TYPING_SPEED = 75;
const DELETE_SPEED = 38;
const PAUSE_MS = 2000;

const useTypewriter = (words: string[]) => {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === "typing") {
      if (display.length < word.length) {
        const t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), TYPING_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      }
      setWordIdx((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [display, phase, wordIdx, words]);

  return display;
};

const Hero = () => {
  const typedRole = useTypewriter(ROLES);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center grid-bg overflow-hidden">
      {/* Layered ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary large glow — centered */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[900px] h-[600px] rounded-full bg-primary/8 blur-[100px]"
        />
        {/* Secondary offset glow — violet */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-violet-500/5 blur-[80px]" />
        {/* Tertiary glow — bottom right */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[350px] rounded-full bg-cyan-400/5 blur-[80px]" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono-display mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Open to internship opportunities · 2026
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-none"
        >
          <span className="text-foreground">Jon </span>
          <span className="gradient-text">Caryl</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono-display text-muted-foreground text-lg md:text-xl mb-6 h-8 flex items-center justify-center gap-0"
        >
          <span className="text-primary">~/</span>&nbsp;
          <span className="text-foreground/90">{typedRole}</span>
          <span className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 animate-pulse" />
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed mb-8"
        >
          CS student at DePaul (AI concentration) who scaled an indie music brand to{" "}
          <span className="text-foreground font-medium">100M+ streams</span> before trading the studio for the IDE. Now
          building full-stack products and looking for <span className="text-primary">Summer 2026 internships</span>.
        </motion.p>

        {/* Proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono-display text-muted-foreground mb-3"
        >
          <span>DePaul University</span>
          <span className="text-primary/40">·</span>
          <span>Passionate about software development and AI</span>
          <span className="text-primary/40">·</span>
          <span>Top 20 Subway Builder modder</span>
        </motion.div>

        {/* Now line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="font-mono-display text-xs text-muted-foreground/70 mb-10"
        >
          <span className="text-primary">$</span> now: Working on my grocery app & spending my free time building
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono-display font-semibold glow"
            asChild
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-5 h-5 mr-2" />
              Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/50 hover:bg-primary/5 font-mono-display font-semibold"
            asChild
          >
            <a href="https://github.com/soccerjonj" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/50 hover:bg-primary/5 font-mono-display font-semibold"
            asChild
          >
            <a href="https://www.linkedin.com/in/jon-caryl/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-primary hover:bg-primary/5 font-mono-display font-semibold"
            asChild
          >
            <a href="mailto:jcaryl@depaul.edu">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          href="#projects"
          className="hidden lg:inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono-display"
        >
          <span>scroll to projects</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
