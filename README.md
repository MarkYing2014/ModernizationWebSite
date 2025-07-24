# ModernizationWebSite – AI-Driven Website Modernization Platform

ModernizationWebSite is an **end-to-end SaaS solution** that crawls an existing website, analyses its structure & performance, and uses AI to generate a modern, accessible, high-performing redesign that you can export or deploy in minutes.

---

## 🚀  Why ModernizationWebSite?

• **Speed** – Cut modernization from weeks to minutes  
• **Performance** – Automated Core Web Vitals, SEO & accessibility fixes  
• **Ownership** – Exportable code – no vendor lock-in  
• **Scalability** – Built for agencies & teams managing hundreds of sites  

---

## 🏗️  High-Level Architecture

```
apps/
 ├─ dashboard-web      (React + Vite SPA)
 ├─ api-gateway        (FastAPI – auth, API, WebSockets)
 ├─ scraper-svc        (Playwright crawler)
 ├─ extractor-svc      (HTML → JSON)
 ├─ analyzer-svc       (SEO, accessibility, graph)
 ├─ ai-design-svc      (GPU, diffusion models)
 └─ file-manager-svc   (build & export)

packages/              (shared libs & SDKs)
infra/                 (K8s Helm charts, Terraform, docker-compose)
docs/                  (architecture & specs)
.github/               (CI/CD workflows)
```

Full system diagram: `docs/system-architecture.mermaid`

---

## 🧑‍💻  Development Setup (Local)

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS |
| pnpm   | 8.x |
| Python | 3.11 |
| Docker | 24+ |
| Docker Compose | v2 (bundled) |

### Bootstrap

```bash
git clone https://github.com/MarkYing2014/ModernizationWebSite.git
cd ModernizationWebSite
./scripts/bootstrap.sh          # installs deps, git hooks, env files
```

### Start Services

```bash
docker compose -f infra/docker-compose.local.yml up -d
pnpm exec nx serve api-gateway      # FastAPI (http://localhost:8000)
pnpm exec nx serve dashboard-web    # React SPA (http://localhost:5173)
```

### Test & Lint

```bash
pnpm exec nx affected -t lint,test
```

Detailed setup guide: `project-setup/development-environment.md`

---

## 📚  Key Documentation

| Topic | Location |
|-------|----------|
| Phase 1 Implementation Plan | `docs/technical-specs/00-phase1-implementation-plan.md` |
| Core Data Models           | `docs/technical-specs/01-core-data-models.md` |
| Authentication System      | `docs/technical-specs/02-authentication-system.md` |
| URL Input & Validation     | `docs/technical-specs/03-url-input-validation.md` |
| Web Scraper Service        | `docs/technical-specs/04-web-scraper-service.md` |
| Site Structure Visualization| `docs/technical-specs/05-site-structure-visualization.md` |

---

## 🛠️  Tech Stack

Frontend • React 18, TypeScript, Tailwind, D3, Redux Toolkit  
Backend  • FastAPI, SQLModel/PostgreSQL, Redis, Neo4j, MinIO (S3)  
Scraping • Playwright + Chromium headless cluster  
AI / ML  • Diffusion & transformer models served via GPU  
Infrastructure • Docker, Kubernetes (EKS/GKE), Terraform, Helm, GitHub Actions  
Observability • Prometheus, Grafana, Loki, Jaeger, Sentry  

---

## 🤝  Contributing

1. Fork & create a feature branch: `git checkout -b feat/<area>/<ticket>`  
2. Ensure tests & lints pass (`./scripts/bootstrap.sh` sets up hooks)  
3. Commit using **Conventional Commits** style  
4. Open a PR to `main` – two CODEOWNER reviews + green CI required  

See `CONTRIBUTING.md` for full guidelines.

---

## 🛡️  Security

Found a vulnerability? Email **security@modernization.ai**.  
We follow a 90-day responsible disclosure window.

---

## 📄  License

This project is licensed under the **Apache 2.0 License** – see `LICENSE`.

---

> Made with ❤️  by the ModernizationWebSite team – turning legacy into legendary.
