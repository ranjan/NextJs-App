"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Layout from "../components/Layout";


export default function DashboardPage() {
  const { token, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ✅ Only check after rehydration
    if (!loading && !token) {
      router.push("/auth/login");
    }
  }, [token, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!token) return null; // avoid flicker before redirect

  return (
  	<Layout>
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <p>Your token is present ✅</p>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
</Layout>
  );
}
