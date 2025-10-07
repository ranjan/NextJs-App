import Link from "next/link";
import Layout from "./components/Layout";

const LINKS = [
  { href: "/auth/login", label: "Login", type: "auth" },
  { href: "/auth/register", label: "Register", type: "auth" },
  { href: "/users", label: "User List", type: "data" },
];

export default function HomePage() {
  return (
    <Layout>
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">Welcome to My App!</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          You are not logged in. Use the links below to navigate — they are rendered
          dynamically from a simple array so it's easy to add/remove items later.
        </p>

        {/* Dynamic links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          {
            
            LINKS.map((link) => {
              const btnClass =
              "px-6 py-3 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
            const variantClass =
              link.type === "auth"
                ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300"
                : "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-300";


            return(
              <Link
                key={link.href}
                href={link.href}
                className={`${btnClass} ${variantClass}`}
              >
                {link.label}
              </Link>
              );
            })
          }
          
          
        </div>
      </div>
    </Layout>
  );
}
