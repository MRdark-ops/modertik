import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowDownToLine, Upload } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const depositSchema = z.object({
  amount: z.number({ invalid_type_error: "Please enter a valid amount" }).min(10, "Minimum deposit is $10").max(100000, "Maximum deposit is $100,000"),
});

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: deposits = [] } = useQuery({
    queryKey: ["deposits", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("deposits")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

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

  const handleSubmit = async () => {
    setErrors({});
    const result = depositSchema.safeParse({ amount: parseFloat(amount) });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors.amount = err.message; });
      setErrors(fieldErrors);
      return;
    }
    if (!file) {
      setErrors({ file: "Please upload proof of payment" });
      return;
    }
    if (!user) return;

    setSubmitting(true);
    try {
      // Upload proof via server-side validated edge function
      const formData = new FormData();
      formData.append("file", file);

      const { data: { session } } = await supabase.auth.getSession();
      const uploadRes = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-deposit-proof`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        toast({ title: "Upload failed", description: err.error || "Upload failed", variant: "destructive" });
        setSubmitting(false);
        return;
      }

      const { path: filePath } = await uploadRes.json();

      // Create deposit record
      const { error: insertError } = await supabase.from("deposits").insert({
        user_id: user.id,
        amount: result.data.amount,
        proof_url: filePath,
        status: "pending",
      });

      if (insertError) {
        toast({ title: "Error", description: insertError.message, variant: "destructive" });
      } else {
        toast({ title: "Deposit submitted", description: "Your deposit is pending admin approval." });
        setAmount("");
        setFile(null);
        queryClient.invalidateQueries({ queryKey: ["deposits"] });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <DashboardLayout title="Deposit Funds">
      <div className="space-y-6 animate-fade-in max-w-4xl">
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
                  className={`bg-secondary border-border focus:border-primary h-11 ${errors.amount ? 'border-destructive' : ''}`} min="10" max="100000" step="0.01" disabled={submitting} />
                {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Upload Proof</Label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 h-11 rounded-md border border-dashed border-border bg-secondary cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Choose file</span>
                    <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp" onChange={handleFileChange} disabled={submitting} />
                  </label>
                  {file && <span className="text-xs text-muted-foreground truncate max-w-[120px]">{file.name}</span>}
                </div>
                {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? "Submitting..." : "Submit Deposit"}
            </Button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Deposit History</h3>
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
                {deposits.map((d: any) => (
                  <tr key={d.id} className="border-b border-border/50">
                    <td className="py-3">{new Date(d.created_at).toLocaleDateString()}</td>
                    <td className="py-3 font-semibold">${Number(d.amount).toFixed(2)}</td>
                    <td className="py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
                {deposits.length === 0 && (
                  <tr><td colSpan={3} className="py-6 text-center text-muted-foreground">No deposits yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
