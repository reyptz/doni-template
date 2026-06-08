"use client";

import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, ChevronLeft, Circle } from "lucide-react";

/* ----------------------------------------------------------------
   Données de contacts (mock)
   ---------------------------------------------------------------- */

const contacts = [
  { id: 1, name: "Marie Dupont", role: "Formateur · Data Science", initials: "MD", color: "bg-teal", online: true, lastMessage: "Bien sûr, je vous envoie les ressources complémentaires pour le Module 3.", time: "14:32", unread: 2 },
  { id: 2, name: "Support Dɔni", role: "Équipe d'assistance", initials: "SD", color: "bg-gold", online: true, lastMessage: "Votre demande a été prise en charge. Un conseiller va vous contacter.", time: "12:05", unread: 0 },
  { id: 3, name: "Ahmed Benali", role: "Formateur · Intelligence Artificielle", initials: "AB", color: "bg-ink", online: false, lastMessage: "Excellent travail sur votre projet capstone !", time: "Hier", unread: 0 },
  { id: 4, name: "Groupe : Python Avancé", role: "12 membres", initials: "PA", color: "bg-coral", online: false, lastMessage: "Lucas : Quelqu'un a-t-il réussi l'exercice 7 ?", time: "Hier", unread: 5 },
  { id: 5, name: "Lucie Martin", role: "Formateur · Design UX/UI", initials: "LM", color: "bg-purple-600", online: false, lastMessage: "Voici le lien vers le fichier Figma du projet.", time: "Lun.", unread: 0 },
];

const messages = [
  { id: 1, sender: "Marie Dupont", initials: "MD", color: "bg-teal", content: "Bonjour Jean, j'ai vu que vous aviez terminé le Module 2 avec un excellent score au quiz. Félicitations !", time: "14:20", isMe: false },
  { id: 2, sender: "Moi", initials: "JD", color: "bg-ink", content: "Merci beaucoup Marie ! J'ai particulièrement apprécié la leçon sur les list comprehensions. Auriez-vous des ressources complémentaires à recommander pour approfondir ?", time: "14:25", isMe: true },
  { id: 3, sender: "Marie Dupont", initials: "MD", color: "bg-teal", content: "Bien sûr, je vous envoie les ressources complémentaires pour le Module 3. Vous trouverez notamment un notebook Jupyter avec des exercices supplémentaires sur Pandas et un guide de bonnes pratiques pour la manipulation de DataFrames.", time: "14:32", isMe: false },
];

/* ----------------------------------------------------------------
   Composant
   ---------------------------------------------------------------- */

export default function Messagerie() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  return (
    <div className="flex h-[calc(100vh-72px)] bg-cream">
      {/* ── Liste des conversations ── */}
      <div className={`w-full flex-shrink-0 border-r border-border bg-white sm:w-80 lg:w-96 flex flex-col ${mobileShowChat ? 'hidden sm:flex' : 'flex'}`}>
        <div className="shrink-0 border-b border-border px-4 py-4">
          <h1 className="mb-3 font-heading text-xl font-bold text-ink">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              className="w-full rounded-xl bg-cream py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-gold border border-transparent focus:border-gold"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => { setSelectedContact(contact); setMobileShowChat(true); }}
              className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-border/50 ${
                selectedContact.id === contact.id ? "bg-gold/5" : "hover:bg-cream/50"
              }`}
            >
              <div className="relative shrink-0">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${contact.color} text-sm font-bold text-white`}>
                  {contact.initials}
                </div>
                {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-teal" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-sm font-semibold text-ink">{contact.name}</h3>
                  <span className="shrink-0 text-xs text-muted">{contact.time}</span>
                </div>
                <p className="truncate text-xs text-muted mt-0.5">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Zone de chat ── */}
      <div className={`flex-1 flex flex-col bg-cream/30 ${!mobileShowChat ? 'hidden sm:flex' : 'flex'}`}>
        {/* Header du chat */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileShowChat(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cream sm:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="relative">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${selectedContact.color} text-sm font-bold text-white`}>
                {selectedContact.initials}
              </div>
              {selectedContact.online && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-teal" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-ink">{selectedContact.name}</h2>
              <p className="text-xs text-muted flex items-center gap-1">
                {selectedContact.online ? (
                  <><Circle size={8} className="fill-teal text-teal" /> En ligne</>
                ) : (
                  <>{selectedContact.role}</>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink transition-colors" aria-label="Appel audio"><Phone size={18} /></button>
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink transition-colors" aria-label="Appel vidéo"><Video size={18} /></button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink transition-colors" aria-label="Plus d'options"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="text-center">
            <span className="rounded-full bg-border/50 px-3 py-1 text-xs font-medium text-muted">Aujourd'hui</span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              {!msg.isMe && (
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.color} text-xs font-bold text-white`}>
                  {msg.initials}
                </div>
              )}
              <div
                className={`max-w-xs rounded-2xl px-4 py-3 sm:max-w-md ${
                  msg.isMe
                    ? "bg-ink text-white rounded-br-md"
                    : "bg-white border border-border text-ink rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`mt-1.5 text-right text-[10px] ${msg.isMe ? "text-white/50" : "text-muted"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Zone de saisie */}
        <div className="shrink-0 border-t border-border bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-cream hover:text-ink" aria-label="Joindre un fichier">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Écrire un message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-cream/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold"
            />
            <button
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-ink transition-all hover:bg-yellow-500 active:scale-95 shadow-sm"
              aria-label="Envoyer le message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
