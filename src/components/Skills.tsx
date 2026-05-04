import { motion } from "framer-motion";

type Skill = {
  name: string;
  category: string;
  level: number; // 1–5
  color: string; // HSL components
};

const skills: Skill[] = [
  { name: "TypeScript", category: "Language", level: 4, color: "212 93% 62%" },
  { name: "JavaScript", category: "Language", level: 4, color: "50 98% 55%" },
  { name: "Python", category: "Language", level: 3, color: "207 89% 68%" },
  { name: "Java", category: "Language", level: 2, color: "10 80% 58%" },
  { name: "React", category: "Framework", level: 4, color: "193 95% 68%" },
  { name: "React Native", category: "Framework", level: 4, color: "193 95% 68%" },
  { name: "Next.js", category: "Framework", level: 3, color: "0 0% 80%" },
  { name: "Node.js", category: "Framework", level: 3, color: "122 39% 52%" },
  { name: "NestJS", category: "Framework", level: 3, color: "350 89% 62%" },
  { name: "Tailwind CSS", category: "Framework", level: 4, color: "199 89% 52%" },
  { name: "Supabase", category: "Database", level: 4, color: "154 60% 51%" },
  { name: "MongoDB", category: "Database", level: 2, color: "122 39% 52%" },
  { name: "Firebase", category: "Database", level: 3, color: "38 92% 55%" },
  { name: "Git", category: "Tool", level: 4, color: "9 80% 58%" },
  { name: "GIS / PMTiles", category: "Tool", level: 3, color: "38 92% 55%" },
  { name: "NumPy", category: "Library", level: 2, color: "207 89% 68%" },
  { name: "Socket.io", category: "Library", level: 3, color: "180 100% 50%" },
  { name: "VS Code", category: "Tool", level: 5, color: "207 89% 68%" },
];

const categoryOrder = ["Language", "Framework", "Database", "Library", "Tool"];

const DOT_COUNT = 5;

const SkillTile = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    className="group relative bg-navy-card border border-border rounded-lg p-3.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default overflow-hidden"
    style={
      {
        "--skill-color": `hsl(${skill.color})`,
      } as React.CSSProperties
    }
  >
    {/* Hover glow */}
    <div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
      style={{ background: `hsl(${skill.color} / 0.07)` }}
    />
    {/* Left accent bar */}
    <div
      className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: `hsl(${skill.color})` }}
    />

    <div className="flex items-start justify-between gap-2 mb-2">
      <span className="font-mono-display text-sm font-semibold text-foreground group-hover:text-white transition-colors leading-tight">
        {skill.name}
      </span>
      <span
        className="shrink-0 text-[9px] font-mono-display px-1.5 py-0.5 rounded border font-medium"
        style={{
          color: `hsl(${skill.color})`,
          borderColor: `hsl(${skill.color} / 0.3)`,
          background: `hsl(${skill.color} / 0.1)`,
        }}
      >
        {skill.category}
      </span>
    </div>

    {/* Proficiency dots */}
    <div className="flex items-center gap-1">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-200"
          style={
            i < skill.level
              ? { background: `hsl(${skill.color})`, boxShadow: `0 0 4px hsl(${skill.color} / 0.6)` }
              : { background: "hsl(var(--border))" }
          }
        />
      ))}
      <span className="ml-1.5 text-[10px] font-mono-display text-muted-foreground/60">
        {["", "Familiar", "Familiar", "Proficient", "Proficient", "Expert"][skill.level]}
      </span>
    </div>
  </motion.div>
);

const Skills = () => {
  const sorted = [...skills].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
  );

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sorted.map((skill, i) => (
            <SkillTile key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex items-center gap-6 text-[11px] font-mono-display text-muted-foreground/50"
        >
          <span>proficiency:</span>
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1,1,0,0,0].map((on, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${on ? "bg-muted-foreground/50" : "bg-border"}`} />
              ))}
            </span>
            Familiar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1,1,1,1,0].map((on, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${on ? "bg-muted-foreground/50" : "bg-border"}`} />
              ))}
            </span>
            Proficient
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              {[1,1,1,1,1].map((on, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${on ? "bg-muted-foreground/50" : "bg-border"}`} />
              ))}
            </span>
            Expert
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
