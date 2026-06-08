import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 6, suffix: " yrs", label: "as an indie artist" },
  { value: 100, suffix: "M+", label: "streams scaled" },
  { value: 10, suffix: "+", label: "shipped projects" },
];

const useCounter = (target: number, inView: boolean, duration = 1400) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    setCount(0);
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(eased * target));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
};

const StatCard = ({ stat, index }: { stat: (typeof stats)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(stat.value, inView, 1200 + index * 200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className="relative bg-navy-card border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/40 transition-colors overflow-hidden group"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-primary/5" />
      <div className="font-mono-display text-2xl sm:text-4xl font-bold gradient-text leading-none tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground font-mono-display uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 border-t border-border scroll-mt-20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary font-mono-display text-sm mb-2">// who I am</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 max-w-3xl">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-foreground text-lg font-semibold mb-4">Hey, I'm Jon.</p>
          <p className="text-muted-foreground text-base leading-relaxed">
            I'm a developer and a creator obsessed with the "how" behind the "what." Before pursuing Computer Science
            and AI at DePaul, I spent six years as a self-managed artist under my own LLC. Navigating the music industry
            independently to 100M+ streams taught me how to scale a brand, manage complex business cycles, and stay
            disciplined under pressure.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mt-4">
            I've traded the recording studio for the IDE, but my goal remains the same: building products that resonate
            and impact people. Whether I'm building modded maps for transit video games or crafting full-stack apps, I
            bring a "founder's mindset" to every project, willing and eager to collaborate and grow with any team.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mt-4">
            Lately, I've been building AI-powered apps to solve small problems in my own life: a movie club app that
            replaced the Google Forms I used to send my high school friends, a shared grocery and pantry tracker that
            updates in real time so my partner and I always know what's at home, and a Rocket League stats tracker that
            uses AI to scan post-game scoreboards.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mt-4">Let's connect.</p>
          <p className="text-muted-foreground/70 text-sm italic mt-6">
            Off the clock: Pickleball enthusiast, aspiring amateur home chef, cat dad, and avid letterboxd user.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
