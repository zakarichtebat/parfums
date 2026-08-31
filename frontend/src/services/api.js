// ETAPE 2 : branchement sur l'API Laravel.
// En dev, vite.config.js proxifie /api vers http://127.0.0.1:8000
const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export async function fetchPerfumes() {
  const res = await fetch(`${BASE_URL}/api/perfumes`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const json = await res.json()
  // Le controleur renvoie { data: [...] }
  return json.data ?? json
}
