import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de confidentialite — Dɔni",
  description:
    "Politique de confidentialite de la plateforme Dɔni. Informations sur la collecte, le traitement et la protection de vos donnees personnelles conformement au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <div
        id="confidentialite-main"
        className="flex-1 bg-[#f7f4ef]"
      >
        {/* Breadcrumb */}
        <nav
          id="confidentialite-breadcrumb"
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
              Politique de confidentialite
            </span>
          </div>
        </nav>

        {/* Content */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a7f74]/10">
                <Shield className="h-5 w-5 text-[#1a7f74]" />
              </div>
              <p className="font-['DM_Sans',sans-serif] text-sm font-medium uppercase tracking-wider text-[#1a7f74]">
                Protection des donnees
              </p>
            </div>
            <h1
              id="confidentialite-title"
              className="font-['Playfair_Display',serif] text-3xl font-bold leading-tight text-[#0d0d14] sm:text-4xl"
            >
              Politique de confidentialite
            </h1>
            <p className="mt-4 font-['DM_Sans',sans-serif] text-base leading-relaxed text-[#0d0d14]/60">
              Dɔni SAS s&apos;engage a proteger la vie privee de ses utilisateurs.
              La presente politique de confidentialite decrit les modalites de
              collecte, de traitement et de protection de vos donnees
              personnelles, conformement au Reglement General sur la Protection
              des Donnees (RGPD) et a la legislation en vigueur.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">
            {/* Responsable du traitement */}
            <section id="confidentialite-responsable" aria-labelledby="responsable-heading">
              <h2
                id="responsable-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                1. Responsable du traitement
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Le responsable du traitement des donnees personnelles est :
                </p>
                <ul className="ml-4 list-inside space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">Dɔni SAS</strong>
                  </li>
                  <li>Siege social : Bamako, Mali</li>
                  <li>
                    Contact :{" "}
                    <a
                      href="mailto:contact@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      contact@doni.ml
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Donnees collectees */}
            <section id="confidentialite-donnees" aria-labelledby="donnees-heading">
              <h2
                id="donnees-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                2. Donnees collectees
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Dans le cadre de l&apos;utilisation de la plateforme Dɔni, nous
                  sommes susceptibles de collecter les categories de donnees
                  suivantes :
                </p>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Donnees d&apos;identification
                </h3>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Nom et prenom</li>
                  <li>Adresse electronique</li>
                  <li>Numero de telephone (facultatif)</li>
                  <li>Photographie de profil (facultatif)</li>
                </ul>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Donnees de connexion et de navigation
                </h3>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et version</li>
                  <li>Systeme d&apos;exploitation</li>
                  <li>Pages consultees et horodatage</li>
                  <li>Duree des sessions</li>
                </ul>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Donnees pedagogiques
                </h3>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Formations suivies et progression</li>
                  <li>Resultats aux evaluations</li>
                  <li>Certificats obtenus</li>
                  <li>Interactions avec les contenus pedagogiques</li>
                </ul>
              </div>
            </section>

            {/* Finalites du traitement */}
            <section id="confidentialite-finalites" aria-labelledby="finalites-heading">
              <h2
                id="finalites-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                3. Finalites du traitement
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les donnees personnelles collectees sont traitees pour les
                  finalites suivantes :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">
                      Gestion des comptes utilisateurs :
                    </strong>{" "}
                    creation, administration et suppression des comptes
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Fourniture des services de formation :
                    </strong>{" "}
                    acces aux cours, suivi de progression, delivrance de
                    certificats
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Amelioration de la plateforme :
                    </strong>{" "}
                    analyse d&apos;usage, optimisation de l&apos;experience utilisateur
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Communication :
                    </strong>{" "}
                    notifications relatives aux formations, informations
                    institutionnelles
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Obligations legales :
                    </strong>{" "}
                    respect des obligations comptables, fiscales et reglementaires
                  </li>
                </ul>
              </div>
            </section>

            {/* Base juridique */}
            <section id="confidentialite-base-juridique" aria-labelledby="base-juridique-heading">
              <h2
                id="base-juridique-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                4. Base juridique du traitement
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les traitements de donnees personnelles mis en oeuvre reposent
                  sur les bases juridiques suivantes :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">
                      Execution du contrat (article 6.1.b du RGPD) :
                    </strong>{" "}
                    les traitements necessaires a la fourniture des services de
                    formation
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Consentement (article 6.1.a du RGPD) :
                    </strong>{" "}
                    les cookies non essentiels et les communications
                    promotionnelles
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Interet legitime (article 6.1.f du RGPD) :
                    </strong>{" "}
                    l&apos;amelioration de la plateforme et la securite du systeme
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Obligation legale (article 6.1.c du RGPD) :
                    </strong>{" "}
                    le respect des obligations legales et reglementaires
                  </li>
                </ul>
              </div>
            </section>

            {/* Duree de conservation */}
            <section id="confidentialite-duree" aria-labelledby="duree-heading">
              <h2
                id="duree-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                5. Duree de conservation
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les donnees personnelles sont conservees pendant une duree
                  proportionnee a la finalite pour laquelle elles ont ete
                  collectees :
                </p>
                <div className="mt-4 overflow-hidden rounded-lg border border-[#0d0d14]/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0d0d14]/5">
                        <th className="px-4 py-3 text-left font-semibold text-[#0d0d14]">
                          Type de donnees
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-[#0d0d14]">
                          Duree de conservation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0d0d14]/5">
                      <tr>
                        <td className="px-4 py-3">Donnees de compte</td>
                        <td className="px-4 py-3">
                          Duree de la relation contractuelle + 3 ans
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Donnees de connexion</td>
                        <td className="px-4 py-3">12 mois</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Donnees pedagogiques</td>
                        <td className="px-4 py-3">
                          Duree de la relation contractuelle + 5 ans
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Cookies</td>
                        <td className="px-4 py-3">13 mois maximum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Donnees de facturation</td>
                        <td className="px-4 py-3">10 ans (obligation legale)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Droits des utilisateurs */}
            <section id="confidentialite-droits" aria-labelledby="droits-heading">
              <h2
                id="droits-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                6. Droits des utilisateurs
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Conformement au RGPD, vous disposez des droits suivants
                  concernant vos donnees personnelles :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">Droit d&apos;acces :</strong>{" "}
                    obtenir la confirmation que vos donnees sont traitees et en
                    recevoir une copie
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit de rectification :
                    </strong>{" "}
                    demander la correction de donnees inexactes ou incompletes
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit a l&apos;effacement :
                    </strong>{" "}
                    demander la suppression de vos donnees dans les conditions
                    prevues par la reglementation
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit a la limitation :
                    </strong>{" "}
                    demander la restriction du traitement de vos donnees
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit a la portabilite :
                    </strong>{" "}
                    recevoir vos donnees dans un format structure et lisible par
                    machine
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit d&apos;opposition :
                    </strong>{" "}
                    vous opposer au traitement de vos donnees pour des motifs
                    legitimes
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Droit de retirer votre consentement :
                    </strong>{" "}
                    a tout moment, sans que cela n&apos;affecte la licite du
                    traitement effectue avant le retrait
                  </li>
                </ul>
                <p className="mt-4">
                  Pour exercer vos droits, veuillez adresser votre demande a
                  notre Delegue a la Protection des Donnees :{" "}
                  <a
                    href="mailto:dpo@doni.ml"
                    className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                  >
                    dpo@doni.ml
                  </a>
                </p>
                <p>
                  Vous disposez egalement du droit d&apos;introduire une reclamation
                  aupres de l&apos;autorite de controle competente.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="confidentialite-cookies" aria-labelledby="cookies-conf-heading">
              <h2
                id="cookies-conf-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                7. Cookies et technologies similaires
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  La plateforme Dɔni utilise des cookies et des technologies
                  similaires pour assurer son bon fonctionnement, ameliorer
                  l&apos;experience utilisateur et realiser des mesures d&apos;audience.
                </p>
                <p>Les types de cookies utilises sont :</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies essentiels :
                    </strong>{" "}
                    necessaires au fonctionnement technique de la plateforme
                    (authentification, session, securite). Ces cookies ne
                    necessitent pas votre consentement.
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies analytiques :
                    </strong>{" "}
                    permettent de mesurer l&apos;audience et de comprendre
                    l&apos;utilisation de la plateforme. Soumis a votre consentement.
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Cookies fonctionnels :
                    </strong>{" "}
                    permettent de personnaliser l&apos;interface et de memoriser vos
                    preferences. Soumis a votre consentement.
                  </li>
                </ul>
                <p>
                  Vous pouvez gerer vos preferences en matiere de cookies a tout
                  moment via le panneau de gestion des consentements accessible
                  depuis le pied de page du site.
                </p>
              </div>
            </section>

            {/* Transferts de donnees */}
            <section id="confidentialite-transferts" aria-labelledby="transferts-heading">
              <h2
                id="transferts-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                8. Transferts de donnees
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Certaines donnees peuvent etre transferees vers des
                  sous-traitants situes en dehors de l&apos;Espace Economique
                  Europeen (EEE), notamment dans le cadre de l&apos;hebergement de
                  la plateforme. Dans ce cas, des garanties appropriees sont
                  mises en place conformement a l&apos;article 46 du RGPD, telles
                  que :
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Les clauses contractuelles types de la Commission europeenne</li>
                  <li>
                    Les decisions d&apos;adequation de la Commission europeenne le cas
                    echeant
                  </li>
                </ul>
                <p>
                  La liste des sous-traitants et les garanties mises en place
                  sont disponibles sur demande aupres de notre DPO.
                </p>
              </div>
            </section>

            {/* Securite */}
            <section id="confidentialite-securite" aria-labelledby="securite-heading">
              <h2
                id="securite-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                9. Securite des donnees
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Dɔni SAS met en oeuvre des mesures techniques et
                  organisationnelles appropriees pour proteger vos donnees
                  personnelles contre tout acces non autorise, alteration,
                  divulgation ou destruction. Ces mesures incluent notamment :
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Le chiffrement des donnees en transit (TLS/SSL)</li>
                  <li>Le chiffrement des donnees au repos</li>
                  <li>Des controles d&apos;acces stricts et une authentification renforcee</li>
                  <li>Des audits de securite reguliers</li>
                  <li>La formation du personnel aux bonnes pratiques de securite</li>
                </ul>
              </div>
            </section>

            {/* Contact DPO */}
            <section id="confidentialite-contact-dpo" aria-labelledby="contact-dpo-heading">
              <h2
                id="contact-dpo-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                10. Contact du Delegue a la Protection des Donnees
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Pour toute question relative a la presente politique de
                  confidentialite ou pour exercer vos droits, vous pouvez
                  contacter notre Delegue a la Protection des Donnees (DPO) :
                </p>
                <div className="mt-4 rounded-lg border border-[#1a7f74]/20 bg-[#1a7f74]/5 p-6">
                  <p className="font-semibold text-[#0d0d14]">
                    Delegue a la Protection des Donnees
                  </p>
                  <p className="mt-1">Dɔni SAS</p>
                  <p>Bamako, Mali</p>
                  <p className="mt-2">
                    Courriel :{" "}
                    <a
                      href="mailto:dpo@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      dpo@doni.ml
                    </a>
                  </p>
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
      </div>
    </>
  );
}
