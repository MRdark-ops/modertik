import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowDownToLine, Upload } from "lucide-react";
import { useState } from "react";

const deposits = [
  { id: 1, amount: "$500.00", status: "approved" as const, date: "2026-02-10", proof: "receipt_001.png" },
  { id: 2, amount: "$1,000.00", status: "pending" as const, date: "2026-02-12", proof: "receipt_002.png" },
];

export default function DepositPage() {
  const [amount, setAmount] = useState("");

  return (
    <DashboardLayout title="Deposit Funds">
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Deposit Form */}
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-primary" /> New Deposit
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium text-primary mb-1">Payment Instructions</p>
              <p className="text-sm text-muted-foreground">Send your deposit via Binance Pay to the following address and upload proof below.</p>
              <p className="text-xs text-muted-foreground mt-2 font-mono bg-secondary/50 p-2 rounded">Wallet: 0x1234...abcd</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Amount (USD)</Label>
                <Input type="number" placeholder="100.00" value={amount} onChange={e => setAmount(e.target.value)}
                  className="bg-secondary border-border focus:border-primary h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Upload Proof</Label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 h-11 rounded-md border border-dashed border-border bg-secondary cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Choose file</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Submit Deposit</Button>
          </div>
        </div>

        {/* Deposit History */}
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Deposit History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Proof</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map(d => (
                  <tr key={d.id} className="border-b border-border/50">
                    <td className="py-3">{d.date}</td>
                    <td className="py-3 font-semibold">{d.amount}</td>
                    <td className="py-3 text-muted-foreground">{d.proof}</td>
                    <td className="py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
