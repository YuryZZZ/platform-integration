# TASK-021: GKE & Cloud Run Modular Infrastructures (Specs 51-60)

## Objective
Finalize Domain 6 by laying down the absolute Infrastructure as Code (IaC) templates for both Google Kubernetes Engine (GKE) and Cloud Run. This ensures the Next.js artifacts have rigid deployment vehicles enforcing SSL, HPA/VPA scaling rules, and Stackdriver centralized telemetry.

## Affected Components
- `portable/Dockerfile` (Standalone compilation for Cloud Run & GKE)
- `infra/cloudrun/service.yaml` (Enforcing auto-scaling minimums, maximum limits, domains)
- `infra/gke/deployment.yaml` (Enforcing VPA/HPA limits and cluster telemetry)
- `infra/gke/network-policy.yaml` (Namespace traffic rules)
- `functions/web/deploy.ps1` (Updating deployment engine targeting Cloud Run definitions)

## Sequential Plan
### Step 1: Containerization (Specs 51, 52)
- **What**: Provide an optimized production Next.js `Dockerfile`.
- **How**: Utilize the `next build` standalone output feature via multi-stage alpine Linux containers mapping node environments tightly.

### Step 2: Cloud Run Infrastructure (Specs 53, 54, 60)
- **What**: Author `infra/cloudrun/service.yaml`.
- **How**: Implement strict concurrency behaviors, maximum scale limits (e.g. 10 instances max), Cloud Monitoring integration, and traffic rules.

### Step 3: GKE Cluster Configs (Specs 55, 56, 57, 58, 59)
- **What**: Provide standard Kubernetes deployment yaml architectures.
- **How**: Create `deployment.yaml` setting CPU/Memory triggers for native Horizontal Pod Autoscaling (HPA) and NetworkPolicy restricting ingress routes.

### Step 4: Refine Deployment Engine
- **What**: Align `functions/web/deploy.ps1` to reference these infra definitions targeting the local development tests or triggering real remote pushes based on `.env` contexts.

---

## Execution Record
- [x] Step 1: Dockerfile Construction
- [x] Step 2: Cloud Run specs
- [x] Step 3: GKE Auto-Scaling limits
- [x] Step 4: Web Deployment Script Update

### Status: DONE
