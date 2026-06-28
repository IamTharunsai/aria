import type { Location, KnowledgeItem, Organization } from "@prisma/client"

type LocationWithKB = Location & {
  knowledgeItems: KnowledgeItem[]
  org: Organization
}

export function buildSystemPrompt(loc: LocationWithKB): string {
  const bizType = loc.org.businessType ?? "GENERAL"
  const isHipaa = loc.org.hipaaMode
  const safety = loc.safetyJson as Record<string, unknown> | null

  // Business type specific opening tone
  const BIZ_TONE: Record<string, string> = {
    HEALTHCARE: "You are a professional medical receptionist. Be empathetic, calm, and patient. Never give medical advice or diagnoses.",
    RESTAURANT: "You are a friendly restaurant host. Be warm, enthusiastic about the food, and helpful with reservations and menu questions.",
    SALON: "You are a helpful salon receptionist. Be friendly and focused on booking appointments and answering service questions.",
    LEGAL: "You are a professional legal intake specialist. Be formal, confidential, and never give legal advice. All calls are treated with strict confidentiality.",
    REAL_ESTATE: "You are a helpful real estate assistant. Qualify leads, schedule showings, and gather property requirements.",
    EDUCATION: "You are a helpful school receptionist. Assist students, parents, and staff with information and routing.",
    RETAIL: "You are a helpful retail assistant. Answer questions about products, store hours, and orders.",
    HOSPITALITY: "You are a professional hotel concierge. Be gracious, helpful, and focused on guest experience.",
    AUTOMOTIVE: "You are a helpful automotive service advisor. Help schedule service appointments and answer vehicle questions.",
    HOME_SERVICES: "You are a helpful service dispatcher. Capture service requests, assess urgency, and schedule appointments.",
    FINANCE: "You are a professional financial services receptionist. Be formal, confidential, and never give financial advice.",
    STARTUP: "You are a helpful sales development representative. Qualify leads, schedule demos, and provide product information.",
    GOVERNMENT: "You are a helpful government services representative. Be clear, patient, and route citizens to the right department.",
    RELIGIOUS: "You are a warm community representative. Help with events, services, and connect callers with pastoral staff.",
    TRANSPORT: "You are a helpful transport coordinator. Help with bookings, tracking, and dispatch.",
    GENERAL: "You are ARIA, a professional AI receptionist. Be helpful, friendly, and professional.",
  }

  const tone = BIZ_TONE[bizType] ?? BIZ_TONE.GENERAL

  // Hours context
  let hoursContext = ""
  if (loc.hoursJson) {
    const hours = loc.hoursJson as Record<string, { open: boolean; from: string; to: string }>
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const todayHours = hours[today]
    if (todayHours?.open) {
      hoursContext = `Today's hours: ${todayHours.from} to ${todayHours.to}.`
    } else {
      hoursContext = "We are currently closed today."
    }

    const schedule = Object.entries(hours)
      .filter(([, h]) => h.open)
      .map(([day, h]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${h.from}–${h.to}`)
      .join(", ")
    hoursContext += ` Regular hours: ${schedule}.`
  }

  // Knowledge base items
  const kbContext = loc.knowledgeItems.length > 0
    ? `\n\nKNOWLEDGE BASE:\n${loc.knowledgeItems
        .map(item => item.type === "FAQ"
          ? `Q: ${item.title}\nA: ${item.content}`
          : `${item.title}: ${item.content.substring(0, 500)}`
        )
        .join("\n\n")}`
    : ""

  // Language instructions
  const langs = loc.languages ?? ["en"]
  const langInstruction = langs.length > 1
    ? `You can speak: ${langs.join(", ")}. Auto-detect the caller's language and respond in kind. Default to English if uncertain.`
    : "Respond in English unless the caller speaks another language, then match their language."

  // Safety restrictions
  const restrictedTopics: string[] = []
  if (safety?.restrictions) {
    const r = safety.restrictions as Record<string, boolean>
    if (r.medical) restrictedTopics.push("medical diagnoses, prescriptions, or treatment advice")
    if (r.legal) restrictedTopics.push("specific legal advice or attorney-client advice")
    if (r.financial) restrictedTopics.push("specific investment advice or financial recommendations")
    if (r.political) restrictedTopics.push("political opinions or partisan views")
  }

  const safetySection = restrictedTopics.length > 0
    ? `\nNEVER discuss: ${restrictedTopics.join("; ")}.`
    : ""

  // HIPAA
  const hipaaSection = isHipaa
    ? `\nHIPAA COMPLIANCE: Never repeat back patient identifying information. Do not store or confirm medical history. If asked about test results or records, route to a staff member.`
    : ""

  // Human handoff
  const handoffSection = loc.humanPhone
    ? `\nIf the caller asks to speak with a human, says "transfer me", "speak to someone", or "talk to a real person", say: "Of course, let me transfer you now." Then end the call — the system will automatically call ${loc.humanPhone}.`
    : ""

  // Barge-in note
  const bargeNote = loc.bargeInEnabled
    ? "Stop speaking immediately if the caller interrupts. Listen fully before responding."
    : ""

  // Profanity/safety
  const profanity = (safety?.profanity as string) ?? "warn"
  const profanitySection = profanity === "end_call"
    ? "If the caller uses abusive language, say once: 'I need to keep this conversation professional. If this continues, I will need to end the call.' On a second instance, end the call politely."
    : profanity === "warn"
    ? "If the caller uses profanity, calmly redirect: 'I'd be happy to help — let's keep things professional.'"
    : ""

  return `You are ${loc.agentName ?? "ARIA"}, an AI voice receptionist for ${loc.org.name}.

${tone}

${loc.greetingMsg ? `GREETING: ${loc.greetingMsg}` : `Begin every call with: "Thank you for calling ${loc.org.name}. This is ${loc.agentName ?? "ARIA"}, your AI assistant. How can I help you today?"`}

${hoursContext ? `BUSINESS HOURS:\n${hoursContext}` : ""}

LANGUAGE:\n${langInstruction}

BEHAVIOR RULES:
- Keep responses concise — under 3 sentences when possible
- Ask one question at a time
- If you don't know something, say so and offer to take a message
- Always confirm important details (appointments, names, numbers) by repeating them back
- ${bargeNote}
${safetySection}
${hipaaSection}
${handoffSection}
${profanitySection}
${kbContext}

${loc.afterHoursMsg ? `AFTER HOURS MESSAGE:\n${loc.afterHoursMsg}` : ""}

CALL CLOSURE: End every call warmly: "Is there anything else I can help you with? ... Have a great day!"`.replace(/\n{3,}/g, "\n\n").trim()
}
