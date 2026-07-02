// src/lib/api.ts — Doni API client (e-learning)
// All /api/elearning/* requests are proxied to the Spring Boot backend via next.config.ts rewrites.
// Backend base URL is configured via NEXT_PUBLIC_API_BASE (default: http://localhost:8080).
export const API_PREFIX = "/api/elearning/v1";

const TOKEN_COOKIE = "doni.token";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 heures

function cookieGet(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function cookieSet(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Strict${secure}`;
}

function cookieDel(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`;
}

function getToken(): string | null {
  return cookieGet(TOKEN_COOKIE);
}

export function setToken(token: string | null) {
  if (token) cookieSet(TOKEN_COOKIE, token, COOKIE_MAX_AGE);
  else cookieDel(TOKEN_COOKIE);
}

export function clearToken() {
  cookieDel(TOKEN_COOKIE);
  cookieDel("doni.role");
  if (typeof window !== "undefined") localStorage.removeItem("doni:user");
}

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null; }
}

export async function request<T = unknown>(
  path: string,
  init: RequestInit = {},
  retry = true
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(path, { ...init, headers });

  if (res.ok) {
    if (res.status === 204) return undefined as unknown as T;
    return (await res.json()) as T;
  }

  if (res.status === 401 && retry) {
    // Token expired — clear and let caller handle redirect
    clearToken();
    if (typeof window !== "undefined") window.dispatchEvent(new Event("doni:logout"));
  }

  const err = await safeJson(res);
  throw new Error(err?.message || err?.detail || `HTTP ${res.status}`);
}

// Spring Boot JwtResponse: { token, type, id, username, email, role }
export type JwtResponse = {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: string;
};

export const api = {
  get:   <T = unknown>(path: string) =>
    request<T>(path, { method: "GET" }),
  post:  <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) }),
  put:   <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body ?? {}) }),
  patch: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) }),
  del:   <T = unknown>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};

export async function login(username: string, password: string): Promise<JwtResponse> {
  // Doni utilise le endpoint d'authentification partagé.
  // POST /api/v1/auth/login → { token, type, id, username, email, role }
  const res = await api.post<JwtResponse>("/api/v1/auth/login", { username, password });
  setToken(res.token);
  return res;
}

export async function logout() {
  const token = getToken();
  if (token) {
    try {
      // Utilise l'endpoint de logout de la gestion universitaire (blacklist JWT partagée)
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }
  clearToken();
}

// Shorthand for e-learning specific endpoints
export const elearningApi = {
  get:   <T = unknown>(path: string) => api.get<T>(`${API_PREFIX}${path}`),
  post:  <T = unknown>(path: string, body?: unknown) => api.post<T>(`${API_PREFIX}${path}`, body),
  put:   <T = unknown>(path: string, body?: unknown) => api.put<T>(`${API_PREFIX}${path}`, body),
  patch: <T = unknown>(path: string, body?: unknown) => api.patch<T>(`${API_PREFIX}${path}`, body),
  del:   <T = unknown>(path: string) => api.del<T>(`${API_PREFIX}${path}`),
};
