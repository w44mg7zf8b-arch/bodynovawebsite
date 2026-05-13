<?php
/*
 * send.php — BodyNova Beauty Center form handler
 *
 * Receives form submissions from every page on the BodyNova site
 * (homepage booking, about-page booking, service-page booking, contact
 * form, plus any other generic form) and emails them to the clinic
 * mailbox using PHP's built-in mail() function (the LOCAL server MTA —
 * sendmail / postfix — no remote SMTP).
 *
 * No third-party service is used. The HTML email body is fully branded
 * in the BodyNova palette (teal + gold + cream) so the email looks like
 * it belongs to the website.
 *
 * Supports two submission styles:
 *   1. AJAX POST (Content-Type: application/x-www-form-urlencoded or
 *      multipart/form-data or application/json) — responds with JSON
 *      { "ok": true } so scripts.js can show the inline "Sending…" ->
 *      "Sent" UI and then redirect to thank-you.html.
 *   2. Plain HTML form POST (no JS / JS disabled) — responds with an
 *      HTTP 302 redirect to thank-you.html on success, or to an inline
 *      error page on failure.
 *
 * Configuration (override at top of file if needed):
 *   $MAIL_TO        — destination address (clinic inbox)
 *   $MAIL_FROM      — "From:" header. Must usually be on the same domain
 *                     as the server, otherwise shared hosts reject it
 *                     or it ends up in spam.
 *   $MAIL_FROM_NAME — display name shown in the From: header.
 *   $BRAND          — visual palette used by the HTML email template.
 */

// ---------- CONFIG ----------
$MAIL_TO        = 'bodynova@hucoskills.com';
$MAIL_FROM      = 'bodynova@hucoskills.com';
$MAIL_FROM_NAME = 'BodyNova Website';
$THANK_YOU_URL  = 'thank-you.html';

$BRAND = [
  'name'      => 'BodyNova Beauty Center',
  'teal'      => '#1d7576',
  'teal_dark' => '#123c3d',
  'gold'      => '#f5e496',
  'cream'     => '#fbf7df',
  'ink'       => '#143536',
  'muted'     => '#5d6f70',
];

// Field keys we never want to render as a labeled row in the email
// (these are control fields, not user-visible data).
$RESERVED_KEYS = ['_subject', '_template', '_captcha', '_next',
                  'page', 'page_url', 'pageurl'];

// ---------- HELPERS ----------
function bn_is_ajax() {
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
      strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    return true;
  }
  $accept = isset($_SERVER['HTTP_ACCEPT']) ? $_SERVER['HTTP_ACCEPT'] : '';
  if (stripos($accept, 'application/json') !== false) return true;
  $ctype  = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
  if (stripos($ctype, 'application/json') !== false) return true;
  return false;
}

function bn_json_response($payload, $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  echo json_encode($payload);
  exit;
}

function bn_redirect($url) {
  header('Location: ' . $url, true, 302);
  exit;
}

function bn_collect_payload() {
  // 1. JSON body
  $ctype = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
  if (stripos($ctype, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    if ($raw) {
      $decoded = json_decode($raw, true);
      if (is_array($decoded)) return $decoded;
    }
    return [];
  }
  // 2. Form-encoded / multipart
  return $_POST;
}

function bn_pretty_label($key) {
  $key = preg_replace('/[-_]+/', ' ', $key);
  $key = preg_replace('/([a-z])([A-Z])/', '$1 $2', $key);
  return trim(ucwords($key));
}

function bn_esc($v) {
  return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function bn_is_email($v) {
  return is_string($v) && filter_var($v, FILTER_VALIDATE_EMAIL);
}

function bn_build_rows_html($payload, $reserved, $brand) {
  $html = '';
  foreach ($payload as $key => $value) {
    if (in_array(strtolower($key), array_map('strtolower', $reserved), true)) continue;
    if ($value === null) continue;
    if (is_array($value)) $value = implode(', ', $value);
    $value = trim((string)$value);
    if ($value === '') continue;
    $label = bn_esc(bn_pretty_label($key));
    $valHtml = nl2br(bn_esc($value));
    $html .= '
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #ecebe1;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:' . $brand['muted'] . ';font-weight:600;width:38%;vertical-align:top;white-space:nowrap;">' . $label . '</td>
        <td style="padding:14px 18px;border-bottom:1px solid #ecebe1;font-size:15px;color:' . $brand['ink'] . ';line-height:1.55;">' . $valHtml . '</td>
      </tr>';
  }
  return $html;
}

function bn_build_text_body($payload, $reserved) {
  $lines = [];
  foreach ($payload as $key => $value) {
    if (in_array(strtolower($key), array_map('strtolower', $reserved), true)) continue;
    if (is_array($value)) $value = implode(', ', $value);
    $value = trim((string)$value);
    if ($value === '') continue;
    $lines[] = bn_pretty_label($key) . ': ' . $value;
  }
  return implode("\n", $lines);
}

function bn_build_email_html($subject, $payload, $reserved, $brand, $pageTitle, $pageUrl) {
  $subjectEsc = bn_esc($subject);
  $rows       = bn_build_rows_html($payload, $reserved, $brand);
  $pageMeta   = '';
  if ($pageTitle || $pageUrl) {
    $pageMeta  = '<p style="margin:0;font-size:12px;line-height:1.55;color:' . $brand['muted'] . ';letter-spacing:.04em;">Submitted from ';
    if ($pageTitle) $pageMeta .= '<span style="color:' . $brand['teal'] . ';font-weight:600;">' . bn_esc($pageTitle) . '</span>';
    if ($pageUrl)   $pageMeta .= ' &middot; <a href="' . bn_esc($pageUrl) . '" style="color:' . $brand['teal'] . ';text-decoration:none;">' . bn_esc($pageUrl) . '</a>';
    $pageMeta .= '</p>';
  }
  $brandName = bn_esc($brand['name']);

  return '<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>' . $subjectEsc . '</title>
  </head>
  <body style="margin:0;padding:0;background:' . $brand['cream'] . ';font-family:\'Helvetica Neue\', Arial, sans-serif;color:' . $brand['ink'] . ';">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' . $brand['cream'] . ';padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(29,117,118,.10);">
            <tr>
              <td style="background:' . $brand['teal_dark'] . ';padding:28px 32px;color:#ffffff;">
                <p style="margin:0 0 6px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:' . $brand['gold'] . ';font-weight:600;">' . $brandName . '</p>
                <h1 style="margin:0;font-family:\'Cormorant Garamond\', Georgia, serif;font-size:26px;font-weight:500;color:#ffffff;line-height:1.25;">New enquiry from the website</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 0;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:' . $brand['muted'] . ';">
                  A new request has been submitted through the BodyNova website.
                  Full details below.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #ecebe1;border-radius:14px;overflow:hidden;">
                  ' . $rows . '
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 32px 28px;">
                ' . $pageMeta . '
              </td>
            </tr>
            <tr>
              <td style="background:' . $brand['cream'] . ';padding:22px 32px;text-align:center;">
                <p style="margin:0 0 4px;font-family:\'Cormorant Garamond\', Georgia, serif;font-size:18px;color:' . $brand['teal_dark'] . ';">' . $brandName . '</p>
                <p style="margin:0;font-size:12px;color:' . $brand['muted'] . ';letter-spacing:.06em;">Premium aesthetic clinic treatments &middot; Dubai</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>';
}

// ---------- MAIN ----------
header('X-Content-Type-Options: nosniff');

// CORS pre-flight (in case the form is hit from a different subdomain)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  if (bn_is_ajax()) bn_json_response(['error' => 'Method not allowed.'], 405);
  http_response_code(405);
  echo 'Method not allowed.';
  exit;
}

$payload = bn_collect_payload();

// Honeypot: if any of these hidden fields are filled in, silently drop
// the submission. Real visitors never see or fill these inputs.
$hp = '';
foreach (['_honey', 'website', 'company_url'] as $k) {
  if (!empty($payload[$k])) { $hp = $k; break; }
}
if ($hp !== '') {
  if (bn_is_ajax()) bn_json_response(['ok' => true]);
  bn_redirect($THANK_YOU_URL);
}

// Subject
$subject = isset($payload['_subject']) && trim((string)$payload['_subject']) !== ''
  ? trim((string)$payload['_subject'])
  : 'New enquiry from ' . $BRAND['name'] . ' website';

// Page meta
$pageTitle = '';
$pageUrl   = '';
foreach (['Page', 'page'] as $k) { if (!empty($payload[$k])) { $pageTitle = (string)$payload[$k]; break; } }
foreach (['Page URL', 'page_url', 'pageUrl'] as $k) { if (!empty($payload[$k])) { $pageUrl = (string)$payload[$k]; break; } }

// Reply-To: if visitor entered an email, use it so the clinic can hit
// "Reply" in their mail client and respond directly.
$replyTo = '';
foreach (['Email', 'email', 'E Mail', 'E-Mail'] as $k) {
  if (!empty($payload[$k]) && bn_is_email($payload[$k])) {
    $replyTo = (string)$payload[$k];
    break;
  }
}

// Build email
$html = bn_build_email_html($subject, $payload, $RESERVED_KEYS, $BRAND, $pageTitle, $pageUrl);
$text = bn_build_text_body($payload, $RESERVED_KEYS);

// MIME boundary
$boundary = '=_BN_' . bin2hex(random_bytes(12));

$headers  = '';
$headers .= 'From: "' . $MAIL_FROM_NAME . '" <' . $MAIL_FROM . '>' . "\r\n";
$headers .= 'X-Mailer: BodyNova-Website/1.0' . "\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: multipart/alternative; boundary="' . $boundary . '"' . "\r\n";
if ($replyTo !== '') {
  $headers .= 'Reply-To: ' . $replyTo . "\r\n";
}

$body  = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $text . "\r\n\r\n";

$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $html . "\r\n\r\n";

$body .= "--{$boundary}--\r\n";

// Some shared hosts require -f sender envelope to avoid spam filtering.
// We try the 5-arg form first; if it errors out (host disabled the
// "-f" flag), fall back to the 4-arg form.
$ok = false;
if (function_exists('mail')) {
  $ok = @mail($MAIL_TO, $subject, $body, $headers, '-f' . $MAIL_FROM);
  if (!$ok) {
    $ok = @mail($MAIL_TO, $subject, $body, $headers);
  }
}

if ($ok) {
  if (bn_is_ajax()) bn_json_response(['ok' => true]);
  bn_redirect($THANK_YOU_URL);
}

// Failure path
$errorMessage = 'Failed to send your message. The server mail service may be unavailable. Please try again or contact us on WhatsApp.';
if (bn_is_ajax()) bn_json_response(['error' => $errorMessage], 502);

http_response_code(502);
header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html><head><meta charset="utf-8"><title>Could not send</title></head>'
   . '<body style="font-family:Arial,sans-serif;padding:32px;color:#143536;background:#fbf7df;">'
   . '<h1>Sorry, your message could not be sent.</h1>'
   . '<p>' . bn_esc($errorMessage) . '</p>'
   . '<p><a href="javascript:history.back()">&larr; Go back and try again</a></p>'
   . '</body></html>';
