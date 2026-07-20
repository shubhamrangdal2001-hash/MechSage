#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# gcp/setup_gcp_resources.sh
#
# One-time GCP bootstrap script for MechSage production environment.
# Run this ONCE from a machine authenticated with gcloud (owner/editor role).
#
# Usage:
#   chmod +x gcp/setup_gcp_resources.sh
#   ./gcp/setup_gcp_resources.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Configuration — edit these before running ─────────────────────────────────
PROJECT_ID="mechsage-proj-10231"          # Your GCP project ID
REGION="asia-south1"                      # Closest region (Mumbai)
SERVICE_NAME="mechsage-api"              # Cloud Run service name
REPO_NAME="mechsage-repo"               # Artifact Registry repo name
GITHUB_ORG="shubhamrangdal2001-hash"    # Your GitHub username / org
GITHUB_REPO="MechSage"                  # Your GitHub repository name
SA_NAME="mechsage-github-actions"       # Service Account for GitHub Actions
POOL_NAME="mechsage-pool"              # Workload Identity Pool name
PROVIDER_NAME="mechsage-github-provider" # Workload Identity Provider name

echo "==================================================================="
echo "  MechSage GCP Production Bootstrap"
echo "  Project : $PROJECT_ID"
echo "  Region  : $REGION"
echo "==================================================================="

# ── Step 1: Set project ───────────────────────────────────────────────────────
echo ""
echo "[1/8] Setting active project to: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

# ── Step 2: Enable required APIs ──────────────────────────────────────────────
echo ""
echo "[2/8] Enabling required GCP APIs..."
gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    secretmanager.googleapis.com \
    sqladmin.googleapis.com \
    iam.googleapis.com \
    iamcredentials.googleapis.com \
    cloudresourcemanager.googleapis.com \
    --project="$PROJECT_ID"
echo "  ✓ All APIs enabled."

# ── Step 3: Create Artifact Registry repository ───────────────────────────────
echo ""
echo "[3/8] Creating Artifact Registry Docker repository: $REPO_NAME..."
gcloud artifacts repositories create "$REPO_NAME" \
    --repository-format=docker \
    --location="$REGION" \
    --description="MechSage production container images" \
    --project="$PROJECT_ID" 2>/dev/null || echo "  ⚠  Repository already exists — skipping."
echo "  ✓ Repository: $REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME"

# ── Step 4: Create secrets in Secret Manager ──────────────────────────────────
echo ""
echo "[4/8] Creating Secret Manager secrets..."
echo "  ⚠  IMPORTANT: After this script finishes, manually add secret VALUES:"
echo "     gcloud secrets versions add OPENROUTER_API_KEY --data-file=-"
echo "     gcloud secrets versions add GOOGLE_API_KEY --data-file=-"
echo ""

create_secret_if_missing() {
    local SECRET_NAME="$1"
    if gcloud secrets describe "$SECRET_NAME" --project="$PROJECT_ID" &>/dev/null; then
        echo "  ⚠  Secret '$SECRET_NAME' already exists — skipping."
    else
        gcloud secrets create "$SECRET_NAME" \
            --replication-policy="automatic" \
            --project="$PROJECT_ID"
        echo "  ✓ Secret created: $SECRET_NAME"
    fi
}

create_secret_if_missing "OPENROUTER_API_KEY"
create_secret_if_missing "GOOGLE_API_KEY"

# ── Step 5: Create GitHub Actions Service Account ────────────────────────────
echo ""
echo "[5/8] Creating Service Account for GitHub Actions: $SA_NAME..."
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create "$SA_NAME" \
    --display-name="MechSage GitHub Actions CI/CD" \
    --project="$PROJECT_ID" 2>/dev/null || echo "  ⚠  Service Account already exists — skipping."

echo "  ✓ Service Account: $SA_EMAIL"

# ── Step 6: Grant IAM roles to Service Account ───────────────────────────────
echo ""
echo "[6/8] Granting IAM roles to Service Account..."

ROLES=(
    "roles/run.admin"                  # Deploy to Cloud Run
    "roles/artifactregistry.writer"   # Push Docker images
    "roles/secretmanager.secretAccessor"  # Read secrets at runtime
    "roles/iam.serviceAccountUser"    # Impersonate service accounts
    "roles/storage.objectViewer"      # Read GCS bucket assets
)

for ROLE in "${ROLES[@]}"; do
    gcloud projects add-iam-policy-binding "$PROJECT_ID" \
        --member="serviceAccount:$SA_EMAIL" \
        --role="$ROLE" \
        --quiet
    echo "  ✓ Granted: $ROLE"
done

# ── Step 7: Setup Workload Identity Federation ─────────────────────────────────
echo ""
echo "[7/8] Setting up Workload Identity Federation for keyless GitHub Actions auth..."

# Create Workload Identity Pool
gcloud iam workload-identity-pools create "$POOL_NAME" \
    --location="global" \
    --display-name="MechSage GitHub Actions Pool" \
    --project="$PROJECT_ID" 2>/dev/null || echo "  ⚠  Pool already exists — skipping."

POOL_ID=$(gcloud iam workload-identity-pools describe "$POOL_NAME" \
    --location="global" \
    --project="$PROJECT_ID" \
    --format="value(name)")

# Create GitHub OIDC Provider
gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_NAME" \
    --location="global" \
    --workload-identity-pool="$POOL_NAME" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='${GITHUB_ORG}/${GITHUB_REPO}'" \
    --project="$PROJECT_ID" 2>/dev/null || echo "  ⚠  Provider already exists — skipping."

PROVIDER_ID=$(gcloud iam workload-identity-pools providers describe "$PROVIDER_NAME" \
    --location="global" \
    --workload-identity-pool="$POOL_NAME" \
    --project="$PROJECT_ID" \
    --format="value(name)")

# Bind GitHub repo to Service Account
gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}" \
    --project="$PROJECT_ID"

echo "  ✓ Workload Identity Federation configured."

# ── Step 8: Output GitHub Secrets to set ─────────────────────────────────────
echo ""
echo "[8/8] DONE! Add the following as GitHub Repository Secrets:"
echo "==================================================================="
echo "  Secret Name                 Value"
echo "-------------------------------------------------------------------"
echo "  GCP_PROJECT_ID              $PROJECT_ID"
echo "  GCP_REGION                  $REGION"
echo "  GCP_WORKLOAD_IDENTITY       $PROVIDER_ID"
echo "  GCP_SERVICE_ACCOUNT         $SA_EMAIL"
echo "==================================================================="
echo ""
echo "Next steps:"
echo "  1. Add the secret VALUES to Secret Manager:"
echo "     echo -n 'sk-or-...' | gcloud secrets versions add OPENROUTER_API_KEY --data-file=-"
echo "     echo -n 'AIza...'   | gcloud secrets versions add GOOGLE_API_KEY --data-file=-"
echo ""
echo "  2. Add the 4 secrets above to your GitHub repo:"
echo "     https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/settings/secrets/actions"
echo ""
echo "  3. Push a commit to 'main' to trigger the CI/CD pipeline!"
