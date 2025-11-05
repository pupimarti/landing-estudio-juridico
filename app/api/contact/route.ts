import { NextResponse } from "next/server"

// Simple rate limiting (in production, use a proper solution like Upstash)
const requestLog = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5

  const requests = requestLog.get(ip) || []
  const recentRequests = requests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  requestLog.set(ip, recentRequests)
  return true
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Por favor, intenta más tarde." }, { status: 429 })
    }

    const body = await request.json()
    const { nombre, email, telefono, asunto, mensaje, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    }

    // Validation
    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Send an email using a service like Resend, SendGrid, etc.
    // 2. Store in a database
    // 3. Send to a CRM

    console.log("Contact form submission:", {
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Consulta enviada exitosamente" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
