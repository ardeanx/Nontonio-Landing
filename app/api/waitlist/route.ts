import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function firstNonEmpty(...values: Array<string | null>) {
  for (const value of values) {
    if (value && value.trim()) return value.trim();
  }
  return "Unavailable";
}

function getRequestContext(request: Request) {
  const headers = request.headers;

  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");

  const ipAddress = firstNonEmpty(
    forwardedFor?.split(",")[0] ?? null,
    realIp,
    headers.get("cf-connecting-ip"),
    headers.get("fastly-client-ip")
  );

  const geo = {
    country: headers.get("x-vercel-ip-country") ?? "Unavailable",
    region: headers.get("x-vercel-ip-country-region") ?? "Unavailable",
    city: headers.get("x-vercel-ip-city") ?? "Unavailable",
    timezone: headers.get("x-vercel-ip-timezone") ?? "Unavailable",
    postalCode: headers.get("x-vercel-ip-postal-code") ?? "Unavailable",
    latitude: headers.get("x-vercel-ip-latitude") ?? "Unavailable",
    longitude: headers.get("x-vercel-ip-longitude") ?? "Unavailable",
    continent: headers.get("x-vercel-ip-continent") ?? "Unavailable",
  };

  return {
    submittedAtIso: new Date().toISOString(),
    ipAddress,
    forwardedFor: forwardedFor ?? "Unavailable",
    realIp: realIp ?? "Unavailable",
    userAgent: headers.get("user-agent") ?? "Unavailable",
    acceptLanguage: headers.get("accept-language") ?? "Unavailable",
    referer: headers.get("referer") ?? "Unavailable",
    origin: headers.get("origin") ?? "Unavailable",
    host: headers.get("host") ?? "Unavailable",
    geo,
  };
}

function buildSubscriberEmail(email: string) {
  const appUrl = process.env.APP_URL?.trim() || "";
  const safeEmail = escapeHtml(email);

  return {
    subject: "Welcome to the Nontonio Waitlist",
    text: [
      "Welcome to Nontonio.",
      "",
      `Your email (${safeEmail}) has been added to our waitlist.`,
      "You will receive selected updates about platform progress, launch news, and early access announcements.",
      "",
      appUrl ? `Platform: ${appUrl}` : "",
      "",
      "Thank you,",
      "Nontonio Team",
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="margin:0;padding:32px 16px;background:#09090b;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding:0;">
              <div style="border:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,#111111 0%,#0b0b0c 100%);border-radius:24px;overflow:hidden;">
                <div style="padding:28px 28px 18px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 55%,#ef4444 100%);">
                  <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#fee2e2;margin-bottom:10px;">
                    Nontonio Waitlist
                  </div>
                  <h1 style="margin:0;font-size:30px;line-height:1.15;color:#ffffff;font-weight:800;">
                    You’re officially in.
                  </h1>
                  <p style="margin:12px 0 0;color:#ffe4e6;font-size:15px;line-height:1.7;">
                    Thank you for joining the Nontonio waitlist.
                  </p>
                </div>

                <div style="padding:28px;">
                  <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#d4d4d8;">
                    We’ve successfully added <strong style="color:#ffffff;">${safeEmail}</strong> to our subscriber list.
                  </p>

                  <div style="margin:0 0 18px;padding:18px 18px 16px;border:1px solid rgba(239,68,68,0.22);background:rgba(239,68,68,0.08);border-radius:18px;">
                    <div style="font-size:13px;font-weight:700;color:#fecaca;margin-bottom:10px;">
                      What you’ll receive
                    </div>
                    <ul style="margin:0;padding-left:18px;color:#e4e4e7;font-size:14px;line-height:1.8;">
                      <li>Platform development updates</li>
                      <li>Major milestone announcements</li>
                      <li>Launch news and early access information</li>
                    </ul>
                  </div>

                  ${
                    appUrl
                      ? `
                    <div style="margin:24px 0 0;">
                      <a href="${escapeHtml(appUrl)}" style="display:inline-block;padding:14px 20px;border-radius:14px;background:linear-gradient(135deg,#dc2626 0%,#ef4444 100%);color:#ffffff;text-decoration:none;font-weight:700;">
                        Visit Nontonio
                      </a>
                    </div>
                  `
                      : ""
                  }

                  <p style="margin:24px 0 0;font-size:13px;line-height:1.8;color:#a1a1aa;">
                    This is a confirmation email for your waitlist registration. We’ll keep communication relevant and focused on product progress.
                  </p>
                </div>

                <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.06);background:#0a0a0a;">
                  <p style="margin:0;font-size:12px;line-height:1.7;color:#71717a;">
                    © ${new Date().getFullYear()} Nontonio. All rights reserved.
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}

function buildAdminEmail(subscriberEmail: string, context: ReturnType<typeof getRequestContext>) {
  const safeSubscriberEmail = escapeHtml(subscriberEmail);

  const rows = [
    ["Subscriber Email", safeSubscriberEmail],
    ["Submitted At", escapeHtml(context.submittedAtIso)],
    ["IP Address", escapeHtml(context.ipAddress)],
    ["Forwarded IP Chain", escapeHtml(context.forwardedFor)],
    ["Real IP", escapeHtml(context.realIp)],
    ["Country", escapeHtml(context.geo.country)],
    ["Region", escapeHtml(context.geo.region)],
    ["City", escapeHtml(context.geo.city)],
    ["Postal Code", escapeHtml(context.geo.postalCode)],
    ["Timezone", escapeHtml(context.geo.timezone)],
    ["Latitude", escapeHtml(context.geo.latitude)],
    ["Longitude", escapeHtml(context.geo.longitude)],
    ["Continent", escapeHtml(context.geo.continent)],
    ["User Agent", escapeHtml(context.userAgent)],
    ["Language", escapeHtml(context.acceptLanguage)],
    ["Referer", escapeHtml(context.referer)],
    ["Origin", escapeHtml(context.origin)],
    ["Host", escapeHtml(context.host)],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.06);width:220px;color:#a1a1aa;font-size:13px;font-weight:700;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:#f4f4f5;font-size:13px;line-height:1.7;word-break:break-word;">
            ${value}
          </td>
        </tr>
      `
    )
    .join("");

  return {
    subject: `New Nontonio Waitlist Signup: ${subscriberEmail}`,
    text: [
      "New Nontonio waitlist signup received.",
      "",
      `Subscriber Email: ${subscriberEmail}`,
      `Submitted At: ${context.submittedAtIso}`,
      `IP Address: ${context.ipAddress}`,
      `Forwarded IP Chain: ${context.forwardedFor}`,
      `Real IP: ${context.realIp}`,
      `Country: ${context.geo.country}`,
      `Region: ${context.geo.region}`,
      `City: ${context.geo.city}`,
      `Postal Code: ${context.geo.postalCode}`,
      `Timezone: ${context.geo.timezone}`,
      `Latitude: ${context.geo.latitude}`,
      `Longitude: ${context.geo.longitude}`,
      `Continent: ${context.geo.continent}`,
      `User Agent: ${context.userAgent}`,
      `Language: ${context.acceptLanguage}`,
      `Referer: ${context.referer}`,
      `Origin: ${context.origin}`,
      `Host: ${context.host}`,
    ].join("\n"),
    html: `
      <div style="margin:0;padding:32px 16px;background:#09090b;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:760px;margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding:0;">
              <div style="border:1px solid rgba(255,255,255,0.08);background:#101012;border-radius:24px;overflow:hidden;">
                <div style="padding:24px 28px;background:linear-gradient(135deg,#111827 0%,#7f1d1d 55%,#dc2626 100%);">
                  <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#fecaca;margin-bottom:10px;">
                    Admin Notification
                  </div>
                  <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:800;">
                    New waitlist subscriber detected
                  </h1>
                  <p style="margin:12px 0 0;color:#ffe4e6;font-size:14px;line-height:1.7;">
                    A new user has submitted the Nontonio waitlist form.
                  </p>
                </div>

                <div style="padding:24px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;background:#0b0b0d;">
                    ${htmlRows}
                  </table>
                </div>

                <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.06);background:#0a0a0a;">
                  <p style="margin:0;font-size:12px;line-height:1.7;color:#71717a;">
                    Generated automatically by Nontonio waitlist endpoint.
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `,
  };
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

    const gmailUser = process.env.GMAIL_USER;
    const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

    if (!gmailUser || !adminEmail) {
      return NextResponse.json(
        { ok: false, message: "Server email configuration is incomplete." },
        { status: 500 }
      );
    }

    const transporter = getTransporter();
    const context = getRequestContext(request);
    const subscriberEmail = buildSubscriberEmail(email);
    const adminNotification = buildAdminEmail(email, context);

    await transporter.sendMail({
      from: `"Nontonio Waitlist" <${gmailUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: adminNotification.subject,
      text: adminNotification.text,
      html: adminNotification.html,
    });

    await transporter.sendMail({
      from: `"Nontonio" <${gmailUser}>`,
      to: email,
      subject: subscriberEmail.subject,
      text: subscriberEmail.text,
      html: subscriberEmail.html,
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