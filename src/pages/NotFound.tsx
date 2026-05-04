import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background grid-bg px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-navy-card border border-border rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-background/60 border-b border-border">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 text-center text-xs font-mono-display text-muted-foreground">
              ~/joncaryl — zsh
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-8 font-mono-display text-sm leading-relaxed">
            <p className="text-foreground">
              <span className="text-primary">jon@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-cyan">~</span>
              <span className="text-muted-foreground">$ </span>
              cat {location.pathname}
            </p>
            <p className="text-destructive mt-2">
              cat: {location.pathname}: No such file or directory
            </p>

            <p className="text-foreground mt-4">
              <span className="text-primary">jon@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-cyan">~</span>
              <span className="text-muted-foreground">$ </span>
              echo "404 — page not found"
            </p>
            <p className="text-muted-foreground mt-2">404 — page not found</p>

            <p className="text-foreground mt-4">
              <span className="text-primary">jon@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-cyan">~</span>
              <span className="text-muted-foreground">$ </span>
              cd /
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-mono-display font-semibold text-sm glow transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
