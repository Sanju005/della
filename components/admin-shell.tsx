"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/providers", label: "Providers" },
  { href: "/bookings", label: "Bookings" },
  { href: "/services", label: "Services" },
  { href: "/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-6 py-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          DELLA App
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Admin Panel</h1>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Internal starter for operations and service management.
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-white text-ink shadow-lg"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/75">
          <p className="font-medium text-white">Role preview</p>
          <p className="mt-2">IT / Super Admin</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen">
        <aside className="hidden w-80 bg-ink xl:block">{sidebar}</aside>

        {isOpen ? (
          <div className="fixed inset-0 z-40 xl:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink/40"
              onClick={() => setIsOpen(false)}
            />
            <aside className="relative z-10 h-full w-80 max-w-[85vw] bg-ink shadow-2xl">
              {sidebar}
            </aside>
          </div>
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/70 bg-white/75 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate">
                  DELLA Operations
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  Internal Admin Workspace
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm xl:hidden"
                >
                  Menu
                </button>
                <Link
                  href="/login"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm"
                >
                  Log out
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
