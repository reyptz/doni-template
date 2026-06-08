import Link from "next/link";

function LinkedInIcon({ size = 17, strokeWidth = 1.8, ...props }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2" y="7" width="4" height="12" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon({ size = 17, strokeWidth = 1.8, ...props }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 4.5c-.8.4-1.6.7-2.5.8a4.3 4.3 0 00-7.4 3v1c-3.6-.2-6.8-1.9-8.9-4.6-.4.7-.6 1.5-.6 2.4 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.6v.1c0 2.3 1.6 4.2 3.7 4.6-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.5 3.5A8.6 8.6 0 012 19.5a12 12 0 006.5 1.9c7.8 0 12-6.5 12-12v-.5c.8-.6 1.5-1.3 2-2.1-.7.3-1.5.5-2.3.6z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon({ size = 17, strokeWidth = 1.8, ...props }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 3.87 2.69 7.14 6.43 7.86.47.09.64-.2.64-.45 0-.22-.01-.8-.01-1.57-2.61.56-3.16-1.26-3.16-1.26-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.06-.58.06-.58.95.07 1.45.98 1.45.98.84 1.44 2.2 1.02 2.74.78.09-.6.33-1.02.6-1.25-2.09-.24-4.29-1.05-4.29-4.66 0-1.03.37-1.87.98-2.53-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.62.98A9.1 9.1 0 0112 6.8c.81.004 1.63.11 2.4.32 1.82-1.24 2.62-.98 2.62-.98.52 1.3.19 2.26.09 2.5.61.66.98 1.5.98 2.53 0 3.62-2.2 4.42-4.3 4.66.34.29.65.86.65 1.75 0 1.26-.01 2.28-.01 2.59 0 .25.17.54.65.45C16.31 16.14 19 12.87 19 9c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------
   Donnees du pied de page
   ---------------------------------------------------------------- */

const footerColumns = [
  {
    id: "footer-apprendre",
    title: "Apprendre",
    links: [
      { label: "Catalogue", href: "/catalogue" },
      { label: "Parcours guides", href: "/parcours" },
      { label: "Certifications", href: "/certifications" },
      { label: "Projets pratiques", href: "/projets" },
    ],
  },
  {
    id: "footer-formateurs",
    title: "Formateurs",
    links: [
      { label: "Devenir formateur", href: "/devenir-formateur" },
      { label: "Nos experts", href: "/formateurs" },
      { label: "Partenariats", href: "/partenariats" },
      { label: "Entreprises", href: "/entreprises" },
    ],
  },
  {
    id: "footer-legal",
    title: "Legal",
    links: [
      { label: "Mentions legales", href: "/mentions-legales" },
      { label: "Politique de confidentialite", href: "/confidentialite" },
      { label: "Conditions d'utilisation", href: "/cgu" },
      { label: "Accessibilite", href: "/accessibilite" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    id: "social-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
  },
  {
    id: "social-twitter",
    label: "X (Twitter)",
    href: "https://x.com",
    icon: TwitterIcon,
  },
  {
    id: "social-github",
    label: "GitHub",
    href: "https://github.com",
    icon: GitHubIcon,
  },
];

/* ----------------------------------------------------------------
   Composant Footer
   ---------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer
      id="footer-principal"
      className="bg-ink text-cream/70"
      role="contentinfo"
      aria-label="Pied de page"
    >
      {/* ---- Contenu principal ---- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne marque */}
          <div id="footer-brand" className="sm:col-span-2 lg:col-span-1">
            <Link
              id="footer-logo"
              href="/"
              className="inline-flex items-center gap-2 group"
              aria-label="Dɔni — Accueil"
            >
              <span className="font-heading text-2xl font-black tracking-tight text-cream transition-colors group-hover:text-gold">
                Dɔni
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/50 max-w-xs">
              Plateforme de formation institutionnelle. Des parcours certifiants
              dispenses par des experts reconnus, pour les professionnels et les
              entreprises.
            </p>

            {/* Reseaux sociaux */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cream/[0.06] text-cream/40 transition-all duration-200 hover:bg-gold/15 hover:text-gold"
                  aria-label={social.label}
                >
                  <social.icon size={17} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes de navigation */}
          {footerColumns.map((column) => (
            <div key={column.id} id={column.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/90 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {column.links.map((link, index) => (
                  <li key={`${column.id}-${index}`}>
                    <Link
                      id={`${column.id}-link-${index}`}
                      href={link.href}
                      className="text-sm text-cream/50 transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Barre de copyright ---- */}
      <div className="border-t border-cream/[0.08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p id="footer-copyright" className="text-xs text-cream/35 text-center sm:text-left">
              &copy; 2026 Dɔni. Tous droits reserves. Plateforme de formation
              institutionnelle.
            </p>
            <div className="flex items-center gap-4">
              <Link
                id="footer-bottom-mentions"
                href="/mentions-legales"
                className="text-xs text-cream/35 transition-colors hover:text-cream/60"
              >
                Mentions legales
              </Link>
              <span className="text-cream/15" aria-hidden="true">|</span>
              <Link
                id="footer-bottom-confidentialite"
                href="/confidentialite"
                className="text-xs text-cream/35 transition-colors hover:text-cream/60"
              >
                Confidentialite
              </Link>
              <span className="text-cream/15" aria-hidden="true">|</span>
              <Link
                id="footer-bottom-accessibilite"
                href="/accessibilite"
                className="text-xs text-cream/35 transition-colors hover:text-cream/60"
              >
                Accessibilite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
