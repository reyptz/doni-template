"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, BookOpen, Globe, Heart, Users, Check } from "lucide-react";
import { elearningApi } from "@/lib/api";

type Cours = {
  id: number;
  titre: string;
  categorie?: string;
  formateurNom?: string;
  prix?: number;
};

function initials(name?: string): string {
  return (name ?? "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function FormateursPage() {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    elearningApi
      .get<Cours[]>("/cours")
      .then(setCours)
      .catch(() => setCours([]))
      .finally(() => setLoading(false));
  }, []);

  const instructors = Array.from(
    new Set(cours.map((c) => c.formateurNom).filter((f): f is string => Boolean(f)))
  ).slice(0, 8);

  const instructorData = instructors.map((name) => {
    const hisCourses = cours.filter((c) => c.formateurNom === name);
    const categories = Array.from(
      new Set(hisCourses.map((c) => c.categorie).filter((c): c is string => Boolean(c)))
    );
    return {
      name,
      count: hisCourses.length,
      specialty: categories[0] ?? "Formateur Dɔni",
    };
  });

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Nos experts
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Des formateurs de classe mondiale pour accélérer votre carrière.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Découvrez les formateurs réels qui publient des cours sur Dɔni. Chaque expert partage son savoir-faire à travers des formations concrètes.
          </p>
        </div>

        {loading ? (
          <div className="text-sm text-muted">Chargement des formateurs…</div>
        ) : instructorData.length === 0 ? (
          <div className="text-sm text-muted">Aucun formateur disponible pour le moment.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {instructorData.map((instructor) => (
              <article key={instructor.name} className="rounded-[2rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold text-3xl font-black text-ink">
                  {initials(instructor.name)}
                </div>
                <h2 className="mb-2 text-xl font-semibold text-ink">{instructor.name}</h2>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{instructor.specialty}</p>
                <p className="mb-6 text-sm font-semibold text-ink">{instructor.count} cours</p>
                <Link
                  href={`/catalogue?formateur=${encodeURIComponent(instructor.name)}`}
                  className="inline-flex items-center justify-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90"
                >
                  Voir ses cours
                </Link>
              </article>
            ))}
          </div>
        )}

        <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <span className="mb-4 inline-flex rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">
              Accompagnement premium
            </span>
            <h2 className="mb-6 text-3xl font-black text-ink">Une pédagogie humaine et intensive.</h2>
            <p className="mb-6 text-base leading-relaxed text-muted">
              Nos formateurs interviennent en direct lors de sessions live, corrigent vos projets et proposent des retours personnalisés pour accélérer votre montée en compétences.
            </p>
            <div className="grid gap-4 text-sm text-ink">
              <div className="rounded-3xl bg-cream p-5">Mentorat individuel et sessions de coaching.</div>
              <div className="rounded-3xl bg-cream p-5">Retours pratiques sur vos livrables.</div>
              <div className="rounded-3xl bg-cream p-5">Groupes de travail collaboratifs.</div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <div className="flex items-center gap-4 text-white/80">
              <Users size={24} />
              <p className="font-semibold uppercase tracking-[0.2em]">Ce que vous gagnez</p>
            </div>
            <ul className="mt-8 space-y-5 text-sm leading-relaxed text-white/70">
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Accès direct à des experts du secteur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Conseils de carrière et portfolio professionnel.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Méthodes pédagogiques adaptées à votre profil.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Certification soutenue par des professionnels.</span>
              </li>
            </ul>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold">
              <Award size={20} /> Mentor sélectionné par nos partenaires.
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Globe, label: "Couverture mondiale" },
              { icon: BookOpen, label: "Ressources exclusives" },
              { icon: Heart, label: "Approche humaine" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-cream p-6 text-center">
                <item.icon size={28} className="mx-auto mb-4 text-gold" />
                <p className="text-sm font-semibold text-ink">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Rejoindre un cours aujourd'hui
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
