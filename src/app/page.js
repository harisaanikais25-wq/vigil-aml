import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  SlidersHorizontal,
  Network,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Public Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              VigilAML
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Analyst Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Launch Live Sandbox
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="info">Inspired by Flagright (YC W22)</Badge>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
              Real-Time AML &amp; Fraud Ring Forensics Without Engineering
              Bottlenecks.
            </h1>
            <p className="text-base text-slate-600 mt-4 leading-relaxed">
              Detect circular money laundering, smurfing fan-in hubs, and shell
              chains using deterministic graph scoring—while eliminating false
              positives with no-code compliance rules.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Open Command Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/forensics">
                <Button variant="secondary" size="lg">
                  Explore Fraud Ring Graph
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview Card */}
          <Card className="bg-slate-900 text-white border-slate-800 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono text-xs text-sky-400">
                ALERT_STREAM // RING_002
              </span>
              <Badge variant="critical">Risk Score: 88/100</Badge>
            </div>
            <div className="py-5 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-800/80 flex justify-between">
                <span className="text-slate-300">ACC_205 (Orchestrator)</span>
                <span className="text-red-400">+30 Fan-In (12 senders)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/80 flex justify-between">
                <span className="text-slate-300">ACC_206 (Shell Relay)</span>
                <span className="text-amber-400">+35 Shell Chain</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/80 flex justify-between">
                <span className="text-slate-300">ACC_900 (Corporate Payroll)</span>
                <span className="text-emerald-400">-30 Dampened (Safe)</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Feature Pillars */}
        <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
          <Card>
            <SlidersHorizontal className="w-6 h-6 text-blue-800 mb-3" />
            <h3 className="font-bold text-slate-900">No-Code Rule Engine</h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Compliance analysts adjust smurfing windows, velocity caps, and
              pattern weights live without deploying backend code.
            </p>
          </Card>
          <Card>
            <Network className="w-6 h-6 text-blue-800 mb-3" />
            <h3 className="font-bold text-slate-900">
              Graph Ring Attribution
            </h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Pinpoint ring orchestrators, cycle paths, and shell intermediaries
              in an interactive entity-link topology.
            </p>
          </Card>
          <Card>
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-900">
              False-Positive Dampening
            </h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Relationship intelligence automatically discounts recurring
              payroll and subscription flows to prevent alert fatigue.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}