import Link from "next/link";
import { Building2, Handshake, Globe, ShieldCheck, Star } from "lucide-react";

export const metadata = {
  title: "Partenariats | Dɔni",
  description:
    "Découvrez nos partenariats stratégiques avec des institutions, entreprises et organisations qui soutiennent l'excellence de nos formations.",
};

const PARTNERS = [
  "Université Cheikh Anta Diop",
  "Ecole Polytechnique de Dakar",
  "Institut Pasteur",
  "Banque Mondiale",
  "UNESCO",
  "Microsoft Education",
  "Google for Education",
];

export default function PartenariatsPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Partenariats
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Des alliances solides pour renforcer vos compétences.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Nous collaborons avec des universités, des organisations internationales et des entreprises pour garantir des formations de qualité et des débouchés concrets.
          </p>
        </div>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-white p-10 shadow-sm">
            <h2 className="mb-5 text-3xl font-black text-ink">Un réseau reconnu</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Nos partenaires apportent leur expertise, garantissent l'adéquation des programmes aux besoins du marché et permettent des certifications reconnues.
            </p>
            <ul className="space-y-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-gold mt-1" />
                <span>Standards académiques et professionnels élevés.</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={20} className="text-gold mt-1" />
                <span>Accès à un réseau d'entreprises et de recruteurs.</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={20} className="text-gold mt-1" />
                <span>Visibilité internationale et portée continentale.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <div className="mb-5 flex items-center gap-3 text-white/80">
              <Handshake size={24} />
              <p className="uppercase tracking-[0.2em] text-sm font-semibold">Nos engagements</p>
            </div>
            <p className="mb-6 leading-relaxed text-white/70">
              Travailler avec Doni, c'est construire des synergies durables entre l'éducation, l'innovation et la responsabilité sociale.
            </p>
            <div className="space-y-4 text-sm text-white/80">
              <div className="rounded-3xl bg-white/10 p-5">Développement de programmes sur mesure.</div>
              <div className="rounded-3xl bg-white/10 p-5">Accompagnement des talents et insertion professionnelle.</div>
              <div className="rounded-3xl bg-white/10 p-5">Événements co-brandés et initiatives responsables.</div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-black text-ink">Nos partenaires institutionnels</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div key={partner} className="rounded-3xl border border-border bg-cream p-5 text-sm text-ink shadow-sm">
                <Star size={16} className="mb-3 text-gold" />
                {partner}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Devenir partenaire
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
