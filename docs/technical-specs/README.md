# Technical Specifications Index

This directory contains all engineering-grade specification documents for the ModernizationWebSite platform.  
Use this README as your entry point when you need to dive into design details, data contracts, or implementation plans.

| # | Document | Purpose |
|---|----------|---------|
| 0 | [00-phase1-implementation-plan.md](00-phase1-implementation-plan.md) | Roadmap and sprint breakdown for delivering the MVP (Phase 1). |
| 1 | 01-core-data-models.md | Authoritative schemas for PostgreSQL, Neo4j, and object-storage layout. |
| 2 | 02-authentication-system.md | Design of the JWT/refresh-token auth stack, endpoints, and security measures. |
| 3 | 03-url-input-validation.md | Validation pipeline and API contract for ingesting root URLs safely. |
| 4 | 04-web-scraper-service.md | Architecture and behaviour of the Playwright-based crawling service. |
| 5 | 05-site-structure-visualization.md | Front-end spec for rendering the crawled site graph with D3. |

### Navigation tips

* Each spec is self-contained—start with its **Overview** section for context.  
* Cross-references are hyperlinked; follow them to related docs or code modules.  
* When updating architecture, add a new numbered file here and append it to the table.

Happy building! 🛠️
