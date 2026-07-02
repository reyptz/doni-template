'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Target,
  Users,
  Award,
  Globe,
  BookOpen,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Building2,
  Handshake,
  ChevronRight,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const VALUES = [
  {
    icon: Target,
    title: 'Excellence pedagogique',
    description:
      'Chaque formation est concue selon les standards les plus exigeants, avec une approche pedagogique rigoureuse validee par des experts du domaine.',
  },
  {
    icon: Users,
    title: 'Accessibilite universelle',
    description:
      'Nous croyons que le savoir ne doit connaitre aucune frontiere. Nos formations sont accessibles a tous, quels que soient le lieu ou les moyens.',
  },
  {
    icon: Award,
    title: 'Certifications reconnues',
    description:
      'Nos parcours de formation aboutissent a des certifications reconnues par les entreprises et les institutions du monde entier.',
  },
  {
    icon: Globe,
    title: 'Impact global',
    description:
      'Presente dans plus de 45 pays, notre plateforme contribue au developpement des competences a l\'echelle mondiale, avec un engagement particulier envers le continent africain.',
  },
];

const STATS = [
  { value: 125000, suffix: '+', label: 'Apprenants formes', icon: Users },
  { value: 850, suffix: '+', label: 'Cours disponibles', icon: BookOpen },
  { value: 320, suffix: '', label: 'Formateurs experts', icon: GraduationCap },
  { value: 45, suffix: '', label: 'Pays representes', icon: Globe },
];

const TEAM = [
  {
    name: 'Dr. Amadou Diallo',
    role: 'Directeur General et Cofondateur',
    bio: 'Docteur en sciences de l\'education, 15 ans d\'experience dans l\'enseignement superieur en Afrique de l\'Ouest. Ancien conseiller aupres de l\'UNESCO.',
    initials: 'AD',
  },
  {
    name: 'Prof. Fatou Sow',
    role: 'Directrice Pedagogique',
    bio: 'Professeure agregee en ingenierie pedagogique. Specialiste de la formation a distance et des methodes d\'apprentissage innovantes.',
    initials: 'FS',
  },
  {
    name: 'Ibrahim Traore',
    role: 'Directeur Technique',
    bio: 'Ingenieur polytechnicien, ancien responsable technique chez plusieurs entreprises technologiques de premier plan en Europe et en Afrique.',
    initials: 'IT',
  },
  {
    name: 'Marie-Claire Kouassi',
    role: 'Directrice des Partenariats',
    bio: 'MBA de HEC Paris, 12 ans d\'experience dans le developpement de partenariats strategiques avec des institutions internationales.',
    initials: 'MK',
  },
];

const PARTNERS = [
  'Universite Cheikh Anta Diop',
  'Ecole Polytechnique de Dakar',
  'Institut Pasteur',
  'Banque Mondiale',
  'UNESCO',
  'Agence Francaise de Developpement',
  'Microsoft Education',
  'Google for Education',
];

const TIMELINE = [
  {
    year: '2019',
    title: 'La genese',
    description:
      'Fondation de Dɔni a Dakar par une equipe de chercheurs et d\'entrepreneurs passionnes par l\'education numerique.',
  },
  {
    year: '2020',
    title: 'Lancement de la plateforme',
    description:
      'Mise en ligne de la premiere version avec 50 cours et 5 000 apprenants inscrits des les premiers mois.',
  },
  {
    year: '2021',
    title: 'Expansion regionale',
    description:
      'Ouverture a 15 pays d\'Afrique de l\'Ouest et centrale. Partenariats avec des universites de reference.',
  },
  {
    year: '2022',
    title: 'Certifications internationales',
    description:
      'Obtention de l\'accreditation internationale. Lancement du programme de certifications reconnues.',
  },
  {
    year: '2023',
    title: 'Cap des 100 000 apprenants',
    description:
      'Franchissement du cap symbolique de 100 000 apprenants. Levee de fonds pour accelerer la croissance.',
  },
  {
    year: '2024',
    title: 'Intelligence artificielle',
    description:
      'Integration de l\'IA pour personnaliser les parcours d\'apprentissage. Lancement de l\'application mobile.',
  },
  {
    year: '2025',
    title: 'Rayonnement mondial',
    description:
      'Presence dans 45 pays. Plus de 850 cours et 320 formateurs experts. Reconnaissance comme plateforme de reference.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Animated counter hook                                                     */
/* -------------------------------------------------------------------------- */

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = performance.now();
          function animate(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const { count, ref } = useCountUp(stat.value);
  const IconComp = stat.icon;
  return (
    <div ref={ref} id={`stat-${index}`} className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
        <IconComp className="w-8 h-8 text-[#e8a825]" />
      </div>
      <p className="text-4xl md:text-5xl font-bold text-[#f7f4ef] mb-2">
        {count.toLocaleString('fr-FR')}
        {stat.suffix}
      </p>
      <p className="text-sm text-gray-400 uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* ================================================================== */}
      {/*  Hero                                                              */}
      {/* ================================================================== */}
      <section className="relative bg-[#0d0d14] overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #f7f4ef 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a7f74]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e8a825]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <Building2 className="w-4 h-4 text-[#e8a825]" />
              <span className="text-sm text-gray-300">A propos de Dɔni</span>
            </div>
            <h1
              id="hero-title"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f4ef] mb-8 leading-tight"
            >
              Notre mission : democratiser
              <br />
              <span className="text-[#e8a825]">l'acces au savoir</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Dɔni est ne de la conviction que chaque individu merite un acces egal a
              une education de qualite. Nous batissons la plateforme de formation de
              reference pour le continent africain et au-dela.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Mission statement                                                 */}
      {/* ================================================================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
                  Notre raison d'etre
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4 mb-6 leading-tight">
                  Former les talents de demain
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Dans un monde en constante evolution, l'acces a des competences actualisees
                  est un levier fondamental d'emancipation et de progres. Dɔni s'engage a
                  offrir des formations de haut niveau, concues par des experts, accessibles
                  depuis n'importe quel point du globe.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Notre approche pedagogique repose sur trois piliers : la rigueur
                  scientifique, l'apprentissage par la pratique et l'accompagnement
                  personnalise. Chaque apprenant beneficie d'un suivi adapte a son
                  rythme et a ses objectifs professionnels.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <blockquote className="text-lg text-[#0d0d14] leading-relaxed italic border-l-4 border-[#e8a825] pl-6">
                  "L'education est l'arme la plus puissante qu'on puisse utiliser pour
                  changer le monde. Avec Dɔni, nous mettons cette arme entre les mains
                  de chacun."
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a7f74] to-[#0d0d14] flex items-center justify-center text-white font-bold text-sm">
                    AD
                  </div>
                  <div>
                    <p className="font-semibold text-[#0d0d14]">Dr. Amadou Diallo</p>
                    <p className="text-sm text-gray-500">Cofondateur de Dɔni</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Values                                                            */}
      {/* ================================================================== */}
      <section className="py-20 bg-white" id="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
              Nos valeurs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4">
              Les principes qui nous guident
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, index) => {
              const IconComp = val.icon;
              return (
                <div
                  key={index}
                  id={`value-card-${index}`}
                  className="group bg-[#f7f4ef] rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1a7f74]/10 flex items-center justify-center mb-6 group-hover:bg-[#1a7f74] transition-colors">
                    <IconComp className="w-7 h-7 text-[#1a7f74] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0d0d14] mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Statistics                                                        */}
      {/* ================================================================== */}
      <section className="py-20 bg-[#0d0d14]" id="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#e8a825] uppercase tracking-wider">
              En chiffres
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#f7f4ef] mt-4">
              Notre impact en chiffres
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <StatCounter key={index} index={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Team / Leadership                                                 */}
      {/* ================================================================== */}
      <section className="py-20" id="section-team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
              Notre equipe
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4">
              Une equipe d'experts passionnes
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Des professionnels reconnus dans leurs domaines respectifs, unis par la
              volonte de transformer l'education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <div
                key={index}
                id={`team-card-${index}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#1a7f74] to-[#0d0d14] flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, #f7f4ef 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <span className="relative text-4xl font-bold text-white/90">
                    {member.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0d0d14] mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-[#1a7f74] mb-4">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Timeline                                                          */}
      {/* ================================================================== */}
      <section className="py-20 bg-white" id="section-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
              Notre histoire
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4">
              De la vision a la realite
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {TIMELINE.map((item, index) => (
              <div
                key={index}
                id={`timeline-${index}`}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Vertical line */}
                {index < TIMELINE.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-gray-200" />
                )}

                {/* Year dot */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#1a7f74] flex items-center justify-center shadow-lg shadow-[#1a7f74]/20">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <span className="inline-block text-sm font-bold text-[#e8a825] mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-[#0d0d14] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Partners                                                          */}
      {/* ================================================================== */}
      <section className="py-20" id="section-partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
              Nos partenaires
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Nous collaborons avec des institutions de premier plan pour garantir
              l'excellence de nos formations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                id={`partner-${index}`}
                className="bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <Handshake className="w-6 h-6 text-gray-300 group-hover:text-[#1a7f74] transition-colors" />
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-[#0d0d14] transition-colors text-center">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  CTA                                                               */}
      {/* ================================================================== */}
      <section className="py-20 bg-[#0d0d14]" id="section-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Lightbulb className="w-12 h-12 text-[#e8a825] mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#f7f4ef] mb-6">
              Rejoignez la communaute Dɔni
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Que vous soyez apprenant, formateur ou partenaire institutionnel,
              decouvrez comment Dɔni peut vous accompagner dans votre parcours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                id="cta-catalogue"
                href="/catalogue"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8a825] text-[#0d0d14] font-semibold rounded-2xl hover:bg-[#d69a20] transition-colors"
              >
                Explorer le catalogue
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                id="cta-contact"
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-[#f7f4ef] font-semibold rounded-2xl hover:bg-white/20 transition-colors"
              >
                Nous contacter
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
