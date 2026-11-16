"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  INITIAL_ACCOUNTS,
  INITIAL_TRANSACTIONS,
  INITIAL_RULES,
} from "@/data/mockFinancialData";

const ForensicsContext = createContext(null);

export function ForensicsProvider({ children }) {
  const [analyst, setAnalyst] = useState({
    name: "Riya Deshmukh",
    role: "Senior AML Investigator",
    loggedIn: true,
  });

  const [rawAccounts, setRawAccounts] = useState(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [selectedAccountId, setSelectedAccountId] = useState("ACC_205");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Deterministic Suspicion Score Engine (Recalculates whenever rules or accounts change)
  const accounts = useMemo(() => {
    return rawAccounts.map((acc) => {
      let score = 0;
      const triggeredPatterns = [];
      const scoreBreakdown = [];

      // 1. Cycle Participation
      if (rules.cycleDetection.enabled && acc.inCycle) {
        score += Number(rules.cycleDetection.weight);
        triggeredPatterns.push("cycle");
        scoreBreakdown.push({
          label: "Circular Flow (3–5 Hops)",
          points: `+${rules.cycleDetection.weight}`,
          type: "risk",
        });
      }

      // 2. Fan-In Smurfing
      if (
        rules.fanInSmurfing.enabled &&
        acc.uniqueSenders72h >= Number(rules.fanInSmurfing.minSenders)
      ) {
        score += Number(rules.fanInSmurfing.weight);
        triggeredPatterns.push("fan_in");
        scoreBreakdown.push({
          label: `Fan-In (${acc.uniqueSenders72h} senders / ${rules.fanInSmurfing.windowHours}h)`,
          points: `+${rules.fanInSmurfing.weight}`,
          type: "risk",
        });
      }

      // 3. Shell Chain Intermediary
      if (rules.shellChain.enabled && acc.isShellIntermediary) {
        score += Number(rules.shellChain.weight);
        triggeredPatterns.push("shell_chain");
        scoreBreakdown.push({
          label: "Low-Activity Shell Relay",
          points: `+${rules.shellChain.weight}`,
          type: "risk",
        });
      }

      // 4. High Velocity Spike
      if (
        rules.highVelocity.enabled &&
        acc.txPerDay > Number(rules.highVelocity.maxTxPerDay)
      ) {
        score += Number(rules.highVelocity.weight);
        triggeredPatterns.push("high_velocity");
        scoreBreakdown.push({
          label: `High Velocity (${acc.txPerDay} tx/day)`,
          points: `+${rules.highVelocity.weight}`,
          type: "risk",
        });
      }

      // 5. Orchestrator Centrality Boost
      if (acc.role === "ORCHESTRATOR" && triggeredPatterns.length > 0) {
        score += 10;
        scoreBreakdown.push({
          label: "Ring Orchestrator Centrality",
          points: "+10",
          type: "risk",
        });
      }

      // 6. Multi-Stage Flow Boost
      if (triggeredPatterns.length >= 2) {
        score += 20;
        triggeredPatterns.push("multi_stage");
        scoreBreakdown.push({
          label: "Multi-Stage Laundering Flow",
          points: "+20",
          type: "risk",
        });
      }

      // 7. False Positive Dampener (Relationship Intelligence)
      if (rules.payrollDampener.enabled && acc.isRecurringPayroll && !acc.inCycle) {
        score -= Number(rules.payrollDampener.deduction);
        scoreBreakdown.push({
          label: "Recurring Payroll Dampener",
          points: `-${rules.payrollDampener.deduction}`,
          type: "safe",
        });
      }

      const finalScore = Math.max(0, Math.min(100, score));

      return {
        ...acc,
        suspicionScore: finalScore,
        triggeredPatterns,
        scoreBreakdown,
      };
    });
  }, [rawAccounts, rules]);

  // Aggregate Fraud Rings dynamically
  const fraudRings = useMemo(() => {
    const ringMap = {};
    accounts.forEach((acc) => {
      if (!acc.ringId) return;
      if (!ringMap[acc.ringId]) {
        ringMap[acc.ringId] = {
          ringId: acc.ringId,
          members: [],
          patterns: new Set(),
        };
      }
      ringMap[acc.ringId].members.push(acc);
      acc.triggeredPatterns.forEach((p) => ringMap[acc.ringId].patterns.add(p));
    });

    return Object.values(ringMap).map((ring) => {
      const avgScore =
        ring.members.reduce((sum, m) => sum + m.suspicionScore, 0) /
        ring.members.length;
      const riskScore = Math.min(
        100,
        Math.round(avgScore + Math.log2(ring.members.length + 1) * 8)
      );
      const orchestrator =
        ring.members.find((m) => m.role === "ORCHESTRATOR")?.id ||
        ring.members[0].id;

      return {
        ringId: ring.ringId,
        members: ring.members,
        memberCount: ring.members.length,
        patterns: Array.from(ring.patterns),
        riskScore,
        orchestrator,
      };
    });
  }, [accounts]);

  const updateRule = (ruleKey, updates) => {
    setRules((prev) => ({
      ...prev,
      [ruleKey]: { ...prev[ruleKey], ...updates },
    }));
    showToast(`Rule updated: ${rules[ruleKey].name}`);
  };

  const resetRules = () => {
    setRules(INITIAL_RULES);
    showToast("AML rules reset to factory defaults");
  };

  const updateAccountStatus = (accountId, newStatus) => {
    setRawAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, status: newStatus } : acc
      )
    );
    showToast(`Account ${accountId} marked as ${newStatus}`);
  };

  const addSimulatedTransaction = ({ sender, receiver, amount, patternTag }) => {
    const newTx = {
      id: `TXN_${Math.floor(1000 + Math.random() * 9000)}`,
      sender,
      receiver,
      amount: Number(amount),
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      patternTag,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Update receiver metrics dynamically to simulate live detection
    setRawAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === receiver) {
          return {
            ...acc,
            uniqueSenders72h:
              patternTag === "fan_in"
                ? acc.uniqueSenders72h + 1
                : acc.uniqueSenders72h,
            inCycle: patternTag === "cycle" ? true : acc.inCycle,
            txPerDay: acc.txPerDay + 1,
            status: "Flagged",
          };
        }
        if (acc.id === sender) {
          return {
            ...acc,
            txPerDay: acc.txPerDay + 1,
          };
        }
        return acc;
      })
    );

    showToast(`Ingested ${newTx.id} ($${Number(amount).toLocaleString()})`);
  };

  const exportAuditJson = () => {
    const payload = {
      generated_at: new Date().toISOString(),
      platform: "VigilAML Forensics Engine",
      summary: {
        total_accounts_analyzed: accounts.length,
        total_transactions: transactions.length,
        suspicious_accounts_flagged: accounts.filter((a) => a.suspicionScore >= 40).length,
        fraud_rings_detected: fraudRings.length,
      },
      suspicious_accounts: accounts
        .filter((a) => a.suspicionScore > 0)
        .map((a) => ({
          account_id: a.id,
          holder_name: a.holderName,
          suspicion_score: a.suspicionScore,
          detected_patterns: a.triggeredPatterns,
          ring_id: a.ringId,
          status: a.status,
        })),
      fraud_rings: fraudRings.map((r) => ({
        ring_id: r.ringId,
        orchestrator: r.orchestrator,
        member_accounts: r.members.map((m) => m.id),
        risk_score: r.riskScore,
        patterns: r.patterns,
      })),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vigilaml-audit-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Exported compliance audit JSON");
  };

  return (
    <ForensicsContext.Provider
      value={{
        analyst,
        setAnalyst,
        accounts,
        transactions,
        fraudRings,
        rules,
        updateRule,
        resetRules,
        selectedAccountId,
        setSelectedAccountId,
        updateAccountStatus,
        addSimulatedTransaction,
        exportAuditJson,
        toastMessage,
      }}
    >
      {children}
    </ForensicsContext.Provider>
  );
}

export function useForensics() {
  const ctx = useContext(ForensicsContext);
  if (!ctx) throw new Error("useForensics must be used within ForensicsProvider");
  return ctx;
}