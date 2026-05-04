import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center grid-bg overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

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

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono-display text-muted-foreground text-lg md:text-xl mb-6"
        >
          <span className="text-primary">~/</span> Computer Science Student
          <span className="text-primary"> · </span>
          Concentration in AI
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

        {/* Scroll indicator — hidden on short viewports to avoid colliding with marquee */}
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
