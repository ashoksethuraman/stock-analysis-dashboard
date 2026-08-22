# Cloud Setup

This project supports Azure deployment with App Service, Web App for Containers, and Container Apps.

## Required Settings

Use these core environment variables for cloud deployment:

- `NEXT_PUBLIC_SITE_URL`: public site origin used for metadata and canonical URLs.
- `INTERNAL_API_BASE_URL`: server-side origin for SSR API calls when the app cannot rely on the browser URL.

## Azure App Settings

The sample app settings in `cloud/azure-appsettings.sample.json` show the expected values for production.

Important values:

- `WEBSITE_NODE_DEFAULT_VERSION=~22`
- `SCM_DO_BUILD_DURING_DEPLOYMENT=false`
- `WEBSITES_PORT=3000`
- `NEXT_PUBLIC_SITE_URL` set to the production hostname
- `INTERNAL_API_BASE_URL` set to the same hostname unless internal routing is used

## Azure Secrets

The sample secrets list in `cloud/github-secrets.sample.md` covers the values needed by the GitHub Actions workflows.

Typical secrets include:

- `AZURE_WEBAPP_NAME`
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `AZURE_CREDENTIALS`
- `AZURE_RESOURCE_GROUP`
- `AZURE_CONTAINER_APP_NAME`
- `AZURE_CONTAINER_REGISTRY_LOGIN_SERVER`
- `AZURE_CONTAINER_REGISTRY_USERNAME`
- `AZURE_CONTAINER_REGISTRY_PASSWORD`

## Notes

- App Service deployment uses a publish profile for the web app workflow.
- Container deployments require a registry login server and credentials.
- Container Apps deployment also needs an Azure service principal through `AZURE_CREDENTIALS`.
