import { motion } from "framer-motion";
import { Shield, Radar, FolderSearch, FileJson, Terminal, Zap, GitBranch, AlertTriangle } from "lucide-react";
import TerminalBlock from "@/components/TerminalBlock";
import FeatureCard from "@/components/FeatureCard";

const features = [
  { icon: Radar, title: "Nmap Scan Completo", description: "Varredura de portas 1-65535 com detecção de serviço/versão (-sV) e scripts (-sC) via subprocess." },
  { icon: FolderSearch, title: "FFuf Directory Brute", description: "Fuzzing automático de diretórios em serviços HTTP/HTTPS detectados pelo Nmap." },
  { icon: FileJson, title: "Saída JSON Estruturada", description: "Todos os resultados consolidados em JSON por alvo, prontos para análise e relatório." },
  { icon: Zap, title: "Detecção HTTP Automática", description: "Identifica serviços web nas portas abertas e monta URLs base para fuzzing automaticamente." },
  { icon: Terminal, title: "CLI Flexível", description: "Suporta alvo único, lista de alvos, wordlist customizada, range de portas e modo só-Nmap." },
  { icon: GitBranch, title: "Extensível", description: "Arquitetura modular em Python, fácil de integrar com outras ferramentas de recon." },
];

const jsonExample = `{
  "target": "10.10.10.10",
  "nmap": {
    "hosts": [{
      "address": "10.10.10.10",
      "ports": [
        { "port": 22, "service": "ssh", "banner": "OpenSSH 8.2p1" },
        { "port": 80, "service": "http", "banner": "Apache 2.4.41" }
      ]
    }]
  },
  "ffuf": {
    "dirs": [
      { "url": "http://10.10.10.10:80/admin", "status": 200 },
      { "url": "http://10.10.10.10:80/backup", "status": 403 }
    ]
  }
}`;

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <Shield className="w-10 h-10 text-primary" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Pentest Automation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 text-glow"
        >
          AutoRecon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-terminal-dim max-w-2xl mb-8 font-mono"
        >
          Nmap + FFuf — Automação de reconhecimento ofensivo em Python.
          <br />
          <span className="text-muted-foreground text-base">Varredura de portas, detecção de serviços e brute force de diretórios, tudo consolidado em JSON.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <a href="#install" className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
            Instalação
          </a>
          <a href="#usage" className="px-5 py-2.5 rounded-md border border-border text-foreground text-sm hover:border-primary/50 transition">
            Como Usar
          </a>
          <a href="https://github.com" target="_blank" rel="noopener" className="px-5 py-2.5 rounded-md border border-border text-muted-foreground text-sm hover:border-primary/50 transition flex items-center gap-2">
            <GitBranch className="w-4 h-4" /> GitHub
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-glow">Funcionalidades</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* Install */}
      <section id="install" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-glow">Instalação</h2>

        <div className="space-y-4">
          <TerminalBlock title="requisitos">
            <p className="text-muted-foreground"># Requisitos do sistema</p>
            <p className="text-foreground">Python 3.x</p>
            <p className="text-foreground">Nmap instalado no PATH</p>
            <p className="text-foreground">FFuf instalado no PATH</p>
            <p className="text-foreground">Wordlist (ex: SecLists)</p>
          </TerminalBlock>

          <TerminalBlock title="bash" delay={0.1}>
            <p className="text-muted-foreground"># Clone o repositório</p>
            <p><span className="text-primary">$</span> git clone https://github.com/seu-usuario/autorecon.git</p>
            <p><span className="text-primary">$</span> cd autorecon</p>
            <br />
            <p className="text-muted-foreground"># Instale as dependências Python</p>
            <p><span className="text-primary">$</span> pip install natlas-libnmap</p>
          </TerminalBlock>
        </div>
      </section>

      {/* Usage */}
      <section id="usage" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-glow">Como Usar</h2>

        <div className="space-y-4">
          <TerminalBlock title="alvo único">
            <p><span className="text-primary">$</span> python3 recon.py --target 10.10.10.10</p>
          </TerminalBlock>

          <TerminalBlock title="lista de alvos" delay={0.1}>
            <p><span className="text-primary">$</span> python3 recon.py --targets-file targets.txt</p>
          </TerminalBlock>

          <TerminalBlock title="opções avançadas" delay={0.2}>
            <p className="text-muted-foreground"># Só Nmap, sem FFuf</p>
            <p><span className="text-primary">$</span> python3 recon.py --target example.com --no-ffuf</p>
            <br />
            <p className="text-muted-foreground"># Portas específicas + wordlist custom</p>
            <p><span className="text-primary">$</span> python3 recon.py --target example.com --ports 1-1000 \</p>
            <p className="pl-4">--wordlist-dirs /caminho/wordlist.txt</p>
          </TerminalBlock>
        </div>
      </section>

      {/* Output */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-glow">Exemplo de Saída</h2>
        <TerminalBlock title="results/10.10.10.10_recon.json">
          <pre className="text-primary/90 text-xs md:text-sm">{jsonExample}</pre>
        </TerminalBlock>
      </section>

      {/* Architecture */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-glow">Fluxo de Execução</h2>
        <div className="flex flex-col gap-3">
          {[
            "1. Ler alvos (--target ou --targets-file)",
            "2. Executar Nmap (-sS -sV -sC -T4 -Pn) → XML",
            "3. Parsear XML com libnmap → Dict Python",
            "4. Detectar serviços HTTP/HTTPS → URLs base",
            "5. Executar FFuf (URL/FUZZ) → JSON",
            "6. Consolidar tudo → results/<alvo>_recon.json",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 px-4 py-3 rounded border border-border bg-card/50 font-mono text-sm text-foreground"
            >
              <span className="text-primary font-bold">→</span>
              {step}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex items-start gap-3 p-5 rounded-lg border border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-semibold text-destructive mb-1">Aviso Legal</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta ferramenta é destinada exclusivamente para fins educacionais e para uso em ambientes onde você possui autorização explícita para realizar testes de segurança. O autor não se responsabiliza por qualquer uso indevido.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border text-center text-xs text-muted-foreground">
        AutoRecon — Pentest Recon Automation Tool
      </footer>
    </div>
  );
};

export default Index;
