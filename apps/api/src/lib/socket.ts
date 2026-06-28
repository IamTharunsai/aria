import { Server } from "socket.io"
import { Server as HttpServer } from "http"

let _io: Server

export function initSocket(httpServer: HttpServer): Server {
  _io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
      credentials: true,
    },
  })
  _io.on("connection", (socket) => {
    const orgId = socket.handshake.query.orgId as string
    if (orgId) socket.join(orgId)
    socket.on("disconnect", () => {})
  })
  return _io
}

export function getIo(): Server {
  if (!_io) throw new Error("Socket not initialized")
  return _io
}
