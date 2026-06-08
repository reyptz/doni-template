"use client";

import Link from "next/link";
import { Check, Info } from "lucide-react";

export default function Tarifs() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-gold">Tarification</span>
          <h1 className="mb-4 font-heading text-4xl font-black text-ink md:text-5xl">
            Investissez dans votre avenir
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Choisissez le plan qui correspond à vos objectifs d'apprentissage. Sans engagement, annulez à tout moment.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          
          {/* Plan Basique */}
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <h2 className="mb-2 font-heading text-2xl font-bold text-ink">Gratuit</h2>
            <p className="mb-6 text-sm text-muted">Pour découvrir la plateforme et acquérir les bases.</p>
            <div className="mb-8">
              <span className="font-heading text-4xl font-black text-ink">0 €</span>
              <span className="text-muted"> / mois</span>
            </div>
            <Link href="/inscription" className="mb-8 flex w-full justify-center rounded-xl border-2 border-border bg-transparent px-4 py-3 font-semibold text-ink transition-colors hover:border-ink">
              Commencer gratuitement
            </Link>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-ink">Ce qui est inclus :</p>
              <ul className="space-y-3">
                {[
                  "Accès à plus de 50 cours d'introduction",
                  "Exercices pratiques de base",
                  "Accès aux forums communautaires",
                  "Profil apprenant standard"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <Check size={18} className="text-teal shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan Pro */}
          <div className="relative rounded-3xl border-2 border-gold bg-ink p-8 shadow-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              Recommandé
            </div>
            <h2 className="mb-2 font-heading text-2xl font-bold text-white">Pro Illimité</h2>
            <p className="mb-6 text-sm text-white/60">Pour les professionnels cherchant à maîtriser de nouvelles compétences.</p>
            <div className="mb-8">
              <span className="font-heading text-4xl font-black text-white">29 €</span>
              <span className="text-white/60"> / mois</span>
            </div>
            <Link href="/checkout" className="mb-8 flex w-full justify-center rounded-xl bg-gold px-4 py-3 font-semibold text-ink transition-colors hover:bg-yellow-500 shadow-[0_4px_14px_rgba(232,168,37,0.3)]">
              S'abonner maintenant
            </Link>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-white">Tout du plan Gratuit, plus :</p>
              <ul className="space-y-3">
                {[
                  "Accès illimité à l'intégralité du catalogue (+1200 cours)",
                  "Certificats de réussite reconnus par l'industrie",
                  "Projets guidés et corrections personnalisées",
                  "Téléchargement des cours pour un accès hors-ligne",
                  "Support prioritaire 24/7"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <Check size={18} className="text-gold shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Info Box */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-cream/50 border border-border p-6 flex gap-4">
          <Info size={24} className="text-muted shrink-0" />
          <div>
            <h3 className="font-semibold text-ink text-sm">Vous représentez une entreprise ou une institution ?</h3>
            <p className="mt-1 text-sm text-muted">Découvrez nos offres sur mesure pour former vos équipes avec des tableaux de bord dédiés et un accompagnement personnalisé. <Link href="/contact" className="text-gold font-semibold hover:underline">Contactez notre équipe de vente</Link>.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
