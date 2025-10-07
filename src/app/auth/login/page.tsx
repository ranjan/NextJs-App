"use client";
import Link from "next/link";
import Layout from "../../components/Layout";
import { API_BASE_URL } from "@/config/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const body = { email, password };
  const router = useRouter();
  const { login } = useAuth();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let url = "";
      url = `${API_BASE_URL}/auth/login`;
    
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Login failed");

      if (!data.access_token) throw new Error("No access token returned by server");

      login(data.access_token);

      setMessage(data.message || "Success!");
      login(data.access_token);
      router.push(`/dashboard`);
        
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">Login Page</h1>
        kumar
        {message && <p className="text-center text-sm text-red-500">{message}</p>}

        {loading && <p className="text-center text-blue-500">Logging in...</p>}
        ranjan
        <form  onSubmit={handleLogin} className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-md">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 flex flex-col items-left justify-center">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
          <Link href="/auth/verify?mode=verify" className="text-blue-500 hover:underline">
            Verify
          </Link>
        </p>
      </div>
    </Layout>
  );
}
