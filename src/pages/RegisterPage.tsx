import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authBg from "@/assets/auth-bg.jpg";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", referralCode: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold gold-gradient-text">Create Account</h1>
            <p className="text-muted-foreground">Join Global Trading and start earning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Full Name</Label>
              <Input placeholder="John Doe" value={form.fullName} onChange={e => update("fullName", e.target.value)}
                className="bg-secondary border-border focus:border-primary h-11" required />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)}
                className="bg-secondary border-border focus:border-primary h-11" required />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password}
                  onChange={e => update("password", e.target.value)}
                  className="bg-secondary border-border focus:border-primary h-11 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Referral Code (Optional)</Label>
              <Input placeholder="Enter referral code" value={form.referralCode} onChange={e => update("referralCode", e.target.value)}
                className="bg-secondary border-border focus:border-primary h-11" />
            </div>
            <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img src={authBg} alt="Trading background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold gold-gradient-text">Global Trading</h2>
            <p className="text-foreground/70 max-w-sm">Earn up to 30% through our 5-level referral program.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
