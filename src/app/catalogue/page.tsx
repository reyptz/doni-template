"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen, Clock, Star, Bookmark, PlayCircle } from "lucide-react";

const COURSES = [
  { id: 1, title: "Deep Learning & Réseaux de Neurones", category: "Intelligence Artificielle", level: "Intermédiaire", instructor: "Pr. Ahmed Benali", rating: 4.9, reviews: "2.4k", duration: "24h", price: "79 €", color: "from-ink to-gray-800" },
  { id: 2, title: "Python pour la Data Science & Pandas", category: "Data Science", level: "Débutant", instructor: "Marie Dupont", rating: 4.8, reviews: "5.1k", duration: "16h", price: "Gratuit", color: "from-teal to-teal-900" },
  { id: 3, title: "Design System complet avec Figma", category: "Design UX/UI", level: "Avancé", instructor: "Lucie Martin", rating: 4.7, reviews: "1.8k", duration: "20h", price: "59 €", color: "from-coral to-red-900" },
  { id: 4, title: "React Native — Apps iOS & Android", category: "Mobile", level: "Intermédiaire", instructor: "Sofia Ramos", rating: 4.8, reviews: "2.1k", duration: "22h", price: "89 €", color: "from-purple-600 to-indigo-900" },
  { id: 5, title: "AWS Solutions Architect Certification", category: "Cloud & DevOps", level: "Intermédiaire", instructor: "Thomas Leroy", rating: 4.9, reviews: "3.7k", duration: "32h", price: "129 €", color: "from-blue-600 to-blue-900" },
  { id: 6, title: "Cybersécurité : les fondamentaux", category: "Cybersécurité", level: "Débutant", instructor: "Karim Haddad", rating: 4.6, reviews: "920", duration: "12h", price: "Gratuit", color: "from-gray-700 to-black" },
];

export default function Catalogue() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const categories = ["Toutes", "Développement Web", "Data Science", "Design UX/UI", "Intelligence Artificielle", "Mobile", "Cybersécurité"];

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="mb-4 font-heading text-3xl font-black text-ink md:text-5xl">Catalogue des formations</h1>
          <p className="text-lg text-muted">Trouvez la formation idéale pour propulser votre carrière.</p>
        </div>

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl bg-white p-4 shadow-sm border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher une compétence, un outil, un métier..." 
              className="w-full rounded-xl bg-cream/50 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-gold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-cream">
            <Filter size={18} /> Filtres avancés
          </button>
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
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeCategory === cat ? 'bg-gold/10 font-bold text-gold' : 'text-muted hover:bg-cream hover:text-ink'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="mb-4 mt-8 font-heading text-lg font-bold text-ink">Niveau</h3>
              <div className="space-y-3 text-sm text-muted">
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold" /> Débutant</label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold" /> Intermédiaire</label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold" /> Avancé</label>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted">Affichage de {COURSES.length} résultats</span>
              <select className="rounded-lg border border-border bg-white py-2 pl-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-gold">
                <option>Les plus pertinents</option>
                <option>Mieux notés</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COURSES.map(course => (
                <div key={course.id} className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl">
                  <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${course.color} text-white`}>
                    <BookOpen size={40} strokeWidth={1} className="opacity-80 transition-transform group-hover:scale-110" />
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">{course.level}</span>
                    <button className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40">
                      <Bookmark size={14} />
                    </button>
                  </div>
                  <div className="p-5 pb-6">
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal">{course.category}</div>
                    <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink">{course.title}</h3>
                    <p className="mb-3.5 text-xs text-muted">Par {course.instructor}</p>
                    <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
                      <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> {course.rating} <span className="text-muted">({course.reviews})</span></span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
                    <div className={`font-heading ${course.price === 'Gratuit' ? 'text-sm font-bold text-teal' : 'text-lg font-black text-ink'}`}>{course.price}</div>
                    <Link href={`/cours/${course.id}/apprendre`} className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80 flex items-center gap-2">
                      <PlayCircle size={16} /> Suivre
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:bg-cream">←</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold font-bold text-ink">1</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-ink hover:bg-cream">2</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-ink hover:bg-cream">3</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:bg-cream">→</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
