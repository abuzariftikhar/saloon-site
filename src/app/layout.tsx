import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Gentlemen's Barber – Book Your Appointment",
  description:
    "A premium men's barbershop. Book haircuts, beard trims, and grooming services online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {/* ── Navigation ── */}
        <header className="bg-surface border-b border-gray-700 sticky top-0 z-50">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-primary">
              💈 The Gentlemen&apos;s Barber
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/book" className="hover:text-primary transition-colors">
                Book Appointment
              </Link>
              <Link href="/admin" className="hover:text-primary transition-colors">
                Admin
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Main content ── */}
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer className="border-t border-gray-700 py-6 text-center text-sm text-muted">
          © {new Date().getFullYear()}{" "}The Gentlemen&apos;s Barber. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
