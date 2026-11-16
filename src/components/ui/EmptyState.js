import React from "react";
import { ShieldCheck } from "lucide-react";

export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50/50">
      <ShieldCheck className="w-10 h-10 text-slate-400 mb-3" />
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
}