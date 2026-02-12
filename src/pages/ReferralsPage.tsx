import { DashboardLayout } from "@/components/DashboardLayout";
import { Users, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const referralLevels = [
  { level: 1, rate: "10%", count: 5, earnings: "$250.00" },
  { level: 2, rate: "8%", count: 12, earnings: "$180.00" },
  { level: 3, rate: "6%", count: 28, earnings: "$120.00" },
  { level: 4, rate: "4%", count: 45, earnings: "$85.00" },
  { level: 5, rate: "2%", count: 60, earnings: "$40.00" },
];

const directReferrals = [
  { name: "Alice Johnson", email: "alice@example.com", date: "2026-01-15", status: "active" },
  { name: "Bob Smith", email: "bob@example.com", date: "2026-01-20", status: "active" },
  { name: "Carol White", email: "carol@example.com", date: "2026-02-01", status: "active" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://globaltrading.com/ref/USER123";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Referrals">
      <div className="space-y-6 animate-fade-in max-w-5xl">
        {/* Referral Link */}
        <div className="glass-card p-6 gold-glow">
          <h3 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Your Referral Link
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Share this link to earn commissions on 5 levels!</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm font-mono text-foreground/80 border border-border">
              {referralLink}
            </div>
            <Button onClick={copyLink} variant="outline" size="icon" className="h-10 w-10 border-primary/30 hover:bg-primary/10">
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-primary" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Breakdown */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Commission by Level</h3>
            <div className="space-y-3">
              {referralLevels.map(lvl => (
                <div key={lvl.level} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">L{lvl.level}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Level {lvl.level} — {lvl.rate}</p>
                      <p className="text-xs text-muted-foreground">{lvl.count} referrals</p>
                    </div>
                  </div>
                  <span className="font-semibold gold-gradient-text">{lvl.earnings}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3">
                <span className="font-semibold">Total Earnings</span>
                <span className="text-lg font-bold gold-gradient-text">$675.00</span>
              </div>
            </div>
          </div>

          {/* Direct Referrals */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Direct Referrals</h3>
            <div className="space-y-3">
              {directReferrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{ref.name}</p>
                    <p className="text-xs text-muted-foreground">{ref.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{ref.date}</p>
                    <span className="text-xs text-success font-medium">Active</span>
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
