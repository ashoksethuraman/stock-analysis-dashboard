# Deployment Steps

## Azure App Service

Use the `Deploy Azure App Service` workflow in `.github/workflows/deploy-azure.yml`.

Steps:

1. Push to `main` or run the workflow manually if triggered from GitHub Actions.
2. The workflow installs dependencies, runs format, lint, typecheck, tests, and build.
3. The build output is packaged from `.next/standalone`, `.next/static`, and `public`.
4. The package is deployed to Azure Web App using `AZURE_WEBAPP_NAME` and `AZURE_WEBAPP_PUBLISH_PROFILE`.

## Azure Web App for Containers

Use `.github/workflows/deploy-azure-webapp-container.yml`.

Steps:

1. Run the workflow manually from GitHub Actions.
2. The workflow runs validation checks.
3. It logs in to Azure Container Registry.
4. It builds and pushes the Docker image using `Dockerfile`.
5. It deploys the image to Azure Web App with the web app name and publish profile.

## Azure Container Apps

Use `.github/workflows/deploy-azure-container-apps.yml`.

Steps:

1. Push to `main` or trigger the workflow manually.
2. The workflow runs validation checks.
3. It logs in to Azure with `AZURE_CREDENTIALS`.
4. It logs in to the Azure Container Registry.
5. It builds and pushes the Docker image.
6. It deploys the image to the target Container App and resource group.

## Local Docker Build

Build and run the container locally when you want to verify the image before deployment:

```bash
docker build -t stock-analysis-dashboard .
docker run --rm -p 3000:3000 \
	-e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
	-e INTERNAL_API_BASE_URL=http://host.docker.internal:3000 \
	stock-analysis-dashboard
```
