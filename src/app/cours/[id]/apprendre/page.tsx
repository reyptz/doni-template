"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlayCircle,
  FileText,
  CheckCircle,
  Circle,
  ChevronLeft,
  Download,
  MessageSquare,
  Menu,
  X,
  Volume2,
  Maximize,
  SkipForward,
  SkipBack,
  ChevronDown,
  Award,
  Clock,
  BookOpen,
  Lock,
} from "lucide-react";

/* ----------------------------------------------------------------
   Types de données
   ---------------------------------------------------------------- */

type Lesson = {
  id: number;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
  completed: boolean;
  current?: boolean;
};

type Module = {
  id: number;
  title: string;
  duration: string;
  locked?: boolean;
  lessons: Lesson[];
};

/* ----------------------------------------------------------------
   Données du cours (mock)
   ---------------------------------------------------------------- */

const courseData = {
  title: "Python pour la Data Science & Pandas",
  instructor: "Marie Dupont",
  totalDuration: "16h de contenu",
  totalLessons: 24,
  completedLessons: 8,
};

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction à Python",
    duration: "2h 15min",
    lessons: [
      { id: 101, title: "Bienvenue dans le cours", type: "video" as const, duration: "05:20", completed: true },
      { id: 102, title: "Installation de l'environnement", type: "text" as const, duration: "10 min", completed: true },
      { id: 103, title: "Votre premier script Python", type: "video" as const, duration: "18:45", completed: true },
      { id: 104, title: "Quiz : Concepts de base", type: "quiz" as const, duration: "5 questions", completed: true },
    ],
  },
  {
    id: 2,
    title: "Structures de données",
    duration: "3h 40min",
    lessons: [
      { id: 201, title: "Les listes et les tuples", type: "video" as const, duration: "22:10", completed: true },
      { id: 202, title: "Les dictionnaires en profondeur", type: "video" as const, duration: "28:30", completed: true },
      { id: 203, title: "Exercice pratique : Manipulation de données", type: "text" as const, duration: "20 min", completed: true },
      { id: 204, title: "Structures de contrôle avancées", type: "video" as const, duration: "25:15", completed: false, current: true },
      { id: 205, title: "Quiz : Structures de données", type: "quiz" as const, duration: "8 questions", completed: false },
    ],
  },
  {
    id: 3,
    title: "Introduction à Pandas",
    duration: "4h 10min",
    lessons: [
      { id: 301, title: "Qu'est-ce que Pandas ?", type: "video" as const, duration: "15:00", completed: false },
      { id: 302, title: "DataFrames et Series", type: "video" as const, duration: "35:00", completed: false },
      { id: 303, title: "Lecture et écriture de fichiers CSV", type: "video" as const, duration: "20:00", completed: false },
      { id: 304, title: "Projet : Analyse d'un jeu de données réel", type: "text" as const, duration: "45 min", completed: false },
    ],
  },
  {
    id: 4,
    title: "Visualisation avec Matplotlib",
    duration: "3h 20min",
    locked: true,
    lessons: [
      { id: 401, title: "Les bases de Matplotlib", type: "video" as const, duration: "25:00", completed: false },
      { id: 402, title: "Graphiques avancés", type: "video" as const, duration: "30:00", completed: false },
      { id: 403, title: "Projet final : Tableau de bord de données", type: "text" as const, duration: "1h", completed: false },
      { id: 404, title: "Examen final certifiant", type: "quiz" as const, duration: "20 questions", completed: false },
    ],
  },
];

/* ----------------------------------------------------------------
   Composant principal
   ---------------------------------------------------------------- */

export default function ApprendreCoursPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);
  const [activeContentTab, setActiveContentTab] = useState<"apercu" | "qa" | "notes">("apercu");

  const progressPercent = Math.round(
    (courseData.completedLessons / courseData.totalLessons) * 100
  );

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle size={13} />;
      case "text":
        return <FileText size={13} />;
      case "quiz":
        return <Award size={13} />;
      default:
        return <BookOpen size={13} />;
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-cream">
      {/* ─── Barre supérieure du cours ─── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4 sm:px-6 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/profil"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-cream hover:text-ink"
            aria-label="Retour au profil"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="hidden sm:block h-5 w-px bg-border" />
          <div className="min-w-0">
            <h1 className="truncate font-heading text-sm font-bold text-ink sm:text-base">
              {courseData.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span>{courseData.instructor}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{progressPercent}% terminé</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Barre de progression mini */}
          <div className="hidden md:flex items-center gap-2.5 mr-4">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gold transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-muted">{progressPercent}%</span>
          </div>

          <button className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-cream">
            <Download size={13} /> Ressources
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-cream lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Fermer le sommaire" : "Ouvrir le sommaire"}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ─── Zone principale ─── */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            {/* Lecteur vidéo */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-elevated group">
              {/* Overlay d'interaction */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-6">
                  <button className="text-white/70 hover:text-white transition-colors" aria-label="Leçon précédente">
                    <SkipBack size={24} />
                  </button>
                  <button
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform hover:scale-110"
                    aria-label="Lancer la vidéo"
                  >
                    <PlayCircle size={30} />
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors" aria-label="Leçon suivante">
                    <SkipForward size={24} />
                  </button>
                </div>
              </div>

              {/* Bouton play central statique */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform hover:scale-110"
                  aria-label="Lancer la vidéo"
                >
                  <PlayCircle size={30} />
                </button>
              </div>

              {/* Contrôles bas */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                {/* Barre de progression */}
                <div className="group/progress mb-3 cursor-pointer">
                  <div className="h-1 w-full rounded-full bg-white/20 transition-all group-hover/progress:h-1.5">
                    <div className="relative h-full w-[32%] rounded-full bg-gold transition-all">
                      <div className="absolute -right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover/progress:opacity-100" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/80 font-medium">
                  <div className="flex items-center gap-3">
                    <button className="hover:text-white transition-colors" aria-label="Lecture"><PlayCircle size={16} /></button>
                    <button className="hover:text-white transition-colors" aria-label="Leçon suivante"><SkipForward size={16} /></button>
                    <button className="hover:text-white transition-colors" aria-label="Volume"><Volume2 size={16} /></button>
                    <span className="ml-1">07:23 / 25:15</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="hover:text-white transition-colors rounded px-1.5 py-0.5 border border-white/20 text-[11px]">1x</button>
                    <button className="hover:text-white transition-colors rounded px-1.5 py-0.5 border border-white/20 text-[11px]">HD</button>
                    <button className="hover:text-white transition-colors" aria-label="Plein écran"><Maximize size={16} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sous la vidéo */}
            <div className="mt-6 rounded-2xl border border-border bg-white shadow-sm">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">
                      Structures de contrôle avancées
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Module 2 · Leçon 4 · 25 min
                    </p>
                  </div>
                  <button className="shrink-0 rounded-lg bg-gold/15 px-5 py-2.5 text-sm font-semibold text-yellow-800 transition-colors hover:bg-gold/25">
                    Marquer comme terminé
                  </button>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  Dans cette leçon, nous explorons les structures conditionnelles avancées (if/elif/else imbriqués, opérateur ternaire) et les boucles (for, while, comprehension lists). Vous apprendrez à contrôler le flux d'exécution de vos programmes de manière élégante et performante en Python.
                </p>
              </div>

              {/* Onglets */}
              <div className="border-t border-border px-6">
                <nav className="flex gap-0" aria-label="Onglets du contenu">
                  {[
                    { id: "apercu" as const, label: "Aperçu" },
                    { id: "qa" as const, label: "Questions & Réponses (12)" },
                    { id: "notes" as const, label: "Notes personnelles" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveContentTab(tab.id)}
                      className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
                        activeContentTab === tab.id
                          ? "text-ink"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {tab.label}
                      {activeContentTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-t-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenu de l'onglet */}
              <div className="p-6 border-t border-border">
                {activeContentTab === "apercu" && (
                  <div className="space-y-4 text-sm text-muted leading-relaxed">
                    <h3 className="font-heading text-base font-bold text-ink">Ce que vous apprendrez</h3>
                    <ul className="space-y-2">
                      {[
                        "Maîtriser les structures conditionnelles imbriquées",
                        "Utiliser les boucles for et while avec des itérables complexes",
                        "Écrire des list comprehensions performantes",
                        "Appliquer le pattern match/case (Python 3.10+)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle size={16} className="mt-0.5 shrink-0 text-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeContentTab === "qa" && (
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white">
                        SK
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">Salim K. <span className="font-normal text-muted">· Il y a 2 jours</span></p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          Quelle est la différence de performance entre une boucle for classique et une list comprehension ?
                        </p>
                        <button className="mt-2 text-xs font-semibold text-gold hover:text-yellow-700">Répondre</button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 ml-12 pl-4 border-l-2 border-border">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                        MD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">Marie Dupont <span className="ml-1 text-[10px] font-bold text-teal uppercase tracking-wider bg-teal/10 px-1.5 py-0.5 rounded">Formateur</span> <span className="font-normal text-muted">· Il y a 1 jour</span></p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          Excellente question ! La list comprehension est généralement 10 à 30% plus rapide car elle est optimisée par l'interpréteur Python. Nous couvrirons les benchmarks détaillés dans le Module 3.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-cream/50 border border-border p-4">
                      <input
                        type="text"
                        placeholder="Poser une question au formateur ou à la communauté..."
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                )}

                {activeContentTab === "notes" && (
                  <div>
                    <textarea
                      placeholder="Prenez vos notes personnelles ici. Elles seront automatiquement sauvegardées et associées à cette leçon..."
                      className="w-full min-h-[200px] rounded-xl border border-border bg-cream/30 p-4 text-sm text-ink outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold resize-y"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ─── Sommaire latéral ─── */}
        <aside
          className={`absolute inset-y-0 right-0 z-10 w-80 transform border-l border-border bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="shrink-0 border-b border-border bg-cream/30 px-4 py-3.5">
            <h3 className="font-heading text-base font-bold text-ink">Contenu du cours</h3>
            <p className="mt-0.5 text-xs text-muted">
              {courseData.completedLessons}/{courseData.totalLessons} leçons terminées
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {modules.map((mod) => (
              <div key={mod.id} className="border-b border-border/50">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-cream/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink truncate">{mod.title}</p>
                    <p className="text-xs text-muted mt-0.5 flex items-center gap-2">
                      <Clock size={11} /> {mod.duration}
                      {mod.locked && (
                        <span className="inline-flex items-center gap-1 text-muted/60">
                          <Lock size={10} /> Verrouillé
                        </span>
                      )}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-muted transition-transform duration-200 ${
                      expandedModules.includes(mod.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedModules.includes(mod.id) && (
                  <div className="pb-2">
                    {mod.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`flex w-full items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                          lesson.current
                            ? "bg-gold/10 border-l-2 border-gold"
                            : "hover:bg-cream/50 border-l-2 border-transparent"
                        } ${mod.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={mod.locked}
                      >
                        <div className="mt-0.5 shrink-0">
                          {mod.locked ? (
                            <Lock size={14} className="text-muted/50" />
                          ) : lesson.completed ? (
                            <CheckCircle size={14} className="text-teal" />
                          ) : lesson.current ? (
                            <PlayCircle size={14} className="text-gold" />
                          ) : (
                            <Circle size={14} className="text-border" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate ${
                              lesson.current
                                ? "font-semibold text-ink"
                                : lesson.completed
                                ? "text-muted line-through"
                                : "text-ink/75"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                            {typeIcon(lesson.type)}
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 z-[5] bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
