import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD is not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body?.email ?? "").trim().toLowerCase();
    const consent = body?.consent === true;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { ok: false, message: "You must agree before joining the waitlist." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    const gmailUser = process.env.GMAIL_USER;

    if (!adminEmail || !gmailUser) {
      return NextResponse.json(
        { ok: false, message: "Server email configuration is incomplete." },
        { status: 500 }
      );
    }

    const transporter = getTransporter();

    const submittedAt = new Date().toISOString();

    // 1) Email notifikasi ke admin
    await transporter.sendMail({
      from: `"Nontonio Waitlist" <${gmailUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Nontonio Waitlist Signup: ${email}`,
      text: [
        "A new user joined the Nontonio waitlist.",
        "",
        `Email: ${email}`,
        `Submitted At: ${submittedAt}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
          <h2 style="margin:0 0 16px;">New Nontonio Waitlist Signup</h2>
          <p style="margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:0 0 8px;"><strong>Submitted At:</strong> ${submittedAt}</p>
        </div>
      `,
    });

    // 2) Email balasan ke subscriber
    await transporter.sendMail({
      from: `"Nontonio" <${gmailUser}>`,
      to: email,
      subject: "You joined the Nontonio waitlist",
      text: [
        "Welcome to Nontonio.",
        "",
        "You have successfully joined the waitlist.",
        "We’ll send you product updates, launch news, and early access announcements.",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
          <h1 style="margin:0 0 16px;">Welcome to Nontonio</h1>
          <p style="margin:0 0 12px;">
            You have successfully joined the waitlist.
          </p>
          <p style="margin:0 0 12px;">
            We’ll send you product updates, launch news, and early access announcements.
          </p>
          <p style="margin:24px 0 0;color:#6b7280;font-size:14px;">
            Nontonio Team
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "You have been added to the waitlist.",
    });
  } catch (error) {
    console.error("Waitlist error:", error);

    return NextResponse.json(
      { ok: false, message: "Failed to submit waitlist." },
      { status: 500 }
    );
  }
}