import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "Java", "TypeScript", "JavaScript"],
  },
  {
    label: "Developer Tools",
    skills: ["Git", "VS Code"],
  },
  {
    label: "Frameworks / Libraries",
    skills: ["React Native", "NumPy", "NestJS", "Node.js", "Socket.io"],
  },
  {
    label: "Database / Cloud",
    skills: ["Supabase", "MongoDB", "Firebase (OTP/Auth)"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 border-t border-border scroll-mt-20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono-display text-sm mb-2">// what I work with</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-navy-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-primary font-mono-display mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.04 }}
                    className="group/pill relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background/40 text-sm font-mono-display text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                  >
                    <span className="text-primary/60 group-hover/pill:text-primary text-xs">›</span>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
