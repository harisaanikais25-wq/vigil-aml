"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import NetworkGraph from "@/components/forensics/NetworkGraph";
import AccountInspector from "@/components/forensics/AccountInspector";
import { useForensics } from "@/context/ForensicsContext";

export default function ForensicsPage() {
  const { fraudRings, setSelectedAccountId } = useForensics();
  const [highlightRingId, setHighlightRingId] = useState(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          title="Fraud Ring & Graph Forensics"
          subtitle="Interactive network visualization of circular circuits, smurfing hubs, and shell relays"
        />

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Fraud Ring Selector Strip */}
          <div className="grid md:grid-cols-3 gap-4">
            <div
              onClick={() => setHighlightRingId(null)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                highlightRingId === null
                  ? "bg-blue-50 border-blue-700"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="text-xs font-semibold text-blue-800">
                ALL NETWORKS
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Full Transaction Topology
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Show all active rings and dampened payroll baselines
              </p>
            </div>

            {fraudRings.map((ring) => (
              <div
                key={ring.ringId}
                onClick={() => {
                  setHighlightRingId(ring.ringId);
                  setSelectedAccountId(ring.orchestrator);
                }}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  highlightRingId === ring.ringId
                    ? "bg-blue-50 border-blue-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {ring.ringId}
                  </span>
                  <Badge variant="critical">Risk: {ring.riskScore}</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1.5">
                  Orchestrator:{" "}
                  <span className="font-mono font-semibold">
                    {ring.orchestrator}
                  </span>{" "}
                  • {ring.memberCount} accounts
                </p>
              </div>
            ))}
          </div>

          {/* Main Graph + Inspector Split */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NetworkGraph highlightRingId={highlightRingId} />
            </div>
            <div>
              <AccountInspector />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}