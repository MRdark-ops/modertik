import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet, TrendingUp, Users, ArrowDownToLine, ArrowUpFromLine, DollarSign } from "lucide-react";

const recentTransactions = [
  { id: 1, type: "Deposit", amount: "$500.00", status: "approved" as const, date: "2026-02-10" },
  { id: 2, type: "Withdrawal", amount: "$200.00", status: "pending" as const, date: "2026-02-11" },
  { id: 3, type: "Commission", amount: "$45.00", status: "approved" as const, date: "2026-02-11" },
  { id: 4, type: "Deposit", amount: "$1,000.00", status: "approved" as const, date: "2026-02-12" },
];

const referralLevels = [
  { level: 1, rate: "10%", count: 5, earnings: "$250.00" },
  { level: 2, rate: "8%", count: 12, earnings: "$180.00" },
  { level: 3, rate: "6%", count: 28, earnings: "$120.00" },
  { level: 4, rate: "4%", count: 45, earnings: "$85.00" },
  { level: 5, rate: "2%", count: 60, earnings: "$40.00" },
];

export default function UserDashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Account Balance" value="$2,350.00" icon={Wallet} trend="+12.5%" trendUp />
          <StatCard title="Total Earnings" value="$675.00" icon={TrendingUp} trend="+8.2%" trendUp />
          <StatCard title="Referral Earnings" value="$675.00" icon={Users} subtitle="150 total referrals" />
          <StatCard title="Total Deposits" value="$3,500.00" icon={DollarSign} subtitle="5 deposits" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      tx.type === 'Deposit' ? 'bg-success/10' : tx.type === 'Withdrawal' ? 'bg-destructive/10' : 'bg-primary/10'
                    }`}>
                      {tx.type === 'Deposit' ? <ArrowDownToLine className="w-4 h-4 text-success" /> :
                       tx.type === 'Withdrawal' ? <ArrowUpFromLine className="w-4 h-4 text-destructive" /> :
                       <DollarSign className="w-4 h-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{tx.amount}</span>
                    <StatusBadge status={tx.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Levels */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Referral Earnings by Level</h3>
            <div className="space-y-3">
              {referralLevels.map(lvl => (
                <div key={lvl.level} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">L{lvl.level}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Level {lvl.level} ({lvl.rate})</p>
                      <p className="text-xs text-muted-foreground">{lvl.count} referrals</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold gold-gradient-text">{lvl.earnings}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
