"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { API_BASE_URL } from "@/config/api";
import { useSearchParams, useRouter } from "next/navigation";


export default function VerifyPage() {
  console.log("📌 VerfifyPage function called");
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const router = useRouter();


  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);

  // Example useEffect for logging
  useEffect(() => {
    console.log("🟢 useEffect called after render");
    if (emailFromUrl) {
      console.log("📨 Email from URL:", emailFromUrl);
      setFormData((prev) => ({ ...prev, email: emailFromUrl }));
      setEmailLocked(true)
    } 
  }, [emailFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`✏️ Input changed: ${e.target.name} = ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();
    console.log("🚀 Form submitted", formData);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("✅ Verification successful. Redirecting ...");
        setMessage("✅ Verification successful! Redirecting ...");
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        const data = await response.json();
        console.log("❌ Verification failed", data);
        setMessage(`❌ Error: ${data.detail || "Failed to verify"}`);
      }
    } catch (err) {
      console.log("⚠️ Network error", err);
      setMessage("⚠️ Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">Verify Page</h1>

        <form
          onSubmit={handleVerify}
          className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-md"
        >
          {["email", "token"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
              readOnly={field === "email" && emailLocked} 
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {message && <p className="text-center mt-4">{message}</p>}

        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </Layout>
  );
}
