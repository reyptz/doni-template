"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { elearningApi } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = search.get("identifier");
    const tk = search.get("token");
    if (id) setIdentifier(id);
    if (tk) setToken(tk);
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token || !newPassword || !confirmPassword) {
      setError("Veuillez compléter tous les champs.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await elearningApi.post("/auth/reset-password", { token, newPassword });
      setSubmitted(true);
      setTimeout(() => router.replace("/connexion"), 2500);
    } catch (err: any) {
      setError(err?.message || "Échec de la réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-heading text-3xl font-black text-ink">
          Réinitialiser le mot de passe
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Saisissez le jeton reçu par email et votre nouveau mot de passe.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-2xl sm:px-10 border border-border">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-ink">
                  Jeton de réinitialisation
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckCircle2 className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    id="token"
                    name="token"
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                    placeholder="token"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-ink">
                  Identifiant (email)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ink">
                  Nouveau mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-ink">
                  Confirmer le mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-coral/10 border border-coral/20 p-3 flex items-start gap-3">
                  <AlertCircle size={18} className="text-coral shrink-0 mt-0.5" />
                  <p className="text-sm text-coral">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-ink hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Réinitialisation…</> : "Réinitialiser le mot de passe"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                <CheckCircle2 size={28} className="text-teal" />
              </div>
              <h3 className="font-heading text-lg font-bold text-ink">Mot de passe réinitialisé</h3>
              <p className="mt-2 text-sm text-muted">Vous pouvez maintenant vous connecter.</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/connexion" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-ink transition-colors">
              <ArrowLeft size={16} />
              Retour a la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReinitialiserMotDePasse() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted">Chargement...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
