"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Play,
  Clock,
  Star,
  Bookmark,
  CheckCircle2,
  Lock,
  FileText,
  HelpCircle,
  Users,
  Award,
  BarChart3,
  Globe,
  ChevronRight,
} from "lucide-react";

/* ----------------------------------------------------------------
   Donnees — Detail d'une formation (mock)
   ---------------------------------------------------------------- */

type Module = {
  id: number;
  title: string;
  lessons: { title: string; duration: string; type: "video" | "pdf" | "quiz"; locked?: boolean }[];
};

type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

const courseData: Record<
  string,
  {
    title: string;
    category: string;
    level: string;
    instructor: string;
    instructorTitle: string;
    instructorBio: string;
    rating: number;
    reviewsCount: string;
    studentsCount: string;
    duration: string;
    price: string;
    description: string;
    objectives: string[];
    prerequisites: string[];
    modules: Module[];
    reviews: Review[];
  }
> = {
  "1": {
    title: "Deep Learning & Reseaux de Neurones",
    category: "Intelligence Artificielle",
    level: "Intermediaire",
    instructor: "Pr. Ahmed Benali",
    instructorTitle: "Docteur en Informatique, Chercheur en IA",
    instructorBio:
      "Le Pr. Ahmed Benali est specialiste du deep learning avec plus de 15 ans d'experience en recherche et enseignement. Il a publie de nombreux articles dans des conferences internationales (NeurIPS, ICML) et accompagne des entreprises dans l'integration de solutions d'IA.",
    rating: 4.9,
    reviewsCount: "2 400",
    studentsCount: "12 500",
    duration: "24h",
    price: "79 EUR",
    description:
      "Cette formation vous guide a travers les fondamentaux du deep learning, de la theorie des reseaux de neurones a la pratique avec TensorFlow et PyTorch. Vous apprendrez a concevoir, entrainer et deployer des modeles performants pour resoudre des problemes reels de classification, de regression et de generation.",
    objectives: [
      "Comprendre les fondements mathematiques des reseaux de neurones",
      "Concevoir et entrainer des architectures CNN, RNN et Transformer",
      "Utiliser TensorFlow et PyTorch pour des projets concrets",
      "Optimiser les hyperparametres et evaluer les performances",
      "Deployer un modele en production avec les bonnes pratiques",
    ],
    prerequisites: [
      "Maitrise de Python (niveau intermediaire)",
      "Connaissances de base en algebre lineaire et statistiques",
      "Familiarite avec les concepts de machine learning",
    ],
    modules: [
      {
        id: 1,
        title: "Fondamentaux du Deep Learning",
        lessons: [
          { title: "Introduction au deep learning", duration: "18 min", type: "video" },
          { title: "Neurone artificiel et fonction d'activation", duration: "24 min", type: "video" },
          { title: "Retropropagation du gradient", duration: "32 min", type: "video" },
          { title: "Quiz — Fondamentaux", duration: "10 min", type: "quiz" },
        ],
      },
      {
        id: 2,
        title: "Reseaux de Neurones Convolutifs (CNN)",
        lessons: [
          { title: "Convolution et pooling", duration: "26 min", type: "video" },
          { title: "Architectures classiques : LeNet, AlexNet, ResNet", duration: "35 min", type: "video" },
          { title: "TP — Classification d'images avec TensorFlow", duration: "45 min", type: "video" },
          { title: "Document — Code source du TP", duration: "—", type: "pdf" },
        ],
      },
      {
        id: 3,
        title: "Reseaux Recurrents et Transformers",
        lessons: [
          { title: "RNN et LSTM", duration: "28 min", type: "video" },
          { title: "Architecture Transformer", duration: "40 min", type: "video" },
          { title: "TP — Analyse de sentiments avec BERT", duration: "50 min", type: "video" },
          { title: "Quiz — RNN et Transformers", duration: "12 min", type: "quiz" },
        ],
      },
      {
        id: 4,
        title: "Deploiement et Bonnes Pratiques",
        lessons: [
          { title: "Optimisation et quantification des modeles", duration: "30 min", type: "video" },
          { title: "Deploiement avec TensorFlow Serving", duration: "35 min", type: "video" },
          { title: "Projet final — Pipeline complet", duration: "1h20", type: "video" },
          { title: "Document — Guide de deploiement", duration: "—", type: "pdf" },
          { title: "Quiz final", duration: "15 min", type: "quiz" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Julien M.",
        avatar: "JM",
        rating: 5,
        date: "Il y a 2 semaines",
        comment:
          "Formation extremement complete. Le Pr. Benali explique des concepts complexes avec une clarte remarquable. Les TP sont tres pertinents.",
      },
      {
        id: 2,
        name: "Fatima D.",
        avatar: "FD",
        rating: 5,
        date: "Il y a 1 mois",
        comment:
          "Excellente pedagogie. J'ai pu appliquer directement les connaissances dans mon projet professionnel. Le certificat est un vrai plus sur mon CV.",
      },
      {
        id: 3,
        name: "Thomas R.",
        avatar: "TR",
        rating: 4,
        date: "Il y a 1 mois",
        comment:
          "Tres bon contenu, quelques passages mathematiques demandent des revisions si l'on n'a pas un bagage solide. Les ressources supplementaires sont utiles.",
      },
    ],
  },
};

const defaultCourse = {
  title: "Formation",
  category: "Developpement",
  level: "Tous niveaux",
  instructor: "Formateur Dɔni",
  instructorTitle: "Expert certifie",
  instructorBio:
    "Formateur experimente sur la plateforme Dɔni, specialise dans la transmission de competences techniques et professionnelles.",
  rating: 4.8,
  reviewsCount: "1 200",
  studentsCount: "8 000",
  duration: "20h",
  price: "59 EUR",
  description:
    "Une formation complete pour developper vos competences et obtenir une certification reconnue. Le parcours combine theorie, pratique et evaluation continue.",
  objectives: [
    "Maitriser les concepts fondamentaux",
    "Appliquer les connaissances dans des projets concrets",
    "Obtenir une certification de reussite",
  ],
  prerequisites: ["Connaissances de base dans le domaine", "Motivation et regularite"],
  modules: [
    {
      id: 1,
      title: "Module 1 — Introduction",
      lessons: [
        { title: "Vue d'ensemble", duration: "20 min", type: "video" },
        { title: "Quiz d'introduction", duration: "10 min", type: "quiz" },
      ],
    },
    {
      id: 2,
      title: "Module 2 — Concepts avances",
      lessons: [
        { title: "Approfondissement", duration: "30 min", type: "video" },
        { title: "TP pratique", duration: "45 min", type: "video" },
        { title: "Document de reference", duration: "—", type: "pdf" },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Apprenant Dɔni",
      avatar: "AD",
      rating: 5,
      date: "Recent",
      comment: "Formation de grande qualite, je recommande vivement.",
    },
  ],
};

/* ----------------------------------------------------------------
   Composant page de detail de formation
   ---------------------------------------------------------------- */

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courseData[courseId] || defaultCourse;
  const [activeTab, setActiveTab] = useState<"programme" | "formateur" | "avis">("programme");
  const [saved, setSaved] = useState(false);

  const lessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play size={14} strokeWidth={2} />;
      case "pdf":
        return <FileText size={14} strokeWidth={2} />;
      case "quiz":
        return <HelpCircle size={14} strokeWidth={2} />;
      default:
        return <Play size={14} strokeWidth={2} />;
    }
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* ---- Fil d'Ariane ---- */}
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} className="inline" />
            </li>
            <li>
              <Link href="/catalogue" className="hover:text-ink transition-colors">
                Catalogue
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} className="inline" />
            </li>
            <li className="font-semibold text-ink" aria-current="page">
              {course.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* ---- En-tete de la formation ---- */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
                  {course.category}
                </span>
                <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                  {course.level}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-black leading-tight text-ink md:text-4xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                {course.description}
              </p>

              {/* Metadonnees */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Star size={16} fill="currentColor" className="text-gold" />
                  <span className="font-semibold text-ink">{course.rating}</span>
                  <span>({course.reviewsCount} avis)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={16} />
                  {course.studentsCount} apprenants
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 size={16} />
                  {totalLessons} lecons
                </span>
              </div>

              {/* Formateur resume */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream">
                  {course.instructor.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{course.instructor}</p>
                  <p className="text-xs text-muted">{course.instructorTitle}</p>
                </div>
              </div>
            </div>

            {/* Carte d'inscription */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                {/* Visuel */}
                <div className="mb-5 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-ink to-gray-800">
                  <Play size={48} strokeWidth={1} className="text-cream/60" />
                </div>

                <div className="mb-5 flex items-baseline justify-between">
                  <span className="font-heading text-3xl font-black text-ink">
                    {course.price}
                  </span>
                  <span className="text-xs text-muted">Acces a vie</span>
                </div>

                <Link
                  href={`/cours/${courseId}/apprendre`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-all hover:bg-gold/90 hover:shadow-medium active:scale-[0.98]"
                >
                  <Play size={18} fill="currentColor" />
                  Commencer la formation
                </Link>

                <button
                  onClick={() => setSaved(!saved)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-cream"
                >
                  <Bookmark
                    size={16}
                    fill={saved ? "currentColor" : "none"}
                    className={saved ? "text-gold" : ""}
                  />
                  {saved ? "Sauvegarde" : "Sauvegarder"}
                </button>

                <div className="mt-6 space-y-3 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Cette formation inclut
                  </p>
                  <ul className="space-y-2.5 text-sm text-ink/80">
                    <li className="flex items-center gap-2.5">
                      <Play size={15} className="text-teal" /> {totalLessons} lecons video HD
                    </li>
                    <li className="flex items-center gap-2.5">
                      <FileText size={15} className="text-teal" /> Documents telechargeables
                    </li>
                    <li className="flex items-center gap-2.5">
                      <HelpCircle size={15} className="text-teal" /> Quiz d'evaluation par module
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Award size={15} className="text-teal" /> Certificat de reussite
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Globe size={15} className="text-teal" /> Acces a vie, sur tous supports
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Onglets de contenu ---- */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Navigation par onglets */}
        <div className="mb-8 border-b border-border">
          <nav role="tablist" aria-label="Contenu de la formation">
            <button
              role="tab"
              aria-selected={activeTab === "programme"}
              onClick={() => setActiveTab("programme")}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors ${
                activeTab === "programme" ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Programme
              {activeTab === "programme" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "formateur"}
              onClick={() => setActiveTab("formateur")}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors ${
                activeTab === "formateur" ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Formateur
              {activeTab === "formateur" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "avis"}
              onClick={() => setActiveTab("avis")}
              className={`relative px-5 py-3 text-sm font-semibold transition-colors ${
                activeTab === "avis" ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Avis ({course.reviews.length})
              {activeTab === "avis" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* ---- Onglet Programme ---- */}
            {activeTab === "programme" && (
              <div>
                {/* Objectifs */}
                <div className="mb-10 rounded-2xl border border-border bg-white p-6">
                  <h2 className="mb-4 font-heading text-xl font-bold text-ink">
                    Objectifs pedagogiques
                  </h2>
                  <ul className="space-y-3">
                    {course.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequis */}
                <div className="mb-10 rounded-2xl border border-border bg-white p-6">
                  <h2 className="mb-4 font-heading text-xl font-bold text-ink">
                    Prerequis
                  </h2>
                  <ul className="space-y-3">
                    {course.prerequisites.map((pre, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {pre}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modules */}
                <div>
                  <h2 className="mb-5 font-heading text-xl font-bold text-ink">
                    Programme detaille
                  </h2>
                  <div className="space-y-4">
                    {course.modules.map((module) => (
                      <div
                        key={module.id}
                        className="overflow-hidden rounded-2xl border border-border bg-white"
                      >
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-xs font-bold text-cream">
                              {module.id}
                            </span>
                            <h3 className="font-heading text-base font-bold text-ink">
                              {module.title}
                            </h3>
                          </div>
                          <span className="text-xs text-muted">
                            {module.lessons.length} lecons
                          </span>
                        </div>
                        <ul className="divide-y divide-border">
                          {module.lessons.map((lesson, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-cream/40"
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cream text-muted">
                                  {lessonIcon(lesson.type)}
                                </span>
                                <span className="text-sm text-ink/80">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-muted">{lesson.duration}</span>
                                {lesson.locked ? (
                                  <Lock size={14} className="text-muted" />
                                ) : (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal">
                                    Apercu
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---- Onglet Formateur ---- */}
            {activeTab === "formateur" && (
              <div className="rounded-2xl border border-border bg-white p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl font-bold text-cream">
                    {course.instructor
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-ink">
                      {course.instructor}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-teal">
                      {course.instructorTitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {course.instructorBio}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="font-heading text-2xl font-black text-ink">
                          {course.studentsCount}
                        </p>
                        <p className="text-xs text-muted">Apprenants formes</p>
                      </div>
                      <div>
                        <p className="font-heading text-2xl font-black text-ink">
                          {course.rating}
                        </p>
                        <p className="text-xs text-muted">Note moyenne</p>
                      </div>
                      <div>
                        <p className="font-heading text-2xl font-black text-ink">
                          {course.reviewsCount}
                        </p>
                        <p className="text-xs text-muted">Avis recus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---- Onglet Avis ---- */}
            {activeTab === "avis" && (
              <div>
                {/* Resume des notes */}
                <div className="mb-8 flex flex-col gap-8 rounded-2xl border border-border bg-white p-6 sm:flex-row sm:items-center">
                  <div className="text-center sm:border-r sm:border-border sm:pr-8">
                    <p className="font-heading text-5xl font-black text-ink">
                      {course.rating}
                    </p>
                    <div className="mt-2 flex justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          fill="currentColor"
                          className={
                            s <= Math.round(course.rating)
                              ? "text-gold"
                              : "text-border"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      {course.reviewsCount} avis
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct =
                        star === 5 ? 78 : star === 4 ? 18 : star === 3 ? 3 : star === 2 ? 1 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="flex w-12 items-center gap-1 text-xs text-muted">
                            {star} <Star size={12} fill="currentColor" className="text-gold" />
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream">
                            <div
                              className="h-full rounded-full bg-gold"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-xs text-muted">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Liste des avis */}
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-border bg-white p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-ink">{review.name}</p>
                            <p className="text-xs text-muted">{review.date}</p>
                          </div>
                          <div className="mt-1 flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={13}
                                fill="currentColor"
                                className={
                                  s <= review.rating ? "text-gold" : "text-border"
                                }
                              />
                            ))}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---- Colonne laterale ---- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Certification */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Award size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Certification de reussite
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Obtenez un certificat telechargeable en format PDF apres la
                  completion de tous les modules et la reussite des evaluations.
                </p>
              </div>

              {/* Assistance */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                  <Users size={24} className="text-teal" />
                </div>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Accompannement personnalise
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Beneficiez d'un forum dedie, d'un acces direct au formateur
                  par messagerie et d'une communaute d'apprenants active.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-gold hover:underline"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
