import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Linguata App</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <Link href="/contacts" className="hover:text-green-400">Contacts</Link>
          <Link href="/about" className="hover:text-green-400">About</Link>
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-gray-700 text-sm">© {new Date().getFullYear()} My Next.js App</p>
      </footer>
    </div>
  );
}
