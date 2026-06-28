import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

redis.on("error", (err) => {
  if (process.env.NODE_ENV !== "production") console.warn("Redis:", err.message)
})
