const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export async function fetchItems() {
  const res = await fetch(`${API_URL}/items`)
  if (!res.ok) throw new Error('Failed to fetch items')
  const data = await res.json()
  return data.data
}

export async function createItem(payload) {
  const res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create item')
  const data = await res.json()
  return data.data
}
