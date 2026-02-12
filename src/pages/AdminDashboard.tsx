import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, DollarSign, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Activity } from "lucide-react";

const recentActivity = [
  { user: "Alice Johnson", action: "Deposit approved", amount: "$500.00", date: "2026-02-12" },
  { user: "Bob Smith", action: "Withdrawal requested", amount: "$200.00", date: "2026-02-11" },
  { user: "Carol White", action: "New registration", amount: "-", date: "2026-02-11" },
  { user: "Dave Brown", action: "Commission earned", amount: "$45.00", date: "2026-02-10" },
];

const pendingDeposits = [
  { id: 1, user: "Alice Johnson", amount: "$1,000.00", status: "pending" as const, date: "2026-02-12" },
  { id: 2, user: "Eve Wilson", amount: "$250.00", status: "pending" as const, date: "2026-02-12" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout isAdmin title="Admin Overview">
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="1,247" icon={Users} trend="+23 this week" trendUp />
          <StatCard title="Total Deposits" value="$125,430" icon={ArrowDownToLine} trend="+$12,500" trendUp />
          <StatCard title="Total Withdrawals" value="$45,200" icon={ArrowUpFromLine} />
          <StatCard title="Commissions Paid" value="$18,350" icon={DollarSign} trend="5-level MLR" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Deposits */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5 text-primary" /> Pending Deposits
            </h3>
            <div className="space-y-3">
              {pendingDeposits.map(d => (
                <div key={d.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{d.user}</p>
                    <p className="text-xs text-muted-foreground">{d.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{d.amount}</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 text-xs rounded bg-success/10 text-success border border-success/20 hover:bg-success/20">Approve</button>
                      <button className="px-2 py-1 text-xs rounded bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{act.user}</p>
                    <p className="text-xs text-muted-foreground">{act.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{act.amount}</p>
                    <p className="text-xs text-muted-foreground">{act.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
