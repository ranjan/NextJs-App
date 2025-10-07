import Link from "next/link";
import Layout from "../../components/Layout";

export default function LoginPage() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">Login Page</h1>

        <form className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-md">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
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
