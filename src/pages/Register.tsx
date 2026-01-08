import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Optional: Automatically log them in or wait for email confirmation
      // If auto-confirm is on, they are logged in. 
      // But usually signUp returns a session if auto-confirm is on.
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Container className="max-w-md w-full">
          <FadeIn>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm text-center">
              <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Please check your email to confirm your account.
              </p>
              <Link to="/admin/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container className="max-w-md w-full">
        <FadeIn>
          <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  minLength={6}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link to="/admin/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
