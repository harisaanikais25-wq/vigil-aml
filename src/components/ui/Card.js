import React from "react";

export default function Card({ children, className = "", padding = "p-5" }) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-xs ${padding} ${className}`}
    >
      {children}
    </div>
  );
}