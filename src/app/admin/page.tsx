"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  DollarSign,
  LogOut,
  Search,
  Plus,
  Pencil,
  Trash2,
  Printer,
  Download,
} from "lucide-react";
import { elearningApi, logout } from "@/lib/api";
import { useDoniUser, clearDoniUser } from "@/lib/session";

// ─── Types ────────────────────────────────────────────────────────────────────

type Cours = {
  id: number;
  titre: string;
  description?: string;
  categorie?: string;
  niveau?: string;
  langue?: string;
  imageUrl?: string;
  dureeHeures?: number;
  prix?: number;
  statut?: string;
  formateurNom?: string;
  dateCreation?: string;
};

type Apprenant = {
  id: number;
  username: string;
  email: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  statut?: string;
  role?: string;
  dateInscription?: string;
};

type Inscription = {
  id: number;
  apprenant: { id: number; username: string; email: string };
  cours: { id: number; titre: string; categorie?: string };
  statut: string;
  progressionPct?: number;
  dateInscription?: string;
  dateCompletion?: string;
};

type ModalType =
  | "createCours"
  | "editCours"
  | "deleteCours"
  | "createApprenant"
  | "editApprenant"
  | "deleteApprenant"
  | "createInscription"
  | "deleteInscription"
  | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(s?: string) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("fr-FR");
  } catch {
    return s;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const user = useDoniUser();

  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Data
  const [cours, setCours] = useState<Cours[]>([]);
  const [apprenants, setApprenants] = useState<Apprenant[]>([]);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / form
  const [modal, setModal] = useState<ModalType>(null);
  const [current, setCurrent] = useState<Cours | Apprenant | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  // Print
  const [printCours, setPrintCours] = useState<Cours | null>(null);
  const [printApprenant, setPrintApprenant] = useState<Apprenant | null>(null);
  const [printInscription, setPrintInscription] = useState<Inscription | null>(null);

  // Filters
  const [searchUser, setSearchUser] = useState("");
  const [inscriptionFilter, setInscriptionFilter] = useState("Toutes");
  const [progressionInputs, setProgressionInputs] = useState<Record<number, number>>({});

  // Settings (local only)
  const [settingsForm, setSettingsForm] = useState({
    plateforme: "Dɔni",
    emailSupport: "support@doni.com",
  });

  // Role guard
  useEffect(() => {
    if (!user) return;
    const role = user.role?.toUpperCase();
    if (role !== "ADMIN" && role !== "FORMATEUR" && role !== "INSTRUCTOR") {
      router.replace("/profil");
    }
  }, [user, router]);

  // ── Fetch helpers ────────────────────────────────────────────────────────

  const fetchCours = useCallback(async () => {
    try {
      const data = await elearningApi.get<Cours[]>("/cours");
      setCours(data);
    } catch (e: any) {
      toast.error("Erreur chargement cours : " + e.message);
    }
  }, []);

  const fetchApprenants = useCallback(async () => {
    try {
      const data = await elearningApi.get<Apprenant[]>("/apprenants");
      setApprenants(data);
    } catch (e: any) {
      toast.error("Erreur chargement apprenants : " + e.message);
    }
  }, []);

  const fetchInscriptions = useCallback(async () => {
    try {
      const data = await elearningApi.get<Inscription[]>("/inscriptions");
      setInscriptions(data);
    } catch (e: any) {
      toast.error("Erreur chargement inscriptions : " + e.message);
    }
  }, []);

  // ── Initial load ─────────────────────────────────────────────────────────

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchCours(), fetchApprenants(), fetchInscriptions()]);
      setLoading(false);
    })();
  }, [fetchCours, fetchApprenants, fetchInscriptions]);

  // ── Logout ───────────────────────────────────────────────────────────────

  async function handleLogout() {
    await logout();
    clearDoniUser();
    router.replace("/connexion");
  }

  // ── Open modals ──────────────────────────────────────────────────────────

  function openCreateCours() {
    setForm({
      titre: "",
      description: "",
      categorie: "Développement Web",
      niveau: "Débutant",
      langue: "Français",
      formateurNom: "",
      dureeHeures: "",
      prix: 0,
      statut: "BROUILLON",
    });
    setCurrent(null);
    setModal("createCours");
  }

  function openEditCours(c: Cours) {
    setForm({
      titre: c.titre,
      description: c.description ?? "",
      categorie: c.categorie ?? "",
      niveau: c.niveau ?? "",
      langue: c.langue ?? "Français",
      formateurNom: c.formateurNom ?? "",
      dureeHeures: c.dureeHeures ?? "",
      prix: c.prix ?? 0,
      statut: c.statut ?? "BROUILLON",
    });
    setCurrent(c);
    setModal("editCours");
  }

  function openDeleteCours(c: Cours) {
    setCurrent(c);
    setModal("deleteCours");
  }

  function openEditApprenant(a: Apprenant) {
    setForm({
      username: a.username,
      email: a.email,
      nom: a.nom ?? "",
      prenom: a.prenom ?? "",
      telephone: a.telephone ?? "",
      role: a.role ?? "APPRENANT",
      statut: a.statut ?? "ACTIF",
    });
    setCurrent(a);
    setModal("editApprenant");
  }

  function openDeleteApprenant(a: Apprenant) {
    setCurrent(a);
    setModal("deleteApprenant");
  }

  function openCreateApprenant() {
    setForm({
      username: "",
      email: "",
      nom: "",
      prenom: "",
      telephone: "",
      password: "",
      role: "APPRENANT",
      statut: "ACTIF",
    });
    setCurrent(null);
    setModal("createApprenant");
  }

  function openCreateInscription() {
    setForm({ apprenantId: "", coursId: "" });
    setCurrent(null);
    setModal("createInscription");
  }

  function openDeleteInscription(i: Inscription) {
    setCurrent(i as unknown as Cours | Apprenant);
    setModal("deleteInscription");
  }

  function triggerPrintCours(c: Cours) {
    setPrintCours(c);
    setTimeout(() => window.print(), 100);
  }

  function triggerPrintApprenant(a: Apprenant) {
    setPrintApprenant(a);
    setTimeout(() => window.print(), 100);
  }

  function triggerPrintInscription(i: Inscription) {
    setPrintInscription(i);
    setTimeout(() => window.print(), 100);
  }

  // ── Save handlers ────────────────────────────────────────────────────────

  async function handleSaveCours() {
    if (!form.titre?.trim()) {
      toast.error("Le titre est requis");
      return;
    }
    setSaving(true);
    try {
      if (modal === "createCours") {
        await elearningApi.post("/cours", form);
        toast.success("Cours créé !");
      } else if (modal === "editCours" && current) {
        await elearningApi.put("/cours/" + (current as Cours).id, form);
        toast.success("Cours modifié !");
      }
      await fetchCours();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCours() {
    if (!current) return;
    setSaving(true);
    try {
      await elearningApi.del("/cours/" + (current as Cours).id);
      toast.success("Cours supprimé");
      await fetchCours();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveApprenant() {
    if (!form.username?.trim()) {
      toast.error("Le username est requis");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.password?.trim()) delete payload.password;
      await elearningApi.put("/apprenants/" + (current as Apprenant).id, payload);
      toast.success("Apprenant modifié !");
      await fetchApprenants();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteApprenant() {
    if (!current) return;
    setSaving(true);
    try {
      await elearningApi.del("/apprenants/" + (current as Apprenant).id);
      toast.success("Apprenant supprimé");
      await fetchApprenants();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateApprenant() {
    if (!form.username?.trim() || !form.email?.trim() || !form.password?.trim()) {
      toast.error("Username, email et mot de passe requis");
      return;
    }
    setSaving(true);
    try {
      await elearningApi.post("/auth/register", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        nom: form.nom ?? "",
        prenom: form.prenom ?? "",
        telephone: form.telephone ?? "",
        role: form.role ?? "APPRENANT",
        statut: form.statut ?? "ACTIF",
      });
      toast.success("Apprenant créé !");
      await fetchApprenants();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateInscription() {
    const apprenantId = Number(form.apprenantId);
    const coursId = Number(form.coursId);
    if (!apprenantId || !coursId) {
      toast.error("Sélectionnez un apprenant et un cours");
      return;
    }
    setSaving(true);
    try {
      await elearningApi.post("/inscriptions", { apprenantId, coursId });
      toast.success("Inscription créée !");
      await fetchInscriptions();
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteInscription() {
    const ins = current as unknown as Inscription;
    if (!ins?.id) return;
    setSaving(true);
    try {
      await elearningApi.del("/inscriptions/" + ins.id);
      toast.success("Inscription supprimée");
      await fetchInscriptions();
      setCurrent(null);
      setModal(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateProgression(id: number) {
    const val = progressionInputs[id];
    if (val === undefined || val < 0 || val > 100) {
      toast.error("Valeur 0-100 requise");
      return;
    }
    try {
      await elearningApi.patch("/inscriptions/" + id + "/progression", { progressionPct: val });
      toast.success("Progression mise à jour");
      await fetchInscriptions();
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  // ── Export CSV ───────────────────────────────────────────────────────────

  function exportCSV() {
    const csv = [
      "Titre,Catégorie,Prix,Statut",
      ...cours.map(
        (c) =>
          `"${c.titre}","${c.categorie ?? ""}","${c.prix ?? 0}","${c.statut ?? ""}"`
      ),
    ].join("\n");
    downloadCSV(csv, "cours.csv");
  }

  function exportApprenantsCSV() {
    const csv = [
      "ID,Username,Nom,Prénom,Email,Téléphone,Rôle,Statut,Date d'inscription",
      ...apprenants.map(
        (a) =>
          `"${a.id}","${a.username}","${a.nom ?? ""}","${a.prenom ?? ""}","${a.email}","${a.telephone ?? ""}","${a.role ?? "APPRENANT"}","${a.statut ?? ""}","${fmtDate(a.dateInscription) ?? ""}"`
      ),
    ].join("\n");
    downloadCSV(csv, "apprenants.csv");
  }

  function exportInscriptionsCSV() {
    const csv = [
      "ID,Apprenant,Email,Cours,Catégorie,Statut,Progression,Date d'inscription,Date de complétion",
      ...inscriptions.map(
        (i) =>
          `"${i.id}","${i.apprenant.username}","${i.apprenant.email}","${i.cours.titre}","${i.cours.categorie ?? ""}","${i.statut ?? ""}","${i.progressionPct ?? 0}%","${fmtDate(i.dateInscription) ?? ""}","${fmtDate(i.dateCompletion) ?? ""}"`
      ),
    ].join("\n");
    downloadCSV(csv, "inscriptions.csv");
  }

  function downloadCSV(csv: string, filename: string) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Form field updater ───────────────────────────────────────────────────

  function setField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // ── Computed values ──────────────────────────────────────────────────────

  const apprenantsActifs = apprenants.filter((a) => a.statut === "ACTIF").length;
  const coursPublies = cours.filter((c) => c.statut === "PUBLIE").length;
  const inscriptionsTotal = inscriptions.length;
  const formationsTerminees = inscriptions.filter((i) => i.statut === "TERMINE").length;

  const derniersCours = [...cours].slice(-5).reverse();
  const derniersApprenants = [...apprenants].slice(-5).reverse();

  const filteredApprenants = apprenants.filter((a) => {
    const q = searchUser.toLowerCase();
    return (
      !q ||
      a.username.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      (a.nom ?? "").toLowerCase().includes(q)
    );
  });

  const filteredInscriptions = inscriptions.filter((i) =>
    inscriptionFilter === "Toutes" ? true : i.statut === inscriptionFilter
  );

  const revenuPotentiel = cours
    .filter((c) => c.statut === "PUBLIE")
    .reduce((sum, c) => sum + (c.prix ?? 0), 0);
  const coursGratuits = cours.filter((c) => !c.prix || c.prix === 0).length;
  const coursPayants = cours.filter((c) => c.prix && c.prix > 0).length;
  const coursTries = [...cours].sort((a, b) => (b.prix ?? 0) - (a.prix ?? 0));

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-cream font-body overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-ink text-white flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <span className="font-heading text-2xl font-black text-white">
            Dɔni{" "}
            <span className="text-gold text-sm font-sans uppercase tracking-widest ml-1">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {[
            { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
            { id: "utilisateurs", label: "Utilisateurs", icon: Users },
            { id: "cours", label: "Gestion des cours", icon: BookOpen },
            { id: "moderation", label: "Modération", icon: MessageSquare },
            { id: "finances", label: "Finances", icon: DollarSign },
            { id: "parametres", label: "Paramètres", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeMenu === item.id
                    ? "bg-gold text-ink font-bold"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center font-bold text-xs text-white">
              {user?.username?.slice(0, 2).toUpperCase() ?? "AD"}
            </div>
            <div className="text-sm">
              <p className="font-bold">{user?.username ?? "Administrateur"}</p>
              <p className="text-white/50 text-xs">{user?.email ?? ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-coral hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-8">
          <h1 className="font-heading text-xl font-bold text-ink capitalize">
            {activeMenu === "dashboard"
              ? "Tableau de bord"
              : activeMenu === "utilisateurs"
              ? "Utilisateurs"
              : activeMenu === "cours"
              ? "Gestion des cours"
              : activeMenu === "moderation"
              ? "Modération"
              : activeMenu === "finances"
              ? "Finances"
              : "Paramètres"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={16}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="rounded-full bg-cream px-4 pl-9 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold border border-transparent focus:border-gold transition-all w-64"
              />
            </div>
            <span className="text-sm font-semibold text-ink">
              {user?.username ?? ""}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">

          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="h-8 w-8 rounded-full border-4 border-gold border-t-transparent animate-spin" />
            </div>
          )}

          {/* ── DASHBOARD ──────────────────────────────────────────────── */}
          {!loading && activeMenu === "dashboard" && (
            <div className="space-y-8">

              {/* Stats */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Apprenants actifs",
                    value: apprenantsActifs,
                    icon: Users,
                    color: "text-teal",
                    bg: "bg-teal/10",
                  },
                  {
                    label: "Cours publiés",
                    value: coursPublies,
                    icon: BookOpen,
                    color: "text-gold",
                    bg: "bg-gold/10",
                  },
                  {
                    label: "Inscriptions totales",
                    value: inscriptionsTotal,
                    icon: MessageSquare,
                    color: "text-blue-600",
                    bg: "bg-blue-600/10",
                  },
                  {
                    label: "Formations terminées",
                    value: formationsTerminees,
                    icon: LayoutDashboard,
                    color: "text-coral",
                    bg: "bg-coral/10",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <Icon size={20} />
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-muted">{stat.label}</h3>
                      <p className="font-heading text-2xl font-black text-ink mt-1">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Derniers apprenants */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-ink mb-4">
                    Derniers apprenants
                  </h3>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted">
                        <th className="pb-2 font-semibold">Username</th>
                        <th className="pb-2 font-semibold">Email</th>
                        <th className="pb-2 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {derniersApprenants.map((a) => (
                        <tr
                          key={a.id}
                          className="border-b border-border/40 hover:bg-cream/50"
                        >
                          <td className="py-2 font-medium text-ink">{a.username}</td>
                          <td className="py-2 text-muted text-xs">{a.email}</td>
                          <td className="py-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                a.statut === "ACTIF"
                                  ? "bg-teal/10 text-teal"
                                  : "bg-coral/10 text-coral"
                              }`}
                            >
                              {a.statut ?? "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {derniersApprenants.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-muted text-xs">
                            Aucun apprenant
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Derniers cours */}
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-ink mb-4">
                    Derniers cours
                  </h3>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted">
                        <th className="pb-2 font-semibold">Titre</th>
                        <th className="pb-2 font-semibold">Catégorie</th>
                        <th className="pb-2 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {derniersCours.map((c) => (
                        <tr
                          key={c.id}
                          className="border-b border-border/40 hover:bg-cream/50"
                        >
                          <td className="py-2 font-medium text-ink truncate max-w-[120px]">
                            {c.titre}
                          </td>
                          <td className="py-2 text-muted text-xs">{c.categorie ?? "—"}</td>
                          <td className="py-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                c.statut === "PUBLIE"
                                  ? "bg-teal/10 text-teal"
                                  : c.statut === "ARCHIVE"
                                  ? "bg-coral/10 text-coral"
                                  : "bg-gold/10 text-gold"
                              }`}
                            >
                              {c.statut ?? "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {derniersCours.length === 0 && (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-muted text-xs">
                            Aucun cours
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* ── UTILISATEURS ───────────────────────────────────────────── */}
          {!loading && activeMenu === "utilisateurs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                      size={15}
                    />
                    <input
                      type="text"
                      placeholder="Rechercher par username, email, nom..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      className="w-full rounded-xl border border-border bg-white pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <span className="text-sm text-muted">
                    {filteredApprenants.length} apprenant(s)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportApprenantsCSV}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
                  >
                    <Download size={16} /> Exporter CSV
                  </button>
                  <button
                    onClick={openCreateApprenant}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90"
                  >
                    <Plus size={16} /> Nouvel apprenant
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-cream border-b border-border">
                      <tr>
                        {[
                          "ID",
                          "Nom",
                          "Email",
                          "Rôle",
                          "Statut",
                          "Date inscription",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApprenants.map((a) => (
                        <tr
                          key={a.id}
                          className="border-b border-border/40 hover:bg-cream/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-muted text-xs">#{a.id}</td>
                          <td className="px-4 py-3 font-medium text-ink">
                            {a.prenom || a.nom
                              ? `${a.prenom ?? ""} ${a.nom ?? ""}`.trim()
                              : a.username}
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">{a.email}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-gold/10 text-gold">
                              {a.role ?? "APPRENANT"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                a.statut === "ACTIF"
                                  ? "bg-teal/10 text-teal"
                                  : "bg-coral/10 text-coral"
                              }`}
                            >
                              {a.statut ?? "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {fmtDate(a.dateInscription)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditApprenant(a)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white text-ink hover:bg-cream"
                              >
                                <Pencil size={12} className="inline mr-1" />
                                Modifier
                              </button>
                              <button
                                onClick={() => triggerPrintApprenant(a)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white text-ink hover:bg-cream"
                              >
                                <Printer size={12} className="inline mr-1" />
                                Fiche
                              </button>
                              <button
                                onClick={() => openDeleteApprenant(a)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-coral/10 text-coral hover:bg-coral/20"
                              >
                                <Trash2 size={12} className="inline mr-1" />
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredApprenants.length === 0 && (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-8 text-center text-muted text-sm"
                          >
                            Aucun apprenant trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── COURS ──────────────────────────────────────────────────── */}
          {!loading && activeMenu === "cours" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{cours.length} cours au total</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
                  >
                    <Download size={16} /> Exporter CSV
                  </button>
                  <button
                    onClick={openCreateCours}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90"
                  >
                    <Plus size={16} /> Nouveau cours
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-cream border-b border-border">
                      <tr>
                        {[
                          "ID",
                          "Titre",
                          "Catégorie",
                          "Niveau",
                          "Formateur",
                          "Prix",
                          "Statut",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cours.map((c) => (
                        <tr
                          key={c.id}
                          className="border-b border-border/40 hover:bg-cream/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-muted text-xs">#{c.id}</td>
                          <td className="px-4 py-3 font-medium text-ink max-w-[140px] truncate">
                            {c.titre}
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {c.categorie ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {c.niveau ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {c.formateurNom ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {c.prix ? c.prix + " €" : "Gratuit"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                c.statut === "PUBLIE"
                                  ? "bg-teal/10 text-teal"
                                  : c.statut === "ARCHIVE"
                                  ? "bg-coral/10 text-coral"
                                  : "bg-gold/10 text-gold"
                              }`}
                            >
                              {c.statut ?? "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditCours(c)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white text-ink hover:bg-cream"
                              >
                                <Pencil size={12} className="inline mr-1" />
                                Modifier
                              </button>
                              <button
                                onClick={() => triggerPrintCours(c)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white text-ink hover:bg-cream"
                              >
                                <Printer size={12} className="inline mr-1" />
                                Fiche
                              </button>
                              <button
                                onClick={() => openDeleteCours(c)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-coral/10 text-coral hover:bg-coral/20"
                              >
                                <Trash2 size={12} className="inline mr-1" />
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {cours.length === 0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className="px-4 py-8 text-center text-muted text-sm"
                          >
                            Aucun cours trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── MODERATION ─────────────────────────────────────────────── */}
          {!loading && activeMenu === "moderation" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {["Toutes", "EN_COURS", "TERMINE"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setInscriptionFilter(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        inscriptionFilter === tab
                          ? "bg-ink text-white"
                          : "border border-border bg-white text-ink hover:bg-cream"
                      }`}
                    >
                      {tab === "Toutes"
                        ? "Toutes"
                        : tab === "EN_COURS"
                        ? "En cours"
                        : "Terminées"}
                      <span className="ml-2 text-xs opacity-60">
                        (
                        {tab === "Toutes"
                          ? inscriptions.length
                          : inscriptions.filter((i) => i.statut === tab).length}
                        )
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportInscriptionsCSV}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
                  >
                    <Download size={16} /> Exporter CSV
                  </button>
                  <button
                    onClick={openCreateInscription}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90"
                  >
                    <Plus size={16} /> Nouvelle inscription
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-cream border-b border-border">
                      <tr>
                        {[
                          "Apprenant",
                          "Cours",
                          "Statut",
                          "Progression",
                          "Date inscription",
                          "Mise à jour",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInscriptions.map((i) => (
                        <tr
                          key={i.id}
                          className="border-b border-border/40 hover:bg-cream/30 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-ink">{i.apprenant.username}</div>
                            <div className="text-xs text-muted">{i.apprenant.email}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-ink max-w-[140px] truncate">
                              {i.cours.titre}
                            </div>
                            {i.cours.categorie && (
                              <div className="text-xs text-muted">{i.cours.categorie}</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                i.statut === "TERMINE"
                                  ? "bg-teal/10 text-teal"
                                  : i.statut === "ABANDONNE"
                                  ? "bg-coral/10 text-coral"
                                  : "bg-gold/10 text-gold"
                              }`}
                            >
                              {i.statut}
                            </span>
                          </td>
                          <td className="px-4 py-3 min-w-[160px]">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-teal rounded-full"
                                  style={{ width: `${i.progressionPct ?? 0}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted w-8 text-right">
                                {i.progressionPct ?? 0}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {fmtDate(i.dateInscription)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={progressionInputs[i.id] ?? i.progressionPct ?? 0}
                                onChange={(e) =>
                                  setProgressionInputs((prev) => ({
                                    ...prev,
                                    [i.id]: Number(e.target.value),
                                  }))
                                }
                                className="w-16 rounded-lg border border-border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-gold"
                              />
                              <button
                                onClick={() => handleUpdateProgression(i.id)}
                                className="px-2 py-1 rounded-lg text-xs font-semibold bg-ink text-white hover:bg-ink/90"
                              >
                                OK
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => triggerPrintInscription(i)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white text-ink hover:bg-cream"
                              >
                                <Printer size={12} className="inline mr-1" />
                                Fiche
                              </button>
                              <button
                                onClick={() => openDeleteInscription(i)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-coral/10 text-coral hover:bg-coral/20"
                              >
                                <Trash2 size={12} className="inline mr-1" />
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredInscriptions.length === 0 && (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-8 text-center text-muted text-sm"
                          >
                            Aucune inscription
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── FINANCES ───────────────────────────────────────────────── */}
          {!loading && activeMenu === "finances" && (
            <div className="space-y-6">
              {/* KPI */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted font-semibold">Revenu potentiel total</p>
                  <p className="font-heading text-3xl font-black text-ink mt-2">
                    {revenuPotentiel.toLocaleString("fr-FR")} €
                  </p>
                  <p className="text-xs text-muted mt-1">Cours publiés uniquement</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted font-semibold">Cours gratuits</p>
                  <p className="font-heading text-3xl font-black text-teal mt-2">
                    {coursGratuits}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted font-semibold">Cours payants</p>
                  <p className="font-heading text-3xl font-black text-gold mt-2">
                    {coursPayants}
                  </p>
                </div>
              </div>

              {/* Export */}
              <div className="flex justify-end">
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90"
                >
                  <Download size={16} /> Exporter CSV
                </button>
              </div>

              {/* Table prix */}
              <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    Cours par prix décroissant
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-cream border-b border-border">
                      <tr>
                        {["Titre", "Catégorie", "Prix", "Statut"].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {coursTries.map((c) => (
                        <tr
                          key={c.id}
                          className="border-b border-border/40 hover:bg-cream/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-ink">{c.titre}</td>
                          <td className="px-4 py-3 text-muted text-xs">
                            {c.categorie ?? "—"}
                          </td>
                          <td className="px-4 py-3 font-bold text-ink">
                            {c.prix ? (
                              c.prix + " €"
                            ) : (
                              <span className="text-teal font-semibold">Gratuit</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                c.statut === "PUBLIE"
                                  ? "bg-teal/10 text-teal"
                                  : c.statut === "ARCHIVE"
                                  ? "bg-coral/10 text-coral"
                                  : "bg-gold/10 text-gold"
                              }`}
                            >
                              {c.statut ?? "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PARAMETRES ─────────────────────────────────────────────── */}
          {!loading && activeMenu === "parametres" && (
            <div className="max-w-lg">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm space-y-6">
                <h2 className="font-heading text-lg font-bold text-ink">
                  Paramètres de la plateforme
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-ink">
                    Nom de la plateforme
                  </label>
                  <input
                    type="text"
                    value={settingsForm.plateforme}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, plateforme: e.target.value }))
                    }
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-ink">
                    Email support
                  </label>
                  <input
                    type="email"
                    value={settingsForm.emailSupport}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        emailSupport: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <button
                  onClick={() => toast.success("Paramètres sauvegardés")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── MODALS ───────────────────────────────────────────────────────── */}

      {/* Edit Apprenant */}
      {modal === "editApprenant" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-lg font-bold text-ink mb-6">
              Modifier l&apos;apprenant
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username ?? ""}
                  onChange={(e) => setField("username", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Email</label>
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={form.prenom ?? ""}
                    onChange={(e) => setField("prenom", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Nom</label>
                  <input
                    type="text"
                    value={form.nom ?? ""}
                    onChange={(e) => setField("nom", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={form.telephone ?? ""}
                  onChange={(e) => setField("telephone", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Rôle</label>
                  <select
                    value={form.role ?? "APPRENANT"}
                    onChange={(e) => setField("role", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    <option value="APPRENANT">APPRENANT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Statut
                  </label>
                  <select
                    value={form.statut ?? "ACTIF"}
                    onChange={(e) => setField("statut", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    <option value="ACTIF">ACTIF</option>
                    <option value="INACTIF">INACTIF</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveApprenant}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90 disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Apprenant */}
      {modal === "createApprenant" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-lg font-bold text-ink mb-6">
              Nouvel apprenant
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Username <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  value={form.username ?? ""}
                  onChange={(e) => setField("username", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Email <span className="text-coral">*</span>
                </label>
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Prénom</label>
                  <input
                    type="text"
                    value={form.prenom ?? ""}
                    onChange={(e) => setField("prenom", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Nom</label>
                  <input
                    type="text"
                    value={form.nom ?? ""}
                    onChange={(e) => setField("nom", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Téléphone</label>
                <input
                  type="text"
                  value={form.telephone ?? ""}
                  onChange={(e) => setField("telephone", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Mot de passe <span className="text-coral">*</span> (min. 6 caractères)
                </label>
                <input
                  type="password"
                  value={form.password ?? ""}
                  onChange={(e) => setField("password", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Rôle</label>
                  <select
                    value={form.role ?? "APPRENANT"}
                    onChange={(e) => setField("role", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    <option value="APPRENANT">APPRENANT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Statut</label>
                  <select
                    value={form.statut ?? "ACTIF"}
                    onChange={(e) => setField("statut", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    <option value="ACTIF">ACTIF</option>
                    <option value="INACTIF">INACTIF</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateApprenant}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90 disabled:opacity-50"
              >
                {saving ? "Création..." : "Créer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Apprenant */}
      {modal === "deleteApprenant" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="font-heading text-lg font-bold text-ink mb-2">
              Confirmer la suppression
            </h2>
            <p className="text-sm text-muted mb-6">
              Supprimer l&apos;apprenant{" "}
              <strong className="text-ink">
                {(current as Apprenant)?.username}
              </strong>{" "}
              ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteApprenant}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-coral/10 text-coral hover:bg-coral/20 disabled:opacity-50"
              >
                {saving ? "Suppression..." : "Supprimer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Cours */}
      {(modal === "createCours" || modal === "editCours") && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-lg font-bold text-ink mb-6">
              {modal === "createCours" ? "Nouveau cours" : "Modifier le cours"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Titre <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  value={form.titre ?? ""}
                  onChange={(e) => setField("titre", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description ?? ""}
                  onChange={(e) => setField("description", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Catégorie
                  </label>
                  <select
                    value={form.categorie ?? "Développement Web"}
                    onChange={(e) => setField("categorie", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    {[
                      "Développement Web",
                      "Data Science",
                      "Design UX-UI",
                      "Intelligence Artificielle",
                      "Mobile",
                      "Cloud & DevOps",
                      "Cybersécurité",
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Niveau
                  </label>
                  <select
                    value={form.niveau ?? "Débutant"}
                    onChange={(e) => setField("niveau", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                  >
                    {["Débutant", "Intermédiaire", "Avancé"].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Langue
                  </label>
                  <input
                    type="text"
                    value={form.langue ?? "Français"}
                    onChange={(e) => setField("langue", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Formateur
                  </label>
                  <input
                    type="text"
                    value={form.formateurNom ?? ""}
                    onChange={(e) => setField("formateurNom", e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Durée (heures)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.dureeHeures ?? ""}
                    onChange={(e) => setField("dureeHeures", Number(e.target.value))}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Prix (€, 0 = gratuit)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.prix ?? 0}
                    onChange={(e) => setField("prix", Number(e.target.value))}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Statut</label>
                <select
                  value={form.statut ?? "BROUILLON"}
                  onChange={(e) => setField("statut", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                >
                  <option value="PUBLIE">PUBLIE</option>
                  <option value="BROUILLON">BROUILLON</option>
                  <option value="ARCHIVE">ARCHIVE</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveCours}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90 disabled:opacity-50"
              >
                {saving
                  ? "Enregistrement..."
                  : modal === "createCours"
                  ? "Créer"
                  : "Enregistrer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Cours */}
      {modal === "deleteCours" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="font-heading text-lg font-bold text-ink mb-2">
              Confirmer la suppression
            </h2>
            <p className="text-sm text-muted mb-6">
              Supprimer le cours{" "}
              <strong className="text-ink">{(current as Cours)?.titre}</strong> ? Cette
              action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCours}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-coral/10 text-coral hover:bg-coral/20 disabled:opacity-50"
              >
                {saving ? "Suppression..." : "Supprimer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Inscription */}
      {modal === "createInscription" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-lg font-bold text-ink mb-6">
              Nouvelle inscription
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Apprenant</label>
                <select
                  value={form.apprenantId ?? ""}
                  onChange={(e) => setField("apprenantId", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                >
                  <option value="">Sélectionner un apprenant</option>
                  {apprenants.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.prenom || a.nom ? `${a.prenom ?? ""} ${a.nom ?? ""}`.trim() : a.username} ({a.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Cours</label>
                <select
                  value={form.coursId ?? ""}
                  onChange={(e) => setField("coursId", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold bg-white"
                >
                  <option value="">Sélectionner un cours</option>
                  {cours.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titre} ({c.categorie})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateInscription}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-ink text-white hover:bg-ink/90 disabled:opacity-50"
              >
                {saving ? "Création..." : "Créer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Inscription */}
      {modal === "deleteInscription" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="font-heading text-lg font-bold text-ink mb-2">
              Confirmer la suppression
            </h2>
            <p className="text-sm text-muted mb-6">
              Supprimer l&apos;inscription de{" "}
              <strong className="text-ink">{(current as unknown as Inscription)?.apprenant.username}</strong>
              {" "}au cours{" "}
              <strong className="text-ink">{(current as unknown as Inscription)?.cours.titre}</strong> ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteInscription}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-coral/10 text-coral hover:bg-coral/20 disabled:opacity-50"
              >
                {saving ? "Suppression..." : "Supprimer"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-white text-ink hover:bg-cream"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print overlay */}
      {printCours && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 z-[100]">
          <h1 className="text-2xl font-bold mb-4">{printCours.titre}</h1>
          <div className="space-y-2 text-sm text-gray-700">
            {printCours.description && (
              <p>
                <strong>Description :</strong> {printCours.description}
              </p>
            )}
            {printCours.categorie && (
              <p>
                <strong>Catégorie :</strong> {printCours.categorie}
              </p>
            )}
            {printCours.niveau && (
              <p>
                <strong>Niveau :</strong> {printCours.niveau}
              </p>
            )}
            {printCours.langue && (
              <p>
                <strong>Langue :</strong> {printCours.langue}
              </p>
            )}
            {printCours.formateurNom && (
              <p>
                <strong>Formateur :</strong> {printCours.formateurNom}
              </p>
            )}
            {printCours.dureeHeures !== undefined && (
              <p>
                <strong>Durée :</strong> {printCours.dureeHeures} heures
              </p>
            )}
            <p>
              <strong>Prix :</strong>{" "}
              {printCours.prix ? printCours.prix + " €" : "Gratuit"}
            </p>
            {printCours.statut && (
              <p>
                <strong>Statut :</strong> {printCours.statut}
              </p>
            )}
            {printCours.dateCreation && (
              <p>
                <strong>Date de création :</strong> {fmtDate(printCours.dateCreation)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Print overlay Apprenant */}
      {printApprenant && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 z-[100]">
          <h1 className="text-2xl font-bold mb-4">Fiche apprenant</h1>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>ID :</strong> #{printApprenant.id}</p>
            <p><strong>Username :</strong> {printApprenant.username}</p>
            <p><strong>Email :</strong> {printApprenant.email}</p>
            {printApprenant.prenom && <p><strong>Prénom :</strong> {printApprenant.prenom}</p>}
            {printApprenant.nom && <p><strong>Nom :</strong> {printApprenant.nom}</p>}
            {printApprenant.telephone && <p><strong>Téléphone :</strong> {printApprenant.telephone}</p>}
            {printApprenant.role && <p><strong>Rôle :</strong> {printApprenant.role}</p>}
            {printApprenant.statut && <p><strong>Statut :</strong> {printApprenant.statut}</p>}
            {printApprenant.dateInscription && (
              <p><strong>Date d&apos;inscription :</strong> {fmtDate(printApprenant.dateInscription)}</p>
            )}
          </div>
        </div>
      )}

      {/* Print overlay Inscription */}
      {printInscription && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 z-[100]">
          <h1 className="text-2xl font-bold mb-4">Fiche d&apos;inscription</h1>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>ID :</strong> #{printInscription.id}</p>
            <p><strong>Apprenant :</strong> {printInscription.apprenant.username} ({printInscription.apprenant.email})</p>
            <p><strong>Cours :</strong> {printInscription.cours.titre}</p>
            {printInscription.cours.categorie && <p><strong>Catégorie :</strong> {printInscription.cours.categorie}</p>}
            <p><strong>Statut :</strong> {printInscription.statut}</p>
            <p><strong>Progression :</strong> {printInscription.progressionPct ?? 0}%</p>
            {printInscription.dateInscription && (
              <p><strong>Date d&apos;inscription :</strong> {fmtDate(printInscription.dateInscription)}</p>
            )}
            {printInscription.dateCompletion && (
              <p><strong>Date de complétion :</strong> {fmtDate(printInscription.dateCompletion)}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
