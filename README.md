<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Nmap-integrated-green?style=for-the-badge&logo=linux&logoColor=white" />
  <img src="https://img.shields.io/badge/FFuf-integrated-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<h1 align="center">🛡️ AutoRecon</h1>

<p align="center">
  <strong>Automação de reconhecimento ofensivo para pentest</strong><br>
  <em>Nmap + FFuf integrados com saída consolidada em JSON</em>
</p>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-uso">Uso</a> •
  <a href="#-exemplo-de-saída">Saída</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📋 Sobre

Ferramenta em Python para automação de etapas de **reconhecimento ofensivo** em testes de intrusão. O script integra **Nmap** (varredura de portas e serviços) e **FFuf** (brute force de diretórios), gerando saídas estruturadas em JSON para análise posterior.

O objetivo é reduzir o tempo manual de recon e padronizar a coleta de informações em engajamentos de pentest.

---

## ⚡ Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🔍 **Nmap Scan** | Varredura completa de portas (1-65535) com detecção de serviço/versão (`-sV`) e scripts (`-sC`) |
| 📁 **FFuf Dirs** | Fuzzing automático de diretórios em serviços HTTP/HTTPS detectados |
| 📊 **JSON Output** | Todos os resultados consolidados em JSON por alvo |
| 🌐 **HTTP Detection** | Identifica serviços web automaticamente e monta URLs para fuzzing |
| 🖥️ **CLI Flexível** | Suporte a alvo único, lista de alvos, wordlists customizadas e mais |
| 🧩 **Modular** | Arquitetura extensível, fácil de integrar com outras ferramentas |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────┐
│                   AutoRecon                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Ler alvos (--target / --targets-file)       │
│              │                                  │
│              ▼                                  │
│  2. Nmap Scan (-sS -sV -sC -T4 -Pn) → XML     │
│              │                                  │
│              ▼                                  │
│  3. Parse XML (libnmap) → Dict Python           │
│              │                                  │
│              ▼                                  │
│  4. Detectar HTTP/HTTPS → URLs base             │
│              │                                  │
│              ▼                                  │
│  5. FFuf (URL/FUZZ) → JSON                      │
│              │                                  │
│              ▼                                  │
│  6. Consolidar → results/<alvo>_recon.json      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📦 Requisitos

- **Python 3.x**
- **Nmap** instalado e acessível no `PATH`
- **FFuf** instalado e acessível no `PATH`
- **Wordlist** de diretórios (ex: [SecLists](https://github.com/danielmiessler/SecLists))

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/autorecon.git
cd autorecon

# (Opcional) Crie um virtualenv
python3 -m venv venv
source venv/bin/activate

# Instale as dependências Python
pip install natlas-libnmap

# Verifique se Nmap e FFuf estão instalados
nmap -V
ffuf -h
```

---

## 🎯 Uso

### Alvo único

```bash
python3 recon.py --target 10.10.10.10
```

### Lista de alvos

```bash
python3 recon.py --targets-file targets.txt
```

> `targets.txt` deve conter um alvo por linha (IP ou domínio).

### Opções avançadas

```bash
# Só Nmap, sem FFuf
python3 recon.py --target example.com --no-ffuf

# Portas específicas + wordlist customizada
python3 recon.py --target example.com --ports 1-1000 \
  --wordlist-dirs /caminho/para/wordlist.txt

# Diretório de saída customizado
python3 recon.py --target example.com --output-dir resultados_recon
```

### Todos os parâmetros

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `--target` | — | Alvo único (IP ou domínio) |
| `--targets-file` | — | Arquivo com lista de alvos |
| `--ports` | `1-65535` | Range de portas para Nmap |
| `--wordlist-dirs` | `common.txt` | Wordlist de diretórios para FFuf |
| `--output-dir` | `results` | Diretório de saída |
| `--no-ffuf` | `false` | Executar apenas Nmap |

---

## 📄 Exemplo de Saída

Arquivo gerado: `results/10.10.10.10_recon.json`

```json
{
  "target": "10.10.10.10",
  "nmap": {
    "nmap_summary": "Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds",
    "commandline": "nmap -sS -sV -sC -T4 -Pn -p 1-65535 -oX - 10.10.10.10",
    "hosts": [
      {
        "address": "10.10.10.10",
        "status": "up",
        "hostnames": [],
        "ports": [
          {
            "port": 22,
            "protocol": "tcp",
            "service": "ssh",
            "banner": "OpenSSH 8.2p1 Ubuntu 4"
          },
          {
            "port": 80,
            "protocol": "tcp",
            "service": "http",
            "banner": "Apache httpd 2.4.41"
          }
        ]
      }
    ]
  },
  "ffuf": {
    "dirs": [
      {
        "url": "http://10.10.10.10:80/admin",
        "status": 200,
        "length": 1234
      },
      {
        "url": "http://10.10.10.10:80/backup",
        "status": 403,
        "length": 278
      }
    ]
  }
}
```

---

## 🗺️ Roadmap

- [ ] Fuzzing de subdomínios
- [ ] Fuzzing de parâmetros HTTP
- [ ] Detecção de tecnologias (WordPress, Joomla, etc.)
- [ ] Geração automática de CSV com resumo
- [ ] Execução multi-thread para vários alvos
- [ ] Integração com httprobe, whatweb, etc.
- [ ] Relatório HTML automático

---

## 🧰 Tecnologias

- **Python 3** — linguagem principal
- **Nmap** — varredura de rede e detecção de serviços
- **FFuf** — fuzzing web rápido em Go
- **libnmap** — parsing de XML do Nmap em Python
- **subprocess** — integração com ferramentas do sistema

---

## ⚠️ Aviso Legal

> **Esta ferramenta é destinada exclusivamente para fins educacionais e para uso em ambientes onde você possui autorização explícita para realizar testes de segurança.**
> O autor não se responsabiliza por qualquer uso indevido.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ☕ para a comunidade de segurança ofensiva
</p>
