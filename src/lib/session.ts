// Session utilisateur doni (Apprenant)
const USER_KEY = "doni:user";

export type DoniUser = {
  id: number;
  username: string;
  email: string;
  role: string; // "APPRENANT" | "ADMIN"
};

function readUser(): DoniUser | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? "null"); } catch { return null; }
}

const listeners = new Set<() => void>();
let _user: DoniUser | null = typeof window !== "undefined" ? readUser() : null;
function emit() { listeners.forEach(l => l()); }

export function setDoniUser(u: DoniUser) {
  _user = u;
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    // Cookie pour le middleware
    const s = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `doni.role=${u.role}; Max-Age=${60*60*8}; Path=/; SameSite=Strict${s}`;
  }
  emit();
}

export function clearDoniUser() {
  _user = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
    document.cookie = "doni.role=; Max-Age=0; Path=/; SameSite=Strict";
  }
  emit();
}

export function getDoniUser(): DoniUser | null { return _user; }

import { useSyncExternalStore } from "react";

export function useDoniUser(): DoniUser | null {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => _user,
    () => null,
  );
}
