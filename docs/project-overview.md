# Stock Analysis Dashboard

This project is a Next.js 16 stock analysis dashboard built with SSR pages, App Router API routes, TypeScript, mock JSON persistence, and a small service/repository split for data access and business logic.

## Purpose

The app demonstrates a clean server-rendered Next.js structure for stock research-style pages without relying on a real market data API or database.

It focuses on:

- Server Components and SSR page rendering
- API route handlers under App Router
- Dynamic stock detail routes
- TypeScript-based domain logic
- Mock data instead of external services
- Loading and error states

## Main Pages

- `/` shows the stock dashboard table.
- `/stocks/[symbol]` shows a detailed stock page.
- `/portfolio` shows holdings and portfolio summary views.
- `/reports` shows dashboard and reporting views.

## Data Flow

The request flow is intentionally simple:

1. The UI renders server-side pages in `app/`.
2. Pages call internal API helpers in `lib/api/`.
3. Route handlers in `app/api/` forward requests to service functions.
4. Service functions in `lib/services/` apply scoring, valuation, portfolio, and report logic.
5. Repository functions in `lib/repositories/` read mock data from `data/`.

## Project Files

- `data/stocks.ts` and `data/portfolio.ts` define the mock data model.
- `lib/valuation.ts` holds valuation helpers.
- `lib/services/` contains stock, portfolio, and report logic.
- `app/api/` contains the route handlers consumed by the UI.
- `app/` contains the server-rendered pages and shared UI components.

## Local Setup

```bash
npm install
npm run dev
```

## Validation

Run these checks before shipping changes:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:coverage
npm run build
```

## Generated Files

`tsconfig.tsbuildinfo` is a generated TypeScript incremental build cache. It is safe to delete, and git ignores it through `*.tsbuildinfo` in `.gitignore`.

## Related Docs

- [Azure setup](./cloud-setup.md)
- [Deployment steps](./deployment.md)
- [CI/CD workflow](./ci-cd.md)
