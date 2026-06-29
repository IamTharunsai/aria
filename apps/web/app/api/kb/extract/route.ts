import { NextRequest, NextResponse } from "next/server"
import pdf from "pdf-parse"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 })

    const title = file.name.replace(/\.[^.]+$/, "")
    const buf   = Buffer.from(await file.arrayBuffer())

    let content = ""
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const data = await pdf(buf)
      content = data.text.trim()
    } else {
      content = buf.toString("utf-8").trim()
    }

    return NextResponse.json({ title, content: content.slice(0, 50_000) })
  } catch (err) {
    console.error("[kb/extract]", err)
    return NextResponse.json({ error: "Extraction failed" }, { status: 500 })
  }
}
