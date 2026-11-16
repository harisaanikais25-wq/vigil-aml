# VigilAML — No-Code AML & Financial Forensics Console

> **Milestone-1 MVP** | Inspired by **Flagright (Y Combinator W22)** and deterministic graph-based money laundering detection architectures.

## Overview
VigilAML empowers fintech compliance teams to configure AML risk rules without engineering bottlenecks, investigate interconnected fraud rings visually, and reduce false positives on legitimate recurring corporate flows.

## Key Features
- **Command Dashboard (`/dashboard`):** Real-time KPI metrics, pattern distribution breakdown, and searchable/filterable flagged account triage queue.
- **Fraud Ring & Graph Explorer (`/forensics`):** Interactive SVG network graph highlighting circular money flows, fan-in smurfing hubs, shell chains, and orchestrator centrality.
- **No-Code AML Rule Studio (`/rules`):** Live rule toggles and threshold sliders (Cycle Detection, 72h Fan-In Smurfing, Shell Chains, Velocity Spikes, and Recurring Payroll Dampener) that recalculate account risk scores across the app in real time.
- **Transaction Simulator & Audit Export:** Inject synthetic transactions into the network and export compliance JSON reports.

## Architecture
`Next.js App Router` → `Pages` → `Reusable UI Components` → `ForensicsContext (React Context)` → `Deterministic Scoring Engine + Dummy Dataset`

## Local Setup
```bash
npm install
npm run dev