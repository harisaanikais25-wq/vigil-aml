"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  SlidersHorizontal,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { useForensics } from "@/context/ForensicsContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { accounts, analyst } = useForensics();

  const flaggedCount = accounts.filter((a) => a.suspicionScore >= 40).length;

  const navItems = [
    {
      label: "Command Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Ring & Graph Forensics",
      href: "/forensics",
      icon: Network,
      badge: flaggedCount,
    },
    {
      label: "No-Code Rule Studio",
      href: "/rules",
      icon: SlidersHorizontal,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col min-h-screen shrink-0">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-white tracking-tight text-lg block leading-none">
            VigilAML
          </span>
          <span className="text-[11px] text-slate-400">
            Forensics & Rule Engine
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Analyst Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white">{analyst.name}</p>
            <p className="text-[11px] text-slate-400">{analyst.role}</p>
          </div>
          <Link
            href="/login"
            title="Switch Analyst"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}