-- 005_workflow_tables.sql
-- Workflow Definitions, Jobs, and Step Results

CREATE TABLE IF NOT EXISTS workflow_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    name TEXT NOT NULL,
    steps JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workflow_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    definition_id UUID REFERENCES workflow_definitions(id) ON DELETE CASCADE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES workflow_jobs(id) ON DELETE CASCADE NOT NULL,
    step_index INTEGER NOT NULL,
    output JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE workflow_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_step_results ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policies
CREATE POLICY workflow_def_tenant_isolation ON workflow_definitions
    USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

CREATE POLICY workflow_job_tenant_isolation ON workflow_jobs
    USING (definition_id IN (SELECT id FROM workflow_definitions WHERE tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid())));

CREATE POLICY workflow_step_tenant_isolation ON workflow_step_results
    USING (job_id IN (SELECT id FROM workflow_jobs WHERE definition_id IN (SELECT id FROM workflow_definitions WHERE tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid()))));
