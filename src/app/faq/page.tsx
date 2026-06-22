"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  GraduationCap,
  CreditCard,
  ShieldCheck,
  Users,
  Mail,
} from "lucide-react";

/* ----------------------------------------------------------------
   Donnees — Categories et questions
   ---------------------------------------------------------------- */

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  label: string;
  icon: typeof GraduationCap;
  items: FAQItem[];
};

const categories: FAQCategory[] = [
  {
    id: "inscription",
    label: "Inscription et compte",
    icon: GraduationCap,
    items: [
      {
        question: "Comment creer un compte sur Dɔni ?",
        answer:
          "Rendez-vous sur la page d'inscription, renseignez votre adresse email ou votre numero de telephone, choisissez un mot de passe securise et validez votre compte via le lien de confirmation recu par email. Vous pouvez egalement vous inscrire via votre compte Google ou Facebook.",
      },
      {
        question: "L'inscription est-elle gratuite ?",
        answer:
          "Oui, la creation d'un compte est entierement gratuite. Vous beneficiez d'un acces au catalogue et a plusieurs formations gratuites sans aucun engagement. Les formations payantes et les abonnements sont optionnels.",
      },
      {
        question: "Comment recuperer mon mot de passe ?",
        answer:
          "Sur la page de connexion, cliquez sur « Mot de passe oublie ». Un lien de reinitialisation sera envoye a votre adresse email. Ce lien est valide pendant 30 minutes pour des raisons de securite.",
      },
      {
        question: "Puis-je modifier mes informations personnelles ?",
        answer:
          "Oui. Accedez a votre espace profil, puis a l'onglet « Parametres ». Vous pouvez modifier votre nom, votre photo de profil, votre adresse email et vos preferences de notification a tout moment.",
      },
    ],
  },
  {
    id: "formations",
    label: "Formations et apprentissage",
    icon: GraduationCap,
    items: [
      {
        question: "Comment fonctionne une formation sur Dɔni ?",
        answer:
          "Chaque formation est composee de modules contenant des videos HD, des documents telechargeables (PDF, texte) et des quiz d'evaluation. Vous progressez a votre rythme et votre avancement est sauvegarde automatiquement.",
      },
      {
        question: "Les formations sont-elles accessibles hors ligne ?",
        answer:
          "Les documents PDF et textes sont telechargeables pour une consultation hors ligne. Les videos necessitent une connexion internet en raison de leur taille et de la protection des droits d'auteur.",
      },
      {
        question: "Puis-je suivre plusieurs formations simultanement ?",
        answer:
          "Oui, vous pouvez vous inscrire a autant de formations que vous le souhaitez. Votre tableau de bord vous permet de suivre votre progression sur chacune d'entre elles de maniere independante.",
      },
      {
        question: "Combien de temps ai-je pour terminer une formation ?",
        answer:
          "Les formations en libre acces n'ont pas de limite de temps. Les formations liées a un abonnement restent accessibles tant que votre abonnement est actif. Les formations achetees individuellement sont accessibles a vie.",
      },
      {
        question: "Comment obtenir un certificat de reussite ?",
        answer:
          "Le certificat est genere automatiquement apres la completion de tous les modules obligatoires et la reussite des quiz d'evaluation avec un score minimum de 70 %. Vous pouvez le telecharger en format PDF depuis votre espace profil.",
      },
    ],
  },
  {
    id: "paiement",
    label: "Paiement et abonnements",
    icon: CreditCard,
    items: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Dɔni accepte les cartes bancaires (Visa, Mastercard, American Express), les paiements via PayPal et les virements bancaires pour les abonnements entreprise. Toutes les transactions sont securisees et chiffrees conformement au RGPD.",
      },
      {
        question: "Puis-je resilier mon abonnement a tout moment ?",
        answer:
          "Oui. Vous pouvez resilier votre abonnement a tout moment depuis votre espace profil, onglet « Paiements ». La resiliation prend effet a la fin de la periode de facturation en cours. Aucun frais de resiliation n'est applique.",
      },
      {
        question: "Proposez-vous des reductions etudiantes ou chomeurs ?",
        answer:
          "Dɔni propose des tarifs preferentiels pour les etudiants, les demandeurs d'emploi et les apprenants resident dans les pays a revenu intermediaire. Contactez-nous a contact@doni.ml avec un justificatif pour beneficier de ces tarifs.",
      },
      {
        question: "Comment obtenir un remboursement ?",
        answer:
          "Vous disposez d'un delai de 14 jours apres l'achat d'une formation pour demander un remboursement integral, sans justification, conformement a la reglementation en vigueur. La demande doit etre adressee a contact@doni.ml.",
      },
    ],
  },
  {
    id: "securite",
    label: "Securite et confidentialite",
    icon: ShieldCheck,
    items: [
      {
        question: "Comment mes donnees personnelles sont-elles protegees ?",
        answer:
          "Dɔni applique un chiffrement de bout en bout pour toutes les donnees personnelles et bancaires. Notre politique de confidentialite, conforme au RGPD, detaille l'ensemble des mesures techniques et organisationnelles mises en oeuvre.",
      },
      {
        question: "Dɔni partage-t-il mes donnees avec des tiers ?",
        answer:
          "Non. Dɔni ne vend ni ne loue vos donnees personnelles. Les donnees sont utilisees exclusivement pour le fonctionnement de la plateforme et l'amelioration de votre experience d'apprentissage. Les partenaires technologiques (paiement, hebergement) sont soumis a des accords de confidentialite stricts.",
      },
      {
        question: "Comment exercer mes droits RGPD ?",
        answer:
          "Vous pouvez exercer vos droits d'acces, de rectification, d'effacement et de portabilite depuis votre espace profil ou en ecrivant a notre DPO a l'adresse dpo@doni.ml. Nous nous engageons a repondre sous 30 jours maximum.",
      },
    ],
  },
  {
    id: "formateurs",
    label: "Formateurs et communaute",
    icon: Users,
    items: [
      {
        question: "Comment devenir formateur sur Dɔni ?",
        answer:
          "Rendez-vous sur la page « Devenir formateur » pour soumettre votre candidature. Notre equipe examine chaque profil sous 7 jours. Les criteres incluent l'expertise technique, l'experience pedagogique et la qualite du dossier soumis.",
      },
      {
        question: "Comment fonctionne le forum de discussion ?",
        answer:
          "Chaque formation dispose d'un forum dedie permettant aux apprenants d'echanger entre eux et avec le formateur. Les regles de la communaute sont disponibles dans les conditions generales d'utilisation. Tout contenu non conforme est modere par notre equipe.",
      },
      {
        question: "Puis-je contacter un formateur directement ?",
        answer:
          "Oui. Le systeme de messagerie integre permet d'envoyer des messages prives aux formateurs. Accedez-y depuis votre espace messages ou depuis la page de la formation.",
      },
    ],
  },
];

/* ----------------------------------------------------------------
   Composant FAQ
   ---------------------------------------------------------------- */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("inscription");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = searchQuery
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories;

  const displayedCategories = searchQuery
    ? filteredCategories
    : filteredCategories.filter((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* ---- En-tete ---- */}
      <section className="relative overflow-hidden border-b border-border bg-white">
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                FAQ
              </li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl font-black text-ink md:text-5xl">
            Questions frequentes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Trouvez rapidement les reponses a vos questions sur les formations,
            l'inscription, les paiements et l'utilisation de la plateforme Dɔni.
          </p>

          {/* Barre de recherche */}
          <div className="relative mt-8 max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full rounded-xl border border-border bg-cream/50 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Rechercher dans la FAQ"
            />
          </div>
        </div>
      </section>

      {/* ---- Contenu ---- */}
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Navigation laterale */}
          {!searchQuery && (
            <aside className="w-full shrink-0 lg:w-56">
              <nav aria-label="Categories de la FAQ">
                <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                            activeCategory === cat.id
                              ? "bg-gold/10 text-gold font-semibold"
                              : "text-muted hover:bg-white hover:text-ink"
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                          <span className="hidden sm:inline">{cat.label}</span>
                          <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}

          {/* Questions */}
          <div className="flex-1">
            {displayedCategories.length === 0 ? (
              <div className="rounded-2xl border border-border bg-white p-12 text-center">
                <p className="text-muted">
                  Aucun resultat ne correspond a votre recherche. Essayez avec
                  d'autres mots-cles ou{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-gold hover:underline"
                  >
                    contactez-nous
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayedCategories.map((cat) => (
                  <div key={cat.id}>
                    {!searchQuery && (
                      <h2 className="mb-4 font-heading text-xl font-bold text-ink">
                        {cat.label}
                      </h2>
                    )}
                    {searchQuery && (
                      <h2 className="mb-4 font-heading text-lg font-bold text-ink">
                        {cat.label}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {cat.items.map((item, index) => {
                        const itemKey = `${cat.id}-${index}`;
                        const isOpen = openItems[itemKey] || false;
                        return (
                          <div
                            key={itemKey}
                            className="overflow-hidden rounded-xl border border-border bg-white"
                          >
                            <button
                              onClick={() => toggleItem(itemKey)}
                              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream/40"
                              aria-expanded={isOpen}
                            >
                              <span className="text-sm font-semibold text-ink">
                                {item.question}
                              </span>
                              <ChevronDown
                                size={18}
                                strokeWidth={2}
                                className={`shrink-0 text-muted transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`grid transition-all duration-300 ${
                                isOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden">
                                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---- Bloc contact ---- */}
        <div className="mt-16 rounded-2xl border border-border bg-white p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
            <Mail size={26} strokeWidth={1.8} className="text-gold" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-ink">
            Vous ne trouvez pas votre reponse ?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Notre equipe support est disponible pour repondre a toutes vos
            questions. Nous nous engageons a vous repondre sous 48 heures.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/80"
          >
            Contacter le support
          </Link>
        </div>
      </section>
    </div>
  );
}
