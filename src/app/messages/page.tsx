"use client";

import { Send } from "lucide-react";

export default function Messagerie() {
  return (
    <div className="flex h-[calc(100vh-72px)] items-center justify-center bg-cream">
      <div className="max-w-md px-5 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <Send size={40} className="text-gold" />
        </div>
        <h1 className="font-heading text-3xl font-black text-ink">Messagerie</h1>
        <p className="mt-3 text-muted">
          La messagerie interne n’est pas encore activée. Revenez bientôt pour communiquer avec vos formateurs et pairs.
        </p>
      </div>
    </div>
  );
}
