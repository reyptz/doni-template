"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <Lock size={40} className="text-gold" />
        </div>
        <h1 className="font-heading text-3xl font-black text-ink">Paiement</h1>
        <p className="mt-3 text-muted">
          Les abonnements payants ne sont pas encore activés. Revenez bientôt ou contactez-nous pour une offre entreprise.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tarifs" className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-yellow-500">
            Voir les tarifs
          </Link>
          <Link href="/contact" className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream">
            Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  );
}
