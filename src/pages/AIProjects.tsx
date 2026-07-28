import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Search, Bot, FlaskConical, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

type AIProject = {
  title: string;
  tag: string;
  description: string;
  href: string;
  icon: typeof Search;
  stack: { name: string; color: string }[];
};

const aiProjects: AIProject[] = [
  {
    title: "Unofficial Guide",
    tag: "RAG Pipeline",
    description:
      "A grounded Q&A system over real DePaul off-campus housing data — scraped Reddit threads, ApartmentRatings, Niche, and Apartments.com — that answers student questions about neighborhoods, roommates, fees, and commutes with cited sources. Chunks are embedded and stored in a persisted ChromaDB vector store, retrieved top-k, and passed to Groq's Llama 3.3 70B for grounded generation with source citations.",
    href: "https://github.com/soccerjonj/ai201-project1-unofficial-guide-starter",
    icon: Search,
    stack: [
      { name: "Python", color: "207 89% 68%" },
      { name: "ChromaDB", color: "180 100% 50%" },
      { name: "sentence-transformers", color: "38 92% 55%" },
      { name: "Groq API", color: "10 80% 58%" },
      { name: "Gradio", color: "154 60% 51%" },
    ],
  },
  {
    title: "FitFindr",
    tag: "AI Agent",
    description:
      "A thrift-shopping AI agent that takes a natural-language style request, searches a secondhand-listings dataset with keyword-scoring filter logic, then calls Groq to suggest an outfit and generate a shareable social-media \"fit card\" caption. Chains a search → outfit → card tool pipeline with a full agent loop and error handling.",
    href: "https://github.com/soccerjonj/ai201-project2-fitfindr-starter",
    icon: Bot,
    stack: [
      { name: "Python", color: "207 89% 68%" },
      { name: "Groq API", color: "10 80% 58%" },
      { name: "Gradio", color: "154 60% 51%" },
    ],
  },
  {
    title: "TakeMeter",
    tag: "Fine-Tuning",
    description:
      "Classifies r/TrueFilm posts into analysis, take, or meta discourse types by fine-tuning DistilBERT on 253 hand-annotated posts, benchmarked against a Groq Llama 3.3 70B zero-shot baseline. Honestly reports that the baseline outperformed the fine-tune (78.95% vs 63.16% accuracy) — a real, explainable result given the small dataset size.",
    href: "https://github.com/soccerjonj/ai201_project3_takemeter",
    icon: FlaskConical,
    stack: [
      { name: "Python", color: "207 89% 68%" },
      { name: "HuggingFace", color: "350 89% 62%" },
      { name: "DistilBERT", color: "350 89% 62%" },
      { name: "Google Colab", color: "38 92% 55%" },
      { name: "Groq API", color: "10 80% 58%" },
    ],
  },
  {
    title: "Provenance Guard",
    tag: "AI Safety / Guardrails",
    description:
      "An AI-generated-text detection and attribution system combining a statistical burstiness signal with an LLM-judge score via a calibrated weighted formula, producing thresholded confidence bands. Logs every decision to a structured JSON audit trail and includes rate limiting plus an appeal workflow for contested classifications.",
    href: "https://github.com/soccerjonj/ai201-project4-provenance-guard",
    icon: ShieldCheck,
    stack: [
      { name: "Python", color: "207 89% 68%" },
      { name: "Flask", color: "0 0% 80%" },
      { name: "Groq API", color: "10 80% 58%" },
      { name: "flask-limiter", color: "38 92% 55%" },
    ],
  },
];

const AIProjects = () => {
  useEffect(() => {
    document.title = "AI Projects — Jonathan Caryl";
  }, []);

  return (
    <main className="min-h-screen bg-background grid-bg">
      <div className="container max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono-display text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-primary font-mono-display text-sm mb-2">// coursework</p>
          <h1 className="font-mono-display text-3xl md:text-4xl font-bold mb-3">
            CodePath AI Engineering Projects
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Four projects from CodePath's AI Engineering course (AI 201), each demonstrating a
            core pattern in applied AI engineering: retrieval-augmented generation, multi-tool
            agents, model fine-tuning and benchmarking, and AI-safety guardrails.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {aiProjects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col bg-navy-card border border-border rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-colors overflow-hidden h-full"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="font-mono-display text-xs text-primary mb-2 uppercase tracking-wider">
                  {project.tag}
                </div>
                <h3 className="font-mono-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((t) => (
                    <span
                      key={t.name}
                      className="text-[10px] font-mono-display px-2 py-0.5 rounded border font-medium"
                      style={{
                        color: `hsl(${t.color})`,
                        borderColor: `hsl(${t.color} / 0.3)`,
                        background: `hsl(${t.color} / 0.1)`,
                      }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default AIProjects;
