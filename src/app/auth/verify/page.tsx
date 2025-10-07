"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config/api";
import { useRouter } from "next/navigation";


export default function VerifyPage() {
  
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode") || "verify"
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter();


  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let url = "";
      let body: any = { email };

      if (mode === "verify") {
        url = `${API_BASE_URL}/auth/verify_user`;
        body.token = token;
      } else if (mode === "resend") {
        url = `${API_BASE_URL}/auth/resend_verification_code`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Action failed");

      setMessage(data.message || "Success!");
      setTimeout(() => {
          router.push(`/auth/login?email=${formData.email}`);
        }, 1500);
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleAction} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold">
          {mode === "verify" ? "Verify your email" : "Resend verification code"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {mode === "verify" && (
          <input
            type="text"
            placeholder="Verification Code"
            className="border p-2 rounded w-full"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded ${
            mode === "verify" ? "bg-green-600" : "bg-blue-600"
          } text-white`}
        >
          {loading ? "Processing..." : mode === "verify" ? "Verify" : "Resend Code"}
        </button>

        <p className="text-sm text-center mt-2">
          {mode === "verify" ? (
            <>Didn’t get a code? <a href="/auth/verify?mode=resend" className="text-blue-600 hover:underline">Resend</a></>
          ) : (
            <>Already have a code? <a href="/auth/verify?mode=verify" className="text-green-600 hover:underline">Verify</a></>
          )}
        </p>
        <p className="text-sm text-center mt-2">
        	<a href="/auth/login" className="text-green-600 hover:underline">Login</a>
        </p>

        {message && <p className="text-center text-gray-700 mt-3">{message}</p>}
      </form>
    </div>
    </Layout>
  );

}
