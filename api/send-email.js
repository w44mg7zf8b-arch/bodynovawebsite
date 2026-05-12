/*
 * /api/send-email
 *
 * Vercel serverless function that receives form submissions from the BodyNova
 * website and emails them to the clinic mailbox over SMTP. No third-party
 * branding is added to the email — the HTML body is fully under our control
 * and styled to match the BodyNova site (teal + gold).
 *
 * Required Vercel environment variables (set in Vercel → Project → Settings →
 * Environment Variables):
 *   SMTP_USER  — the mailbox you send FROM (e.g. bodynova@hucoskills.com)
 *   SMTP_PASS  — that mailbox's password / app password
 *
 * Optional (sensible defaults baked in for Hostinger):
 *   SMTP_HOST  — default "smtp.hostinger.com"
 *   SMTP_PORT  — default "465" (SSL). Use "587" for STARTTLS.
 *   MAIL_TO    — destination address; default "bodynova@hucoskills.com"
 *   MAIL_FROM_NAME — display name; default "BodyNova Website"
 */

import nodemailer from 'nodemailer';

const BRAND = {
  name: 'BodyNova Beauty Center',
  teal: '#1d7576',
  tealDark: '#123c3d',
  gold: '#f5e496',
  cream: '#fbf7df',
  ink: '#143536',
  muted: '#5d6f70'
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function prettyLabel(key) {
  return key
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

/* Reserved keys we never want to render in the email body table. */
const RESERVED_KEYS = new Set([
  '_subject', '_template', '_captcha', '_next',
  'page', 'Page', 'page url', 'Page URL', 'pageUrl'
]);

function buildRowsHtml(payload) {
  const rows = [];
  for (const [rawKey, rawValue] of Object.entries(payload)) {
    if (RESERVED_KEYS.has(rawKey)) continue;
    if (rawValue === undefined || rawValue === null) continue;
    const value = String(rawValue).trim();
    if (!value) continue;
    const label = prettyLabel(rawKey);
    rows.push(`
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #ecebe1;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};font-weight:600;width:38%;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:14px 18px;border-bottom:1px solid #ecebe1;font-size:15px;color:${BRAND.ink};line-height:1.55;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
      </tr>`);
  }
  return rows.join('');
}

function buildTextBody(payload) {
  const lines = [];
  for (const [rawKey, rawValue] of Object.entries(payload)) {
    if (RESERVED_KEYS.has(rawKey)) continue;
    const value = String(rawValue ?? '').trim();
    if (!value) continue;
    lines.push(`${prettyLabel(rawKey)}: ${value}`);
  }
  return lines.join('\n');
}

function buildEmailHtml({ subject, payload, pageTitle, pageUrl }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:'Helvetica Neue', Arial, sans-serif;color:${BRAND.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(29,117,118,.10);">
            <!-- Header band -->
            <tr>
              <td style="background:${BRAND.tealDark};padding:28px 32px;color:#ffffff;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:${BRAND.gold};font-weight:600;">${escapeHtml(BRAND.name)}</p>
                <h1 style="margin:0;font-family:'Cormorant Garamond', Georgia, serif;font-size:26px;font-weight:500;color:#ffffff;line-height:1.25;">New enquiry from the website</h1>
              </td>
            </tr>

            <!-- Sub-header -->
            <tr>
              <td style="padding:22px 32px 0;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:${BRAND.muted};">
                  A new request has been submitted through the BodyNova website.
                  Full details below.
                </p>
              </td>
            </tr>

            <!-- Data table -->
            <tr>
              <td style="padding:18px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #ecebe1;border-radius:14px;overflow:hidden;">
                  ${buildRowsHtml(payload)}
                </table>
              </td>
            </tr>

            <!-- Page meta -->
            <tr>
              <td style="padding:14px 32px 28px;">
                <p style="margin:0;font-size:12px;line-height:1.55;color:${BRAND.muted};letter-spacing:.04em;">
                  Submitted from
                  <span style="color:${BRAND.teal};font-weight:600;">${escapeHtml(pageTitle || '')}</span>${pageUrl ? ` &middot; <a href="${escapeHtml(pageUrl)}" style="color:${BRAND.teal};text-decoration:none;">${escapeHtml(pageUrl)}</a>` : ''}
                </p>
              </td>
            </tr>

            <!-- Footer band -->
            <tr>
              <td style="background:${BRAND.cream};padding:22px 32px;text-align:center;">
                <p style="margin:0 0 4px;font-family:'Cormorant Garamond', Georgia, serif;font-size:18px;color:${BRAND.tealDark};">${escapeHtml(BRAND.name)}</p>
                <p style="margin:0;font-size:12px;color:${BRAND.muted};letter-spacing:.06em;">Premium aesthetic clinic treatments &middot; Dubai</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || 'bodynova@hucoskills.com';
  const fromName = process.env.MAIL_FROM_NAME || 'BodyNova Website';

  if (!user || !pass) {
    res.status(503).json({
      error: 'Email service is not configured. Please set SMTP_USER and SMTP_PASS in the Vercel project environment variables.'
    });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (e) {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  if (!payload || typeof payload !== 'object') {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  const subject = (payload._subject && String(payload._subject).trim()) || `New enquiry from ${BRAND.name} website`;
  const pageTitle = payload.Page || payload.page || '';
  const pageUrl = payload['Page URL'] || payload.pageUrl || '';

  const html = buildEmailHtml({ subject, payload, pageTitle, pageUrl });
  const text = buildTextBody(payload);

  const replyTo =
    payload.Email || payload.email ||
    payload['E Mail'] || payload['E-Mail'] ||
    undefined;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      subject,
      text,
      html,
      replyTo: replyTo && /\S+@\S+\.\S+/.test(String(replyTo)) ? String(replyTo) : undefined
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('send-email error:', error);
    res.status(502).json({
      error: 'Failed to send email. Please verify the SMTP credentials in Vercel environment variables.',
      detail: error && error.message ? String(error.message) : undefined
    });
  }
}
