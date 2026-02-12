import { DashboardLayout } from "@/components/DashboardLayout";

const logs = [
  { user: "Alice Johnson", action: "Login", ip: "192.168.1.100", date: "2026-02-12 14:30" },
  { user: "Bob Smith", action: "Deposit submitted", ip: "10.0.0.55", date: "2026-02-12 13:15" },
  { user: "Carol White", action: "Registration", ip: "172.16.0.22", date: "2026-02-11 09:45" },
  { user: "Eve Wilson", action: "Withdrawal requested", ip: "192.168.1.200", date: "2026-02-11 08:20" },
  { user: "Dave Brown", action: "Login failed", ip: "10.0.0.99", date: "2026-02-10 22:10" },
  { user: "Alice Johnson", action: "Referral registration", ip: "192.168.1.100", date: "2026-02-10 16:00" },
];

export default function AdminLogsPage() {
  return (
    <DashboardLayout isAdmin title="Activity Logs">
      <div className="space-y-6 animate-fade-in">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">IP Address</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{log.user}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        log.action.includes('failed') ? 'bg-destructive/10 text-destructive' :
                        log.action.includes('Login') ? 'bg-primary/10 text-primary' :
                        'bg-secondary text-foreground'
                      }`}>{log.action}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{log.ip}</td>
                    <td className="py-3 px-4 text-muted-foreground">{log.date}</td>
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
