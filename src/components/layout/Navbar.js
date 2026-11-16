"use client";

import React, { useState } from "react";
import { PlusCircle, Download, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import SimulateTxModal from "@/components/forensics/SimulateTxModal";
import { useForensics } from "@/context/ForensicsContext";

export default function Navbar({ title, subtitle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { exportAuditJson, toastMessage } = useForensics();

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {toastMessage}
            </div>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={exportAuditJson}
          >
            <Download className="w-4 h-4" />
            Export Audit JSON
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            Simulate Transaction
          </Button>
        </div>
      </header>

      <SimulateTxModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}