"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Monitor,
  BarChart3,
  Palette,
  Brain,
  Smartphone,
  Shield,
  Cloud,
  TrendingUp,
  Clock,
  Star,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";
import { elearningApi } from "@/lib/api";
import { useDoniUser } from "@/lib/session";

/* ----------------------------------------------------------------
   Types & helpers
   ---------------------------------------------------------------- */

type Cours = {
  id: number;
  titre: string;
  description?: string;
  categorie?: string;
  niveau?: string;
  langue?: string;
  imageUrl?: string;
  dureeHeures?: number;
  prix?: number;
  statut?: string;
  formateurNom?: string;
  dateCreation?: string;
};

function formatPrix(prix?: number): string {
  return prix === 0 || prix == null ? "Gratuit" : prix.toLocaleString() + " XOF";
}

function categoryIcon(category?: string) {
  const icons: Record<string, React.ReactNode> = {
    "Développement Web": <Monitor size={28} strokeWidth={1.5} />,
    "Data Science": <BarChart3 size={28} strokeWidth={1.5} />,
    "Design UX/UI": <Palette size={28} strokeWidth={1.5} />,
    "Intelligence Artificielle": <Brain size={28} strokeWidth={1.5} />,
    "Mobile": <Smartphone size={28} strokeWidth={1.5} />,
    "Cybersécurité": <Shield size={28} strokeWidth={1.5} />,
    "Cloud & DevOps": <Cloud size={28} strokeWidth={1.5} />,
    "Marketing Digital": <TrendingUp size={28} strokeWidth={1.5} />,
  };
  return icons[category ?? ""] ?? <Brain size={28} strokeWidth={1.5} />;
}

function categoryGradient(category?: string): string {
  const map: Record<string, string> = {
    "Développement Web": "from-ink to-gray-800",
    "Data Science": "from-teal to-teal-900",
    "Design UX/UI": "from-coral to-red-900",
    "Intelligence Artificielle": "from-purple-600 to-indigo-900",
    "Mobile": "from-blue-600 to-blue-900",
    "Cybersécurité": "from-ink to-gray-900",
    "Cloud & DevOps": "from-sky-600 to-sky-900",
    "Marketing Digital": "from-gold to-yellow-500",
  };
  return map[category ?? ""] ?? "from-ink to-gray-800";
}

function initials(name?: string): string {
  return (name ?? "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function CourseCard({
  c,
  onInscrire,
  inscribing,
}: {
  c: Cours;
  onInscrire: (e: React.MouseEvent, id: number) => void;
  inscribing: number | null;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl">
      <Link href={`/cours/${c.id}`} className="relative block">
        <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${categoryGradient(c.categorie)} text-white`}>
          <div className="text-white/80 transition-transform group-hover:scale-110">
            {categoryIcon(c.categorie)}
          </div>
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {c.niveau ?? "Tous niveaux"}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5 pb-6">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal">{c.categorie ?? "Général"}</div>
        <Link href={`/cours/${c.id}`}>
          <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-gold">
            {c.titre}
          </h3>
        </Link>
        <p className="mb-3.5 text-xs text-muted">
          {c.formateurNom ? `Par ${c.formateurNom}` : "Formateur Dɔni"}
        </p>
        <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Star size={14} className="text-gold" fill="currentColor" /> —
          </span>
          {c.dureeHeures != null && (
            <span className="flex items-center gap-1">
              <Clock size={14} /> {c.dureeHeures}h
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
        <div className="font-heading text-lg font-black text-ink">{formatPrix(c.prix)}</div>
        <button
          onClick={(e) => onInscrire(e, c.id)}
          disabled={inscribing === c.id}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80 disabled:opacity-60"
        >
          {inscribing === c.id ? "…" : "S'inscrire"}
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Page
   ---------------------------------------------------------------- */

export default function Home() {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState(true);
  const [inscribing, setInscribing] = useState<number | null>(null);
  const user = useDoniUser();
  const router = useRouter();

  useEffect(() => {
    elearningApi
      .get<Cours[]>("/cours")
      .then(setCours)
      .catch(() => setCours([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay = `${i * 0.05}s`;
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [cours.length]);

  const categories = Array.from(
    new Set(cours.map((c) => c.categorie).filter((c): c is string => Boolean(c)))
  );
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cours.filter((c) => c.categorie === cat).length;
    return acc;
  }, {});

  const instructors = Array.from(
    new Set(cours.map((c) => c.formateurNom).filter((f): f is string => Boolean(f)))
  ).slice(0, 4);

  const featured = cours.filter((c) => c.statut === "PUBLIE").slice(0, 6);

  async function handleInscrire(e: React.MouseEvent, id: number) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/connexion?next=/catalogue");
      return;
    }
    setInscribing(id);
    try {
      await elearningApi.post("/inscriptions", { apprenantId: user.id, coursId: id });
      toast.success("Inscription réussie !");
    } catch (err: any) {
      toast.error(err?.message || "Impossible de s'inscrire.");
    } finally {
      setInscribing(null);
    }
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] overflow-hidden px-5 py-16 lg:py-24">
        <div className="absolute -top-20 -right-30 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 text-sm font-semibold uppercase tracking-wider text-yellow-700">
              <span className="text-xs">✦</span> Plateforme d'apprentissage en ligne
            </div>
            <h1 className="reveal mb-6 font-heading text-4xl font-black leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
              Maîtrisez les compétences qui façonnent demain
            </h1>
            <p className="reveal mb-9 max-w-xl text-lg font-light leading-relaxed text-muted">
              Des formations conçues par des experts reconnus. Apprenez à votre rythme et obtenez des certifications valorisées.
            </p>
            <div className="reveal flex flex-wrap items-center gap-4" data-delay="3">
              <Link
                href="/catalogue"
                className="inline-flex items-center rounded-xl bg-gold px-6 py-3.5 text-base font-semibold text-ink shadow-[0_4px_14px_rgba(232,168,37,0.3)] transition-all hover:shadow-[0_8px_24px_rgba(232,168,37,0.45)] hover:-translate-y-0.5 active:scale-95"
              >
                Explorer le catalogue
              </Link>
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-transparent px-6 py-3 text-base font-semibold text-ink transition-all hover:border-ink hover:-translate-y-0.5 active:scale-95"
              >
                <Play size={18} /> Créer un compte
              </Link>
            </div>
            <div className="reveal mt-12 flex flex-wrap gap-10 border-t border-border pt-10" data-delay="4">
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">{loading ? "…" : `${cours.length}+`}</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Cours disponibles</span>
              </div>
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">{loading ? "…" : categories.length}</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Disciplines</span>
              </div>
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">{loading ? "…" : `${instructors.length}+`}</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Formateurs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Explorer</span>
            <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Disciplines disponibles</h2>
          </div>
          <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
            Voir le catalogue →
          </Link>
        </div>

        {loading ? (
          <div className="text-sm text-muted">Chargement des disciplines…</div>
        ) : categories.length === 0 ? (
          <div className="text-sm text-muted">Aucune discipline pour le moment.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
            {categories.map((cat, i) => (
              <Link
                key={cat}
                href={`/catalogue?categorie=${encodeURIComponent(cat)}`}
                className="reveal group rounded-2xl border-2 border-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg"
                data-delay={i % 4}
              >
                <div className="mb-3 text-ink transition-transform group-hover:scale-110 group-hover:text-gold">
                  {categoryIcon(cat)}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-ink">{cat}</h3>
                <p className="text-xs text-muted">{categoryCounts[cat]} cours</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ═══ COURS POPULAIRES ═══ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Cours</span>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Cours disponibles</h2>
            </div>
            <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
              Tous les cours →
            </Link>
          </div>

          {loading ? (
            <div className="text-sm text-muted">Chargement des cours…</div>
          ) : featured.length === 0 ? (
            <div className="text-sm text-muted">Aucun cours publié pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((c, i) => (
                <div key={c.id} className="reveal" data-delay={i % 3}>
                  <CourseCard c={c} onInscrire={handleInscrire} inscribing={inscribing} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ FORMATEURS ═══ */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Experts</span>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Nos formateurs</h2>
            </div>
            <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
              Explorer leurs cours →
            </Link>
          </div>

          {loading ? (
            <div className="text-sm text-muted">Chargement…</div>
          ) : instructors.length === 0 ? (
            <div className="text-sm text-muted">Aucun formateur pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {instructors.map((name, i) => (
                <div
                  key={name}
                  className="reveal rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
                  data-delay={i % 4}
                >
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ink to-gray-800 font-heading text-2xl font-black text-white">
                    {initials(name)}
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-ink">{name}</h3>
                  <p className="mb-4 text-xs text-muted">Formateur Dɔni</p>
                  <div className="flex justify-center gap-4">
                    <div>
                      <strong className="block text-sm font-bold text-ink">
                        {cours.filter((c) => c.formateurNom === name).length}
                      </strong>
                      <span className="text-[10px] uppercase text-muted">cours</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold to-[#f5c842] p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_width=%2260%22_height=%2260%22_viewBox=%220_0_60_60%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22none%22_fill-rule=%22evenodd%22%3E%3Cg_fill=%22%23000000%22_fill-opacity=%220.04%22%3E%3Cpath_d=%22M36_34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6_34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6_4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none" />
          <h2 className="relative z-10 mb-4 font-heading text-3xl font-black text-ink md:text-5xl">Commencez à apprendre dès aujourd'hui</h2>
          <p className="relative z-10 mx-auto mb-8 max-w-xl text-base text-ink/70">Inscrivez-vous gratuitement et accédez à l'ensemble du catalogue de cours.</p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-ink/90 hover:-translate-y-0.5 active:scale-95">Créer mon compte gratuit</Link>
            <Link href="/catalogue" className="rounded-xl border-2 border-ink/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink hover:-translate-y-0.5 active:scale-95">Explorer le catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
