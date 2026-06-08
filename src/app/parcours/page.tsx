import Link from "next/link";
import { Award, BarChart3, Cloud, LayoutList, Sparkles, Users } from "lucide-react";

export const metadata = {
  title: "Parcours de formation | Dɔni",
  description:
    "Découvrez nos parcours guidés conçus pour vous mener de l'initiation à l'expertise dans les domaines du digital, de l'IA, du cloud et du design.",
};

const STEPS = [
  {
    name: "Data Science & IA",
    description:
      "Un programme complet avec Python, machine learning et projets concrets pour transformer vos données en valeur business.",
    icon: BarChart3,
  },
  {
    name: "Développement Web",
    description:
      "Frontend, backend et architecture cloud : un parcours intensif pour devenir un développeur full stack performant.",
    icon: LayoutList,
  },
  {
    name: "Design UX/UI",
    description:
      "Créez des interfaces inclusives et engageantes grâce à un accompagnement pratique orienté utilisateur.",
    icon: Sparkles,
  },
  {
    name: "Cloud & DevOps",
    description:
      "Maîtrisez les environnements cloud, l'automatisation et la sécurité pour piloter des infrastructures modernes.",
    icon: Cloud,
  },
];

export default function ParcoursPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Parcours guidés
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Des parcours structurés pour devenir expert en 90 jours.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Chaque parcours combine des cours vidéo, des ateliers pratiques, des projets réels et un mentorat personnalisé pour garantir votre progression.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.name}
              className="rounded-[2rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/15 text-gold">
                <step.icon size={28} />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-ink">{step.name}</h2>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>

        <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Parcours premium
            </span>
            <h2 className="mb-6 text-3xl font-black leading-tight">De la découverte au projet certifiant.</h2>
            <p className="mb-8 text-base leading-relaxed text-white/70">
              Nos parcours sont construits autour d'objectifs clairs, de points de contrôle réguliers et d'un projet final destiné à renforcer votre portfolio.
            </p>
            <div className="space-y-4 text-sm text-white/70">
              <p>✅ Évaluations personnalisées</p>
              <p>✅ Soutien par un mentor dédié</p>
              <p>✅ Projets concrets alignés aux attentes des recruteurs</p>
              <p>✅ Certification reconnue en fin de parcours</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-10 shadow-sm">
            <h3 className="mb-5 text-2xl font-bold text-ink">Comment se déroule un parcours ?</h3>
            <ol className="space-y-5 text-sm text-muted">
              <li className="rounded-3xl border border-border bg-cream p-5">
                <strong className="block mb-2 text-ink">1. Évaluation initiale</strong>
                Nous adaptons le parcours à votre niveau et à votre objectif professionnel.
              </li>
              <li className="rounded-3xl border border-border bg-cream p-5">
                <strong className="block mb-2 text-ink">2. Modules progressifs</strong>
                Un apprentissage pas à pas avec des exercices pratiques et des masterclasses.
              </li>
              <li className="rounded-3xl border border-border bg-cream p-5">
                <strong className="block mb-2 text-ink">3. Projet capstone</strong>
                Réalisez un projet métier complet, idéal pour votre portfolio.
              </li>
              <li className="rounded-3xl border border-border bg-cream p-5">
                <strong className="block mb-2 text-ink">4. Certification</strong>
                Validez vos acquis avec un certificat reconnu par nos partenaires.
              </li>
            </ol>
            <Link
              href="/catalogue"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Explorer les parcours maintenant
            </Link>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Pourquoi choisir Dɔni ?</p>
              <h2 className="mt-4 text-3xl font-black text-ink">Une expérience d'apprentissage immersive et reconnue.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:gap-6">
              {[
                "Certifications reconnues",
                "Accès aux projets réels",
                "Support mentorat premium",
                "Suivi personnalisé",
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-cream p-5 text-sm text-ink shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
