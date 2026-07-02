"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { useDoniUser, clearDoniUser } from "@/lib/session";
import { logout } from "@/lib/api";

/* ----------------------------------------------------------------
   Donnees de navigation
   ---------------------------------------------------------------- */

const navLinks = [
  { id: "nav-catalogue", label: "Catalogue", href: "/catalogue" },
  { id: "nav-parcours", label: "Parcours", href: "/parcours" },
  { id: "nav-formateurs", label: "Formateurs", href: "/formateurs" },
  { id: "nav-forum", label: "Communauté", href: "/forum" },
  { id: "nav-tarifs", label: "Tarifs", href: "/tarifs" },
];

/* ----------------------------------------------------------------
   Composant Header
   ---------------------------------------------------------------- */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useDoniUser();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const isStaff = user?.role === "ADMIN" || user?.role === "FORMATEUR" || user?.role === "INSTRUCTOR";
  const dashboardHref = isStaff ? "/admin" : "/profil";
  const dashboardLabel = isStaff ? "Dashboard" : "Mon espace";

  async function handleLogout() {
    await logout();
    clearDoniUser();
    router.replace("/");
  }

  /* Detection du defilement */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Verrouillage du defilement quand menu mobile ouvert */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      id="header-principal"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-xl shadow-soft border-b border-border"
          : "bg-cream/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* ---- Logo ---- */}
          <Link
            id="header-logo"
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Dɔni — Accueil"
          >
            <span className="font-heading text-2xl font-black tracking-tight text-ink transition-colors group-hover:text-gold">
              Dɔni
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold border border-gold/20">
              Formation
            </span>
          </Link>

          {/* ---- Navigation desktop ---- */}
          <nav
            id="nav-desktop"
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                id={link.id}
                href={link.href}
                className="relative px-3.5 py-2 text-sm font-medium text-ink/70 rounded-lg transition-colors duration-200 hover:text-ink hover:bg-ink/[0.04]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ---- Actions desktop ---- */}
          <div id="header-actions" className="hidden lg:flex items-center gap-3">
            {mounted && user ? (
              <>
                <Link
                  id="btn-dashboard"
                  href={dashboardHref}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink/80 rounded-lg transition-all duration-200 hover:text-ink hover:bg-ink/[0.04]"
                >
                  <User size={16} />
                  {dashboardLabel}
                </Link>
                <button
                  id="btn-deconnexion"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-coral rounded-lg transition-all duration-200 hover:bg-coral/10"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  id="btn-connexion"
                  href="/connexion"
                  className="px-4 py-2 text-sm font-medium text-ink/80 rounded-lg transition-all duration-200 hover:text-ink hover:bg-ink/[0.04]"
                >
                  Se connecter
                </Link>
                <Link
                  id="btn-inscription"
                  href="/inscription"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-ink bg-gold rounded-lg shadow-sm transition-all duration-200 hover:bg-gold/90 hover:shadow-medium active:scale-[0.98]"
                >
                  Commencer gratuitement
                </Link>
              </>
            )}
          </div>

          {/* ---- Bouton menu mobile ---- */}
          <button
            id="btn-menu-mobile"
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-ink/70 transition-colors hover:text-ink hover:bg-ink/[0.06]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* ---- Menu mobile ---- */}
      <div
        id="menu-mobile"
        className={`lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-cream transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className="flex flex-col px-5 pt-6 pb-8 space-y-1"
          aria-label="Navigation mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.id}`}
              id={`mobile-${link.id}`}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-4 py-3.5 text-base font-medium text-ink/80 rounded-xl transition-colors hover:text-ink hover:bg-ink/[0.04]"
            >
              {link.label}
            </Link>
          ))}

          {/* Separateur */}
          <div className="my-4 border-t border-border" aria-hidden="true" />

          {/* Actions mobile */}
          {mounted && user ? (
            <>
              <Link
                id="mobile-btn-dashboard"
                href={dashboardHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-ink bg-gold rounded-xl shadow-sm transition-all duration-200 hover:bg-gold/90 active:scale-[0.98]"
              >
                <User size={18} />
                {dashboardLabel}
              </Link>
              <button
                id="mobile-btn-deconnexion"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-coral rounded-xl border border-border transition-colors hover:bg-coral/10"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                id="mobile-btn-connexion"
                href="/connexion"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-base font-medium text-ink/80 rounded-xl border border-border transition-colors hover:bg-ink/[0.04]"
              >
                Se connecter
              </Link>
              <Link
                id="mobile-btn-inscription"
                href="/inscription"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3.5 text-base font-semibold text-ink bg-gold rounded-xl shadow-sm transition-all duration-200 hover:bg-gold/90 active:scale-[0.98]"
              >
                Commencer gratuitement
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
