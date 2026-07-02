import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Accessibility } from "lucide-react";

export const metadata: Metadata = {
  title: "Declaration d'accessibilite — Dɔni",
  description:
    "Declaration d'accessibilite de la plateforme Dɔni. Engagement en faveur de l'accessibilite numerique conformement au RGAA.",
};

export default function AccessibilitePage() {
  return (
    <>
      <div
        id="accessibilite-main"
        className="flex-1 bg-[#f7f4ef]"
      >
        {/* Breadcrumb */}
        <nav
          id="accessibilite-breadcrumb"
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
              Accessibilite
            </span>
          </div>
        </nav>

        {/* Content */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a7f74]/10">
                <Accessibility className="h-5 w-5 text-[#1a7f74]" />
              </div>
              <p className="font-['DM_Sans',sans-serif] text-sm font-medium uppercase tracking-wider text-[#1a7f74]">
                Engagement qualite
              </p>
            </div>
            <h1
              id="accessibilite-title"
              className="font-['Playfair_Display',serif] text-3xl font-bold leading-tight text-[#0d0d14] sm:text-4xl"
            >
              Declaration d&apos;accessibilite
            </h1>
            <p className="mt-4 font-['DM_Sans',sans-serif] text-base leading-relaxed text-[#0d0d14]/60">
              Dɔni SAS s&apos;engage a rendre sa plateforme de formation en
              ligne accessible conformement au Referentiel General
              d&apos;Amelioration de l&apos;Accessibilite (RGAA). La presente
              declaration d&apos;accessibilite s&apos;applique au site doni.ml.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">
            {/* Etat de conformite */}
            <section id="accessibilite-conformite" aria-labelledby="conformite-heading">
              <h2
                id="conformite-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                1. Etat de conformite
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <div className="rounded-lg border border-[#e8a825]/30 bg-[#e8a825]/5 p-4">
                  <p className="font-semibold text-[#0d0d14]">
                    Conformite partielle
                  </p>
                  <p className="mt-1">
                    Le site doni.ml est en conformite partielle avec le RGAA
                    version 4.1. Les non-conformites et les eventuelles
                    derogations sont detaillees ci-dessous.
                  </p>
                </div>
                <p>
                  L&apos;audit de conformite a ete realise en interne. Un audit
                  externe est programme pour le second semestre 2026 afin de
                  valider et ameliorer le niveau de conformite.
                </p>
              </div>
            </section>

            {/* Resultats des tests */}
            <section id="accessibilite-resultats" aria-labelledby="resultats-heading">
              <h2
                id="resultats-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                2. Resultats des tests
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  L&apos;audit de conformite interne revele les resultats suivants :
                </p>
                <div className="mt-4 overflow-hidden rounded-lg border border-[#0d0d14]/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0d0d14]/5">
                        <th className="px-4 py-3 text-left font-semibold text-[#0d0d14]">
                          Critere
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-[#0d0d14]">
                          Taux de conformite
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0d0d14]/5">
                      <tr>
                        <td className="px-4 py-3">Images</td>
                        <td className="px-4 py-3">100 %</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Couleurs et contrastes</td>
                        <td className="px-4 py-3">90 %</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Structuration de l&apos;information</td>
                        <td className="px-4 py-3">95 %</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Navigation</td>
                        <td className="px-4 py-3">85 %</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Formulaires</td>
                        <td className="px-4 py-3">80 %</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Elements interactifs</td>
                        <td className="px-4 py-3">85 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Technologies utilisees */}
            <section id="accessibilite-technologies" aria-labelledby="technologies-heading">
              <h2
                id="technologies-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                3. Technologies utilisees
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Le site Dɔni repose sur les technologies suivantes :
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>HTML5 semantique</li>
                  <li>CSS3 avec Tailwind CSS</li>
                  <li>JavaScript / TypeScript</li>
                  <li>Next.js (framework React)</li>
                  <li>ARIA (Accessible Rich Internet Applications)</li>
                </ul>
                <p className="mt-3">
                  La plateforme est concue pour etre compatible avec les
                  technologies d&apos;assistance suivantes :
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Lecteurs d&apos;ecran (NVDA, JAWS, VoiceOver)</li>
                  <li>Navigation au clavier</li>
                  <li>Loupes d&apos;ecran et logiciels de grossissement</li>
                  <li>Commandes vocales</li>
                </ul>
              </div>
            </section>

            {/* Contenus non accessibles */}
            <section id="accessibilite-limites" aria-labelledby="limites-heading">
              <h2
                id="limites-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                4. Contenus non accessibles et limitations connues
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Les contenus suivants ne sont pas encore totalement
                  accessibles :
                </p>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Non-conformites
                </h3>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Certains contenus video ne disposent pas encore de
                    sous-titres ou de transcription textuelle. Un programme de
                    sous-titrage est en cours de deploiement.
                  </li>
                  <li>
                    Quelques composants interactifs complexes (editeur de code,
                    tableaux de bord) peuvent presenter des difficultes de
                    navigation au clavier. Des ameliorations sont prevues.
                  </li>
                  <li>
                    Certains documents PDF telechargeables ne sont pas encore
                    structures de maniere accessible.
                  </li>
                </ul>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Derogations pour charge disproportionnee
                </h3>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Les contenus multimedia interactifs integres de partenaires
                    tiers, dont la mise en accessibilite representerait une
                    charge disproportionnee. Des alternatives textuelles sont
                    proposees lorsque cela est possible.
                  </li>
                </ul>
                <h3 className="mt-4 font-semibold text-[#0d0d14]">
                  Contenus exempts
                </h3>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Les contenus de formations archives anterieurs a la mise en
                    place de la politique d&apos;accessibilite.
                  </li>
                </ul>
              </div>
            </section>

            {/* Ameliorations prevues */}
            <section id="accessibilite-ameliorations" aria-labelledby="ameliorations-heading">
              <h2
                id="ameliorations-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                5. Plan d&apos;amelioration
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Dɔni SAS s&apos;engage dans une demarche d&apos;amelioration continue
                  de l&apos;accessibilite de sa plateforme. Les actions suivantes
                  sont planifiees :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-[#0d0d14]">T3 2026 :</strong>{" "}
                    Audit externe d&apos;accessibilite par un organisme certifie
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">T4 2026 :</strong>{" "}
                    Sous-titrage systematique de l&apos;ensemble des contenus video
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">T1 2027 :</strong>{" "}
                    Amelioration de la navigation clavier sur les composants
                    interactifs complexes
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">T2 2027 :</strong>{" "}
                    Mise en accessibilite de l&apos;ensemble des documents PDF
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">En continu :</strong>{" "}
                    Formation des equipes de developpement et de creation de
                    contenu aux bonnes pratiques d&apos;accessibilite
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section id="accessibilite-contact" aria-labelledby="contact-access-heading">
              <h2
                id="contact-access-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                6. Signaler un probleme d&apos;accessibilite
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Si vous rencontrez un defaut d&apos;accessibilite vous empechant
                  d&apos;acceder a un contenu ou une fonctionnalite de la
                  plateforme, nous vous invitons a nous le signaler.
                </p>
                <div className="mt-4 rounded-lg border border-[#1a7f74]/20 bg-[#1a7f74]/5 p-6">
                  <p className="font-semibold text-[#0d0d14]">
                    Referent accessibilite
                  </p>
                  <p className="mt-1">Dɔni SAS</p>
                  <p className="mt-2">
                    Courriel :{" "}
                    <a
                      href="mailto:accessibilite@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      accessibilite@doni.ml
                    </a>
                  </p>
                </div>
                <p className="mt-4">
                  Nous nous engageons a apporter une reponse dans un delai de
                  cinq jours ouvrables. Si aucune solution satisfaisante n&apos;est
                  trouvee, vous pourrez saisir le Defenseur des droits selon la
                  procedure de recours decrite ci-dessous.
                </p>
              </div>
            </section>

            {/* Voies de recours */}
            <section id="accessibilite-recours" aria-labelledby="recours-heading">
              <h2
                id="recours-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                7. Voies de recours
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  Si vous constatez un defaut d&apos;accessibilite et que vous
                  n&apos;obtenez pas de reponse satisfaisante de notre part, vous
                  etes en droit de :
                </p>
                <ol className="ml-4 list-decimal space-y-3">
                  <li>
                    <strong className="text-[#0d0d14]">
                      Contacter le referent accessibilite de Dɔni
                    </strong>{" "}
                    a l&apos;adresse{" "}
                    <a
                      href="mailto:accessibilite@doni.ml"
                      className="text-[#1a7f74] underline transition-colors hover:text-[#155f57]"
                    >
                      accessibilite@doni.ml
                    </a>{" "}
                    pour signaler le probleme rencontre.
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Adresser un courrier recommande
                    </strong>{" "}
                    a Dɔni SAS a l&apos;adresse du siege social si le probleme
                    persiste apres un premier contact.
                  </li>
                  <li>
                    <strong className="text-[#0d0d14]">
                      Saisir le Defenseur des droits
                    </strong>{" "}
                    si, dans un delai raisonnable, aucune reponse ou solution
                    satisfaisante ne vous est apportee. Vous pouvez saisir le
                    Defenseur des droits par les moyens suivants :
                    <ul className="mt-2 ml-4 list-disc space-y-1">
                      <li>
                        Via le formulaire en ligne sur le site du Defenseur des
                        droits
                      </li>
                      <li>Par courrier postal (sans affranchissement)</li>
                      <li>
                        En contactant le delegue territorial le plus proche de
                        votre domicile
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </section>

            {/* Engagement */}
            <section id="accessibilite-engagement" aria-labelledby="engagement-heading">
              <h2
                id="engagement-heading"
                className="mb-4 border-b border-[#0d0d14]/10 pb-2 font-['Playfair_Display',serif] text-xl font-bold text-[#0d0d14]"
              >
                8. Notre engagement
              </h2>
              <div className="space-y-3 font-['DM_Sans',sans-serif] text-sm leading-relaxed text-[#0d0d14]/70">
                <p>
                  L&apos;accessibilite numerique est un enjeu fondamental pour Dɔni.
                  Nous croyons que l&apos;acces a la formation doit etre universel
                  et ne doit exclure personne. C&apos;est pourquoi nous nous
                  engageons a :
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    Integrer l&apos;accessibilite des la conception de tout nouveau
                    contenu et fonctionnalite
                  </li>
                  <li>
                    Former l&apos;ensemble de nos equipes aux enjeux et aux bonnes
                    pratiques de l&apos;accessibilite numerique
                  </li>
                  <li>
                    Realiser des audits reguliers pour evaluer et ameliorer
                    notre niveau de conformite
                  </li>
                  <li>
                    Prendre en compte les retours de nos utilisateurs pour
                    ameliorer continuellement l&apos;experience d&apos;accessibilite
                  </li>
                  <li>
                    Publier annuellement un rapport de conformite actualise
                  </li>
                </ul>
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
