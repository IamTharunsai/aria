import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json() as { url: string }
    if (!url) return NextResponse.json({ error: "url required" }, { status: 400 })

    const html = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ARIA-scraper/1.0)" },
    }).then((r) => r.text())

    const $ = cheerio.load(html)
    $("script, style, nav, footer, header, noscript, iframe").remove()
    const title = $("title").text().trim() || url
    const content = $("body").text().replace(/\s+/g, " ").trim().slice(0, 50_000)

    return NextResponse.json({ title, content })
  } catch (err) {
    console.error("[kb/scrape]", err)
    return NextResponse.json({ error: "Scrape failed — check the URL and try again" }, { status: 500 })
  }
}
