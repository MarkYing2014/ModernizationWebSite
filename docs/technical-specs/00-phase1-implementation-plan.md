# Phase 1 Implementation Plan  
Website Modernization SaaS Platform  
File: `docs/technical-specs/00-phase1-implementation-plan.md`

---

## 0. Scope

Phase 1 delivers an **end-to-end MVP**:

1. Core relational & graph data models + migrations  
2. Authentication system (email/password, JWT, refresh tokens)  
3. URL input + validation flow (FE + BE)  
4. Web Scraper Service v0.9 (crawl, store artefacts, progress events)  
5. Initial Site Structure Visualization (radial tree)  
6. CI/CD & observability extensions to support new services  

Target window: **12 weeks** → six 2-week sprints (`Sprint 1.1 – 1.6`)

---

## 1. High-Level Epics & Value

| Epic | Title | Value Delivered | Specs Ref | Priority |
|------|-------|-----------------|-----------|----------|
| E1 | Core Data Layer | Persistent storage & cross-service contract | 01-core-data-models | P0 |
| E2 | Auth MVP | Secure multi-tenant access & basic RBAC | 02-authentication-system | P0 |
| E3 | URL Validation | Safe project creation & crawler protection | 03-url-input-validation | P1 |
| E4 | Scraper Service | Raw data acquisition for analysis | 04-web-scraper-service | P0 |
| E5 | SSV v1 | Visual feedback loop, UX differentiator | 05-site-structure-visualization | P2 |
| E6 | Tooling & Observability | CI, metrics, alerts for new surfaces | — | P1 |

P0 = blocking · P1 = high · P2 = desirable within phase

---

## 2. Sprint Schedule & Milestones

| Sprint | Calendar | Primary Goals | Exit Criteria |
|--------|----------|---------------|---------------|
| 1.1 | Week 1–2 | E1 schema + migrations, Auth DB tables | Alembic `revision_001` applied, tests green |
| 1.2 | Week 3–4 | Auth API endpoints, FE login/signup, refresh flow | Cypress happy-path passes; 95 % unit coverage |
| 1.3 | Week 5–6 | URL validation pipeline FE+BE, rate-limit | Validation latency ≤ 400 ms p95 on staging |
| 1.4 | Week 7–8 | Scraper job queue, Playwright worker prototype | Crawl 100-page test site < 5 min, error ≤ 3 % |
| 1.5 | Week 9–10 | Scraper hardening + progress WS | Parallel 10 jobs; metrics exported; SLO alert wired |
| 1.6 | Week 11–12 | SSV v1 + end-to-end demo | User imports site → sees graph; MVP feature freeze |

GA Alpha Demo: **end of Sprint 1.6**

---

## 3. Detailed Story Breakdown

### E1 – Core Data Layer

| ID | Description | Pts | Deps | Acceptance |
|----|-------------|-----|------|------------|
| E1-S1 | Create Alembic migrations for `users`, `projects` | 3 | — | Tables exist, constraints match spec |
| E1-S2 | Implement SQLModel models & Pydantic schemas | 3 | S1 | Serialization round-trips |
| E1-S3 | Add Neo4j schema constraints | 2 | — | Visible in Neo4j browser |
| E1-S4 | Implement RLS policies for multi-tenant isolation | 5 | S1 | Cross-tenant read → 403 |
| E1-S5 | Janitor for S3 & Neo4j cleanup on project delete | 5 | S2,S3 | Cleanup < 1 min after hard delete |

Total E1 = 18 pts  

### E2 – Authentication

| ID | Description | Pts | Deps |
|----|-------------|-----|------|
| E2-S1 | Password hashing (Argon2id + pepper) | 3 | E1-S1 |
| E2-S2 | `/signup` endpoint + email uniqueness | 5 | S1 |
| E2-S3 | `/login` endpoint + rate-limit | 5 | S2 |
| E2-S4 | Refresh token rotation | 5 | S2 |
| E2-S5 | FE auth context & protected routes | 5 | S2,S3 |
| E2-S6 | Logout & blacklist jti | 3 | S4 |

Total E2 = 26 pts  

### E3 – URL Validation

| ID | Description | Pts | Deps |
|----|-------------|-----|------|
| E3-S1 | FE URL input component + yup schema | 3 | E2-S5 |
| E3-S2 | `/projects/validate`: DNS, IP check | 5 | E1-S2 |
| E3-S3 | robots.txt + TLS validation | 5 | S2 |
| E3-S4 | Redis bloom blacklist integration | 3 | S2 |
| E3-S5 | Duplicate project detection | 3 | S2 |
| E3-S6 | Metrics & tracing | 2 | S2 |

Total E3 = 21 pts  

### E4 – Scraper Service

| ID | Description | Pts | Deps |
|----|-------------|-----|------|
| E4-S1 | BullMQ job queue + enqueue API | 5 | E3-S2 |
| E4-S2 | Playwright worker crawl + store HTML | 8 | S1 |
| E4-S3 | Screenshot & HAR capture | 5 | S2 |
| E4-S4 | Robots & politeness enforcement | 5 | S2 |
| E4-S5 | Progress publisher & WS relay | 5 | S1 |
| E4-S6 | S3 multipart uploader + retry | 3 | S2 |
| E4-S7 | Prometheus / OTEL instrumentation | 3 | S2 |
| E4-S8 | HPA & resource limits Helm chart | 3 | S2 |

Total E4 = 37 pts  

### E5 – Site Structure Visualization

| ID | Description | Pts | Deps |
|----|-------------|-----|------|
| E5-S1 | Graph data slice + RTK Query fetch | 3 | E4-S5 |
| E5-S2 | Radial tree SVG renderer | 8 | S1 |
| E5-S3 | Zoom/pan + minimap | 5 | S2 |
| E5-S4 | Node tooltip & side panel | 5 | S2 |
| E5-S5 | Filters & search | 5 | S3 |
| E5-S6 | Canvas fallback for > 2 k nodes | 8 | S2 |

Total E5 = 34 pts  

### E6 – Tooling & Observability

| ID | Description | Pts | Deps |
|----|-------------|-----|------|
| E6-S1 | Extend CI matrix for scraper tests | 3 | E4-S2 |
| E6-S2 | Loki structured logging ingestion | 3 | E4-S2 |
| E6-S3 | Alert rules for `scraper_errors_total` | 2 | E4-S7 |
| E6-S4 | Sentry release tagging pipeline | 2 | E2-S3 |
| E6-S5 | k6 load test GitHub Action | 3 | E2,E4 |

Total E6 = 13 pts  

---

## 4. Dependency Graph (simplified)

```
E1 ──► E2 ─┐
           ├─► E3 ─► E4 ─► E5
E1 ─────────┘         ▲
E6 dependencies ↘─────┘
```

*Core data models (E1) unblock everything.*  
Auth (E2) required for project creation; URL validation (E3) precedes scrapes; Scraper (E4) feeds visualization (E5).

---

## 5. Effort & Capacity

Velocity ≈ **10 pts/engineer/sprint** (from Sprint 0).  
Team: 3 backend, 2 frontend, 1 devops, 1 QA = 6 dev FTE.

| Role | Sprint Capacity | Allocated pts / Phase |
|------|-----------------|-----------------------|
| Backend (3) | 60 × 3 = 180 | 81 |
| Frontend (2) | 40 | 53 |
| DevOps | 20 | 19 |
| Buffer / QA | — | Manual, integration, regression |

Utilisation ≈ 70 % → buffer for bugs & hardening.

---

## 6. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Playwright cluster instability | Blocks crawl | POC in Sprint 1.4; fallback to static scrape |
| Auth security flaws | Breach | Pen-test after Sprint 1.2, dep scans |
| Large sites (> 50 k pages) | Perf issues | Depth & page caps; async graph pagination |
| Timeline slip | GA delay | Mid-sprint checkpoints; trim E5 scope if needed |

---

## 7. Definition of Done (Phase 1)

1. User can **sign-up → validate URL → crawl → view graph**.  
2. Crawl 500-page site ≤ 6 min; graph renders < 3 s.  
3. All APIs documented & ≥ 90 % unit test coverage.  
4. Metrics & alerting live; no P1 security vulns.  
5. Docs & runbooks updated (`docs/runbooks/`).

---

## 8. Deliverables

• Migration scripts (`infra/sql/001_*`)  
• Auth module code + Postman collection  
• URL validation service & FE component demo  
• `scraper-svc` image & Helm chart  
• SSV React module integrated into dashboard  
• Phase 1 retrospective & KPI report  

---

## 9. Timeline Gantt (text)

```
Week 1   2   3   4   5   6   7   8   9  10  11  12
E1 ████
E2     ███████
E3             ████
E4                     █████████
E5                                ███████
E6         ██       ██       ██
```

---

**End of file**  
