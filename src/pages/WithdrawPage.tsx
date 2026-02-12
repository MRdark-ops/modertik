import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowUpFromLine } from "lucide-react";
import { useState } from "react";

const withdrawals = [
  { id: 1, amount: "$200.00", status: "approved" as const, date: "2026-02-08" },
  { id: 2, amount: "$150.00", status: "pending" as const, date: "2026-02-11" },
  { id: 3, amount: "$500.00", status: "rejected" as const, date: "2026-02-05" },
];

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");

  return (
    <DashboardLayout title="Withdraw Funds">
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUpFromLine className="w-5 h-5 text-primary" /> New Withdrawal
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-semibold gold-gradient-text">$2,350.00</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Minimum Withdrawal</span>
                <span>$50.00</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Withdrawal Amount (USD)</Label>
              <Input type="number" placeholder="50.00" value={amount} onChange={e => setAmount(e.target.value)}
                className="bg-secondary border-border focus:border-primary h-11" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Request Withdrawal</Button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Withdrawal History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id} className="border-b border-border/50">
                    <td className="py-3">{w.date}</td>
                    <td className="py-3 font-semibold">{w.amount}</td>
                    <td className="py-3"><StatusBadge status={w.status} /></td>
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
