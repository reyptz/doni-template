"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  Clock,
  Bookmark,
  Globe,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { elearningApi } from "@/lib/api";
import { useDoniUser } from "@/lib/session";

/* ----------------------------------------------------------------
   Types
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

type InscriptionCheck = {
  id: number;
  cours?: { id?: number };
};

/* ----------------------------------------------------------------
   Helpers
   ---------------------------------------------------------------- */

function formatPrix(prix?: number): string {
  return prix === 0 || prix == null ? "Gratuit" : prix.toLocaleString() + " XOF";
}

function niveauBadgeClass(niveau?: string) {
  switch (niveau) {
    case "Débutant": return "bg-teal/10 text-teal";
    case "Intermédiaire": return "bg-gold/15 text-yellow-700";
    case "Avancé": return "bg-coral/10 text-coral";
    default: return "bg-ink/5 text-muted";
  }
}

function statutBadge(statut?: string) {
  if (!statut || statut === "PUBLIE") return null;
  if (statut === "BROUILLON") return <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-500">Brouillon</span>;
  if (statut === "ARCHIVE") return <span className="rounded-full bg-coral/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-coral">Archivé</span>;
  return null;
}

function instructorInitials(name?: string): string {
  if (!name) return "—";
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* ----------------------------------------------------------------
   Page
   ---------------------------------------------------------------- */

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const user = useDoniUser();

  const [cours, setCours] = useState<Cours | null | undefined>(undefined); // undefined = chargement
  const [inscrit, setInscrit] = useState(false);
  const [inscribing, setInscribing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    elearningApi.get<Cours>("/cours/" + id)
      .then(setCours)
      .catch(() => setCours(null));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    elearningApi.get<InscriptionCheck[]>("/inscriptions/apprenant/" + user.id)
      .then(ins => setInscrit(ins.some(i => i.cours?.id === Number(id))))
      .catch(() => {});
  }, [user, id]);

  async function handleInscrire() {
    if (!user) {
      router.push("/connexion?next=/cours/" + id);
      return;
    }
    setInscribing(true);
    try {
      await elearningApi.post("/inscriptions", { apprenantId: user.id, coursId: Number(id) });
      toast.success("Inscrit !");
      setInscrit(true);
    } catch (err: any) {
      const msg = err?.message ?? "";
      if (msg.toLowerCase().includes("déjà") || msg.toLowerCase().includes("already") || msg.includes("409")) {
        toast.error("Vous êtes déjà inscrit à ce cours.");
        setInscrit(true);
      } else {
        toast.error("Erreur lors de l'inscription.");
      }
    } finally {
      setInscribing(false);
    }
  }

  if (cours === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4 text-muted">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-gold" />
          <p className="text-sm">Chargement du cours...</p>
        </div>
      </div>
    );
  }

  if (cours === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream text-center">
        <p className="font-heading text-2xl font-bold text-ink">Cours introuvable</p>
        <p className="text-sm text-muted">Ce cours n'existe pas ou n'est plus disponible.</p>
        <Link href="/catalogue" className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-ink hover:bg-gold/90 transition-colors">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const prixLabel = formatPrix(cours.prix);
  const isGratuit = prixLabel === "Gratuit";

  return (
    <div className="min-h-screen bg-cream">
      {/* Fil d'Ariane */}
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li><Link href="/" className="hover:text-ink transition-colors">Accueil</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} className="inline" /></li>
            <li><Link href="/catalogue" className="hover:text-ink transition-colors">Catalogue</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} className="inline" /></li>
            <li className="font-semibold text-ink" aria-current="page">{cours.titre}</li>
          </ol>
        </nav>
      </div>

      {/* En-tête */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Colonne principale */}
            <div className="lg:col-span-2">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                {cours.categorie && (
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
                    {cours.categorie}
                  </span>
                )}
                {cours.niveau && (
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${niveauBadgeClass(cours.niveau)}`}>
                    {cours.niveau}
                  </span>
                )}
                {statutBadge(cours.statut)}
              </div>

              <h1 className="font-heading text-3xl font-black leading-tight text-ink md:text-4xl">
                {cours.titre}
              </h1>

              {cours.description && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  {cours.description}
                </p>
              )}

              {/* Métadonnées */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                {cours.dureeHeures != null && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {cours.dureeHeures}h
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Globe size={16} />
                  {cours.langue ?? "Français"}
                </span>
              </div>

              {/* Formateur */}
              {cours.formateurNom && (
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream">
                    {instructorInitials(cours.formateurNom)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{cours.formateurNom}</p>
                    <p className="text-xs text-muted">Formateur Dɔni</p>
                  </div>
                </div>
              )}
            </div>

            {/* Carte d'inscription */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                {/* Visuel */}
                <div className="mb-5 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-ink to-gray-800">
                  <Play size={48} strokeWidth={1} className="text-cream/60" />
                </div>

                <div className="mb-5 flex items-baseline justify-between">
                  <span className={`font-heading font-black ${isGratuit ? "text-2xl text-teal" : "text-3xl text-ink"}`}>
                    {prixLabel}
                  </span>
                  <span className="text-xs text-muted">Accès à vie</span>
                </div>

                {inscrit ? (
                  <Link
                    href={`/cours/${id}/apprendre`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-teal/90 hover:shadow-md active:scale-[0.98]"
                  >
                    <Play size={18} fill="currentColor" />
                    Commencer à apprendre
                  </Link>
                ) : (
                  <button
                    onClick={handleInscrire}
                    disabled={inscribing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-all hover:bg-gold/90 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
                  >
                    <Play size={18} fill="currentColor" />
                    {inscribing ? "Inscription..." : "S'inscrire maintenant"}
                  </button>
                )}

                <button
                  onClick={() => setSaved(!saved)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-cream"
                >
                  <Bookmark size={16} fill={saved ? "currentColor" : "none"} className={saved ? "text-gold" : ""} />
                  {saved ? "Sauvegardé" : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder pour le contenu pédagogique */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-8 text-center">
          <h2 className="mb-3 font-heading text-xl font-bold text-ink">Programme détaillé</h2>
          <p className="text-sm text-muted">
            Le contenu pédagogique complet sera bientôt disponible. Pour l’instant, vous pouvez consulter la description du cours et vous inscrire.
          </p>
        </div>
      </section>
    </div>
  );
}
