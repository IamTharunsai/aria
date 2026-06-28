import { create } from "zustand"

interface LiveCallState {
  vapiCallId: string | null
  fromNumber: string | null
  setCall: (vapiCallId: string, fromNumber: string) => void
  clear: () => void
}

export const useLiveCall = create<LiveCallState>((set) => ({
  vapiCallId: null,
  fromNumber: null,
  setCall: (vapiCallId, fromNumber) => set({ vapiCallId, fromNumber }),
  clear: () => set({ vapiCallId: null, fromNumber: null }),
}))
