"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/src/lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") || "").trim();
      const password = String(form.get("password") || "").trim();
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      const data = await AuthAPI.login(email, password);
      if (data?.token) {
        localStorage.setItem("upr_token", data.token);
        localStorage.setItem("upr_user", JSON.stringify({ id: data._id, name: data.name, email: data.email, role: data.role }));
      }
      // Redirect based on role if present
      const role = data?.role as string | undefined;
      if (role === "doctor") router.push("/appointments");
      else if (role === "admin") router.push("/appointments");
      else router.push("/appointments");
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md card card-body">
        <h1 className="text-2xl font-semibold mb-1" style={{ color: "#1599de" }}>Welcome back</h1>
        <p className="text-sm text-gray-600 mb-6">Sign in to Unity Physio Rehab</p>
        {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm p-2">{error}</div>}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" className="input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input name="password" type="password" className="input" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-70">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          No account? <Link href="/register" className="text-[#1599de] hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}


