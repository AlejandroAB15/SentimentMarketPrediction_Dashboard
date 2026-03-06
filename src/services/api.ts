const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Fallo en solicitud a API: ${response.status}`);
  }

  return response.json();
}