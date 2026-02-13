import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowDownToLine, Upload } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const depositSchema = z.object({
  amount: z.number({ invalid_type_error: "Please enter a valid amount" }).min(10, "Minimum deposit is $10").max(100000, "Maximum deposit is $100,000"),
});

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const deposits = [
  { id: 1, amount: "$500.00", status: "approved" as const, date: "2026-02-10", proof: "receipt_001.png" },
  { id: 2, amount: "$1,000.00", status: "pending" as const, date: "2026-02-12", proof: "receipt_002.png" },
];

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!ALLOWED_FILE_TYPES.includes(selected.type)) {
      setErrors(prev => ({ ...prev, file: "Only PNG, JPEG, and WebP images are allowed" }));
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ ...prev, file: "File must be under 5MB" }));
      return;
    }
    setErrors(prev => { const { file, ...rest } = prev; return rest; });
    setFile(selected);
  };

  const handleSubmit = () => {
    setErrors({});
    const result = depositSchema.safeParse({ amount: parseFloat(amount) });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        fieldErrors.amount = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!file) {
      setErrors({ file: "Please upload proof of payment" });
      return;
    }
    toast({ title: "Backend not connected", description: "Deposits require Lovable Cloud to be enabled.", variant: "destructive" });
  };

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
                  className={`bg-secondary border-border focus:border-primary h-11 ${errors.amount ? 'border-destructive' : ''}`} min="10" max="100000" step="0.01" />
                {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Upload Proof</Label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 h-11 rounded-md border border-dashed border-border bg-secondary cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Choose file</span>
                    <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp" onChange={handleFileChange} />
                  </label>
                  {file && <span className="text-xs text-muted-foreground truncate max-w-[120px]">{file.name}</span>}
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">Submit Deposit</Button>
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
