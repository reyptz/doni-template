"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Play,
  Monitor,
  BarChart3,
  Palette,
  Brain,
  Smartphone,
  Shield,
  Cloud,
  TrendingUp,
  Bookmark,
  Clock,
  Star,
  Quote,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Tous");

  // Scroll reveal effect
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
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative grid min-h-[85vh] grid-cols-1 items-center gap-0 overflow-hidden px-5 py-16 lg:grid-cols-2 lg:p-0">
        <div className="absolute -top-20 -right-30 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 items-center w-full">
          <div className="max-w-2xl pt-10 lg:pt-0">
            <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 text-sm font-semibold uppercase tracking-wider text-yellow-700">
              <span className="text-xs">✦</span> + de 50 000 apprenants actifs
            </div>
            <h1 className="reveal mb-6 font-heading text-4xl font-black leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl" data-delay="1">
              Maîtrisez les compétences qui <em className="relative text-coral not-italic after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-1.5 after:w-full after:rounded-full after:bg-gold-light">façonnent</em> demain
            </h1>
            <p className="reveal mb-9 max-w-xl text-lg font-light leading-relaxed text-muted" data-delay="2">
              Des formations conçues par des experts reconnus. Apprenez à votre rythme, obtenez des certifications valorisées par les meilleurs recruteurs.
            </p>
            <div className="reveal flex flex-wrap items-center gap-4" data-delay="3">
              <Link href="/catalogue" className="inline-flex items-center rounded-xl bg-gold px-6 py-3.5 text-base font-semibold text-ink shadow-[0_4px_14px_rgba(232,168,37,0.3)] transition-all hover:shadow-[0_8px_24px_rgba(232,168,37,0.45)] hover:-translate-y-0.5 active:scale-95">
                Explorer le catalogue
              </Link>
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-transparent px-6 py-3 text-base font-semibold text-ink transition-all hover:border-ink hover:-translate-y-0.5 active:scale-95">
                <Play size={18} /> Voir comment ça marche
              </button>
            </div>
            <div className="reveal mt-12 flex flex-wrap gap-10 border-t border-border pt-10" data-delay="4">
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">1 200+</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Cours disponibles</span>
              </div>
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">340+</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Formateurs experts</span>
              </div>
              <div>
                <strong className="block font-heading text-3xl font-black text-ink">94%</strong>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Taux de satisfaction</span>
              </div>
            </div>
          </div>

          <div className="reveal relative hidden h-[500px] w-full items-center justify-center lg:flex" data-delay="2">
            <div className="relative h-[460px] w-[380px]">
              {/* Card 1 */}
              <div className="absolute left-5 top-0 z-10 w-[340px] -rotate-3 rounded-2xl bg-ink p-7 text-white shadow-xl transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 hover:z-40">
                <div className="mb-3.5 inline-block rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white/80">En cours</div>
                <h3 className="mb-2 font-heading text-lg leading-tight text-white">Machine Learning avec Python</h3>
                <div className="mt-3 overflow-hidden rounded-full bg-white/10 h-1">
                  <div className="h-full w-[65%] rounded-full bg-white/60 transition-all duration-1000"></div>
                </div>
                <div className="mt-3.5 flex items-center gap-3 text-xs text-white/60">
                  <span>65% complété</span>
                  <span>· 4h restantes</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="absolute right-0 top-16 z-20 w-[320px] rotate-2 rounded-2xl bg-white p-7 shadow-xl transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 hover:z-40">
                <div className="mb-3.5 inline-block rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow-700">⭐ Populaire</div>
                <h3 className="mb-1.5 font-heading text-lg leading-tight text-ink">Design System & UX Avancé</h3>
                <p className="mt-1.5 text-xs text-muted">Par Camille Renard · Google</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Clock size={12} /> 18h de contenu</span>
                  <span className="flex items-center gap-1">🏆 Certifiant</span>
                </div>
              </div>
              {/* Card 3 */}
              <div className="absolute bottom-0 left-8 z-30 w-[300px] -rotate-1 rounded-2xl bg-gold p-7 shadow-xl transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 hover:z-40">
                <div className="mb-3.5 inline-block rounded-full bg-ink/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">Nouveau</div>
                <h3 className="mb-2 font-heading text-lg leading-tight text-ink">IA Générative pour les créatifs</h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-ink/70">
                  <span>🔥 2 300 inscrits</span>
                  <span>· Gratuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARTENAIRES ═══ */}
      <div className="border-y border-border bg-white py-8 px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-8 md:gap-12">
          <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.1em] text-muted">Certifications reconnues par</span>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {["Google", "Microsoft", "Meta", "Airbnb", "Spotify", "Stripe"].map((partner) => (
              <span key={partner} className="font-heading text-lg font-bold tracking-tight text-gray-300 transition-colors hover:text-ink">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CATÉGORIES ═══ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Explorer</span>
            <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Toutes les disciplines</h2>
          </div>
          <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
            Voir toutes les catégories →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
          {[
            { name: "Développement Web", count: "248 cours", icon: <Monitor size={28} strokeWidth={1.5} /> },
            { name: "Data Science", count: "134 cours", icon: <BarChart3 size={28} strokeWidth={1.5} /> },
            { name: "Design UX/UI", count: "98 cours", icon: <Palette size={28} strokeWidth={1.5} /> },
            { name: "Intelligence Artificielle", count: "76 cours", icon: <Brain size={28} strokeWidth={1.5} /> },
            { name: "Mobile", count: "62 cours", icon: <Smartphone size={28} strokeWidth={1.5} /> },
            { name: "Cybersécurité", count: "55 cours", icon: <Shield size={28} strokeWidth={1.5} /> },
            { name: "Cloud & DevOps", count: "88 cours", icon: <Cloud size={28} strokeWidth={1.5} /> },
            { name: "Marketing Digital", count: "104 cours", icon: <TrendingUp size={28} strokeWidth={1.5} /> },
          ].map((cat, i) => (
            <div key={cat.name} className="reveal group cursor-pointer rounded-2xl border-2 border-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg" data-delay={i % 4}>
              <div className="mb-3 text-ink transition-transform group-hover:scale-110 group-hover:text-gold">{cat.icon}</div>
              <h3 className="mb-1 text-sm font-semibold text-ink">{cat.name}</h3>
              <p className="text-xs text-muted">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COURS POPULAIRES ═══ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Tendances</span>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Cours les plus populaires</h2>
            </div>
            <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-white p-1">
              {["Tous", "Gratuits", "Certifiants", "Nouveautés"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab ? "bg-ink text-white" : "bg-transparent text-muted hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Course 1 */}
            <div className="reveal group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-ink to-gray-800 text-white">
                <Brain size={48} strokeWidth={1} className="opacity-80 transition-transform group-hover:scale-110" />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Intermédiaire</span>
                <button className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40">
                  <Bookmark size={14} />
                </button>
              </div>
              <div className="p-5 pb-6">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal">Intelligence Artificielle</div>
                <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink">Deep Learning & Réseaux de Neurones</h3>
                <p className="mb-3.5 text-xs text-muted">Par Pr. Ahmed Benali · MIT</p>
                <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
                  <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> 4.9 <span className="text-muted">(2.4k)</span></span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 24h</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
                <div className="font-heading text-lg font-black text-ink">79 €</div>
                <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80">S'inscrire</button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="reveal group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl" data-delay="1">
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-teal to-teal-900 text-white">
                <BarChart3 size={48} strokeWidth={1} className="opacity-80 transition-transform group-hover:scale-110" />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Débutant</span>
                <button className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40">
                  <Bookmark size={14} />
                </button>
              </div>
              <div className="p-5 pb-6">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-coral">Data Science</div>
                <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink">Python pour la Data Science & Pandas</h3>
                <p className="mb-3.5 text-xs text-muted">Par Marie Dupont · Datacamp</p>
                <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
                  <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> 4.8 <span className="text-muted">(5.1k)</span></span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 16h</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
                <div className="font-sans text-sm font-bold text-teal">Gratuit</div>
                <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80">S'inscrire</button>
              </div>
            </div>

            {/* Course 3 */}
            <div className="reveal group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl" data-delay="2">
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-coral to-red-900 text-white">
                <Palette size={48} strokeWidth={1} className="opacity-80 transition-transform group-hover:scale-110" />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Avancé</span>
                <button className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40">
                  <Bookmark size={14} />
                </button>
              </div>
              <div className="p-5 pb-6">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-teal">Design UX/UI</div>
                <h3 className="mb-2.5 font-heading text-lg font-bold leading-snug text-ink">Design System complet avec Figma</h3>
                <p className="mb-3.5 text-xs text-muted">Par Lucie Martin · Google</p>
                <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted">
                  <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> 4.7 <span className="text-muted">(1.8k)</span></span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 20h</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
                <div className="font-heading text-lg font-black text-ink">59 €</div>
                <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80">S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARCOURS D'APPRENTISSAGE ═══ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="reveal relative grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[2rem] bg-ink p-8 md:p-14 lg:grid-cols-2 lg:gap-16">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.2)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-20 left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(26,127,116,0.2)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-gold">Parcours guidés</span>
            <h2 className="mb-5 font-heading text-3xl font-black leading-tight text-white md:text-4xl">De zéro à expert en 90 jours</h2>
            <p className="mb-8 text-base font-light leading-relaxed text-white/60">
              Nos parcours structurés vous guident pas à pas vers la maîtrise complète d'une discipline, avec un mentor dédié et des projets réels.
            </p>
            <Link href="/parcours" className="inline-flex items-center rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_4px_14px_rgba(232,168,37,0.3)] transition-all hover:shadow-[0_8px_24px_rgba(232,168,37,0.45)] hover:-translate-y-0.5 active:scale-95">
              Découvrir les parcours
            </Link>
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            {[
              { num: "01", title: "Évaluation de départ", desc: "Test adaptatif pour personnaliser votre parcours selon votre niveau actuel." },
              { num: "02", title: "Formation intensive modulaire", desc: "Cours vidéo, exercices pratiques et projets guidés avec feedback instantané." },
              { num: "03", title: "Projet capstone réel", desc: "Construisez un projet professionnel pour votre portfolio, coaché par un expert." },
              { num: "04", title: "Certification & placement", desc: "Obtenez votre certificat et accédez à notre réseau de +500 partenaires recruteurs." },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-heading text-sm font-black text-gold">
                  {step.num}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-white">{step.title}</h4>
                  <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMATEURS ═══ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Experts</span>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Apprenez des meilleurs</h2>
            </div>
            <Link href="/formateurs" className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
              Voir tous les formateurs →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { init: "AB", name: "Ahmed Benali", role: "Prof. IA · MIT", students: "24k", courses: "12", rating: "4.9", bg: "from-ink to-gray-800" },
              { init: "MD", name: "Marie Dupont", role: "Data Engineer · Datacamp", students: "51k", courses: "8", rating: "4.8", bg: "from-teal to-teal-900" },
              { init: "LM", name: "Lucie Martin", role: "Lead Designer · Google", students: "18k", courses: "6", rating: "4.7", bg: "from-coral to-red-900" },
              { init: "TL", name: "Thomas Leroy", role: "Solutions Arch. · Amazon", students: "37k", courses: "9", rating: "4.9", bg: "from-purple-600 to-indigo-900" },
            ].map((inst, i) => (
              <div key={inst.name} className="reveal rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl" data-delay={i % 4}>
                <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${inst.bg} font-heading text-2xl font-black text-white`}>
                  {inst.init}
                </div>
                <h3 className="mb-1 text-sm font-bold text-ink">{inst.name}</h3>
                <p className="mb-4 text-xs text-muted">{inst.role}</p>
                <div className="flex justify-center gap-4">
                  <div>
                    <strong className="block text-sm font-bold text-ink">{inst.students}</strong>
                    <span className="text-[10px] uppercase text-muted">élèves</span>
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-ink">{inst.courses}</strong>
                    <span className="text-[10px] uppercase text-muted">cours</span>
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-ink flex items-center justify-center gap-0.5">{inst.rating}<Star size={10} className="text-gold" fill="currentColor"/></strong>
                    <span className="text-[10px] uppercase text-muted">note</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEMOIGNAGES ═══ */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-12">
            <span className="mb-2.5 block text-xs font-bold uppercase tracking-[0.1em] text-coral">Témoignages</span>
            <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">Ils ont transformé leur carrière</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { text: "Grâce au parcours Data Science, j'ai décroché un poste de Data Analyst en seulement 3 mois. Les projets réels sont la vraie valeur ajoutée — mon portfolio a bluffé mes recruteurs.", init: "JR", name: "Julie Ravel", role: "Data Analyst · BNP Paribas", bg: "bg-coral" },
              { text: "Le cours AWS m'a permis de passer la certification en première tentative. Le contenu est très structuré et les exercices pratiques sont bien conçus. Je recommande vivement.", init: "KS", name: "Karim Saoudi", role: "Cloud Architect · Capgemini", bg: "bg-teal" },
              { text: "J'avais essayé d'autres plateformes mais Dɔni est différent. Les formateurs sont vraiment des praticiens, pas des théoriciens. J'ai appris plus en 2 mois qu'en 1 an ailleurs.", init: "AP", name: "Alice Petit", role: "Développeuse Mobile · Freelance", bg: "bg-purple-600" },
            ].map((testi, i) => (
              <div key={testi.name} className="reveal relative rounded-2xl border-2 border-border bg-white p-7" data-delay={i % 3}>
                <Quote className="absolute right-6 top-5 text-gold opacity-30" size={40} />
                <div className="mb-3.5 flex text-gold"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                <p className="mb-5 text-sm leading-relaxed text-muted">{testi.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${testi.bg} text-xs font-bold text-white`}>{testi.init}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{testi.name}</h4>
                    <p className="text-xs text-muted">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold to-[#f5c842] p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_width=%2260%22_height=%2260%22_viewBox=%220_0_60_60%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22none%22_fill-rule=%22evenodd%22%3E%3Cg_fill=%22%23000000%22_fill-opacity=%220.04%22%3E%3Cpath_d=%22M36_34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6_34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6_4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none" />
          <h2 className="relative z-10 mb-4 font-heading text-3xl font-black text-ink md:text-5xl">Commencez à apprendre dès aujourd'hui</h2>
          <p className="relative z-10 mx-auto mb-8 max-w-xl text-base text-ink/70">Accès gratuit à plus de 200 cours. Sans carte bancaire. Sans engagement.</p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <Link href="/inscription" className="rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-ink/90 hover:-translate-y-0.5 active:scale-95">Créer mon compte gratuit</Link>
            <Link href="/catalogue" className="rounded-xl border-2 border-ink/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-ink hover:-translate-y-0.5 active:scale-95">Explorer le catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
