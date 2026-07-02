"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "@/lib/api";
import { setDoniUser, useDoniUser } from "@/lib/session";
import { Suspense } from "react";

function ConnexionForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const next         = searchParams.get("next") ?? "/catalogue";
  const registered   = searchParams.get("registered") === "1";
  const existingUser = useDoniUser();

  useEffect(() => {
    if (!existingUser) return;
    const role = existingUser.role?.toUpperCase();
    const isStaff = role === "ADMIN" || role === "FORMATEUR" || role === "INSTRUCTOR";
    router.replace(isStaff ? "/admin" : role === "APPRENANT" ? "/profil" : next);
  }, [existingUser, router, next]);

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const canSubmit = email.trim() && password.length >= 6 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    try {
      const res = await login(email.trim(), password);
      setDoniUser({ id: res.id, username: res.username, email: res.email, role: res.role });
      const role = res.role?.toUpperCase();
      const isStaff = role === "ADMIN" || role === "FORMATEUR" || role === "INSTRUCTOR";
      const redirectTo = isStaff ? "/admin" : role === "APPRENANT" ? "/profil" : next;
      router.replace(redirectTo);
    } catch (err: any) {
      setError(err?.message || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-heading text-3xl font-black text-ink">
          Heureux de vous revoir
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Ou{" "}
          <Link href="/inscription" className="font-semibold text-gold hover:text-yellow-600 transition-colors">
            créez un compte gratuitement
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-2xl sm:px-10 border border-border">
          {registered && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              Compte créé ! Connectez-vous pour commencer.
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-ink cursor-pointer">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <Link href="/mot-de-passe-oublie" className="font-semibold text-coral hover:text-red-500 transition-colors">
                  Mot de passe oublie ?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-ink hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion…" : <><span>Se connecter</span><ArrowRight size={16} /></>}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default function Connexion() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Chargement...</div>}>
      <ConnexionForm />
    </Suspense>
  );
}
