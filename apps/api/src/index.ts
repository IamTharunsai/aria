import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    credentials: true,
  },
})

app.use(helmet())
app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  credentials: true,
}))
app.use(morgan("dev"))
app.use(express.json())

app.get("/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }))

io.on("connection", (socket) => {
  const orgId = socket.handshake.query.orgId as string
  if (orgId) socket.join(orgId)
  socket.on("disconnect", () => {})
})

const PORT = process.env.PORT ?? 4000
httpServer.listen(PORT, () => console.log(`API running on :${PORT}`))
