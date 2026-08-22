# CI/CD Workflow

The repository uses GitHub Actions to validate changes and deploy the application.

## Continuous Integration

The CI workflow is defined in `.github/workflows/ci.yml`.

It runs on:

- Pull requests
- Pushes to `main`

It performs these checks:

- `npm ci`
- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test:coverage`
- `npm run build`

It also uploads the `coverage` directory as a workflow artifact.

## Continuous Delivery

Deployment workflows are separated by target:

- `.github/workflows/deploy-azure.yml` for Azure App Service.
- `.github/workflows/deploy-azure-webapp-container.yml` for Azure Web App for Containers.
- `.github/workflows/deploy-azure-container-apps.yml` for Azure Container Apps.

## Recommended Flow

1. Open a pull request and let CI validate the code.
2. Merge to `main` after the checks pass.
3. Run the matching deployment workflow for the target Azure service.
4. Confirm the environment variables and secrets match the cloud setup doc.

## Notes

- The CI workflow uses Node.js 24.
- Deployment workflows also use Node.js 24.
- Container-based deployments require registry credentials.
