"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForensics } from "@/context/ForensicsContext";

export default function LoginPage() {
  const router = useRouter();
  const { setAnalyst } = useForensics();
  const [name, setName] = useState("Riya Deshmukh");
  const [role, setRole] = useState("Senior AML Investigator");

  const handleLogin = (e) => {
    e.preventDefault();
    setAnalyst({ name, role, loggedIn: true });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md p-7">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center text-white">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">VigilAML</h1>
            <p className="text-xs text-slate-500">Compliance Workspace Sign-In</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Investigator Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Compliance Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            >
              <option>Senior AML Investigator</option>
              <option>Head of Risk Operations</option>
              <option>BSA / MLRO Compliance Officer</option>
            </select>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2">
            Enter Workspace
          </Button>
        </form>
      </Card>
    </div>
  );
}