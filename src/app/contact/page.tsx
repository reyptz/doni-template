'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Send,
  CheckCircle,
  AlertCircle,
  Globe,
  MessageSquare,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const SUBJECTS = [
  'Information generale',
  'Support technique',
  'Partenariats et collaborations',
  'Inscription et acces',
  'Facturation et paiement',
  'Devenir formateur',
  'Presse et medias',
  'Autre demande',
];

const FAQ_ITEMS = [
  {
    question: 'Comment creer un compte sur la plateforme Dɔni ?',
    answer:
      'La creation de compte est gratuite et se fait en quelques etapes simples. Rendez-vous sur la page d\'inscription, renseignez vos informations personnelles, confirmez votre adresse e-mail et accedez immediatement a notre catalogue de formations gratuites.',
  },
  {
    question: 'Les certifications Dɔni sont-elles reconnues ?',
    answer:
      'Oui. Nos certifications sont reconnues par un reseau d\'entreprises et d\'institutions partenaires. Chaque certificat comporte un identifiant unique verifiable en ligne, garantissant son authenticite aupres des recruteurs et des employeurs.',
  },
  {
    question: 'Quels sont les modes de paiement acceptes ?',
    answer:
      'Nous acceptons les paiements par carte bancaire (Visa, Mastercard), les virements bancaires, ainsi que les paiements par mobile money (Orange Money, MTN Money, Wave). Des facilites de paiement sont disponibles pour les formations longues.',
  },
  {
    question: 'Puis-je suivre les cours a mon propre rythme ?',
    answer:
      'Absolument. L\'ensemble de nos formations est disponible en acces asynchrone, ce qui signifie que vous pouvez progresser a votre rythme, selon vos disponibilites. Les contenus restent accessibles sans limite de temps apres l\'inscription.',
  },
  {
    question: 'Comment devenir formateur sur Dɔni ?',
    answer:
      'Nous recherchons des experts motives et pedagogues. Soumettez votre candidature via le formulaire dedie sur notre site, accompagnee de votre curriculum vitae et d\'un plan de cours. Notre comite pedagogique evalue chaque candidature sous 10 jours ouvrables.',
  },
  {
    question: 'Proposez-vous des tarifs pour les entreprises et les institutions ?',
    answer:
      'Oui, nous proposons des offres sur mesure pour les entreprises, les universites et les organisations. Ces offres incluent un acces multi-utilisateurs, un tableau de bord de suivi, et un accompagnement dedie. Contactez-nous pour obtenir un devis.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  /* ---- form state ---- */
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---- FAQ state ---- */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ---- handlers ---- */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.lastName.trim()) newErrors.lastName = 'Le nom est requis.';
    if (!form.firstName.trim()) newErrors.firstName = 'Le prenom est requis.';

    if (!form.email.trim()) {
      newErrors.email = 'L\'adresse e-mail est requise.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
    }

    if (!form.subject) newErrors.subject = 'Veuillez selectionner un sujet.';
    if (!form.message.trim()) {
      newErrors.message = 'Le message est requis.';
    } else if (form.message.trim().length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  }

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  /* ---- render ---- */
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* ================================================================== */}
      {/*  Hero                                                              */}
      {/* ================================================================== */}
      <section className="relative bg-[#0d0d14] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #f7f4ef 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#e85d3a]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <MessageSquare className="w-4 h-4 text-[#e8a825]" />
              <span className="text-sm text-gray-300">Nous sommes a votre ecoute</span>
            </div>
            <h1
              id="contact-hero-title"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#f7f4ef] mb-6 leading-tight"
            >
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Une question, une suggestion ou une demande de partenariat ?
              Notre equipe vous repond sous 48 heures ouvrables.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Contact form + sidebar                                            */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ---- Form ---- */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12" id="form-success">
                    <div className="w-16 h-16 rounded-full bg-[#1a7f74]/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-[#1a7f74]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0d0d14] mb-4">
                      Message envoye avec succes
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Nous avons bien recu votre message. Notre equipe vous repondra
                      dans les meilleurs delais, sous 48 heures ouvrables.
                    </p>
                    <button
                      id="btn-new-message"
                      onClick={() => {
                        setIsSubmitted(false);
                        setForm({
                          firstName: '',
                          lastName: '',
                          email: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7f74] text-white font-semibold rounded-xl hover:bg-[#156b62] transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#0d0d14] mb-2">
                        Envoyez-nous un message
                      </h2>
                      <p className="text-gray-500">
                        Remplissez le formulaire ci-dessous et nous reviendrons vers
                        vous rapidement.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                      {/* Name row */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="field-lastName"
                            className="block text-sm font-semibold text-[#0d0d14] mb-2"
                          >
                            Nom <span className="text-[#e85d3a]">*</span>
                          </label>
                          <input
                            id="field-lastName"
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
                              errors.lastName
                                ? 'border-[#e85d3a] focus:ring-[#e85d3a]/30'
                                : 'border-gray-200 focus:ring-[#1a7f74]/30 focus:border-[#1a7f74]'
                            }`}
                          />
                          {errors.lastName && (
                            <p className="flex items-center gap-1.5 mt-2 text-xs text-[#e85d3a]">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="field-firstName"
                            className="block text-sm font-semibold text-[#0d0d14] mb-2"
                          >
                            Prenom <span className="text-[#e85d3a]">*</span>
                          </label>
                          <input
                            id="field-firstName"
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Votre prenom"
                            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
                              errors.firstName
                                ? 'border-[#e85d3a] focus:ring-[#e85d3a]/30'
                                : 'border-gray-200 focus:ring-[#1a7f74]/30 focus:border-[#1a7f74]'
                            }`}
                          />
                          {errors.firstName && (
                            <p className="flex items-center gap-1.5 mt-2 text-xs text-[#e85d3a]">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="field-email"
                          className="block text-sm font-semibold text-[#0d0d14] mb-2"
                        >
                          Adresse e-mail <span className="text-[#e85d3a]">*</span>
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
                            errors.email
                              ? 'border-[#e85d3a] focus:ring-[#e85d3a]/30'
                              : 'border-gray-200 focus:ring-[#1a7f74]/30 focus:border-[#1a7f74]'
                          }`}
                        />
                        {errors.email && (
                          <p className="flex items-center gap-1.5 mt-2 text-xs text-[#e85d3a]">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="field-subject"
                          className="block text-sm font-semibold text-[#0d0d14] mb-2"
                        >
                          Sujet <span className="text-[#e85d3a]">*</span>
                        </label>
                        <select
                          id="field-subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer ${
                            errors.subject
                              ? 'border-[#e85d3a] focus:ring-[#e85d3a]/30'
                              : 'border-gray-200 focus:ring-[#1a7f74]/30 focus:border-[#1a7f74]'
                          } ${!form.subject ? 'text-gray-400' : 'text-[#0d0d14]'}`}
                        >
                          <option value="" disabled>
                            Selectionnez un sujet
                          </option>
                          {SUBJECTS.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="flex items-center gap-1.5 mt-2 text-xs text-[#e85d3a]">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="field-message"
                          className="block text-sm font-semibold text-[#0d0d14] mb-2"
                        >
                          Message <span className="text-[#e85d3a]">*</span>
                        </label>
                        <textarea
                          id="field-message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Decrivez votre demande en detail..."
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${
                            errors.message
                              ? 'border-[#e85d3a] focus:ring-[#e85d3a]/30'
                              : 'border-gray-200 focus:ring-[#1a7f74]/30 focus:border-[#1a7f74]'
                          }`}
                        />
                        {errors.message && (
                          <p className="flex items-center gap-1.5 mt-2 text-xs text-[#e85d3a]">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {form.message.length} / 2000 caracteres
                        </p>
                      </div>

                      {/* Submit */}
                      <button
                        id="btn-submit-contact"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a7f74] text-white font-semibold rounded-xl hover:bg-[#156b62] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer le message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-400">
                        Les champs marques d'un asterisque (*) sont obligatoires. Vos
                        donnees personnelles sont traitees conformement a notre politique
                        de confidentialite.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* ---- Sidebar ---- */}
            <div className="space-y-8">
              {/* Contact info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-[#0d0d14] mb-6">
                  Informations de contact
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4" id="contact-address">
                    <div className="w-10 h-10 rounded-xl bg-[#1a7f74]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#1a7f74]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d0d14] text-sm mb-1">Adresse</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        ACI 2000
                        <br />
                        Bamako, Mali
                        <br />
                        BP 91096
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" id="contact-phone">
                    <div className="w-10 h-10 rounded-xl bg-[#1a7f74]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#1a7f74]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d0d14] text-sm mb-1">Telephone</p>
                      <p className="text-sm text-gray-600">+223 63 23 45 67</p>
                      <p className="text-sm text-gray-600">+223 77 90 12 34</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" id="contact-email">
                    <div className="w-10 h-10 rounded-xl bg-[#1a7f74]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#1a7f74]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d0d14] text-sm mb-1">E-mail</p>
                      <p className="text-sm text-gray-600">contact@doni.edu</p>
                      <p className="text-sm text-gray-600">support@doni.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" id="contact-web">
                    <div className="w-10 h-10 rounded-xl bg-[#1a7f74]/10 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-[#1a7f74]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d0d14] text-sm mb-1">Site web</p>
                      <p className="text-sm text-gray-600">www.doni.edu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" id="office-hours">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-5 h-5 text-[#e8a825]" />
                  <h3 className="text-lg font-bold text-[#0d0d14]">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-semibold text-[#0d0d14]">08h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-semibold text-[#0d0d14]">09h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-semibold text-[#e85d3a]">Ferme</span>
                  </div>
                  <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                    Fuseau horaire : GMT (Bamako)
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                id="map-placeholder"
                className="bg-[#0d0d14] rounded-2xl overflow-hidden h-64 relative"
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, #f7f4ef 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-[#e85d3a]/20 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-[#e85d3a]" />
                  </div>
                  <p className="text-sm font-semibold text-[#f7f4ef] mb-1">
                    Siege social Dɔni
                  </p>
                  <p className="text-xs text-gray-400">
                    ACI 2000, Bamako
                  </p>
                  <a
                    id="link-map-external"
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#e8a825] hover:text-[#d69a20] font-medium transition-colors"
                  >
                    Voir sur Google Maps
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FAQ                                                               */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white" id="section-faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#1a7f74] uppercase tracking-wider">
              Questions frequentes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0d0d14] mt-4">
              Foire aux questions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Retrouvez les reponses aux questions les plus frequemment posees
              par nos apprenants et partenaires.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                id={`faq-item-${index}`}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  id={`btn-faq-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-[#f7f4ef] hover:bg-gray-100 transition-colors"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="text-base font-semibold text-[#0d0d14] pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                  role="region"
                  aria-labelledby={`btn-faq-${index}`}
                >
                  <div className="px-6 py-5 bg-white">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
