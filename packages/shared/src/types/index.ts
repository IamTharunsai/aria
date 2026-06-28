export type Plan = 'STARTER' | 'PRO' | 'AGENCY'
export type Role = 'OWNER' | 'ADMIN' | 'MEMBER'
export type AgentMode = 'OFF' | 'ASSIST' | 'AUTOPILOT'
export type Direction = 'INBOUND' | 'OUTBOUND'
export type CallStatus = 'IN_PROGRESS' | 'COMPLETED' | 'MISSED' | 'FAILED' | 'VOICEMAIL'
export type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
export type Channel = 'SMS' | 'WHATSAPP' | 'FACEBOOK' | 'INSTAGRAM' | 'LIVE_CHAT'
export type ConvStatus = 'OPEN' | 'CLOSED' | 'PENDING'
export type KBType = 'FAQ' | 'DOCUMENT' | 'WEBPAGE' | 'CUSTOM'
export type CampaignType = 'VOICE' | 'SMS' | 'MIXED'
export type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'COMPLETED' | 'PAUSED'

export interface ContactMemory {
  name?: string
  language?: string
  lastVisit?: string
  visitCount: number
  preferences?: string[]
  lastOrder?: string
  dietaryRestrictions?: string[]
  notes?: string
}

export interface SocketEvents {
  'call.started': { callId: string; fromNumber: string; contactName?: string; locationId: string }
  'call.transcript.chunk': { callId: string; text: string; speaker: string; isInterruption: boolean }
  'call.ended': { callId: string; duration: number; outcome: string; sentiment?: Sentiment }
  'message.received': { conversationId: string; channel: Channel; preview: string }
  'booking.created': { contactName: string; datetime: string }
}
