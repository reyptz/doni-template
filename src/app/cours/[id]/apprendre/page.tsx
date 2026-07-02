"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { elearningApi } from "@/lib/api";
import { ChevronLeft, PlayCircle } from "lucide-react";

/* ----------------------------------------------------------------
   Types
   ---------------------------------------------------------------- */

type Cours = {
  id: number;
  titre: string;
  description?: string;
  formateurNom?: string;
  dureeHeures?: number;
  niveau?: string;
  categorie?: string;
};

/* ----------------------------------------------------------------
   Composant principal
   ---------------------------------------------------------------- */

export default function ApprendreCoursPage() {
  const params = useParams();
  const id = params.id as string;
  const [cours, setCours] = useState<Cours | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    elearningApi.get<Cours>("/cours/" + id)
      .then(setCours)
      .catch(() => setCours(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-cream">
      {/* Barre supérieure */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-white px-4 sm:px-6 z-20">
        <Link
          href="/profil"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-cream hover:text-ink"
          aria-label="Retour au profil"
        >
          <ChevronLeft size={20} />
        </Link>
        <div className="hidden sm:block h-5 w-px bg-border" />
        <div className="min-w-0">
          <h1 className="truncate font-heading text-sm font-bold text-ink sm:text-base">
            {loading ? "Chargement…" : (cours?.titre ?? "Cours")}
          </h1>
          {cours?.formateurNom && (
            <p className="text-xs text-muted">{cours.formateurNom}</p>
          )}
        </div>
      </header>

      {/* Zone principale */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
            <PlayCircle size={40} className="text-gold" />
          </div>
          <h2 className="mb-2 font-heading text-2xl font-bold text-ink">
            Contenu en cours de préparation
          </h2>
          <p className="max-w-md text-sm text-muted">
            Le contenu pédagogique de ce cours n’est pas encore disponible. Revenez bientôt ou contactez le support pour plus d’informations.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold/90"
          >
            Contacter le support
          </Link>
        </div>
      </main>
    </div>
  );
}
