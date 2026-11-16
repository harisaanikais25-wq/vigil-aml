"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import RuleConfigCard from "@/components/forensics/RuleConfigCard";
import { useForensics } from "@/context/ForensicsContext";

export default function RulesPage() {
  const { rules, updateRule, resetRules, accounts } = useForensics();

  const flaggedCount = accounts.filter((a) => a.suspicionScore >= 40).length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          title="No-Code AML Rule Studio"
          subtitle="Configure deterministic detection thresholds without deploying code"
        />

        <main className="p-6 max-w-5xl w-full mx-auto space-y-6">
          {/* Live Simulation Banner */}
          <div className="bg-blue-950 text-white rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold">
                Live Impact Preview
              </span>
              <p className="text-sm mt-1">
                With current rule weights,{" "}
                <span className="font-mono font-bold text-amber-300">
                  {flaggedCount} of {accounts.length}
                </span>{" "}
                accounts exceed the suspicion alert threshold (≥ 40).
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={resetRules}>
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </Button>
          </div>

          {/* Rule Cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {Object.values(rules).map((rule) => (
              <RuleConfigCard
                key={rule.id}
                rule={rule}
                onUpdate={updateRule}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}