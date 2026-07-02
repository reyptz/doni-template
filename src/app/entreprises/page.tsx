import Link from "next/link";
import { Briefcase, Layers, ShieldCheck, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Entreprises | Dɔni",
  description:
    "Formations sur mesure pour les entreprises : développez les compétences de vos équipes avec un accompagnement et des offres dédiées.",
};

const BENEFITS = [
  {
    title: "Programmes flexibles",
    description: "Solutions modulaires adaptées aux besoins spécifiques de vos équipes.",
  },
  {
    title: "Suivi personnalisé",
    description: "Tableaux de bord et rapports d'avancement pour piloter la montée en compétences.",
  },
  {
    title: "Impact mesurable",
    description: "Des parcours conçus pour améliorer la performance et l'engagement.",
  },
];

export default function EntreprisesPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Offres entreprises
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Développez les compétences stratégiques de vos équipes.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Dɔni propose des parcours sur mesure, un accompagnement dédié et des indicateurs clairs pour former vos collaborateurs efficacement.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <h2 className="mb-5 text-3xl font-black text-ink">Accompagnement sur mesure</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Nous construisons avec vous un programme aligné sur votre stratégie, vos outils et vos objectifs de transformation.
            </p>
            <ul className="space-y-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-gold mt-1" />
                <span>Formations sécurisées et conformes aux standards.</span>
              </li>
              <li className="flex items-start gap-3">
                <Layers size={20} className="text-gold mt-1" />
                <span>Modules adaptés aux métiers de l'entreprise.</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp size={20} className="text-gold mt-1" />
                <span>Amélioration mesurable des compétences.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <div className="mb-6 flex items-center gap-3 text-white/80">
              <Briefcase size={24} />
              <p className="uppercase tracking-[0.2em] text-sm font-semibold">Programme entreprise</p>
            </div>
            <p className="mb-6 leading-relaxed text-white/70">
              Nous accompagnons les PME, les grandes entreprises et les institutions dans la montée en compétences digitale, data et produit.
            </p>
            <div className="space-y-4 text-sm text-white/80">
              <div className="rounded-3xl bg-white/10 p-5">Onboarding personnalisé pour vos équipes.</div>
              <div className="rounded-3xl bg-white/10 p-5">Rapports de performance et progression.</div>
              <div className="rounded-3xl bg-white/10 p-5">Ateliers pratiques et cas d'usage réels.</div>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map((item) => (
              <div key={item.title} className="rounded-3xl bg-cream p-6 text-sm text-ink shadow-sm">
                <h3 className="mb-3 font-semibold text-ink">{item.title}</h3>
                <p className="leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Construire une offre entreprise
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
