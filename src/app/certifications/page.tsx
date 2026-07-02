import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, Star } from "lucide-react";

export const metadata = {
  title: "Certifications reconnues | Dɔni",
  description:
    "Obtenez des certifications reconnues sur le marché, validant vos compétences et renforçant votre employabilité.",
};

const CERTS = [
  {
    title: "Certificat Data Science",
    description: "Analyse de données, machine learning et visualisation métier pour des décisions stratégiques.",
  },
  {
    title: "Certificat Développeur Web",
    description: "Maîtrisez les meilleures pratiques frontend et backend pour des applications performantes.",
  },
  {
    title: "Certificat Design UX/UI",
    description: "Design centré utilisateur, prototypage et optimisation des interfaces pour des expériences mémorables.",
  },
  {
    title: "Certificat Cloud et DevOps",
    description: "Déploiement sécurisé, infrastructure as code et automatisation des flux de production.",
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Reconnaissance professionnelle
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Des certifications qui parlent aux recruteurs.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Validez vos compétences auprès des entreprises grâce à des programmes certifiants alignés aux besoins du marché.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((cert) => (
            <article key={cert.title} className="rounded-[2rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/15 text-gold">
                <Award size={28} />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-ink">{cert.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{cert.description}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-black text-ink">Pourquoi nos certifications sont importantes ?</h2>
              <ul className="space-y-5 text-sm text-muted">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold" />
                  <span>Reconnaissance par des entreprises partenaires et des recruteurs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={20} className="text-gold" />
                  <span>Contrôle de qualité rigoureux basé sur des compétences réelles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-gold" />
                  <span>Badge numérique partageable sur LinkedIn et votre CV.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
              <p className="mb-4 uppercase tracking-[0.24em] text-gold/80 text-xs">Certification complète</p>
              <h3 className="mb-5 text-3xl font-black">Un parcours validé par des experts métiers.</h3>
              <p className="leading-relaxed text-white/70">
                Nos certifications sont conçues avec nos partenaires professionnels pour garantir une montée en compétences parfaitement alignée aux exigences du marché.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-border bg-cream p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3">
            {["Rapide à obtenir", "Projet final réel", "Badge vérifié"].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-6 text-sm text-ink shadow-sm">
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Obtenir ma certification
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
