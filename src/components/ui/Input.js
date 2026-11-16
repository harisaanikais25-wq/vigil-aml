import React from "react";

export default function Input({ label, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-slate-700">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 ${className}`}
        {...props}
      />
    </div>
  );
}