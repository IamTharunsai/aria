const BASE = "https://api.vapi.ai"

async function vapiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`Vapi ${path}: ${res.status} ${await res.text()}`)
  return res.json() as Promise<T>
}

interface AssistantOpts {
  name: string
  model?: { provider: string; model: string; messages?: { role: string; content: string }[] }
  voice?: { provider: string; voiceId: string }
  firstMessage?: string
  metadata?: Record<string, string>
}

export const vapiClient = {
  createAssistant: (opts: AssistantOpts) =>
    vapiRequest<{ id: string }>("/assistant", { method: "POST", body: JSON.stringify(opts) }),

  updateAssistant: (id: string, opts: Partial<AssistantOpts>) =>
    vapiRequest<{ id: string }>(`/assistant/${id}`, { method: "PATCH", body: JSON.stringify(opts) }),

  getAssistant: (id: string) =>
    vapiRequest<{ id: string; name: string }>(`/assistant/${id}`),

  listCalls: (limit = 20) =>
    vapiRequest<{ results: unknown[] }>(`/call?limit=${limit}`),
}
