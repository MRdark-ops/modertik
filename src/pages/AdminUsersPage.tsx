import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Search, UserCog, Ban, CheckCircle } from "lucide-react";
import { useState } from "react";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", balance: "$1,500.00", referrals: 5, status: "active", joined: "2026-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", balance: "$2,350.00", referrals: 12, status: "active", joined: "2026-01-10" },
  { id: 3, name: "Carol White", email: "carol@example.com", balance: "$800.00", referrals: 3, status: "active", joined: "2026-02-01" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", balance: "$0.00", referrals: 0, status: "banned", joined: "2026-01-25" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", balance: "$3,200.00", referrals: 28, status: "active", joined: "2025-12-20" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout isAdmin title="User Management">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border focus:border-primary h-10" />
          </div>
          <span className="text-sm text-muted-foreground">{filtered.length} users</span>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Balance</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Referrals</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Joined</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold">{u.balance}</td>
                    <td className="py-3 px-4">{u.referrals}</td>
                    <td className="py-3 px-4 text-muted-foreground">{u.joined}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === 'active' ? 'bg-success/10 text-success border border-success/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}>{u.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Edit">
                          <UserCog className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-secondary transition-colors" title={u.status === 'active' ? 'Ban' : 'Activate'}>
                          {u.status === 'active' ? <Ban className="w-4 h-4 text-destructive" /> : <CheckCircle className="w-4 h-4 text-success" />}
                        </button>
                      </div>
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
