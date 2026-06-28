import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { createServer } from "http"
import { initSocket } from "./lib/socket"
import vapiRouter from "./routes/vapi"

const app = express()
const httpServer = createServer(app)

export const io = initSocket(httpServer)

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  credentials: true,
}))
app.use(morgan("dev"))
app.use(express.json())

app.get("/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }))
app.use("/webhooks/vapi", vapiRouter)

const PORT = process.env.PORT ?? 4000
httpServer.listen(PORT, () => console.log(`API running on :${PORT}`))
