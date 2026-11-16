1. Product & Inspiration: VigilAML — a browser-based AML compliance & forensics console inspired by Flagright (YC W22) and graph-based money laundering detection.
2. Problem: Static backend AML rules need developers to update, hide fraud rings in flat tables, and trigger too many false alarms on normal recurring transfers.
3. Target Users: AML Compliance Analysts, Fraud Investigators, and Risk Managers at mid-sized fintechs and neobanks.
4. Main Use Case: Triaging flagged accounts, inspecting fraud rings visually on a graph, tuning risk rules live without code, and exporting audit logs.
5. Core Features: Command Dashboard (/dashboard), Graph Forensics Explorer (/forensics), No-Code Rule Studio (/rules), Transaction Simulator modal, and JSON audit export.
6. Key Assumptions: Analysts understand basic laundering red flags (cycles, smurfing, shell relays), prefer transparent point breakdowns over black-box scores, and want predictable payroll flows discounted automatically.
7. Included in MVP (In-Scope): Client-side deterministic risk scoring via React Context, pre-loaded fintech datasets, live rule sliders/toggles, and case status actions (Flagged, Cleared, Frozen).
8. Excluded from MVP (Out-of-Scope): Live banking API ingestion, persistent backend databases, ML model training, KYC document scanning, and multi-currency normalization.