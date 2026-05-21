import { motion } from "framer-motion";
import { ExternalLink, Globe, Map, Film } from "lucide-react";

const items = [
  {
    title: "DePaul Club Pickleball",
    description: "Designed and built the official website for the DePaul Club Pickleball team.",
    href: "https://depaul-pickleball-club.vercel.app/",
    icon: Globe,
    tag: "Web Design",
  },
  {
    title: "Subway Builder — soccerjonj",
    description: "Top 20 Subway Builder modder with over 850 downloads across 7 published maps.",
    href: "https://subwaybuildermodded.com/registry/authors/soccerjonj/",
    icon: Map,
    tag: "Map Modding",
  },
  {
    title: "WellWatched",
    description: "Web app that pull yours Letterboxd watch history, presenting movie lists (IMDb 100, Letterboxd 500, and more) as scratch-off posters. One-tap shareable images included.",
    href: "https://wellwatched.vercel.app/",
    icon: Film,
    tag: "Web App",
  },
];

const OtherWork = () => {
  return (
    <section id="other-work" className="py-20 px-3 sm:px-6 border-t border-border/50">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="font-mono-display text-3xl md:text-4xl font-bold mb-3">
            <span className="text-primary">#</span> Other Work
          </h2>
          <p className="text-muted-foreground font-mono-display text-sm">Other side projects I'm proud of.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col bg-navy-card border border-border rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-colors overflow-hidden h-full"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="font-mono-display text-[10px] sm:text-xs text-primary mb-1.5 sm:mb-2 uppercase tracking-wider">
                  {item.tag}
                </div>
                <h3 className="font-mono-display text-sm sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherWork;
