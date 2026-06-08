"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, ThumbsUp, Eye, Clock, ChevronRight, Search, Plus, Pin, TrendingUp, Filter } from "lucide-react";

/* ----------------------------------------------------------------
   Données mock
   ---------------------------------------------------------------- */

const forumCategories = [
  { id: "all", name: "Tous les sujets", count: 1247 },
  { id: "python", name: "Python & Data Science", count: 342 },
  { id: "web", name: "Développement Web", count: 289 },
  { id: "design", name: "Design UX/UI", count: 156 },
  { id: "ia", name: "Intelligence Artificielle", count: 198 },
  { id: "cloud", name: "Cloud & DevOps", count: 132 },
  { id: "general", name: "Discussions générales", count: 130 },
];

const pinnedTopics = [
  { id: "p1", title: "Règlement du forum — Merci de lire avant de poster", author: "Équipe Dɔni", replies: 0, views: 12400, time: "Épinglé" },
  { id: "p2", title: "Ressources gratuites complémentaires — Liste officielle 2026", author: "Marie Dupont", replies: 45, views: 8900, time: "Épinglé" },
];

const topics = [
  { id: 1, title: "Comment optimiser les performances d'un modèle de Deep Learning ?", author: "Karim S.", initials: "KS", color: "bg-teal", category: "Intelligence Artificielle", replies: 24, views: 1280, likes: 47, time: "Il y a 2h", hot: true },
  { id: 2, title: "Aide : Erreur lors de l'import de Pandas dans Jupyter Notebook", author: "Julie R.", initials: "JR", color: "bg-coral", category: "Python & Data Science", replies: 8, views: 340, likes: 5, time: "Il y a 4h", resolved: true },
  { id: 3, title: "Retour d'expérience : Ma transition de graphiste à UX Designer grâce à Dɔni", author: "Alice P.", initials: "AP", color: "bg-purple-600", category: "Discussions générales", replies: 31, views: 2100, likes: 89, time: "Il y a 6h", hot: true },
  { id: 4, title: "Quelles sont les meilleures pratiques pour déployer sur AWS en 2026 ?", author: "Thomas L.", initials: "TL", color: "bg-blue-600", category: "Cloud & DevOps", replies: 15, views: 890, likes: 22, time: "Il y a 8h" },
  { id: 5, title: "Tutoriel : Créer un composant React accessible de A à Z", author: "Sophie M.", initials: "SM", color: "bg-ink", category: "Développement Web", replies: 12, views: 670, likes: 34, time: "Hier" },
  { id: 6, title: "Discussion : L'IA va-t-elle remplacer les développeurs ?", author: "Lucas B.", initials: "LB", color: "bg-gold", category: "Discussions générales", replies: 67, views: 4200, likes: 112, time: "Hier", hot: true },
  { id: 7, title: "Partage : Mon projet capstone de Data Visualisation avec Matplotlib", author: "Emma D.", initials: "ED", color: "bg-teal", category: "Python & Data Science", replies: 9, views: 430, likes: 18, time: "Il y a 2j" },
];

/* ----------------------------------------------------------------
   Composant
   ---------------------------------------------------------------- */

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-black text-ink md:text-4xl">Forum de la communauté</h1>
            <p className="mt-1 text-muted">Échangez, posez vos questions et partagez vos connaissances avec la communauté Dɔni.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-sm transition-all hover:bg-yellow-500 hover:-translate-y-0.5 active:scale-95 shrink-0">
            <Plus size={18} /> Nouveau sujet
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Rechercher un sujet, une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream">
            <Filter size={16} /> Filtres
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar catégories */}
          <div className="w-full shrink-0 lg:w-64">
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <h3 className="mb-3 px-2 font-heading text-base font-bold text-ink">Catégories</h3>
              <nav className="space-y-0.5">
                {forumCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeCategory === cat.id
                        ? "bg-gold/10 font-semibold text-yellow-800"
                        : "text-muted hover:bg-cream hover:text-ink"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`shrink-0 text-xs ${activeCategory === cat.id ? "text-yellow-700" : "text-muted/60"}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Stats rapides */}
            <div className="mt-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-heading text-base font-bold text-ink">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Sujets actifs</span>
                  <span className="font-bold text-ink">1,247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Réponses ce mois</span>
                  <span className="font-bold text-ink">3,892</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Membres actifs</span>
                  <span className="font-bold text-ink">8,540</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des sujets */}
          <div className="flex-1 space-y-4">
            {/* Sujets épinglés */}
            {pinnedTopics.map((topic) => (
              <div key={topic.id} className="flex items-center gap-4 rounded-xl border border-gold/30 bg-gold/5 px-5 py-3.5 transition-colors hover:bg-gold/10">
                <Pin size={14} className="shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-ink">{topic.title}</h3>
                  <p className="text-xs text-muted">Par {topic.author}</p>
                </div>
                <div className="hidden shrink-0 items-center gap-4 text-xs text-muted sm:flex">
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {topic.replies}</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {topic.views.toLocaleString()}</span>
                </div>
                <ChevronRight size={16} className="shrink-0 text-muted" />
              </div>
            ))}

            {/* Sujets réguliers */}
            {topics.map((topic) => (
              <div key={topic.id} className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${topic.color} text-xs font-bold text-white`}>
                    {topic.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {topic.hot && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coral">
                          <TrendingUp size={10} /> Tendance
                        </span>
                      )}
                      {topic.resolved && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
                          Résolu
                        </span>
                      )}
                      <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-ink leading-snug group-hover:text-gold transition-colors">
                      {topic.title}
                    </h3>
                    <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-muted">
                      <span>Par <strong className="text-ink font-medium">{topic.author}</strong></span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {topic.time}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {topic.replies} réponses</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {topic.views.toLocaleString()} vues</span>
                      <span className="flex items-center gap-1"><ThumbsUp size={12} /> {topic.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
