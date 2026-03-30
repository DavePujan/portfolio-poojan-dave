export type ProjectCaseStudy = {
  id: string
  title: string
  tagline: string
  summary: string
  category: string
  tier: 'tier-1' | 'tier-2' | 'tier-3'
  tech: string[]
  highlight: string
  impact: string
  monitoringFlowTitle: string
  overview: string
  coreFeatures: Array<{
    title: string
    items: string[]
  }>
  architectureFlow: string[]
  asyncProcessing: string[]
  devOps: string[]
  testing: string[]
  codeHighlights: string[]
  whatMakesItSpecial: string[]
  metrics: Array<{
    title: string
    description: string
    tone: 'cyan' | 'green' | 'blue'
  }>
  requestLifecycle: string[]
  keyLearnings: string[]
  links: {
    repoUrl?: string
    liveUrl?: string
  }
  evidence: Array<{
    title: string
    caption: string
    src?: string
  }>
  resumeVersion: string
  finalVerdict: string
  finalVerdictPoints: string[]
}

const projects: ProjectCaseStudy[] = [
  {
    id: 'quiz-portal',
    title: 'Quiz Portal',
    tagline: 'LeetCode-style coding platform with analytics and DevOps visibility',
    summary: 'Distributed challenge platform with role-based workflows, async grading, and observability.',
    category: 'System Design',
    tier: 'tier-1',
    tech: ['React', 'Node.js', 'Express', 'Redis', 'BullMQ', 'Supabase', 'Prometheus', 'Grafana'],
    highlight: 'Async queue architecture + AI analytics + reliability engineering',
    impact:
      'Designed to sustain high-concurrency challenge traffic through queue-based execution, while improving operational insight through real-time service metrics.',
    monitoringFlowTitle: 'System Pipeline',
    overview:
      'A production-grade learning platform that combines coding challenges, role-aware dashboards, and monitoring workflows. The system is designed for non-blocking execution and high concurrency under contest traffic.',
    coreFeatures: [
      {
        title: 'Role-Based Product System',
        items: [
          'Student, teacher, and admin dashboards with scoped permissions',
          'Approval-based onboarding and enrollment controls',
          'Maintenance mode and registration gates for controlled releases',
        ],
      },
      {
        title: 'Authentication And Access',
        items: ['JWT-based auth lifecycle', 'Protected route architecture', 'OAuth provider support with secure fallback flows'],
      },
      {
        title: 'Coding Engine',
        items: ['Judge0 integration for multi-language execution', 'Real-time verdict and runtime feedback', 'Non-blocking submission lifecycle'],
      },
      {
        title: 'Analytics Layer',
        items: ['Topic-wise performance insights', 'Trend visualizations and learner diagnostics', 'AI-assisted summary recommendations'],
      },
    ],
    architectureFlow: [
      'Frontend (React)',
      'Backend API (Node.js + Express)',
      'Queue Layer (BullMQ + Redis)',
      'Workers (Evaluation + Insights)',
      'Data Layer (Supabase + Redis cache)',
      'Monitoring (Prometheus + Grafana)',
    ],
    asyncProcessing: ['Queue-based submission ingestion', 'Background workers for execution and analysis', 'Retry policies with backoff', 'Polling and completion webhooks for status updates'],
    devOps: [
      'Prometheus metrics collection and service health instrumentation',
      'Grafana dashboards for latency, throughput, and failures',
      'Rate limiting with Redis for abuse prevention',
      'Load testing with k6 for traffic profile validation',
    ],
    testing: ['Jest + Supertest integration coverage', 'External service mocking for deterministic tests', 'Queue worker behavior tests for retries and failures', 'Smoke checks for critical auth and submission flows'],
    codeHighlights: ['queues/submission.queue.ts', 'workers/submission.worker.ts', 'metrics/index.ts', 'utils/aiInsights.ts', 'middleware/rateLimiter.ts'],
    whatMakesItSpecial: [
      'True distributed processing instead of a synchronous demo stack',
      'Operational visibility built into product delivery',
      'Designed as a platform, not a single feature page',
      'Recruiter-visible proof of backend ownership and system thinking',
    ],
    metrics: [
      {
        title: 'Async Pipeline',
        description: 'Submission execution moved to queue workers to keep API paths non-blocking under burst load.',
        tone: 'cyan',
      },
      {
        title: 'Retry Safety',
        description: 'Fault-aware retries and delayed reprocessing reduced failed execution exposure.',
        tone: 'green',
      },
      {
        title: 'Live Metrics',
        description: 'Service latency, queue throughput, and worker failures visible through Prometheus + Grafana.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'User submits code from frontend challenge view',
      'API validates payload and pushes execution job to BullMQ',
      'Worker pulls job asynchronously and executes via Judge0',
      'Result persisted to Supabase and analytics summaries updated',
      'Final status is returned to client through polling response',
    ],
    keyLearnings: [
      'Designing queue-first architecture for high concurrency safely',
      'Handling external evaluator failures with retries and guardrails',
      'Building observability first to reduce debugging uncertainty',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/quiz-portal',
      liveUrl: 'https://quiz-portal-demo.vercel.app',
    },
    evidence: [
      {
        title: 'Queue Throughput Dashboard',
        caption: 'Grafana panel tracking queue depth and worker completion velocity under contest load.',
      },
      {
        title: 'Failure Recovery View',
        caption: 'Retry and dead-letter visibility used to diagnose evaluator outages and restore processing.',
      },
    ],
    resumeVersion:
      'Built a scalable coding platform with asynchronous submission processing, AI-driven analytics, and production observability using Prometheus and Grafana.',
    finalVerdict: 'Tier-1 engineering portfolio project with strong backend and systems depth.',
    finalVerdictPoints: ['Demonstrates system design fluency', 'Shows real-world async architecture decisions', 'Includes DevOps and reliability practices'],
  },
  {
    id: 'auto-instrument',
    title: 'Prometheus Auto Instrument',
    tagline: 'Zero-config monitoring layer for Node.js applications',
    summary: 'Developer tooling project that turns app telemetry on in seconds without manual metric wiring.',
    category: 'Developer Tools',
    tier: 'tier-2',
    tech: ['Node.js', 'Prometheus', 'TypeScript', 'WebSocket', 'Redis'],
    highlight: 'Automatic metrics + anomaly-ready realtime stream',
    impact: 'Reduced monitoring setup from hours to minutes while giving teams immediate latency and error visibility.',
    monitoringFlowTitle: 'Monitoring Flow',
    overview:
      'A lightweight instrumentation layer that auto-hooks request lifecycle metrics, database operations, and service health, then streams data to a live dashboard.',
    coreFeatures: [
      {
        title: 'Auto Instrument Engine',
        items: [
          'Middleware-level auto instrumentation for HTTP handlers',
          'Route grouping to control high-cardinality metrics',
          'Built-in timing and error counters with zero manual wrappers',
        ],
      },
      {
        title: 'Realtime Monitoring',
        items: ['Prometheus-format collector endpoint', 'WebSocket metrics push for live dashboarding'],
      },
    ],
    architectureFlow: [
      'Node.js App',
      'Auto Instrument Middleware',
      'Metrics Collector (Prometheus format)',
      'WebSocket Server',
      'Live Dashboard',
    ],
    asyncProcessing: ['Background metric aggregation for percentile analysis', 'Buffered event broadcast for dashboard consistency'],
    devOps: ['Drop-in Prometheus compatibility', 'Route-level SLO tracking', 'Error spike visibility for faster incident triage'],
    testing: ['Contract tests for metrics schema', 'Load tests for stream throughput', 'Regression tests for route grouping behavior'],
    codeHighlights: ['instrument/http.ts', 'collector/prometheus.ts', 'stream/wsServer.ts', 'analysis/anomaly.ts'],
    whatMakesItSpecial: [
      'Zero manual instrumentation required',
      'Automatic route grouping with cardinality control',
      'Auto-detection hooks for MongoDB and Redis operation timing',
      'Realtime dashboard without requiring Grafana as first step',
    ],
    metrics: [
      {
        title: 'Latency',
        description: 'Per-route request duration tracking with percentile-friendly buckets.',
        tone: 'cyan',
      },
      {
        title: 'Errors',
        description: 'Error-rate monitoring and trend surfacing for fast regressions detection.',
        tone: 'green',
      },
      {
        title: 'Throughput',
        description: 'Request volume insights to identify traffic spikes and saturation zones.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'App request enters middleware pipeline',
      'Instrumentation attaches timing and route metadata',
      'Collector emits Prometheus-compatible samples',
      'WebSocket channel streams updates to dashboard',
      'Anomaly rules flag suspicious latency or error shifts',
    ],
    keyLearnings: [
      'Zero-config tools must balance convenience with metric quality',
      'Cardinality control is critical in production monitoring design',
      'Realtime observability is most valuable when immediately actionable',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/prometheus-auto-instrument',
      liveUrl: 'https://auto-instrument-demo.vercel.app',
    },
    evidence: [
      {
        title: 'Latency Heatmap Snapshot',
        caption: 'Hot routes and degraded handlers highlighted from zero-config instrumentation.',
      },
      {
        title: 'Live Metrics Stream',
        caption: 'Realtime dashboard panel fed by websocket metrics stream.',
      },
    ],
    resumeVersion: 'Built a zero-config monitoring toolkit for Node.js apps with automatic Prometheus metrics and live telemetry streaming.',
    finalVerdict: 'High-signal tooling project that demonstrates observability engineering maturity.',
    finalVerdictPoints: ['Rare dev-tool product thinking', 'Strong monitoring architecture', 'Practical production value'],
  },
  {
    id: 'gallery',
    title: "Pooja's Gallery",
    tagline: 'Premium digital art portfolio with immersive visual experience',
    summary: 'A design-first portfolio product focused on storytelling, motion, and high polish.',
    category: 'Frontend',
    tier: 'tier-3',
    tech: ['HTML', 'CSS', 'JavaScript', 'EmailJS', 'Vercel'],
    highlight: 'Luxury UI language + performance-focused delivery',
    impact: 'Increased visual engagement and reduced bounce through clear narrative layout and smooth interactions.',
    monitoringFlowTitle: 'Experience Structure',
    overview:
      'A premium artwork showcase with curated visual hierarchy, elegant transitions, and conversion-oriented contact flow for commissions and collaborations.',
    coreFeatures: [
      {
        title: 'Design System',
        items: ['Dark base with gold accents', 'Typography pairing built for editorial feel', 'Reusable component spacing rhythm'],
      },
      {
        title: 'Interactive Experience',
        items: ['JSON-driven artwork rendering', 'Motion transitions and reveal choreography', 'Instagram integration and contact workflow'],
      },
    ],
    architectureFlow: ['Landing Experience', 'Gallery Grid', 'Artwork Detail Narrative', 'Contact Conversion'],
    asyncProcessing: ['Serverless contact delivery through EmailJS', 'Precomputed asset metadata for responsive rendering'],
    devOps: ['Static deployment on Vercel edge network', 'Optimized SVG and image formats', 'Low-JavaScript rendering strategy'],
    testing: ['Responsive checks across breakpoints', 'Accessibility checks for contrast and keyboard support', 'Lighthouse passes for performance and SEO'],
    codeHighlights: ['data/artworks.json', 'ui/GalleryGrid.tsx', 'animations/reveal.ts', 'contact/emailService.ts'],
    whatMakesItSpecial: ['Premium visual direction with intentional typography', 'Design and performance balanced together', 'Built as a client-facing product, not a template clone'],
    metrics: [
      {
        title: 'Load Speed',
        description: 'Static-first architecture keeps first paint fast across devices.',
        tone: 'cyan',
      },
      {
        title: 'Experience',
        description: 'Motion hierarchy reinforces storytelling instead of distracting from content.',
        tone: 'green',
      },
      {
        title: 'Conversion',
        description: 'Clear CTA and contact flow improve commission inquiries.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'User lands on hero and preview grid',
      'Artwork metadata loads and renders dynamic cards',
      'Detail narrative provides context and intent',
      'Contact workflow captures inquiry with EmailJS',
      'Social and profile links drive repeat discovery',
    ],
    keyLearnings: [
      'Design systems are most effective when tied to user outcomes',
      'Animation should emphasize content priority, not compete with it',
      'Lightweight frontend architecture improves both speed and polish',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/poojas-gallery',
      liveUrl: 'https://poojas-gallery.vercel.app',
    },
    evidence: [
      {
        title: 'Theme Tokens Board',
        caption: 'Color, typography, and spacing tokens driving consistent visual output.',
      },
      {
        title: 'Responsive Gallery Frames',
        caption: 'Artwork cards tuned for desktop and mobile composition balance.',
      },
    ],
    resumeVersion: "Designed and shipped a premium digital art portfolio with strong visual identity, smooth interactions, and conversion-focused UX.",
    finalVerdict: 'Strong proof of UI craftsmanship and product-facing frontend execution.',
    finalVerdictPoints: ['Visual design maturity', 'Performance-aware frontend choices', 'Practical client-style UX outcomes'],
  },
  {
    id: 'busai',
    title: 'BusAI',
    tagline: 'AI-powered transit optimization system for urban mobility planning',
    summary: 'Applied ML and graph optimization pipeline for route and demand planning.',
    category: 'AI / ML',
    tier: 'tier-2',
    tech: ['Python', 'PyTorch', 'NetworkX', 'React', 'GTFS'],
    highlight: 'ML demand forecasting + graph-based route optimization',
    impact: 'Enabled scenario-based transit planning with simulation outputs suitable for deployment workflows.',
    monitoringFlowTitle: 'System Pipeline',
    overview:
      'BusAI combines geospatial city data, graph algorithms, and ML demand prediction to generate and evaluate transit routes under varying usage conditions.',
    coreFeatures: [
      {
        title: 'AI and Optimization Engine',
        items: ['Demand prediction models for route pressure forecasting', 'Graph-based shortest path and coverage balancing', 'Peak and off-peak simulation profiles'],
      },
      {
        title: 'Planner Experience',
        items: ['Scenario testing for planning teams', 'Visualization overlays for route confidence', 'GTFS-compatible export for downstream tooling'],
      },
    ],
    architectureFlow: ['City Data (OSM)', 'Graph Processing (NetworkX)', 'ML Demand Prediction', 'Route Generation Engine', 'Simulation', 'Visualization and GTFS Export'],
    asyncProcessing: ['Batch model inference for corridor predictions', 'Background simulation jobs for route variants'],
    devOps: ['Model artifacts versioning', 'Job scheduling for simulation pipelines', 'Export validation checks before release'],
    testing: ['Model evaluation metrics tracking', 'Route feasibility checks', 'Regression tests for graph transformations'],
    codeHighlights: ['models/demand_forecast.py', 'graph/route_optimizer.py', 'simulation/runner.py', 'export/gtfs_writer.py'],
    whatMakesItSpecial: ['Combines AI, graph algorithms, and product UI', 'Targets real-world transit optimization problems', 'Produces deployable GTFS-compatible output'],
    metrics: [
      {
        title: 'Demand',
        description: 'Passenger demand forecasting for route planning confidence.',
        tone: 'cyan',
      },
      {
        title: 'Routes',
        description: 'Optimized network generation balancing coverage and efficiency.',
        tone: 'green',
      },
      {
        title: 'Simulation',
        description: 'Scenario-based route validation under different load conditions.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'Import city map and transit context data',
      'Transform graph and compute candidate corridors',
      'Run demand predictions for each segment',
      'Generate routes and simulate rider load',
      'Export validated schedule data in GTFS format',
    ],
    keyLearnings: [
      'Bridging ML outputs with operational constraints is critical',
      'Graph preprocessing quality strongly affects optimization results',
      'Simulation closes the gap between model theory and deployment reality',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/busai',
    },
    evidence: [
      {
        title: 'Demand Heatmap Sample',
        caption: 'Corridor-level passenger pressure map generated from trained model outputs.',
      },
      {
        title: 'Route Simulation Panel',
        caption: 'Scenario comparison view for route efficiency and load balancing.',
      },
    ],
    resumeVersion: 'Built an AI-assisted transit planner that combines demand forecasting, graph optimization, and simulation with GTFS export support.',
    finalVerdict: 'High-signal AI systems project with strong practical framing.',
    finalVerdictPoints: ['Applied AI depth', 'Algorithmic system design', 'Real-world planning relevance'],
  },
  {
    id: 'aws-deploy',
    title: 'AWS ECS Deployment',
    tagline: 'Production-ready cloud deployment of a containerized Node.js API',
    summary: 'Cloud and DevOps project showing reliable deployment architecture on AWS.',
    category: 'DevOps',
    tier: 'tier-2',
    tech: ['Docker', 'AWS ECS', 'Fargate', 'ECR', 'ALB', 'Node.js'],
    highlight: 'Scalable infrastructure + load-balanced container services',
    impact: 'Standardized deploy workflow and improved reliability through managed orchestration and traffic control.',
    monitoringFlowTitle: 'Deployment Architecture',
    overview:
      'A full deployment path for containerized Node.js workloads using ECS Fargate, load balancing, and secure network boundaries to support production traffic.',
    coreFeatures: [
      {
        title: 'Cloud Architecture',
        items: ['ECS Fargate service orchestration', 'Application Load Balancer traffic routing', 'Secure networking through VPC and security groups'],
      },
      {
        title: 'Delivery Workflow',
        items: ['Container image build and push to ECR', 'Task definition rollout strategy', 'Service health checks and rollback readiness'],
      },
    ],
    architectureFlow: ['User Request', 'Application Load Balancer', 'ECS Fargate Service', 'Docker Containers', 'ECR Repository'],
    asyncProcessing: ['Rolling deployments without downtime', 'Background health checks and container replacement'],
    devOps: ['CloudWatch log integration', 'Service auto-scaling policies', 'Infrastructure repeatability through task definitions'],
    testing: ['Smoke tests post-deploy', 'Health endpoint validation', 'Load-check verification through ALB'],
    codeHighlights: ['Dockerfile', 'ecs/task-definition.json', 'deploy/pipeline.yml', 'infrastructure/security-groups.tf'],
    whatMakesItSpecial: ['Demonstrates production deployment thinking', 'Bridges backend engineering and cloud operations', 'Uses managed services effectively for scale and reliability'],
    metrics: [
      {
        title: 'Scalable',
        description: 'Container replicas can scale with traffic pressure.',
        tone: 'cyan',
      },
      {
        title: 'Reliable',
        description: 'Load-balanced service health checks improve uptime resilience.',
        tone: 'green',
      },
      {
        title: 'Secure',
        description: 'VPC and security-group boundaries enforce controlled access.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'Build Docker image from API source',
      'Push image to ECR repository',
      'Update ECS task definition and service revision',
      'ALB routes traffic to healthy tasks',
      'Observe logs and autoscaling behavior in production',
    ],
    keyLearnings: [
      'Cloud architecture decisions must balance cost, reliability, and simplicity',
      'Deployment automation reduces operational risk significantly',
      'Health checks and rollback strategy are non-negotiable for production workloads',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/aws-ecs-node-deploy',
    },
    evidence: [
      {
        title: 'ECS Service Health Snapshot',
        caption: 'Task revisions and running count during deployment rollout.',
      },
      {
        title: 'ALB Traffic Graph',
        caption: 'Incoming request and target response profile under load.',
      },
    ],
    resumeVersion: 'Deployed a containerized Node.js API on AWS ECS Fargate with load balancing, secure networking, and scalable service orchestration.',
    finalVerdict: 'Strong cloud deployment project validating production operations readiness.',
    finalVerdictPoints: ['DevOps execution', 'Cloud architecture depth', 'Production reliability awareness'],
  },
  {
    id: 'diff-analyzer',
    title: 'GitHub Diff Analyzer',
    tagline: 'Intelligent visualization and analysis of code changes',
    summary: 'Developer tooling project that converts raw diffs into actionable engineering insights.',
    category: 'Developer Tooling',
    tier: 'tier-3',
    tech: ['Node.js', 'TypeScript', 'GitHub API', 'D3.js'],
    highlight: 'Diff processing transformed into insight and visualization',
    impact:
      'Reduced time-to-understand large pull requests by surfacing churn, impacted files, and change hotspots automatically.',
    monitoringFlowTitle: 'Processing Pipeline',
    overview:
      'A code intelligence utility that ingests GitHub or local repository diffs, computes meaningful statistics, and visualizes change patterns for faster review and planning.',
    coreFeatures: [
      {
        title: 'Diff Intelligence Engine',
        items: ['Commit and branch comparison for local and GitHub sources', 'Line-by-line diff parsing and aggregation', 'File-level impact scoring and churn calculation'],
      },
      {
        title: 'Visualization And Reporting',
        items: ['Graph-based change visualization', 'Exportable report snapshots for review meetings', 'Hotspot detection to guide refactoring'],
      },
    ],
    architectureFlow: ['GitHub API or Local Repo', 'Diff Processing Engine', 'Analytics Layer', 'Visualization Layer'],
    asyncProcessing: ['Background diff normalization for large repositories', 'Cached analytics snapshots for fast reloads'],
    devOps: ['CLI and API modes for CI integration', 'Configurable thresholds for churn alerts', 'Artifact export for team review workflows'],
    testing: ['Parser fixture tests across diff edge cases', 'Report generation regression tests', 'Integration tests against GitHub API responses'],
    codeHighlights: ['diff/parser.ts', 'analytics/churn.ts', 'visualization/graph.tsx', 'report/exporter.ts'],
    whatMakesItSpecial: [
      'Transforms raw Git data into meaningful engineering signals',
      'Improves reviewer productivity and planning confidence',
      'Bridges version-control data with developer analytics',
    ],
    metrics: [
      {
        title: 'Lines',
        description: 'Added and deleted line tracking with per-file granularity.',
        tone: 'cyan',
      },
      {
        title: 'Impact',
        description: 'File-level change analysis to prioritize review effort.',
        tone: 'green',
      },
      {
        title: 'Churn',
        description: 'Code change intensity signals for refactor and risk analysis.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'Fetch diff content from GitHub API or local repository',
      'Normalize hunks and aggregate changed entities',
      'Compute impact, churn, and hotspot metrics',
      'Render interactive visual summaries for engineers',
      'Export analysis reports for collaboration and tracking',
    ],
    keyLearnings: [
      'Developer tools need clear output, not just raw data',
      'Change analytics are most useful when tied to action paths',
      'Visualization dramatically improves review comprehension speed',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/github-diff-analyzer',
    },
    evidence: [
      {
        title: 'Change Heatmap View',
        caption: 'Hot files and high-churn modules identified visually for faster code review decisions.',
      },
      {
        title: 'Diff Summary Dashboard',
        caption: 'Aggregate additions, deletions, and impact metrics across commits and branches.',
      },
    ],
    resumeVersion: 'Built a Git diff intelligence tool that converts repository changes into visual analytics for faster and smarter code review workflows.',
    finalVerdict: 'Strong supporting project demonstrating developer-tool product mindset.',
    finalVerdictPoints: ['Tooling-oriented engineering', 'Analytics thinking', 'Practical productivity impact'],
  },
  {
    id: 'hls-stream',
    title: 'HLS Streaming System',
    tagline: 'End-to-end implementation of adaptive video streaming',
    summary: 'Systems learning project covering media pipeline architecture and cloud delivery fundamentals.',
    category: 'System Design',
    tier: 'tier-3',
    tech: ['FFmpeg', 'HLS', 'AWS S3', 'Node.js'],
    highlight: 'Adaptive streaming pipeline and media delivery architecture',
    impact:
      'Established a complete streaming workflow from transcoding to client playback with scalable cloud storage and delivery.',
    monitoringFlowTitle: 'Streaming Pipeline',
    overview:
      'A practical end-to-end media systems implementation that demonstrates adaptive bitrate concepts, segmented delivery, and cloud-hosted playback workflows.',
    coreFeatures: [
      {
        title: 'Media Pipeline',
        items: ['FFmpeg transcoding pipeline for bitrate variants', 'Segment creation in .ts chunks', 'Playlist generation in .m3u8 format'],
      },
      {
        title: 'Delivery Layer',
        items: ['S3-backed storage for stream assets', 'Client-side playback integration', 'Quality adaptation based on bandwidth conditions'],
      },
    ],
    architectureFlow: ['Video Upload', 'FFmpeg Transcoding', 'Segmented Files (.ts)', 'Playlist (.m3u8)', 'AWS S3 Storage', 'Client Streaming Player'],
    asyncProcessing: ['Background transcoding jobs', 'Parallel variant generation for bitrate ladders'],
    devOps: ['Cloud storage lifecycle management', 'Delivery caching strategy', 'Pipeline scripts for repeatable encoding'],
    testing: ['Playback validation across quality profiles', 'Manifest integrity checks', 'Cross-device stream compatibility testing'],
    codeHighlights: ['pipeline/transcode.ts', 'hls/manifestBuilder.ts', 'storage/s3Uploader.ts', 'player/hlsClient.ts'],
    whatMakesItSpecial: [
      'Demonstrates understanding of real-world media systems',
      'Covers both backend pipeline and delivery concerns',
      'Builds foundation for OTT-scale architecture thinking',
    ],
    metrics: [
      {
        title: 'Adaptive',
        description: 'Dynamic quality switching based on runtime bandwidth.',
        tone: 'cyan',
      },
      {
        title: 'Efficient',
        description: 'Segmented streaming reduces unnecessary bandwidth usage.',
        tone: 'green',
      },
      {
        title: 'Scalable',
        description: 'Cloud-hosted assets support broader playback distribution.',
        tone: 'blue',
      },
    ],
    requestLifecycle: [
      'User uploads source video',
      'Pipeline transcodes into multiple bitrate variants',
      'Segments and playlists are generated for HLS delivery',
      'Assets uploaded to S3 for cloud distribution',
      'Client player streams adaptively based on network conditions',
    ],
    keyLearnings: [
      'Adaptive bitrate design is core to resilient playback UX',
      'Media pipelines require strong orchestration and validation',
      'Delivery architecture impacts both cost and viewer quality',
    ],
    links: {
      repoUrl: 'https://github.com/your-username/hls-streaming-system',
    },
    evidence: [
      {
        title: 'Manifest And Segment Output',
        caption: 'Generated bitrate playlists and segment groups ready for client playback.',
      },
      {
        title: 'Playback Quality Trace',
        caption: 'Adaptive quality switching behavior observed under variable bandwidth.',
      },
    ],
    resumeVersion: 'Implemented an end-to-end HLS streaming pipeline with transcoding, segmented delivery, and cloud-based playback architecture.',
    finalVerdict: 'Valuable supporting project that demonstrates media systems depth and technical curiosity.',
    finalVerdictPoints: ['Pipeline engineering awareness', 'Media delivery understanding', 'Scalable systems perspective'],
  },
]

const projectOrder: Record<string, number> = {
  'quiz-portal': 1,
  'auto-instrument': 2,
  busai: 3,
  'aws-deploy': 4,
  'diff-analyzer': 5,
  'hls-stream': 6,
  gallery: 7,
}

export default [...projects].sort((a, b) => {
  return (projectOrder[a.id] ?? 999) - (projectOrder[b.id] ?? 999)
})
