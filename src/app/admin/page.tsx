"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  UserPlus, 
  LogOut,
  Search,
  MoreVertical
} from "lucide-react";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex h-screen bg-cream font-body overflow-hidden">
      
      {/* Sidebar Admin */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-ink text-white flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <span className="font-heading text-2xl font-black text-white">Dɔni <span className="text-gold text-sm font-sans uppercase tracking-widest ml-1">Admin</span></span>
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
            <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center font-bold text-xs">AD</div>
            <div className="text-sm">
              <p className="font-bold">Adminstrateur</p>
              <p className="text-white/50 text-xs">admin@doni.com</p>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-coral hover:bg-white/5 transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-8">
          <h1 className="font-heading text-xl font-bold text-ink capitalize">{activeMenu.replace("-", " ")}</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="rounded-full bg-cream px-4 pl-9 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gold border border-transparent focus:border-gold transition-all w-64"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeMenu === "dashboard" && (
            <div className="space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Utilisateurs Actifs", value: "52,430", change: "+12%", icon: Users, color: "text-teal", bg: "bg-teal/10" },
                  { label: "Nouveaux Inscrits (Mois)", value: "3,210", change: "+5%", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-600/10" },
                  { label: "Chiffre d'Affaires", value: "142,500 €", change: "+18%", icon: TrendingUp, color: "text-gold", bg: "bg-gold/20" },
                  { label: "Cours Complétés", value: "18,900", change: "+2%", icon: BookOpen, color: "text-coral", bg: "bg-coral/10" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-bold text-teal bg-teal/10 px-2 py-1 rounded-full">{stat.change}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-muted">{stat.label}</h3>
                      <p className="font-heading text-2xl font-black text-ink mt-1">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts Mock & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-ink mb-6">Évolution des Inscriptions</h3>
                  <div className="h-64 w-full border-b border-l border-border relative flex items-end justify-between px-2 pb-2">
                    {/* Mock Chart Bars */}
                    {[40, 55, 30, 70, 85, 60, 90, 75, 100, 80, 65, 95].map((h, i) => (
                      <div key={i} className="w-[6%] bg-gradient-to-t from-gold to-yellow-300 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted px-2">
                    <span>Jan</span><span>Fev</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-ink mb-6">Activité Récente</h3>
                  <div className="space-y-4">
                    {[
                      { text: "Nouvelle inscription: Marie D.", time: "Il y a 5 min" },
                      { text: "Paiement reçu (79€) - AWS Cert.", time: "Il y a 12 min" },
                      { text: "Nouveau cours soumis en révision", time: "Il y a 1h" },
                      { text: "Signalement: Commentaire forum", time: "Il y a 2h" },
                      { text: "Objectif mensuel atteint !", time: "Il y a 5h" },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-gold mt-1.5 shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-ink">{act.text}</p>
                          <p className="text-xs text-muted">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tables Mock */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-lg font-bold text-ink">Derniers Utilisateurs</h3>
                  <button className="text-sm font-semibold text-gold hover:text-yellow-600">Voir tout</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted">
                        <th className="pb-3 font-semibold">Nom</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Rôle</th>
                        <th className="pb-3 font-semibold">Statut</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Sophie Martin", email: "sophie.m@email.com", role: "Apprenant", status: "Actif", bg: "bg-teal/10", color: "text-teal" },
                        { name: "Lucas Bernard", email: "lucas.b@email.com", role: "Formateur", status: "En attente", bg: "bg-gold/15", color: "text-yellow-700" },
                        { name: "Emma Dubois", email: "emma.d@email.com", role: "Apprenant", status: "Actif", bg: "bg-teal/10", color: "text-teal" },
                        { name: "Kader Traoré", email: "kader.t@email.com", role: "Apprenant", status: "Inactif", bg: "bg-gray-100", color: "text-muted" },
                      ].map((user, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-cream/50 transition-colors">
                          <td className="py-3 font-medium text-ink">{user.name}</td>
                          <td className="py-3 text-muted">{user.email}</td>
                          <td className="py-3 text-muted">{user.role}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${user.bg} ${user.color}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-muted">
                            <button className="hover:text-ink"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeMenu !== "dashboard" && (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 text-center">
              <Settings size={48} className="mb-4 text-border" />
              <h2 className="font-heading text-xl font-bold text-ink">Module {activeMenu.replace("-", " ")} en construction</h2>
              <p className="mt-2 text-sm text-muted">L'interface d'administration détaillée pour ce module sera bientôt disponible.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
