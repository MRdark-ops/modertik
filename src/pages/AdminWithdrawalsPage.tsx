import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";

const withdrawals = [
  { id: 1, user: "Bob Smith", amount: "$200.00", status: "pending" as const, date: "2026-02-11" },
  { id: 2, user: "Carol White", amount: "$150.00", status: "pending" as const, date: "2026-02-11" },
  { id: 3, user: "Alice Johnson", amount: "$500.00", status: "approved" as const, date: "2026-02-08" },
  { id: 4, user: "Dave Brown", amount: "$300.00", status: "rejected" as const, date: "2026-02-05" },
];

export default function AdminWithdrawalsPage() {
  return (
    <DashboardLayout isAdmin title="Withdrawal Management">
      <div className="space-y-6 animate-fade-in">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{w.user}</td>
                    <td className="py-3 px-4 font-semibold">{w.amount}</td>
                    <td className="py-3 px-4 text-muted-foreground">{w.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={w.status} /></td>
                    <td className="py-3 px-4">
                      {w.status === "pending" && (
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
