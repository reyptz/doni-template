import Link from "next/link";
import { Award, CheckCircle, Heart, MessageSquare, Users } from "lucide-react";

export const metadata = {
  title: "Devenir formateur | Dɔni",
  description:
    "Rejoignez la communauté des formateurs Dɔni : partagez votre expertise, créez des formations impactantes et accompagnez des apprenants motivés.",
};

const BENEFITS = [
  "Rémunération attractive par formation.",
  "Support éditorial pour vos modules.",
  "Accès à une communauté d’apprenants engagés.",
  "Visibilité auprès de partenaires et recruteurs.",
];

export default function DevenirFormateurPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Rejoignez-nous
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black text-ink md:text-5xl">
            Partagez votre expertise et formez la prochaine génération.
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Dɔni recherche des spécialistes passionnés pour concevoir et animer des formations professionnelles de haute qualité.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-border bg-white p-10 shadow-sm">
            <h2 className="mb-5 text-3xl font-black text-ink">Pourquoi devenir formateur ?</h2>
            <ul className="space-y-4 text-sm text-muted">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Heart size={20} className="text-gold mt-1" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-ink p-10 text-white shadow-xl">
            <div className="mb-6 flex items-center gap-3 text-white/80">
              <Award size={24} />
              <p className="uppercase tracking-[0.2em] text-sm font-semibold">Votre impact</p>
            </div>
            <p className="mb-6 leading-relaxed text-white/70">
              En rejoignant Dɔni comme formateur, vous contribuez à former des talents capables de résoudre des défis réels. Vous partagez votre savoir-faire et influencez les pratiques professionnelles de demain.
            </p>
            <div className="rounded-3xl bg-white/10 p-5 text-sm">
              <p className="font-semibold text-white">Exemples de profils recherchés :</p>
              <ul className="mt-3 space-y-3 text-white/80">
                <li>• Expert en machine learning</li>
                <li>• Architecte cloud</li>
                <li>• Designer produit</li>
                <li>• Chef de projet digital</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-[2rem] border border-border bg-white p-10 shadow-sm">
          <h2 className="mb-5 text-3xl font-black text-ink">Processus de collaboration</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: "1. Candidature", icon: MessageSquare },
              { label: "2. Validation", icon: CheckCircle },
              { label: "3. Publication", icon: Users },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-cream p-6 text-center text-sm text-ink">
                <item.icon size={28} className="mb-4 text-gold" />
                <p className="font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
            >
              Je souhaite devenir formateur
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
