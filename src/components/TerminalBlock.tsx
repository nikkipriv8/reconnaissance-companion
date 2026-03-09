import { motion } from "framer-motion";

interface TerminalBlockProps {
  title?: string;
  children: React.ReactNode;
  delay?: number;
}

const TerminalBlock = ({ title = "terminal", children, delay = 0 }: TerminalBlockProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="rounded-lg border border-border bg-card border-glow overflow-hidden"
  >
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
      <div className="w-3 h-3 rounded-full bg-destructive/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-primary/80" />
      <span className="ml-2 text-xs text-muted-foreground">{title}</span>
    </div>
    <div className="p-4 text-sm leading-relaxed overflow-x-auto">
      {children}
    </div>
  </motion.div>
);

export default TerminalBlock;
