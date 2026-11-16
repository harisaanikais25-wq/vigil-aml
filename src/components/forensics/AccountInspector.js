"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useForensics } from "@/context/ForensicsContext";

export default function AccountInspector() {
  const { accounts, selectedAccountId, updateAccountStatus } = useForensics();
  const account = accounts.find((a) => a.id === selectedAccountId);

  if (!account) return null;

  const riskVariant =
    account.suspicionScore >= 75
      ? "critical"
      : account.suspicionScore >= 40
      ? "medium"
      : "safe";

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <span className="font-mono text-xs font-semibold text-blue-800">
              {account.id}
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {account.holderName}
            </h3>
            <p className="text-xs text-slate-500">
              {account.accountType} • {account.jurisdiction}
            </p>
          </div>
          <Badge variant={riskVariant}>
            Score: {account.suspicionScore}/100
          </Badge>
        </div>

        {/* Metadata Pills */}
        <div className="grid grid-cols-2 gap-2 my-4 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Graph Role</span>
            <span className="font-mono font-semibold text-slate-900">
              {account.role}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Case Status</span>
            <span className="font-semibold text-slate-900">
              {account.status}
            </span>
          </div>
        </div>

        {/* Deterministic Score Explanation */}
        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Rule Attribution Breakdown
          </h4>
          {account.scoreBreakdown.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No active AML rules triggered for this account.
            </p>
          ) : (
            <ul className="space-y-2">
              {account.scoreBreakdown.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <span className="text-slate-700">{item.label}</span>
                  <span
                    className={`font-mono font-bold ${
                      item.type === "safe"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.points}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Analyst Case Actions */}
      <div className="pt-4 mt-6 border-t border-slate-200 flex flex-col gap-2">
        <Button
          variant="danger"
          size="sm"
          onClick={() => updateAccountStatus(account.id, "Frozen")}
        >
          Freeze Account & Escalate SAR
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateAccountStatus(account.id, "Cleared")}
        >
          Dismiss as False Positive
        </Button>
      </div>
    </Card>
  );
}