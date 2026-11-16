"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function RuleConfigCard({ rule, onUpdate }) {
  const isDampener = rule.id === "payrollDampener";

  return (
    <Card className={!rule.enabled ? "opacity-65 bg-slate-50" : ""}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={isDampener ? "safe" : "info"}>
              {rule.category}
            </Badge>
            <span className="font-mono text-xs text-slate-400">
              ID: {rule.id}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900">{rule.name}</h3>
          <p className="text-xs text-slate-600 mt-1">{rule.description}</p>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={rule.enabled}
            onChange={(e) => onUpdate(rule.id, { enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative peer-checked:bg-blue-800" />
        </label>
      </div>

      {/* Interactive Threshold Controls */}
      <div className="mt-5 pt-4 border-t border-slate-200 grid sm:grid-cols-2 gap-4">
        {isDampener ? (
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700">Score Deduction</span>
              <span className="font-mono text-emerald-700 font-bold">
                -{rule.deduction} pts
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              disabled={!rule.enabled}
              value={rule.deduction}
              onChange={(e) =>
                onUpdate(rule.id, { deduction: Number(e.target.value) })
              }
              className="w-full accent-emerald-600"
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700">Risk Score Weight</span>
              <span className="font-mono text-blue-800 font-bold">
                +{rule.weight} pts
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              disabled={!rule.enabled}
              value={rule.weight}
              onChange={(e) =>
                onUpdate(rule.id, { weight: Number(e.target.value) })
              }
              className="w-full accent-blue-800"
            />
          </div>
        )}

        {rule.minSenders !== undefined && (
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700">Unique Senders Threshold</span>
              <span className="font-mono font-bold text-slate-900">
                ≥ {rule.minSenders} senders
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              disabled={!rule.enabled}
              value={rule.minSenders}
              onChange={(e) =>
                onUpdate(rule.id, { minSenders: Number(e.target.value) })
              }
              className="w-full accent-blue-800"
            />
          </div>
        )}

        {rule.maxTxPerDay !== undefined && (
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700">Max Transactions / Day</span>
              <span className="font-mono font-bold text-slate-900">
                &gt; {rule.maxTxPerDay} tx/day
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              disabled={!rule.enabled}
              value={rule.maxTxPerDay}
              onChange={(e) =>
                onUpdate(rule.id, { maxTxPerDay: Number(e.target.value) })
              }
              className="w-full accent-blue-800"
            />
          </div>
        )}
      </div>
    </Card>
  );
}