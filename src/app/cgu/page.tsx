import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions generales d'utilisation — Dɔni",
  description:
    "Conditions generales d'utilisation de la plateforme Dɔni. Regles applicables a l'utilisation des services de formation en ligne.",
};

export default function CGUPage() {
  return (
    <>
      <main
        id="cgu-main"
        className="flex-1 bg-[#f7f4ef]"
      >
        {/* Breadcrumb */}
        <nav
          id="cgu-breadcrumb"
          aria-label="Fil d'Ariane"
          className="border-b border-[#0d0d14]/5 bg-[#f7f4ef]"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-['DM_Sans',sans-serif] text-sm text-[#0d0d14]/50 transition-colors hover:text-[#1a7f74]"
            >
              Accueil
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#0d0d14]/30" />
            <span className="font-['DM_Sans',sans-serif] text-sm font-medium text-[#0d0d14]">
              Conditions generales d&apos;utilisation
            </span>
          </div>
        </nav>

        {/* Content */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a7f74]/10">
                <FileText className="h-5 w-5 text-[#1a7f74]" />
              </div>
              <p className="font-['DM_Sans',sans-serif] text-sm font-medium uppercase tracking-wider text-[#1a7f74]">
                Cadre juridique
              </p>
            </div>
            <h1
              id="cgu-title"
              className="font-['Playfair_Display',serif] text-3xl font-bold leading-tight text-[#0d0d14] sm:text-4xl"
            >
              Conditions generales d&apos;utilisation
            </h1>
            <p className="mt-4 font-['DM_Sans',sans-serif] text-base leading-relaxed text-[#0d0d14]/60">
              Les presentes conditions generales d&apos;utilisation (ci-apres
              &laquo; CGU &raquo;) regissent l&apos;acces et l&apos;utilisation de la
              plateforme de formation en ligne Dɔni. L&apos;utilisation de la
              plateforme implique l&apos;acceptation pleine et entiere des presentes
              CGU.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">
            {/* Objet */}
            <section id="cgu-objet" aria-labelledby="objet-heading">
              <h2
                id="objet-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                1. Objet
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les presentes CGU ont pour objet de definir les conditions et
                  modalites d&apos;utilisation de la plateforme Dɔni, ainsi que les
                  droits et obligations des utilisateurs.
                </p>
                <p>
                  La plateforme Dɔni est un service de formation en ligne
                  propose par Dɔni SAS, permettant aux utilisateurs d&apos;acceder a
                  des contenus pedagogiques, de suivre des formations et
                  d&apos;obtenir des certificats de completion.
                </p>
              </div>
            </section>

            {/* Acces a la plateforme */}
            <section id="cgu-acces" aria-labelledby="acces-heading">
              <h2
                id="acces-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                2. Acces a la plateforme
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  La plateforme est accessible gratuitement a tout utilisateur
                  disposant d&apos;un acces a Internet. L&apos;acces a certains contenus
                  et fonctionnalites peut etre soumis a inscription prealable
                  et/ou au paiement d&apos;un abonnement.
                </p>
                <p>
                  Dɔni SAS se reserve le droit de suspendre ou d&apos;interrompre
                  temporairement l&apos;acces a la plateforme pour des raisons de
                  maintenance, de mise a jour ou pour toute autre raison
                  technique, sans que cela ne puisse engager sa responsabilite.
                </p>
                <p>
                  L&apos;utilisateur est responsable de la mise en place des moyens
                  informatiques et de telecommunications necessaires pour
                  acceder a la plateforme. Les frais de connexion et
                  d&apos;equipement restent a la charge exclusive de l&apos;utilisateur.
                </p>
              </div>
            </section>

            {/* Inscription */}
            <section id="cgu-inscription" aria-labelledby="inscription-heading">
              <h2
                id="inscription-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                3. Inscription et compte utilisateur
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Pour acceder a l&apos;ensemble des fonctionnalites de la
                  plateforme, l&apos;utilisateur doit creer un compte personnel en
                  fournissant des informations exactes, completes et a jour.
                </p>
                <p>
                  L&apos;utilisateur s&apos;engage a :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Fournir des informations veridiques lors de son inscription
                  </li>
                  <li>
                    Maintenir la confidentialite de ses identifiants de connexion
                  </li>
                  <li>
                    Ne pas ceder ou transferer son compte a un tiers
                  </li>
                  <li>
                    Informer immediatement Dɔni SAS de toute utilisation non
                    autorisee de son compte
                  </li>
                  <li>
                    Mettre a jour ses informations personnelles en cas de
                    changement
                  </li>
                </ul>
                <p>
                  Dɔni SAS se reserve le droit de suspendre ou supprimer tout
                  compte en cas de violation des presentes CGU, sans preavis ni
                  indemnite.
                </p>
              </div>
            </section>

            {/* Propriete intellectuelle */}
            <section id="cgu-propriete" aria-labelledby="propriete-cgu-heading">
              <h2
                id="propriete-cgu-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                4. Propriete intellectuelle
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  L&apos;ensemble des contenus disponibles sur la plateforme Dɔni
                  (textes, cours, videos, images, graphismes, logos, icones,
                  logiciels, bases de donnees) sont proteges par le droit de la
                  propriete intellectuelle et demeurent la propriete exclusive
                  de Dɔni SAS ou de ses partenaires.
                </p>
                <p>L&apos;utilisateur s&apos;engage a ne pas :</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Reproduire, copier, distribuer ou publier tout contenu de la
                    plateforme sans autorisation prealable ecrite
                  </li>
                  <li>
                    Modifier, adapter ou creer des oeuvres derivees a partir des
                    contenus de la plateforme
                  </li>
                  <li>
                    Utiliser les contenus a des fins commerciales sans
                    autorisation
                  </li>
                  <li>
                    Extraire systematiquement des donnees de la plateforme par
                    des moyens automatises
                  </li>
                </ul>
                <p>
                  L&apos;acces a la plateforme confere a l&apos;utilisateur un droit
                  d&apos;usage personnel, non exclusif et non cessible des contenus,
                  strictement limite a sa formation personnelle.
                </p>
              </div>
            </section>

            {/* Responsabilite */}
            <section id="cgu-responsabilite" aria-labelledby="responsabilite-heading">
              <h2
                id="responsabilite-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                5. Responsabilite
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <h3 className="font-semibold text-[#0d0d14]">
                  5.1 Responsabilite de Dɔni SAS
                </h3>
                <p>
                  Dɔni SAS s&apos;efforce d&apos;assurer la disponibilite et la qualite
                  de la plateforme. Toutefois, la plateforme est fournie
                  &laquo; en l&apos;etat &raquo; et Dɔni SAS ne saurait garantir
                  l&apos;absence d&apos;erreurs, de defauts ou d&apos;interruptions.
                </p>
                <p>
                  Dɔni SAS ne saurait etre tenue responsable des dommages
                  directs ou indirects resultant de l&apos;utilisation ou de
                  l&apos;impossibilite d&apos;utilisation de la plateforme, y compris en
                  cas de virus informatiques.
                </p>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  5.2 Responsabilite de l&apos;utilisateur
                </h3>
                <p>
                  L&apos;utilisateur est seul responsable de l&apos;utilisation qu&apos;il
                  fait de la plateforme et des contenus auxquels il accede. Il
                  s&apos;engage a utiliser la plateforme de maniere conforme aux
                  presentes CGU et a la legislation en vigueur.
                </p>
                <p>Il est notamment interdit de :</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    Utiliser la plateforme a des fins illicites ou contraires
                    aux bonnes moeurs
                  </li>
                  <li>
                    Porter atteinte a la securite ou au fonctionnement de la
                    plateforme
                  </li>
                  <li>
                    Usurper l&apos;identite d&apos;un tiers ou diffuser des informations
                    fausses
                  </li>
                  <li>
                    Collecter des donnees personnelles d&apos;autres utilisateurs
                  </li>
                </ul>
              </div>
            </section>

            {/* Donnees personnelles */}
            <section id="cgu-donnees" aria-labelledby="donnees-cgu-heading">
              <h2
                id="donnees-cgu-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                6. Donnees personnelles
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Le traitement des donnees personnelles des utilisateurs est
                  effectue conformement a notre{" "}
                  <Link
                    href="/confidentialite"
                    className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                  >
                    Politique de confidentialite
                  </Link>
                  , qui fait partie integrante des presentes CGU.
                </p>
                <p>
                  En utilisant la plateforme, l&apos;utilisateur reconnait avoir
                  pris connaissance de la Politique de confidentialite et
                  accepte les conditions de collecte et de traitement de ses
                  donnees personnelles qui y sont decrites.
                </p>
              </div>
            </section>

            {/* Modification des CGU */}
            <section id="cgu-modification" aria-labelledby="modification-heading">
              <h2
                id="modification-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                7. Modification des CGU
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Dɔni SAS se reserve le droit de modifier les presentes CGU a
                  tout moment. Les modifications prennent effet des leur
                  publication sur la plateforme. L&apos;utilisateur sera informe de
                  toute modification substantielle par notification sur la
                  plateforme ou par courrier electronique.
                </p>
                <p>
                  La poursuite de l&apos;utilisation de la plateforme apres la
                  publication des modifications vaut acceptation des nouvelles
                  CGU.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section id="cgu-droit" aria-labelledby="droit-cgu-heading">
              <h2
                id="droit-cgu-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                8. Droit applicable et juridiction competente
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les presentes CGU sont regies par le droit malien. Tout
                  litige relatif a l&apos;interpretation ou a l&apos;execution des
                  presentes CGU sera soumis a la competence exclusive des
                  tribunaux de Bamako, sous reserve des dispositions legales
                  imperatives applicables.
                </p>
                <p>
                  Prealablement a toute action judiciaire, les parties
                  s&apos;engagent a rechercher une solution amiable au litige.
                  L&apos;utilisateur peut egalement recourir a un mediateur de la
                  consommation dans les conditions prevues par la legislation
                  en vigueur.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="cgu-contact" aria-labelledby="contact-cgu-heading">
              <h2
                id="contact-cgu-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                9. Contact
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Pour toute question relative aux presentes Conditions
                  generales d&apos;utilisation, vous pouvez nous contacter :
                </p>
                <div className="mt-4 rounded-lg border border-[#1a7f74]/20 bg-[#1a7f74]/5 p-6">
                  <p className="font-semibold text-[#0d0d14]">Dɔni SAS</p>
                  <p className="mt-1">Bamako, Mali</p>
                  <p className="mt-2">
                    Courriel :{" "}
                    <a
                      href="mailto:contact@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      contact@doni.ml
                    </a>
                  </p>
                  <p>Telephone : +223 20 00 00 00</p>
                </div>
              </div>
            </section>
          </div>

          {/* Last updated */}
          <div className="mt-12 border-t border-[#0d0d14]/10 pt-6">
            <p className="font-['DM_Sans',sans-serif] text-xs text-[#0d0d14]/40">
              Derniere mise a jour : 3 juin 2026
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
