"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Shield, CreditCard, ArrowLeft, Check } from "lucide-react";

export default function Checkout() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/tarifs" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted transition-colors hover:bg-cream hover:text-ink">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink">Finaliser votre abonnement</h1>
            <p className="text-sm text-muted">Paiement sécurisé et chiffré</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-10 flex items-center justify-center gap-0">
          {[
            { num: 1, label: "Récapitulatif" },
            { num: 2, label: "Paiement" },
            { num: 3, label: "Confirmation" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  step >= s.num ? "bg-gold text-ink" : "bg-border text-muted"
                }`}>
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span className={`hidden text-sm font-medium sm:block ${step >= s.num ? "text-ink" : "text-muted"}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className={`mx-3 h-px w-12 sm:w-20 ${step > s.num ? "bg-gold" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Colonne principale */}
          <div className="lg:col-span-3 space-y-6">
            {step === 1 && (
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-heading text-lg font-bold text-ink">Votre sélection</h2>
                <div className="rounded-xl bg-ink p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold">Pro Illimité</span>
                      <h3 className="mt-1 font-heading text-xl font-bold text-white">Abonnement mensuel</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-2xl font-black text-white">29 €</span>
                      <span className="text-white/60 text-sm"> / mois</span>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {[
                      "Accès illimité à +1 200 cours",
                      "Certificats reconnus par l'industrie",
                      "Projets guidés avec corrections",
                      "Téléchargement hors-ligne",
                      "Support prioritaire 24/7",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                        <Check size={14} className="text-gold shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full rounded-xl bg-gold px-4 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-yellow-500 active:scale-[0.98] shadow-sm"
                >
                  Continuer vers le paiement
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-heading text-lg font-bold text-ink">Informations de paiement</h2>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Titulaire de la carte</label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      className="w-full rounded-xl border border-border bg-cream/30 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Numéro de carte</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-xl border border-border bg-cream/30 py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Date d'expiration</label>
                      <input
                        type="text"
                        placeholder="MM / AA"
                        className="w-full rounded-xl border border-border bg-cream/30 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Code CVC</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full rounded-xl border border-border bg-cream/30 py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gold px-4 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-yellow-500 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                  >
                    <Lock size={14} /> Payer 29 € de manière sécurisée
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Check size={32} />
                </div>
                <h2 className="mb-2 font-heading text-2xl font-bold text-ink">Paiement confirmé</h2>
                <p className="mb-6 text-sm text-muted">
                  Votre abonnement Pro Illimité est désormais actif. Un email de confirmation a été envoyé à votre adresse.
                </p>
                <div className="mb-8 rounded-xl bg-cream/50 border border-border p-4 text-sm text-left space-y-2">
                  <div className="flex justify-between"><span className="text-muted">Numéro de transaction</span><span className="font-mono font-semibold text-ink">TXN-2026-0603-4821</span></div>
                  <div className="flex justify-between"><span className="text-muted">Montant</span><span className="font-semibold text-ink">29,00 €</span></div>
                  <div className="flex justify-between"><span className="text-muted">Prochain prélèvement</span><span className="font-semibold text-ink">3 juillet 2026</span></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/catalogue" className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-yellow-500">
                    Explorer le catalogue
                  </Link>
                  <Link href="/profil" className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream">
                    Mon profil
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Colonne latérale récapitulatif */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-base font-bold text-ink">Récapitulatif</h3>
              <div className="space-y-3 border-b border-border pb-4 text-sm">
                <div className="flex justify-between"><span className="text-muted">Plan Pro Illimité</span><span className="font-semibold text-ink">29,00 €</span></div>
                <div className="flex justify-between"><span className="text-muted">Taxes (TVA 20%)</span><span className="font-semibold text-ink">5,80 €</span></div>
              </div>
              <div className="flex justify-between pt-4 text-sm">
                <span className="font-bold text-ink">Total</span>
                <span className="font-heading text-lg font-black text-ink">34,80 €</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-muted">
                  <Shield size={14} className="shrink-0 text-teal mt-0.5" />
                  <span>Paiement sécurisé par chiffrement SSL 256 bits</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-muted">
                  <Lock size={14} className="shrink-0 text-teal mt-0.5" />
                  <span>Vos données bancaires ne sont jamais stockées sur nos serveurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
