"use client";

import { useState } from "react";
import { User, Mail, Settings, BookOpen, Award, CreditCard, Bell, Camera, ChevronRight } from "lucide-react";

export default function Profil() {
  const [activeTab, setActiveTab] = useState("formations");

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
                    JD
                  </div>
                  <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-md hover:bg-cream transition-colors">
                    <Camera size={14} />
                  </button>
                </div>
                <div className="text-center sm:text-left mb-2">
                  <h1 className="font-heading text-3xl font-black text-ink">Jean Dupont</h1>
                  <p className="text-muted flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <Mail size={14} /> jean.dupont@exemple.com
                  </p>
                </div>
              </div>
              <button className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream">
                Modifier le profil
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Navigation latérale */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-2">
              <nav className="flex flex-col space-y-1">
                {[
                  { id: "formations", label: "Mes formations", icon: BookOpen },
                  { id: "certificats", label: "Mes certificats", icon: Award },
                  { id: "paiements", label: "Abonnement & Paiements", icon: CreditCard },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "parametres", label: "Paramètres du compte", icon: Settings },
                ].map((item) => {
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
            {activeTab === "formations" && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-ink">En cours d'apprentissage</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Carte cours en cours */}
                  <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md">
                    <div className="h-32 bg-gradient-to-br from-ink to-gray-800 flex items-center justify-center text-white">
                      <BookOpen size={32} className="opacity-80" />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-1 font-heading text-lg font-bold text-ink">Machine Learning avec Python</h3>
                      <p className="mb-4 text-xs text-muted">Module 4 : Réseaux de neurones convolutifs</p>
                      
                      <div className="mb-2 flex items-center justify-between text-xs text-ink font-medium">
                        <span>Progression</span>
                        <span>65%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
                        <div className="h-full w-[65%] rounded-full bg-gold"></div>
                      </div>
                      
                      <button className="mt-5 w-full rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90">
                        Reprendre le cours
                      </button>
                    </div>
                  </div>

                  {/* Carte cours terminé */}
                  <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md">
                    <div className="h-32 bg-gradient-to-br from-teal to-teal-900 flex items-center justify-center text-white relative">
                      <BookOpen size={32} className="opacity-80" />
                      <div className="absolute top-3 right-3 bg-white text-teal text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Award size={12} /> Terminé
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-1 font-heading text-lg font-bold text-ink">Fondamentaux du Design UX</h3>
                      <p className="mb-4 text-xs text-muted">Terminé le 12 Mai 2026</p>
                      
                      <div className="mb-2 flex items-center justify-between text-xs text-ink font-medium">
                        <span>Progression</span>
                        <span className="text-teal">100%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
                        <div className="h-full w-full rounded-full bg-teal"></div>
                      </div>
                      
                      <button className="mt-5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream">
                        Voir le certificat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "formations" && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white text-center">
                <Settings size={48} className="mb-4 text-border" />
                <h2 className="font-heading text-xl font-bold text-ink">Section en développement</h2>
                <p className="mt-2 text-sm text-muted">Cette fonctionnalité sera bientôt disponible.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
