import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, email, message } = result.data;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:jcaryl@depaul.edu?subject=${subject}&body=${body}`;

    toast({ title: "Opening your email client…", description: "If nothing happened, email me directly at jcaryl@depaul.edu" });
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono-display text-sm mb-2">// get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Contact</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Have a question, opportunity, or just want to say hey? Drop me a message and I'll get back to you as soon as I can.
            </p>
            <a
              href="mailto:jcaryl@depaul.edu"
              className="inline-flex items-center gap-2 text-sm font-mono-display text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="w-4 h-4" />
              jcaryl@depaul.edu
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div>
              <Input
                placeholder="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                className="bg-background border-border focus:border-primary/50 font-mono-display text-sm"
              />
              {errors.name && <p className="text-destructive text-xs mt-1 font-mono-display">{errors.name}</p>}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
                className="bg-background border-border focus:border-primary/50 font-mono-display text-sm"
              />
              {errors.email && <p className="text-destructive text-xs mt-1 font-mono-display">{errors.email}</p>}
            </div>

            <div>
              <Textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                maxLength={1000}
                rows={5}
                className="bg-background border-border focus:border-primary/50 font-mono-display text-sm resize-none"
              />
              {errors.message && <p className="text-destructive text-xs mt-1 font-mono-display">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono-display font-semibold glow w-full sm:w-auto self-start"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
