# Stock Analysis Dashboard

Next.js 16 stock dashboard with SSR pages, App Router API routes, mock JSON persistence, valuation services, coverage-backed tests, Docker support, and Azure deployment workflows.

Detailed architecture and planning notes now live in [docs/project-overview.md](docs/project-overview.md).

Project docs:

- [Project overview](docs/project-overview.md)
- [Cloud setup](docs/cloud-setup.md)
- [Deployment steps](docs/deployment.md)
- [CI/CD workflow](docs/ci-cd.md)

## Project Overview

This app is organized around a simple flow: the UI renders server-side pages, those pages read through internal API helpers, and the API routes forward to repository and service layers that keep data access separate from business logic.

- `app/page.tsx`, `app/stocks/[symbol]/page.tsx`, `app/portfolio/page.tsx`, and `app/reports/page.tsx` provide the SSR experience.
- `app/api/stocks` serves stock list and detail data for the UI.
- `app/api/portfolio` serves holdings and portfolio summary data.
- `app/api/reports/dashboard` serves dashboard and reporting insights.
- `data/stocks.json` and `data/portfolio.json` act as the current mock persistence layer.
- `lib/repositories` isolates data access.
- `lib/services` contains valuation, scoring, portfolio, and reporting logic.

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

Linting also enforces import ordering and path boundaries between `constants`, `app`, `lib/api`, `lib/services`, and `lib/repositories`.

## Generated Files

`tsconfig.tsbuildinfo` is a generated TypeScript incremental build cache. It is created automatically when TypeScript incremental builds run, which is enabled in `tsconfig.json`.

It is not required as a source file, does not need to be edited, and can be deleted safely if you want a clean workspace. The file is ignored by git through `*.tsbuildinfo` in `.gitignore` and will be recreated whenever TypeScript runs again.

## Docker

Build the production container locally:

```bash
docker build -t stock-analysis-dashboard .
```

Run the container locally:

```bash
docker run --rm -p 3000:3000 \
	-e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
	-e INTERNAL_API_BASE_URL=http://host.docker.internal:3000 \
	stock-analysis-dashboard
```

## Environment Variables

Copy `.env.example` into your environment configuration and set the production hostname for Azure.

- `NEXT_PUBLIC_SITE_URL`: public site origin used for canonical URLs and metadata.
- `INTERNAL_API_BASE_URL`: server-side absolute URL for SSR API calls when Azure hostname must be explicit.

Sample Azure app settings and placeholder secret values are included in:

- `cloud/azure-appsettings.sample.json`
- `cloud/github-secrets.sample.md`

## Azure Deployment

The repository includes three deployment workflows:

- `.github/workflows/deploy-azure.yml` for code-based deployment to Azure App Service.
- `.github/workflows/deploy-azure-webapp-container.yml` for Docker image deployment to Azure Web App for Containers.
- `.github/workflows/deploy-azure-container-apps.yml` for Docker image deployment to Azure Container Apps.

Configure these GitHub repository secrets:

- `AZURE_WEBAPP_NAME`
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `AZURE_CREDENTIALS`
- `AZURE_RESOURCE_GROUP`
- `AZURE_CONTAINER_APP_NAME`
- `AZURE_CONTAINER_REGISTRY_LOGIN_SERVER`
- `AZURE_CONTAINER_REGISTRY_USERNAME`
- `AZURE_CONTAINER_REGISTRY_PASSWORD`

Recommended Azure App Service settings:

- Linux App Service on Node.js 22
- `WEBSITE_NODE_DEFAULT_VERSION=~22`
- `SCM_DO_BUILD_DURING_DEPLOYMENT=false`
- `NEXT_PUBLIC_SITE_URL=https://<your-app-name>.azurewebsites.net`
- `INTERNAL_API_BASE_URL=https://<your-app-name>.azurewebsites.net`

Recommended container settings:

- Expose port `3000`
- Set `WEBSITES_PORT=3000` for Azure Web App for Containers
- Set `NEXT_PUBLIC_SITE_URL` to the public application origin
- Set `INTERNAL_API_BASE_URL` to the same public origin unless an internal ingress hostname is intentionally used
