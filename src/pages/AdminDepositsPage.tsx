import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";

const deposits = [
  { id: 1, user: "Alice Johnson", amount: "$1,000.00", status: "pending" as const, date: "2026-02-12", proof: "receipt_002.png" },
  { id: 2, user: "Eve Wilson", amount: "$250.00", status: "pending" as const, date: "2026-02-12", proof: "receipt_003.png" },
  { id: 3, user: "Bob Smith", amount: "$500.00", status: "approved" as const, date: "2026-02-10", proof: "receipt_001.png" },
];

export default function AdminDepositsPage() {
  return (
    <DashboardLayout isAdmin title="Deposit Management">
      <div className="space-y-6 animate-fade-in">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Proof</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map(d => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{d.user}</td>
                    <td className="py-3 px-4 font-semibold">{d.amount}</td>
                    <td className="py-3 px-4 text-primary text-xs underline cursor-pointer">{d.proof}</td>
                    <td className="py-3 px-4 text-muted-foreground">{d.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={d.status} /></td>
                    <td className="py-3 px-4">
                      {d.status === "pending" && (
                        <div className="flex gap-1">
                          <button className="px-2 py-1 text-xs rounded bg-success/10 text-success border border-success/20 hover:bg-success/20">Approve</button>
                          <button className="px-2 py-1 text-xs rounded bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20">Reject</button>
                        </div>
                      )}
                    </td>
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
