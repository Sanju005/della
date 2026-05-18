"use client";

import clsx from "clsx";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  formatPortalRole,
  normalizePortalRole,
  resolvePortalAccess,
  type PortalProfile,
} from "@/lib/supabase/auth";
import { getSupabaseClient } from "@/lib/supabase/client";

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
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<PortalProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) {
        return;
      }

      if (!data.session) {
        setSession(null);
        setProfile(null);
        setIsAuthLoading(false);
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const access = await resolvePortalAccess(supabase, data.session.user);
      if (!isMounted) {
        return;
      }

      if (!access.ok) {
        setSession(null);
        setProfile(null);
        setIsAuthLoading(false);
        void supabase.auth.signOut();
        router.replace(`/login?denied=${access.reason}`);
        return;
      }

      setSession(data.session);
      setProfile(access.profile);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      if (!nextSession) {
        setSession(null);
        setProfile(null);
        setIsAuthLoading(false);
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const access = await resolvePortalAccess(supabase, nextSession.user);
      if (!isMounted) {
        return;
      }

      if (!access.ok) {
        setSession(null);
        setProfile(null);
        setIsAuthLoading(false);
        void supabase.auth.signOut();
        router.replace(`/login?denied=${access.reason}`);
        return;
      }

      setSession(nextSession);
      setProfile(access.profile);
      setIsAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase]);

  async function handleLogout() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    router.replace("/login");
    setIsSigningOut(false);
  }

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
          <p className="font-medium text-white">Signed in</p>
          <p className="mt-2 break-all text-xs text-white/70">
            {session?.user.email ?? "Authenticated admin"}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/60">
            {formatPortalRole(normalizePortalRole(profile?.role)) ??
              "Internal role"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isSigningOut}
          className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? "Signing out..." : "Log out"}
        </button>
      </div>
    </div>
  );

  if (isAuthLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="rounded-3xl border border-white/70 bg-white/90 px-6 py-5 text-sm text-slate shadow-card">
          Checking your session...
        </div>
      </div>
    );
  }

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
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isSigningOut}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningOut ? "Signing out..." : "Log out"}
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
