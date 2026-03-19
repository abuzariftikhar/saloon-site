import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salon Manager – Book Your Appointment",
  description:
    "A modern salon management app. Book appointments online or let our staff schedule for you.",
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
        <header className="bg-surface border-b border-gray-200 sticky top-0 z-50">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-primary">
              ✂️ Salon Manager
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
        <footer className="border-t border-gray-200 py-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Salon Manager. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
