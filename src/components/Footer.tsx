import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-border py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono-display font-bold text-lg text-foreground">
              <span className="text-primary">~/</span>joncaryl
            </p>
            <p className="text-muted-foreground text-sm mt-1">CS Student · Available for Summer 2026 Internships</p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/soccerjonj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jon-caryl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:jcaryl@depaul.edu"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground text-xs font-mono-display">
          <span>built with React + Tailwind · {new Date().getFullYear()}</span>
          <a
            href="https://github.com/soccerjonj/joncarylresume"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            view source
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
