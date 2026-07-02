"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Clock, Star, Bookmark, PlayCircle } from "lucide-react";
import toast from "react-hot-toast";
import { elearningApi } from "@/lib/api";
import { useDoniUser } from "@/lib/session";

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

const CAT_GRADIENT: Record<string, string> = {
  "Intelligence Artificielle": "from-ink to-gray-800",
  "Data Science": "from-teal to-teal-900",
  "Design UX/UI": "from-coral to-red-900",
  "Mobile": "from-purple-600 to-indigo-900",
  "Cloud & DevOps": "from-blue-600 to-blue-900",
  "Cybersécurité": "from-gray-700 to-black",
  "Développement Web": "from-emerald-600 to-emerald-900",
};

const NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"];

function niveauBadgeClass(niveau?: string) {
  switch (niveau) {
    case "Débutant": return "bg-teal/10 text-teal";
    case "Intermédiaire": return "bg-gold/15 text-yellow-700";
    case "Avancé": return "bg-coral/10 text-coral";
    default: return "bg-ink/5 text-muted";
  }
}

export default function Catalogue() {
  const router = useRouter();
  const user = useDoniUser();

  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [activeNiveau, setActiveNiveau] = useState<string[]>([]);
  const [inscribing, setInscribing] = useState<number | null>(null);

  useEffect(() => {
    elearningApi.get<Cours[]>("/cours")
      .then(r => setCours(Array.isArray(r) ? r : []))
      .catch(() => setCours([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Toutes", ...Array.from(new Set(cours.map(c => c.categorie ?? "Autre").filter(Boolean)))];

  const filtered = cours.filter(c => {
    const matchSearch = !search
      || c.titre.toLowerCase().includes(search.toLowerCase())
      || (c.categorie ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Toutes" || c.categorie === activeCategory;
    const matchNiveau = activeNiveau.length === 0 || activeNiveau.includes(c.niveau ?? "");
    return matchSearch && matchCat && matchNiveau && c.statut !== "ARCHIVE";
  });

  function toggleNiveau(n: string) {
    setActiveNiveau(prev =>
      prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]
    );
  }

  async function handleInscrire(c: Cours) {
    if (!user) {
      router.push("/connexion?next=/catalogue");
      return;
    }
    setInscribing(c.id);
    try {
      await elearningApi.post("/inscriptions", { apprenantId: user.id, coursId: c.id });
      toast.success("Inscrit !");
    } catch (err: any) {
      const msg = err?.message ?? "";
      if (msg.toLowerCase().includes("déjà") || msg.toLowerCase().includes("already") || msg.includes("409")) {
        toast.error("Vous êtes déjà inscrit à ce cours.");
      } else {
        toast.error("Erreur lors de l'inscription.");
      }
    } finally {
      setInscribing(null);
    }
  }

  function formatPrix(prix?: number) {
    return prix === 0 || prix == null ? "Gratuit" : prix.toLocaleString() + " XOF";
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="mb-4 font-heading text-3xl font-black text-ink md:text-5xl">Catalogue des formations</h1>
          <p className="text-lg text-muted">Trouvez la formation idéale pour propulser votre carrière.</p>
        </div>

        {/* Search bar */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl bg-white p-4 shadow-sm border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Rechercher une compétence, un outil, un métier..."
              className="w-full rounded-xl bg-cream/50 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-gold"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 md:flex-row">

          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="mb-4 font-heading text-lg font-bold text-ink">Catégories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeCategory === cat ? "bg-gold/10 font-bold text-gold" : "text-muted hover:bg-cream hover:text-ink"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="mb-4 mt-8 font-heading text-lg font-bold text-ink">Niveau</h3>
              <div className="space-y-3 text-sm text-muted">
                {NIVEAUX.map(n => (
                  <label key={n} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeNiveau.includes(n)}
                      onChange={() => toggleNiveau(n)}
                      className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                    />
                    {n}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted">
                Affichage de {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
              </span>
              <select className="rounded-lg border border-border bg-white py-2 pl-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-gold">
                <option>Les plus pertinents</option>
                <option>Mieux notés</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
              </select>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted">
                <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-border border-t-gold" />
                <p className="text-sm">Chargement des formations...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white py-24 text-muted">
                <BookOpen size={40} className="mb-4 opacity-30" />
                <p className="text-sm">Aucune formation trouvée.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(c => {
                  const gradient = CAT_GRADIENT[c.categorie ?? ""] ?? "from-ink to-gray-800";
                  const prixLabel = formatPrix(c.prix);
                  const isGratuit = prixLabel === "Gratuit";
                  const isEnrolling = inscribing === c.id;

                  return (
                    <div key={c.id} className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl">
                      <Link href={`/cours/${c.id}`}>
                        <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient} text-white`}>
                          <BookOpen size={40} strokeWidth={1} className="opacity-80 transition-transform group-hover:scale-110" />
                          {c.niveau && (
                            <span className={`absolute left-3.5 top-3.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${niveauBadgeClass(c.niveau)}`}>
                              {c.niveau}
                            </span>
                          )}
                          <button
                            onClick={e => e.preventDefault()}
                            className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                          >
                            <Bookmark size={14} />
                          </button>
                        </div>
                      </Link>

                      <div className="p-5 pb-4">
                        {c.categorie && (
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal">{c.categorie}</div>
                        )}
                        <Link href={`/cours/${c.id}`}>
                          <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink hover:text-gold transition-colors">{c.titre}</h3>
                        </Link>
                        {c.formateurNom && (
                          <p className="mb-3.5 text-xs text-muted">Par {c.formateurNom}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
                          <span className="flex items-center gap-1 text-gold">
                            <Star size={14} fill="currentColor" /> 4.8
                          </span>
                          {c.dureeHeures != null && (
                            <span className="flex items-center gap-1"><Clock size={14} /> {c.dureeHeures}h</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
                        <div className={`font-heading ${isGratuit ? "text-sm font-bold text-teal" : "text-lg font-black text-ink"}`}>
                          {prixLabel}
                        </div>
                        <button
                          onClick={() => handleInscrire(c)}
                          disabled={isEnrolling}
                          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80 flex items-center gap-2 disabled:opacity-60"
                        >
                          <PlayCircle size={16} />
                          {isEnrolling ? "..." : "S'inscrire"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
