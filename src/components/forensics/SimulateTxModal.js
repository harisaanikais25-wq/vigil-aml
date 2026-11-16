"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForensics } from "@/context/ForensicsContext";

export default function SimulateTxModal({ isOpen, onClose }) {
  const { accounts, addSimulatedTransaction } = useForensics();
  const [sender, setSender] = useState("ACC_103");
  const [receiver, setReceiver] = useState("ACC_205");
  const [amount, setAmount] = useState("9800");
  const [patternTag, setPatternTag] = useState("fan_in");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sender === receiver) return;
    addSimulatedTransaction({ sender, receiver, amount, patternTag });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulate Real-Time Transaction"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Origin Account (Sender)
          </label>
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} — {a.holderName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Beneficiary Account (Receiver)
          </label>
          <select
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} — {a.holderName}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Transfer Amount (USD)"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Simulated Behavioral Signal
          </label>
          <select
            value={patternTag}
            onChange={(e) => setPatternTag(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
          >
            <option value="fan_in">Smurfing Fan-In Deposit</option>
            <option value="cycle">Circular Layering Hop</option>
            <option value="normal">Standard Wire Transfer</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Inject Transaction
          </Button>
        </div>
      </form>
    </Modal>
  );
}