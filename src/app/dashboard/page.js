"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { useForensics } from "@/context/ForensicsContext";

export default function DashboardPage() {
  const { accounts, transactions, fraudRings, setSelectedAccountId } =
    useForensics();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const flaggedAccounts = accounts.filter((a) => a.suspicionScore >= 40);
  const dampenedCount = accounts.filter((a) => a.isRecurringPayroll).length;
  const avgScore = Math.round(
    accounts.reduce((s, a) => s + a.suspicionScore, 0) / accounts.length
  );

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.id.toLowerCase().includes(search.toLowerCase()) ||
      acc.holderName.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (riskFilter === "HIGH") return acc.suspicionScore >= 75;
    if (riskFilter === "MEDIUM")
      return acc.suspicionScore >= 40 && acc.suspicionScore < 75;
    if (riskFilter === "SAFE") return acc.suspicionScore < 40;
    return true;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          title="AML Command Dashboard"
          subtitle="Real-time transaction risk posture and active investigation queue"
        />

        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* KPI Row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <span className="text-xs font-medium text-slate-500">
                Transactions Monitored
              </span>
              <p className="text-2xl font-mono font-bold text-slate-900 mt-1">
                {transactions.length}
              </p>
              <span className="text-xs text-emerald-600 mt-1 block">
                100% deterministic coverage
              </span>
            </Card>
            <Card>
              <span className="text-xs font-medium text-slate-500">
                Flagged High-Risk Accounts
              </span>
              <p className="text-2xl font-mono font-bold text-red-600 mt-1">
                {flaggedAccounts.length}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">
                Score ≥ 40 threshold
              </span>
            </Card>
            <Card>
              <span className="text-xs font-medium text-slate-500">
                Detected Fraud Rings
              </span>
              <p className="text-2xl font-mono font-bold text-blue-800 mt-1">
                {fraudRings.length}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">
                Cycle &amp; Smurfing clusters
              </span>
            </Card>
            <Card>
              <span className="text-xs font-medium text-slate-500">
                False Positives Dampened
              </span>
              <p className="text-2xl font-mono font-bold text-emerald-600 mt-1">
                {dampenedCount}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">
                Avg network score: {avgScore}/100
              </span>
            </Card>
          </div>

          {/* Account Triage Table */}
          <Card padding="p-0" className="overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Entity Risk Triage Queue
                </h2>
                <p className="text-xs text-slate-500">
                  Scores dynamically reflect your active settings in No-Code
                  Rule Studio
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search ID or entity..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                  />
                </div>

                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="ALL">All Risk Tiers</option>
                  <option value="HIGH">Critical (75–100)</option>
                  <option value="MEDIUM">Medium (40–74)</option>
                  <option value="SAFE">Safe / Dampened (&lt;40)</option>
                </select>
              </div>
            </div>

            {filteredAccounts.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  title="No matching entities found"
                  description="Try clearing your search query or changing the risk tier filter."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                      <th className="py-3 px-4">Account ID</th>
                      <th className="py-3 px-4">Entity Name</th>
                      <th className="py-3 px-4">Ring ID</th>
                      <th className="py-3 px-4">Detected Patterns</th>
                      <th className="py-3 px-4">Suspicion Score</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {filteredAccounts.map((acc) => {
                      const badgeVariant =
                        acc.suspicionScore >= 75
                          ? "critical"
                          : acc.suspicionScore >= 40
                          ? "medium"
                          : "safe";

                      return (
                        <tr key={acc.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-800">
                            {acc.id}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {acc.holderName}
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-slate-600">
                            {acc.ringId || "—"}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {acc.triggeredPatterns.length === 0 ? (
                                <span className="text-xs text-slate-400">
                                  None
                                </span>
                              ) : (
                                acc.triggeredPatterns.map((p) => (
                                  <Badge key={p} variant="neutral">
                                    {p}
                                  </Badge>
                                ))
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={badgeVariant}>
                              <span className="font-mono font-bold">
                                {acc.suspicionScore}
                              </span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-xs font-medium text-slate-700">
                            {acc.status}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Link
                              href="/forensics"
                              onClick={() => setSelectedAccountId(acc.id)}
                            >
                              <Button variant="secondary" size="sm">
                                Inspect
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}