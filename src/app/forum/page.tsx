"use client";

import { MessageSquare } from "lucide-react";

export default function Forum() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <MessageSquare size={40} className="text-gold" />
        </div>
        <h1 className="font-heading text-3xl font-black text-ink md:text-4xl">Forum communautaire</h1>
        <p className="mt-3 text-muted">
          Le forum n’est pas encore disponible. Il sera bientôt activé pour échanger avec la communauté Dɔni.
        </p>
      </div>
    </div>
  );
}
