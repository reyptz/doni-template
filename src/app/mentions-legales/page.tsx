import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions legales — Dɔni",
  description:
    "Mentions legales de la plateforme Dɔni. Informations relatives a l'editeur, l'hebergement, la propriete intellectuelle et la protection des donnees.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <main
        id="mentions-legales-main"
        className="flex-1 bg-[#f7f4ef]"
      >
        {/* Breadcrumb */}
        <nav
          id="mentions-legales-breadcrumb"
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
              Mentions legales
            </span>
          </div>
        </nav>

        {/* Content */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a7f74]/10">
                <Scale className="h-5 w-5 text-[#1a7f74]" />
              </div>
              <p className="font-['DM_Sans',sans-serif] text-sm font-medium uppercase tracking-wider text-[#1a7f74]">
                Informations legales
              </p>
            </div>
            <h1
              id="mentions-legales-title"
              className="font-['Playfair_Display',serif] text-3xl font-bold leading-tight text-[#0d0d14] sm:text-4xl"
            >
              Mentions legales
            </h1>
            <p className="mt-4 font-['DM_Sans',sans-serif] text-base leading-relaxed text-[#0d0d14]/60">
              Conformement aux dispositions des articles 6-III et 19 de la Loi
              n&deg; 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;economie
              numerique, dite L.C.E.N., il est porte a la connaissance des
              utilisateurs et visiteurs du site les presentes mentions legales.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">
            {/* Editeur du site */}
            <section id="mentions-legales-editeur" aria-labelledby="editeur-heading">
              <h2
                id="editeur-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                1. Editeur du site
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Le site <strong className="text-[#0d0d14]">doni.ml</strong> est
                  edite par :
                </p>
                <ul className="ml-4 list-inside space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">Raison sociale :</strong>{" "}
                    Dɔni SAS
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Forme juridique :</strong>{" "}
                    Societe par Actions Simplifiee
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Capital social :</strong>{" "}
                    100 000 FCFA
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Immatriculation :
                    </strong>{" "}
                    RCS Bamako
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Siege social :</strong>{" "}
                    Bamako, Mali
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Directeur de la publication :
                    </strong>{" "}
                    Le Directeur General de Dɔni SAS
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Adresse electronique :
                    </strong>{" "}
                    <a
                      href="mailto:contact@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      contact@doni.ml
                    </a>
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Telephone :</strong>{" "}
                    +223 20 00 00 00
                  </li>
                </ul>
              </div>
            </section>

            {/* Hebergement */}
            <section id="mentions-legales-hebergement" aria-labelledby="hebergement-heading">
              <h2
                id="hebergement-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                2. Hebergement
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>Le site est heberge par :</p>
                <ul className="ml-4 list-inside space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">Raison sociale :</strong>{" "}
                    Vercel Inc.
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Adresse :</strong> 340
                    S Lemon Ave #4133, Walnut, CA 91789, Etats-Unis
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">Site web :</strong>{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      vercel.com
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Propriete intellectuelle */}
            <section
              id="mentions-legales-propriete-intellectuelle"
              aria-labelledby="propriete-heading"
            >
              <h2
                id="propriete-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                3. Propriete intellectuelle
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  L&apos;ensemble du contenu du site Dɔni, incluant de maniere non
                  limitative les textes, graphismes, images, photographies, sons,
                  videos, logos, icones, marques, logiciels et tout autre element,
                  est la propriete exclusive de Dɔni SAS ou de ses partenaires et
                  est protege par les lois nationales et internationales relatives
                  a la propriete intellectuelle.
                </p>
                <p>
                  Toute reproduction, representation, modification, publication,
                  transmission, denaturation, totale ou partielle du site ou de
                  son contenu, par quelque procede que ce soit, et sur quelque
                  support que ce soit, est interdite sans l&apos;autorisation ecrite
                  prealable de Dɔni SAS.
                </p>
                <p>
                  Toute exploitation non autorisee du site ou de son contenu, des
                  informations qui y sont diffusees, engagerait la responsabilite
                  de l&apos;utilisateur et constituerait une contrefacon sanctionnee
                  par les articles L.335-2 et suivants du Code de la Propriete
                  Intellectuelle.
                </p>
              </div>
            </section>

            {/* Protection des donnees */}
            <section
              id="mentions-legales-protection-donnees"
              aria-labelledby="protection-heading"
            >
              <h2
                id="protection-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                4. Protection des donnees personnelles
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Conformement au Reglement General sur la Protection des Donnees
                  (RGPD) et a la loi Informatique et Libertes du 6 janvier 1978
                  modifiee, les utilisateurs disposent d&apos;un droit d&apos;acces, de
                  rectification, de suppression, de limitation, de portabilite et
                  d&apos;opposition concernant leurs donnees personnelles.
                </p>
                <p>
                  Pour toute demande relative a vos donnees personnelles, vous
                  pouvez contacter notre Delegue a la Protection des Donnees
                  (DPO) a l&apos;adresse suivante :{" "}
                  <a
                    href="mailto:dpo@doni.ml"
                    className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                  >
                    dpo@doni.ml
                  </a>
                </p>
                <p>
                  Pour plus d&apos;informations sur le traitement de vos donnees,
                  veuillez consulter notre{" "}
                  <Link
                    href="/confidentialite"
                    className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                  >
                    Politique de confidentialite
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="mentions-legales-cookies" aria-labelledby="cookies-heading">
              <h2
                id="cookies-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                5. Cookies
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Le site Dɔni utilise des cookies afin d&apos;ameliorer
                  l&apos;experience utilisateur, de realiser des statistiques de
                  visite et de proposer des contenus adaptes. Lors de votre
                  premiere visite, un bandeau vous informe de l&apos;utilisation de
                  ces cookies et sollicite votre consentement.
                </p>
                <p>
                  Vous pouvez a tout moment modifier vos preferences en matiere
                  de cookies depuis les parametres de votre navigateur ou via
                  notre outil de gestion des consentements.
                </p>
                <p>Les categories de cookies utilises sont :</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies strictement necessaires :
                    </strong>{" "}
                    indispensables au fonctionnement du site
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies analytiques :
                    </strong>{" "}
                    mesure d&apos;audience et amelioration du service
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies fonctionnels :
                    </strong>{" "}
                    personnalisation de l&apos;experience utilisateur
                  </li>
                </ul>
              </div>
            </section>

            {/* Droit applicable */}
            <section
              id="mentions-legales-droit-applicable"
              aria-labelledby="droit-heading"
            >
              <h2
                id="droit-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                6. Droit applicable et juridiction competente
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les presentes mentions legales sont regies par le droit
                  malien. En cas de litige et apres l&apos;echec de toute tentative
                  de recherche d&apos;une solution amiable, les tribunaux de Bamako
                  seront seuls competents pour connaitre de ce differend.
                </p>
                <p>
                  L&apos;utilisateur est informe qu&apos;il peut en tout etat de cause
                  recourir a une mediation conventionnelle, ou a tout autre mode
                  alternatif de reglement des differends, en cas de contestation.
                </p>
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
