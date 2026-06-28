import { Router } from "express"
import multer from "multer"
import pdf from "pdf-parse"
import * as cheerio from "cheerio"

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

// Extract text from uploaded PDF or TXT file
router.post("/extract", upload.single("file"), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: "No file uploaded" })

    let content = ""
    const title = file.originalname.replace(/\.[^.]+$/, "")

    if (file.mimetype === "application/pdf") {
      const data = await pdf(file.buffer)
      content = data.text.trim()
    } else {
      content = file.buffer.toString("utf-8").trim()
    }

    res.json({ title, content: content.slice(0, 50_000) })
  } catch (err) {
    console.error("[kb/extract]", err)
    res.status(500).json({ error: "Extraction failed" })
  }
})

// Scrape a URL and extract text content
router.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body as { url: string }
    if (!url) return res.status(400).json({ error: "url required" })

    const html = await fetch(url).then((r) => r.text())
    const $ = cheerio.load(html)
    $("script, style, nav, footer, header").remove()
    const title = $("title").text().trim() || url
    const content = $("body").text().replace(/\s+/g, " ").trim().slice(0, 50_000)

    res.json({ title, content })
  } catch (err) {
    console.error("[kb/scrape]", err)
    res.status(500).json({ error: "Scrape failed" })
  }
})

export default router
