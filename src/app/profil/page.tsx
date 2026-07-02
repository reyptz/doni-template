"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Settings, BookOpen, Award, CreditCard, Bell, Camera, ChevronRight, LogOut } from "lucide-react";
import { elearningApi, logout } from "@/lib/api";
import { useDoniUser, clearDoniUser } from "@/lib/session";

type Apprenant = {
  id: number;
  username: string;
  email: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  biographie?: string;
  avatarUrl?: string;
  statut?: string;
  dateInscription?: string;
};

type Inscription = {
  id: number;
  cours: {
    id: number;
    titre: string;
    categorie?: string;
    niveau?: string;
    dureeHeures?: number;
    formateurNom?: string;
  };
  statut: string;
  progressionPct?: number;
  dateInscription?: string;
  dateCompletion?: string;
};

export default function Profil() {
  const router = useRouter();
  const sessionUser = useDoniUser();
  const [activeTab, setActiveTab] = useState("formations");
  const [user, setUser] = useState<Apprenant | null>(null);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingInscriptions, setLoadingInscriptions] = useState(false);
  const [error, setError] = useState("");

  // Form state for settings tab
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", telephone: "", biographie: "" });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Role guard: staff should use /admin
  useEffect(() => {
    if (!sessionUser) return;
    const role = sessionUser.role?.toUpperCase();
    if (role === "ADMIN" || role === "FORMATEUR" || role === "INSTRUCTOR") {
      router.replace("/admin");
    }
  }, [sessionUser, router]);

  useEffect(() => {
    setLoadingProfile(true);
    elearningApi.get<Apprenant>("/auth/me")
      .then((data) => {
        setUser(data);
        setForm({
          nom: data.nom ?? "",
          prenom: data.prenom ?? "",
          email: data.email ?? "",
          telephone: data.telephone ?? "",
          biographie: data.biographie ?? "",
        });
      })
      .catch(() => setError("Impossible de charger le profil."))
      .finally(() => setLoadingProfile(false));
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    setLoadingInscriptions(true);
    elearningApi.get<Inscription[]>("/inscriptions/apprenant/" + user.id)
      .then(setInscriptions)
      .catch(() => setInscriptions([]))
      .finally(() => setLoadingInscriptions(false));
  }, [user?.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await elearningApi.put("/apprenants/" + user.id, { ...user, ...form });
      setUser((prev) => prev ? { ...prev, ...form } : prev);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    clearDoniUser();
    router.replace("/connexion");
  }

  const initiales = (
    (user?.prenom ?? user?.username ?? "?").charAt(0) +
    (user?.nom ?? "").charAt(0)
  ).toUpperCase();

  const tabs = [
    { id: "formations", label: "Mes formations", icon: BookOpen },
    { id: "certificats", label: "Mes certificats", icon: Award },
    { id: "paiements", label: "Abonnement & Paiements", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "parametres", label: "Paramètres du compte", icon: Settings },
  ];

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted text-sm">Chargement du profil…</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-coral text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* En-tête du profil */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-ink to-gray-800"></div>
          <div className="px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16 gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-teal text-4xl font-black text-white shadow-sm">
                    {initiales}
                  </div>
                  <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-md hover:bg-cream transition-colors">
                    <Camera size={14} />
                  </button>
                </div>
                <div className="text-center sm:text-left mb-2">
                  <h1 className="font-heading text-3xl font-black text-ink">
                    {user?.prenom && user?.nom
                      ? `${user.prenom} ${user.nom}`
                      : user?.username ?? ""}
                  </h1>
                  <p className="text-muted flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <Mail size={14} /> {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-coral transition-colors hover:bg-red-50"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Navigation latérale */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-2">
              <nav className="flex flex-col space-y-1">
                {tabs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gold/10 text-gold"
                          : "text-muted hover:bg-cream hover:text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.label}
                      </div>
                      {activeTab === item.id && <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">

            {/* Tab Formations */}
            {activeTab === "formations" && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-ink">En cours d'apprentissage</h2>
                {loadingInscriptions && (
                  <p className="text-muted text-sm">Chargement des formations…</p>
                )}
                {!loadingInscriptions && inscriptions.length === 0 && (
                  <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white text-center">
                    <BookOpen size={36} className="mb-3 text-border" />
                    <p className="text-sm text-muted">Aucune formation en cours.</p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {inscriptions.map((ins) => {
                    const pct = ins.progressionPct ?? 0;
                    const termine = ins.statut === "TERMINE";
                    return (
                      <div key={ins.id} className="overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md">
                        <div className={`h-32 flex items-center justify-center text-white relative ${termine ? "bg-gradient-to-br from-teal to-teal-900" : "bg-gradient-to-br from-ink to-gray-800"}`}>
                          <BookOpen size={32} className="opacity-80" />
                          {termine && (
                            <div className="absolute top-3 right-3 bg-white text-teal text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Award size={12} /> Terminé
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="mb-1 font-heading text-lg font-bold text-ink">{ins.cours.titre}</h3>
                          {ins.cours.formateurNom && (
                            <p className="mb-1 text-xs text-muted">{ins.cours.formateurNom}</p>
                          )}
                          {termine && ins.dateCompletion && (
                            <p className="mb-3 text-xs text-muted">
                              Terminé le {new Date(ins.dateCompletion).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          )}
                          {!termine && ins.dateInscription && (
                            <p className="mb-3 text-xs text-muted">
                              Inscrit le {new Date(ins.dateInscription).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          )}
                          <div className="mb-2 flex items-center justify-between text-xs text-ink font-medium">
                            <span>Progression</span>
                            <span className={termine ? "text-teal" : ""}>{pct}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
                            <div
                              className={`h-full rounded-full ${termine ? "bg-teal" : "bg-gold"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${termine ? "bg-teal/10 text-teal" : "bg-gold/10 text-gold"}`}>
                            {ins.statut === "EN_COURS" ? "En cours" : ins.statut === "TERMINE" ? "Terminé" : ins.statut}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab Certificats */}
            {activeTab === "certificats" && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-ink">Mes certificats</h2>
                {inscriptions.filter(i => i.statut === "TERMINE").length === 0 && (
                  <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white text-center">
                    <Award size={36} className="mb-3 text-border" />
                    <p className="text-sm text-muted">Aucun certificat disponible pour l'instant.</p>
                  </div>
                )}
                <div className="space-y-4">
                  {inscriptions.filter(i => i.statut === "TERMINE").map((ins) => (
                    <div key={ins.id} className="flex items-center justify-between rounded-2xl border border-border bg-white p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                          <Award size={24} className="text-gold" />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-ink">{ins.cours.titre}</p>
                          {ins.dateCompletion && (
                            <p className="text-xs text-muted mt-0.5">
                              Obtenu le {new Date(ins.dateCompletion).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-cream"
                      >
                        Imprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Paiements */}
            {activeTab === "paiements" && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white text-center">
                <CreditCard size={48} className="mb-4 text-border" />
                <h2 className="font-heading text-xl font-bold text-ink">Module disponible prochainement.</h2>
              </div>
            )}

            {/* Tab Notifications */}
            {activeTab === "notifications" && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white text-center">
                <Bell size={48} className="mb-4 text-border" />
                <h2 className="font-heading text-xl font-bold text-ink">Module disponible prochainement.</h2>
              </div>
            )}

            {/* Tab Paramètres */}
            {activeTab === "parametres" && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-ink">Paramètres du compte</h2>
                <div className="rounded-2xl border border-border bg-white p-6">
                  {saveSuccess && (
                    <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                      Modifications enregistrées avec succès.
                    </div>
                  )}
                  {error && (
                    <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-coral">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Prénom</label>
                        <input
                          type="text"
                          value={form.prenom}
                          onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                          className="appearance-none block w-full px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Nom</label>
                        <input
                          type="text"
                          value={form.nom}
                          onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                          className="appearance-none block w-full px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Adresse email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="appearance-none block w-full px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                        placeholder="vous@exemple.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={form.telephone}
                        onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                        className="appearance-none block w-full px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Biographie</label>
                      <textarea
                        rows={4}
                        value={form.biographie}
                        onChange={e => setForm(f => ({ ...f, biographie: e.target.value }))}
                        className="appearance-none block w-full px-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-cream/50 resize-none"
                        placeholder="Parlez-nous de vous…"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {saving ? "Enregistrement…" : "Enregistrer"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
