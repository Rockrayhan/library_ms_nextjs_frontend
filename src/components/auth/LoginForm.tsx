"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
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

      await axios.post("/auth/login", { email, password });

      toast.success("Login successful");
      router.push("/dashboard/user");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleLogin}
      className="w-full max-w-sm border rounded-lg p-6 shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <div className="space-y-4">

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

        <div className="underline py-2 text-center">
          <Link href="/register"> New user ? Please Register </Link>
        </div>
      </div>
    </form>
  );
}
