import { motion } from "framer-motion";

const stats = [
  { value: "6", suffix: " yrs", label: "as an indie artist" },
  { value: "100M+", label: "streams scaled" },
  { value: "5+", label: "shipped projects" },
];

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

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 max-w-3xl"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-navy-card border border-border rounded-xl p-4 sm:p-6 text-center hover:border-primary/40 transition-colors"
            >
              <div className="font-mono-display text-2xl sm:text-4xl font-bold gradient-text leading-none">
                {s.value}
                {s.suffix && <span className="text-foreground/80 text-lg sm:text-2xl">{s.suffix}</span>}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground font-mono-display uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

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
            updates in real time so my partner and I always know what's at home and what we still need, and a Rocket
            League stats tracker that uses AI to scan post-game scoreboards, inspired by a friend who was doing the same
            thing manually in Google Sheets.
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
