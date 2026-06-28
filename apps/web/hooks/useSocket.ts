"use client"
import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { useLiveCall } from "@/store/liveCall"

export function useSocket(orgId: string | null | undefined) {
  const socketRef = useRef<Socket | null>(null)
  const { setCall, clear } = useLiveCall()

  useEffect(() => {
    if (!orgId) return
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
    const socket = io(API_URL, { query: { orgId }, transports: ["websocket"] })
    socketRef.current = socket

    socket.on("call.started", (data: { vapiCallId: string; fromNumber: string }) => {
      setCall(data.vapiCallId, data.fromNumber)
    })
    socket.on("call.ended", () => clear())

    return () => { socket.disconnect() }
  }, [orgId, setCall, clear])
}
