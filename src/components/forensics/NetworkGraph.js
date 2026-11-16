"use client";

import React from "react";
import { useForensics } from "@/context/ForensicsContext";

export default function NetworkGraph({ highlightRingId }) {
  const { accounts, transactions, selectedAccountId, setSelectedAccountId } =
    useForensics();

  const getNodeColor = (score) => {
    if (score >= 75) return "#DC2626"; // Critical Red
    if (score >= 40) return "#D97706"; // Medium Amber
    return "#059669"; // Safe Emerald
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
      {/* Legend Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
        <span className="font-medium text-white">
          Entity-Link Topology (Click any node to inspect)
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
            Critical (75–100)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            Medium (40–74)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Dampened / Safe
          </span>
        </div>
      </div>

      {/* SVG Graph Canvas */}
      <svg viewBox="0 0 850 420" className="w-full h-[420px] select-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="28"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
          </marker>
          <marker
            id="arrowhead-risk"
            markerWidth="10"
            markerHeight="7"
            refX="28"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
          </marker>
        </defs>

        {/* Subtle Grid */}
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#1E293B"
            strokeWidth="0.7"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Directed Transaction Edges */}
        {transactions.map((tx) => {
          const src = accounts.find((a) => a.id === tx.sender);
          const dst = accounts.find((a) => a.id === tx.receiver);
          if (!src || !dst) return null;

          const isRiskEdge = tx.patternTag !== "recurring_payroll";
          const midX = (src.x + dst.x) / 2;
          const midY = (src.y + dst.y) / 2 - 8;

          return (
            <g key={tx.id}>
              <line
                x1={src.x}
                y1={src.y}
                x2={dst.x}
                y2={dst.y}
                stroke={isRiskEdge ? "#EF4444" : "#10B981"}
                strokeWidth={isRiskEdge ? 2.2 : 1.5}
                strokeDasharray={isRiskEdge ? "none" : "5,5"}
                markerEnd={
                  isRiskEdge ? "url(#arrowhead-risk)" : "url(#arrowhead)"
                }
                opacity="0.8"
              />
              <text
                x={midX}
                y={midY}
                fill="#94A3B8"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                ${tx.amount.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Account Nodes */}
        {accounts.map((acc) => {
          const isSelected = acc.id === selectedAccountId;
          const isDimmed =
            highlightRingId && acc.ringId !== highlightRingId;
          const radius = acc.role === "ORCHESTRATOR" ? 24 : 19;

          return (
            <g
              key={acc.id}
              onClick={() => setSelectedAccountId(acc.id)}
              className="cursor-pointer transition-opacity"
              opacity={isDimmed ? 0.25 : 1}
            >
              {/* Selection Halo */}
              {isSelected && (
                <circle
                  cx={acc.x}
                  cy={acc.y}
                  r={radius + 7}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={acc.x}
                cy={acc.y}
                r={radius}
                fill={getNodeColor(acc.suspicionScore)}
                stroke="#0F172A"
                strokeWidth="2.5"
              />

              {/* Score inside Node */}
              <text
                x={acc.x}
                y={acc.y + 4}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {acc.suspicionScore}
              </text>

              {/* Account ID Label */}
              <text
                x={acc.x}
                y={acc.y + radius + 15}
                fill="#F8FAFC"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {acc.id}
              </text>
              <text
                x={acc.x}
                y={acc.y + radius + 28}
                fill="#94A3B8"
                fontSize="10"
                textAnchor="middle"
              >
                {acc.holderName}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}