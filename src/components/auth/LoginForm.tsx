"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful");
      router.push("/dashboard/user");
      router.refresh(); // Refresh to trigger middleware
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm border rounded-lg p-6 shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2">Login</h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* DEMO LOGIN BUTTONS */}
      <div className="flex md:flex-row flex-col gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setEmail("demouser@gmail.com");
            setPassword("123456789");
            toast.message("Demo User credentials inserted");
          }}
        >
          Demo User Login
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setEmail("admin@gmail.com");
            setPassword("123456789");
            toast.message("Demo Admin credentials inserted");
          }}
        >
          Demo Admin Login
        </Button>
      </div>

      <div className="underline py-2 text-center">
        <Link href="/register">New user? Register here</Link>
      </div>
    </form>
  );
}