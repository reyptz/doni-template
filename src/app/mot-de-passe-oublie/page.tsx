"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-heading text-3xl font-black text-ink">
          Recuperation de mot de passe
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Saisissez votre adresse email. Nous vous enverrons un lien pour
          reinitialiser votre mot de passe.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-2xl sm:px-10 border border-border">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink"
                >
                  Adresse email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className="h-5 w-5 text-muted"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-coral/10 border border-coral/20 p-3 flex items-start gap-3">
                  <AlertCircle
                    size={18}
                    className="text-coral shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-coral">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-ink hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink transition-all active:scale-[0.98]"
                >
                  Envoyer le lien de reinitialisation
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                <CheckCircle2 size={28} className="text-teal" />
              </div>
              <h3 className="font-heading text-lg font-bold text-ink">
                Email envoye
              </h3>
              <p className="mt-2 text-sm text-muted">
                Si un compte est associe a{" "}
                <span className="font-semibold text-ink">{email}</span>, vous
                recevrez un lien de reinitialisation sous peu. Ce lien est
                valable pendant 30 minutes.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/connexion"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} />
              Retour a la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
