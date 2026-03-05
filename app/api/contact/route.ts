import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const CONTACT_RECIPIENTS = ["pupimarti00@gmail.com", "guillermoconti@contiabogados.com", "mnasifabogado@gmail.com"];

// Simple rate limiting (in production, use a proper solution like Upstash)
const requestLog = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const requests = requestLog.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return true;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Por favor, intenta más tarde." }, { status: 429 });
    }

    const body = await request.json();
    const { nombre, email, telefono, asunto, mensaje, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    // Validation
    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL;

    console.log({
      sendgridApiKey,
      sendgridFromEmail,
    });
    if (!sendgridApiKey || !sendgridFromEmail) {
      console.error("Falta configurar SENDGRID_API_KEY o SENDGRID_FROM_EMAIL");
      return NextResponse.json({ error: "Configuración de email incompleta en el servidor" }, { status: 500 });
    }

    sgMail.setApiKey(sendgridApiKey);

    const submittedAt = new Date().toISOString();
    const emailSubject = asunto?.trim() ? `[Web] Nueva consulta: ${asunto.trim()}` : `[Web] Nueva consulta de ${nombre}`;

    const textBody = ["Nueva consulta desde el sitio web", "", `Fecha: ${submittedAt}`, `Nombre: ${nombre}`, `Email: ${email}`, `Teléfono: ${telefono || "-"}`, `Asunto: ${asunto || "-"}`, "", "Mensaje:", mensaje].join("\n");

    const htmlBody = `
      <h2>Nueva consulta desde el sitio web</h2>
      <p><strong>Fecha:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono || "-")}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(asunto || "-")}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(mensaje).replaceAll("\n", "<br/>")}</p>
    `;

    await sgMail.send({
      to: CONTACT_RECIPIENTS,
      from: sendgridFromEmail,
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    console.log("Contact form submission:", {
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
      sentTo: CONTACT_RECIPIENTS,
      timestamp: submittedAt,
    });

    return NextResponse.json({ message: "Consulta enviada exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
