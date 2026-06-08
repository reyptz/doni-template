import Link from "next/link";
import { Award, BookOpen, Globe, Heart, Users } from "lucide-react";

export const metadata = {
  title: "Formateurs experts | Dɔni",
  description:
    "Rencontrez nos formateurs professionnels, mentors actifs et experts reconnus qui vous accompagnent tout au long de votre apprentissage.",
};

const INSTRUCTORS = [
  {
    initials: "AB",
    name: "Ahmed Benali",
    specialty: "Intelligence Artificielle",
    company: "MIT · Chercheur IA",
    stats: "24k apprenants",
  },
  {
    initials: "MD",
    name: "Marie Dupont",
    specialty: "Data Science",
    company: "Datacamp · Data Engineer",
    stats: "51k apprenants",
  },
  {
    initials: "LM",
    name: "Lucie Martin",
    specialty: "Design UX/UI",
    company: "Google · Lead Designer",
    stats: "18k apprenants",
  },
  {
    initials: "TL",
    name: "Thomas Leroy",
    specialty: "Cloud & DevOps",
    company: "Amazon · Architecte Solutions",
    stats: "37k apprenants",
  },
];

export default function FormateursPage() {
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
            Chaque formateur combine expertise métier et pédagogie active pour vous aider à progresser rapidement et avec confiance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {INSTRUCTORS.map((instructor) => (
            <article key={instructor.name} className="rounded-[2rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold text-3xl font-black text-ink">
                {instructor.initials}
              </div>
              <h2 className="mb-2 text-xl font-semibold text-ink">{instructor.name}</h2>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{instructor.specialty}</p>
              <p className="mb-5 text-sm leading-relaxed text-muted">{instructor.company}</p>
              <p className="mb-6 text-sm font-semibold text-ink">{instructor.stats}</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90"
              >
                Contacter
              </Link>
            </article>
          ))}
        </div>

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
            <ul className="mt-8 space-y-5 text-sm leading-relaxed">
              <li>✅ Accès direct à des experts du secteur.</li>
              <li>✅ Conseils de carrière et portfolio professionnel.</li>
              <li>✅ Méthodes pédagogiques adaptées à votre profil.</li>
              <li>✅ Certification soutenue par des professionnels.</li>
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
