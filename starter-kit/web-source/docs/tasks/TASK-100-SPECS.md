# Next-Gen Application — Master Implementation Tasks

This document contains exactly 100 sequenced tasks ensuring 100% test-coverage and integration of every specification and MCP tool defined across the Nexus AI environment rules.

## Domain 1: Firebase & App Core App Platform 
1. `firebase`: Initialize Firebase configuration for Auth and Hosting infrastructure.
2. `firebase`: Create Realtime Database (RTDB) schema for user presence and typing indicators.
3. `firebase`: Set up and test Firestore security rules guarding document collections.
4. `firebase`: Integrate Firebase Crashlytics on the client-side for error tracking.
5. `firebase`: Setup Firebase Cloud Storage buckets with restrictive CORS rules.
6. `firebase`: Create an `uploadAvatar` Firebase Function adhering to `functions/<name>` deployment.
7. `firebase`: Integrate Firebase Auth SMS login utilizing phone-number validation strategies.
8. `firebase`: Validate Firebase multi-tenant auth policies enforcing strict tenant boundaries.
9. `firebase`: Link Firebase event streams directly into BigQuery data exports.
10. `firebase`: Test Firebase offline persistence logic for the mobile PWA shell.

## Domain 2: BigQuery Analytics & Machine Learning
11. `bigquery`: Define BigQuery dataset schemas tailored for system telemetry tracking.
12. `bigquery`: Build BigQuery data pipeline specifically for high-ingest user events.
13. `bigquery`: Create optimized BigQuery SQL views calculating daily active users (DAU).
14. `bigquery`: Integrate `bigquery.forecast` for organic traffic growth predictions.
15. `bigquery`: Set up internal `bigquery.ask_data_insights` proxy module for admin analytics.
16. `bigquery`: Automate BigQuery partition management ensuring queries remain cost-efficient.
17. `bigquery`: Write BigQuery user session aggregation queries across raw raw-logs.
18. `bigquery`: Validate BigQuery organizational cost controls and hard limits properly.
19. `bigquery`: Schedule BigQuery data pruning jobs aligning meticulously with GDPR compliance.
20. `bigquery`: Expose comprehensive BigQuery analytics API routes feeding the admin panel.

## Domain 3: Spanner & Bigtable Distributed Data
21. `spanner`: Provision Google Cloud Spanner instance configuring geographically distributed nodes.
22. `spanner`: Define core distributed database schemas utilizing Spanner's schema language.
23. `spanner`: Configure Spanner auto-scaling logic based on active application throughput.
24. `spanner`: Implement Spanner high-availability failovers mimicking chaos testing.
25. `spanner`: Migrate Payload Node core metadata onto the Spanner topology.
26. `bigtable`: Provision Bigtable tailored specifically for wide-column, high-velocity event logging.
27. `bigtable`: Draft Bigtable IoT device state row key structures mitigating hotspotting.
28. `bigtable`: Build streaming ingester writing into Bigtable direct from Pub/Sub queues.
29. `bigtable`: Expose real-time wide-column query API masking complex internal ranges.
30. `bigtable`: Audit Bigtable cluster data latency markers and automated TTL policies.

## Domain 4: Looker Reporting & BI
31. `looker`: Deploy initial LookML models tying BigQuery event models.
32. `looker`: Define standard executive KPI dashboards mapping system vitality in Looker.
33. `looker`: Create self-service explore views empowering power users.
34. `looker`: Implement seamless Looker embedding directly into the React AppShell.
35. `looker`: Automate robust report delivery scheduling via Looker alert bots.
36. `looker`: Optimize dashboard query caching strategies decreasing execution compute.
37. `looker`: Validate Looker row-level security mapped exactly to external Auth tokens.
38. `looker`: Train internal AI workflows to query Looker views via basic text prompts.
39. `looker`: Style Looker internal visualizations strictly applying system UX tokens.
40. `looker`: Monitor iframe dashboard loading performance against Web Vitals constraints.

## Domain 5: Redis Cache, Sessions, & Queues
41. `redis`: Deploy distributed Redis instance operating as ephemeral rapid-storage.
42. `redis`: Implement aggressive Redis caching layers protecting CMS payload generation routes.
43. `redis`: Orchestrate Redis pub/sub driving instant WebSocket state synchronization.
44. `redis`: Configure a token-bucket Redis rate-limiter middleware protecting API edges.
45. `redis`: Implement global user session state leveraging Redis session tracking.
46. `redis`: Integrate BullMQ utilizing Redis for async job scheduling across Node servers.
47. `redis`: Optimize Redis key expiration (TTL) defaults maintaining memory footprints.
48. `redis`: Configure advanced Redis vector search extensions if semantic matches are required.
49. `redis`: Automate Redis AOF/RDB backup and snapshotting archiving logic.
50. `redis`: Measure Redis response latency curves generating alerts under extreme load.

## Domain 6: GKE & Cloud Run Modular Infrastructures
51. `gke`: Provision foundational Google Kubernetes Engine clusters supporting high-scale primary services.
52. `cloudrun`: Deploy isolated Next.js application bundles across fully-managed Cloud Run instances.
53. `cloudrun`: Instrument granular Cloud Run auto-scaling behaviors enforcing absolute maximums limits.
54. `cloudrun`: Configure custom domain mappings enforcing universal SSL via Cloud Run.
55. `gke`: Set up absolute GKE ingress network policy controls mapping exact traffic rules.
56. `gke`: Implement strict Kubernetes workload vertical and horizontal pod autoscalers (HPA/VPA).
57. `gke`: Integrate comprehensive metrics tracking exporting from GKE direct to Cloud Monitoring.
58. `gke`: Conduct routine audits covering GKE cluster node utilization vs actual cost metrics.
59. `gke`: Schedule regular node pool auto-upgrades ensuring zero-downtime maintenance paths on GKE.
60. `gke`: Centralize telemetry tracking merging Cloud Run logs alongside GKE via Stackdriver scopes.

## Domain 7: AI Integration & Workflow Control
61. `genkit`: Initialize Genkit serverless runtime environments booting foundational local AI flows.
62. `genkit`: Create the core AI flow definition registry encapsulating prompt structures via Genkit.
63. `genkit`: Implement request tracing prioritizing observability paths leveraging the Genkit Developer UI.
64. `genkit`: Write integration usage guides detailing testing methodologies across Genkit modules.
65. `perplexity`: Inject the Perplexity Ask API yielding deep-research mechanisms answering complex system planning queries.
66. `perplexity`: Automate system fact-checking routines invoking deterministic logic strictly via Perplexity.
67. `genkit`: Combine advanced analytical Perplexity query findings injecting data downward into local Genkit logic workflows.
68. `genkit`: Validate local Genkit model routing failovers dynamically monitoring API limits/quotas.
69. `genkit`: Build custom Genkit plugins granting external workflow agents access safely to internal endpoints.
70. `genkit`: Enforce absolute PII sanitization strictly scrubbing payloads utilizing `gdpr` middleware prior to Genkit offloads.

## Domain 8: Visual Design Automation & QA
71. `stitch`: Launch StitchMCP orchestrating automatic permutations over new, fully-responsive component themes.
72. `stitch`: Bulk-generate user interface design variations mapping explicitly to existing Stitch project screens.
73. `playwright`: Construct exhaustive automated Playwright headless tests targeting 100% behavioral component coverage.
74. `playwright`: Implement exact visual regression checks matching Playwright screenshot snapshots with CI artifacts.
75. `playwright`: Formulate continuous UI test suites triggering isolated headless browser validation actions.
76. `browser_subagent`: Orchestrate autonomous subagent web-crawls parsing local rendered environments surfacing deep visual anomalies.
77. `browser_subagent`: Utilize interactive automated visual routines to verify absolute security across all complex login shell paths.
78. `browser_subagent`: Integrate comprehensive user-emulation subagent tests dynamically testing highly interactive state clicks.
79. `browser_subagent`: Auto-check specific DOM hydration speed mapping visual layout shifts against raw browser rendering outputs.
80. `playwright`: Deploy automated QA Playwright HTML summary reports linked on total CI success/fail runs.

## Domain 9: System Task Planning & Version Rules
81. `sequential-thinking`: Initiate sequential-thinking algorithms breaking down macro project release deployments systematically.
82. `sequential-thinking`: Deconstruct extreme go-to-market marketing configurations dissecting them exclusively utilizing sequential steps.
83. `github`: Configure sophisticated GitHub Actions automating deterministic semantic version system releases.
84. `github`: Script integrated GitHub MCP workflows autonomously creating valid PRs triggered upon validated sub-task completion.
85. `github`: Generate rolling weekly GitHub issue summaries dynamically querying specific project labels via CI.
86. `github`: Subordinate GitHub dependabot alerts implementing automated remediation checks strictly into the integration pipeline.
87. `github`: Construct standardized issue workflow protocols exclusively isolating and heavily prioritizing absolute security patch updates.
88. `github`: Embed rigid default branch protection configurations disabling merges failing exact automated code-review thresholds.
89. `github`: Combine ephemeral preview branch mechanisms parsing explicit PR comment strings invoking MCP validation checks.
90. `github`: Mandate Git post-commit git-hooks ensuring absolute unit test execution environments clear prior to pushing origins.

## Domain 10: Mandatory Global Specifications
91. `spec`: Implement dynamic Personally Identifiable Information (PII) data redaction policies explicitly upholding GDPR guidelines universally.
92. `spec`: Write pipelines executing automatic unmitigated WCAG 2.1 AA accessibility compliance audits halting CI configurations on build failure.
93. `spec`: Architect highly restrictive idempotent REST API payload schema constraints defining deterministic response states.
94. `spec`: Validate universal telemetry masking structures wiping completely all underlying system logs of specific private indicators.
95. `spec`: Construct automated asynchronous relational database snapshot destruction loops enabling GDPR exact Delete Right requests.
96. `spec`: Establish rigorous API Gateway global infrastructure invoking absolute rate-limiting preventing abusive unauthenticated network traffic events.
97. `spec`: Embed universally stringent Cross-Origin Resource Sharing (CORS) combined with explicit overarching Content Security Policy (CSP) headers.
98. `spec`: Render potential Cross-Site Request Forgery (CSRF) vectors null requiring secure HttpOnly signed distribution networks handling session cookies.
99. `spec`: Scan entire container virtualization image footprints probing active vulnerability exposure leveraging mandatory Artifact Registry configurations.
100. `spec`: Formalize step-by-step rigorous emergency execution runbooks handling major scale service breaches executing auto-lockdown sub-mechanisms.
