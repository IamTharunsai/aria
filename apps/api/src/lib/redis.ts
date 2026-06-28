import Redis from "ioredis"

// Upstash requires TLS — use rediss:// prefix
const url = process.env.REDIS_URL ?? "redis://localhost:6379"

export const redis = new Redis(url, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  tls: url.startsWith("rediss://") ? {} : undefined,
})

redis.on("error", (err) => {
  if (process.env.NODE_ENV !== "production") console.warn("Redis:", err.message)
})
