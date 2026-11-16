# VigilAML — UI Design System

## 1. Color Palette
- **Primary:** `#1E40AF` (Deep Cobalt Blue — active navigation, primary buttons, brand highlights)
- **Secondary:** `#0F172A` (Slate Obsidian — sidebar surface, high-contrast headers)
- **Background:** `#F8FAFC` (Cool Off-White — main application canvas)
- **Card Surface:** `#FFFFFF` with `1px solid #E2E8F0` border
- **Text Primary:** `#0F172A` (Slate 900)
- **Text Secondary:** `#475569` (Slate 600 — metadata, timestamps, descriptions)
- **Accent:** `#0284C7` (Sky Cyan — selected nodes, interactive focus rings)
- **Semantic Risk States:**
  - **Critical / High Risk (75–100):** `#DC2626` (Crimson) on `#FEF2F2`
  - **Warning / Medium Risk (40–74):** `#D97706` (Amber) on `#FFFBEB`
  - **Safe / Dampened / Cleared (0–39):** `#059669` (Emerald) on `#ECFDF5`

## 2. Typography
- **UI Font:** `Inter` (Sans-serif for navigation, headings, body copy)
- **Data Font:** `JetBrains Mono` (Monospace for Account IDs, Transaction IDs, monetary amounts, and suspicion scores)
- **Scale:**
  - `H1`: 30px / Bold (700)
  - `H2`: 20px / Semi-Bold (600)
  - `H3`: 16px / Semi-Bold (600)
  - `Body`: 14px / Regular (400)
  - `Badge / Caption`: 12px / Medium (500)

## 3. Core Reusable Components
- `Sidebar` & `Navbar` (App shell with live flagged alert counter and audit export)
- `StatCard` (KPI summary card with monospace values)
- `RiskBadge` (`CRITICAL`, `MEDIUM`, `LOW`, `DAMPENED`, `ORCHESTRATOR`)
- `NetworkGraph` (Interactive SVG entity-link topology visualizer)
- `AccountInspector` (Dossier drawer with score breakdown & case actions)
- `RuleConfigCard` (No-code AML rule toggle and threshold slider)
- `SimulateTxModal` (Modal form to inject live transactions into React Context)
- `Button`, `Card`, `Input`, `Modal`, `EmptyState`