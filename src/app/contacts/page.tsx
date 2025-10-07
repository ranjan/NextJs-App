import Layout from "../components/Layout";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Contacts Page (Coming Soon)</h1>
        <Link
          href="/"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
        >
          Home
        </Link>
      </div>
    </Layout>
  );
}
