import { DashboardLayout } from "@/components/DashboardLayout";
import { Users } from "lucide-react";

const referralData = [
  { user: "Eve Wilson", directRefs: 28, totalNetwork: 150, totalCommission: "$1,250.00" },
  { user: "Bob Smith", directRefs: 12, totalNetwork: 45, totalCommission: "$675.00" },
  { user: "Alice Johnson", directRefs: 5, totalNetwork: 18, totalCommission: "$320.00" },
  { user: "Carol White", directRefs: 3, totalNetwork: 8, totalCommission: "$95.00" },
];

export default function AdminReferralsPage() {
  return (
    <DashboardLayout isAdmin title="Referral Monitoring">
      <div className="space-y-6 animate-fade-in">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Direct Referrals</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Total Network</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Total Commission</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{r.user}</td>
                    <td className="py-3 px-4">{r.directRefs}</td>
                    <td className="py-3 px-4">{r.totalNetwork}</td>
                    <td className="py-3 px-4 font-semibold gold-gradient-text">{r.totalCommission}</td>
                    <td className="py-3 px-4">
                      <button className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                        View Tree
                      </button>
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
