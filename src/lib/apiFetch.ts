import { API_BASE_URL } from "@/config/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  // path should start with '/' like '/auth/me' or be a full URL
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": (options.headers && (options.headers as any)["Content-Type"]) || "application/json",
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    // token invalid / expired. Clear local token and redirect to login.
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/login";
    }
    throw new Error("Unauthorized");
  }

  return res;
}
