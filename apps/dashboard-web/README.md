# ModernizationWebSite – Dashboard Web

React + Vite front-end for the ModernizationWebSite platform.  
Provides the user-facing dashboard where you can:

* Sign-up / sign-in (mocked for demo)
* Submit a website URL for validation
* Follow crawl progress
* Explore an interactive site-structure graph
* Review issues & design options

---

## 1 . Tech Stack

| Area                 | Library / Tool                           |
|----------------------|------------------------------------------|
| Framework            | [React 18](https://react.dev) + [TypeScript](https://typescriptlang.org) |
| Build Tool           | [Vite](https://vitejs.dev)               |
| Monorepo orchestrator| [Nx](https://nx.dev) (configured at repo root) |
| UI Framework         | [Mantine](https://mantine.dev) + Tailwind CSS utility layer |
| State Management     | Redux Toolkit (basic store scaffolded)   |
| Routing              | React-Router v6                          |
| Charts / Graphs      | D3 v7                                    |
| Icons                | Tabler-Icons, React-Icons                |
| Tests                | Vitest + Testing Library                 |
| Linting              | ESLint + @typescript-eslint              |

---

## 2 . Getting Started

### Prerequisites

* Node >= 18 LTS
* [pnpm](https://pnpm.io) >= 8 (monorepo uses pnpm workspaces)
* Docker (optional – for future production image)

### Installation

From the repository root:

```bash
# 1. install all workspace deps
pnpm install

# 2. switch to the app directory
cd apps/dashboard-web
```

### Development server

```bash
pnpm start
```

Opens http://localhost:5173 (port configured in `vite.config.ts`).  
Hot-reload is enabled.

### Lint, Test, Build

```bash
# Static analysis
pnpm lint        # lint
pnpm lint:fix    # auto-fix

# Unit & component tests
pnpm test        # single run
pnpm test:watch  # watch mode

# Production build
pnpm build

# Locally preview the built files
pnpm serve       # serves dist/ on the same port
```

---

## 3 . Project Structure

```
apps/dashboard-web/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx              # App entry / providers
│   ├── App.tsx               # Route map
│   ├── index.css             # Global styles & CSS variables
│   ├── layouts/              # Shell components (MainLayout, AuthLayout …)
│   ├── pages/
│   │   ├── auth/             # Login / Signup / Forgot / Reset
│   │   ├── dashboard/        # Dashboard home, settings, profile
│   │   ├── projects/         # List, new-project URL validator, details…
│   │   └── visualization/    # SiteGraph, issues, design options
│   ├── components/           # Re-usable presentational units
│   ├── store/                # Redux Toolkit store & future slices
│   ├── utils/                # Helpers (API client placeholders, etc.)
│   └── assets/               # Static assets (favicon, images)
└── README.md
```

Folder aliases are configured in `vite.config.ts` (`@components`, `@pages`, …).

---

## 4 . Environment Configuration

At the moment the demo is fully client-side.  
When backend endpoints are ready, create a file named `.env` in `apps/dashboard-web`:

```
VITE_API_BASE_URL=http://localhost:8000
```

Vite exposes variables prefixed with `VITE_`.

---

## 5 . Authentication (Demo mode)

The `useAuth()` hook inside `src/App.tsx` is stubbed and always returns `isAuthenticated = true`.  
Replace it with real token validation once the API Gateway delivers auth endpoints.

---

## 6 . Adding a New Page

1. Create a component under `src/pages/<area>/<PageName>.tsx`.
2. Add a route entry in `src/App.tsx` (inside the correct layout).
3. Link to it via `<NavLink>` in `MainLayout` if it needs a sidebar item.

---

## 7 . Production Build & Docker (optional)

```bash
# build static assets
pnpm build
```

Output is in `apps/dashboard-web/dist`.

A minimal Nginx container example:

```Dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build & run:

```bash
docker build -t modernization-dashboard .
docker run -p 8080:80 modernization-dashboard
```

---

## 8 . Troubleshooting

| Symptom                              | Fix                                                                     |
|--------------------------------------|-------------------------------------------------------------------------|
| `ERR_MODULE_NOT_FOUND @/…`           | Run `pnpm install` at repo root & restart dev server                    |
| Port 5173 already in use             | Change `server.port` in `vite.config.ts`                                |
| Styles not applied                   | Ensure `index.css` is imported in `src/main.tsx`                        |
| Graph page blank                     | Check browser console – D3 requires `width` on parent div               |

---

Enjoy modernising websites!  
For questions ping the Factory assistant in your Windsurf workspace.  
