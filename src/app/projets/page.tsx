import Link from "next/link";
import { Briefcase, Flag, Layers, Monitor, Rocket } from "lucide-react";

export const metadata = {
  title: "Projets pratiques | Dɔni",
  description:
    "Réalisez des projets métiers concrets pour enrichir votre portfolio et démontrer vos compétences face aux recruteurs.",
};

const PROJECTS = [
  {
    title: "Plateforme d'analyse de données",
    description: "Créez un tableau de bord interactif pour des indicateurs business en temps réel.",
    icon: Monitor,
  },
  {
    title: "Application mobile complète",
    description: "Développez une app cross-platform avec authentification, base de données et UI moderne.",
    icon: Rocket,
  },
  {
    title: "Design de produit digital",
    description: "Prototypage d'un service utilisateur avec architecture UX, wireframes et tests.",
    icon: Layers,
  },
  {
    title: "Déploiement cloud sécurisé",
    description: "Mettez en place une stack DevOps avec CI/CD, surveillance et scalabilité.",
    icon: Flag,
  },
];

export default function ProjetsPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Projets réels
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Construisez des projets concrets, pas des exercices abstraits.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Chaque parcours intègre des projets applicables immédiatement dans votre carrière, avec des livrables à présenter aux employeurs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="rounded-[2rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/15 text-gold">
                <project.icon size={28} />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-ink">{project.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <h2 className="mb-6 text-3xl font-black">Pourquoi nos projets font la différence ?</h2>
            <ul className="space-y-5 text-sm leading-relaxed text-white/70">
              <li>✅ Alignés sur des besoins de marché réels.</li>
              <li>✅ Accompagnés par un coach formateur.</li>
              <li>✅ Inclus des retours personnalisés.</li>
              <li>✅ Livrables qualitatifs pour votre portfolio.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-10 shadow-sm">
            <h3 className="mb-5 text-2xl font-bold text-ink">Typologie de projets</h3>
            <div className="space-y-4 text-sm text-muted">
              <div className="rounded-3xl bg-cream p-5">Projets data : analyse, visualisation, IA.</div>
              <div className="rounded-3xl bg-cream p-5">Projets techniques : application web, API, cloud.</div>
              <div className="rounded-3xl bg-cream p-5">Projets design : expérience utilisateur, branding, prototype.</div>
            </div>
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
          >
            Découvrir les parcours projets
          </Link>
        </div>
      </div>
    </div>
  );
}
