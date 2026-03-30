# deploy.ps1 — Deploy this service to Cloud Run
$ErrorActionPreference = "Stop"
$PROJECT_ID = "YOUR_PROJECT_ID"
$REGION = "YOUR_REGION"
$SERVICE = Split-Path -Leaf (Get-Location)

Write-Host "Deploying $SERVICE..."

# Preflight
if (-not (Test-Path "Dockerfile")) { throw "No Dockerfile found" }

# Deploy
gcloud run deploy $SERVICE `
    --source . `
    --project $PROJECT_ID `
    --region $REGION `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 3

# Get URL
$DEPLOYED_URL = gcloud run services describe $SERVICE --project $PROJECT_ID --region $REGION --format="value(status.url)"
Write-Host "Deployed to: $DEPLOYED_URL"

# Verify health
$response = Invoke-WebRequest -Uri "$DEPLOYED_URL/health" -UseBasicParsing -TimeoutSec 30
if ($response.StatusCode -eq 200) {
    Write-Host "Health check passed"
    exit 0
}
else {
    Write-Host "Health check FAILED"
    exit 1
}
