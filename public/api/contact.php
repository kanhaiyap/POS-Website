<?php
/**
 * Contact / demo-request handler for the static site on Hostinger.
 *
 * The live site is static HTML, so the Express /contact handler never runs in production.
 * This script emails each lead and appends it to a JSONL file outside public_html.
 * Mirrors the validation in server.js (POST /api/contact).
 *
 * Responds with JSON when the request asks for it (fetch from main.js),
 * otherwise redirects back to /contact?sent=1 (no-JS fallback).
 */

const LEAD_TO    = 'kanhaiya@aarohitavigyan.com';
const LEAD_FROM  = 'kanhaiya@aarohitavigyan.com'; // must be a mailbox on this domain for Hostinger mail()
const PLANS      = ['free' => 'Free QR Ordering', '250' => 'Simple Billing ₹250', '500' => 'Analytics + QR ₹500', '5000' => 'Voice Ordering ₹5,000'];

header('X-Robots-Tag: noindex');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false
          || stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false;

function respond(bool $ok, array $errors, bool $wantsJson, int $status = 200): void {
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok
            ? ['success' => true, 'message' => 'Thanks — we received your request and will contact you shortly.']
            : ['success' => false, 'errors' => $errors]);
    } else {
        header('Location: /contact' . ($ok ? '?sent=1' : '?error=1'), true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contact', true, 303);
    exit;
}

// Accept JSON (fetch) or form-encoded (plain HTML form)
$input = $_POST;
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
}

$field = function (string $key, int $max = 500) use ($input): string {
    $v = isset($input[$key]) && is_string($input[$key]) ? trim($input[$key]) : '';
    return mb_substr($v, 0, $max);
};
// Strip CR/LF from anything that goes into mail headers
$oneLine = fn(string $v): string => trim(preg_replace('/[\r\n]+/', ' ', $v));

// Honeypot: real visitors never see or fill this field. Pretend success so bots don't retry.
if ($field('website') !== '') {
    respond(true, [], $wantsJson);
}

$name       = $oneLine($field('name', 120));
$email      = $oneLine($field('email', 200));
$phone      = $oneLine($field('phone', 40));
$restaurant = $oneLine($field('restaurant', 160));
$plan       = $field('plan', 10);
$message    = $field('message', 3000);

$errors = [];
if (mb_strlen($name) < 2)                          $errors[] = 'Name is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    $errors[] = 'Valid email is required';
if (mb_strlen($restaurant) < 2)                    $errors[] = 'Business name is required';
if (!array_key_exists($plan, PLANS))               $errors[] = 'Please select a valid plan';
if ($errors) respond(false, $errors, $wantsJson, 400);

$lead = [
    'receivedAt' => gmdate('c'),
    'name'       => $name,
    'email'      => $email,
    'phone'      => $phone,
    'restaurant' => $restaurant,
    'plan'       => $plan,
    'message'    => $message,
    'page'       => $oneLine(mb_substr($_SERVER['HTTP_REFERER'] ?? '', 0, 300)),
    'ip'         => $_SERVER['REMOTE_ADDR'] ?? '',
];

// Backup copy outside the web root so leads survive even if email fails
$store = dirname(__DIR__, 2) . '/leads.jsonl';
$saved = @file_put_contents($store, json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) !== false;

$subject = '=?UTF-8?B?' . base64_encode("New demo request — {$name} ({$restaurant}) · " . PLANS[$plan]) . '?=';
$waNumber = preg_replace('/\D+/', '', $phone);
$body = "New lead from aarohitavigyan.com\n\n"
      . "Name:     {$name}\n"
      . "Email:    {$email}\n"
      . "Phone:    " . ($phone ?: 'not provided') . "\n"
      . "Business: {$restaurant}\n"
      . "Plan:     " . PLANS[$plan] . "\n"
      . "Page:     {$lead['page']}\n"
      . "Time:     {$lead['receivedAt']} (UTC)\n\n"
      . "Message:\n" . ($message ?: '(none)') . "\n"
      . ($waNumber ? "\nWhatsApp them: https://wa.me/" . (strlen($waNumber) === 10 ? '91' . $waNumber : $waNumber) . "\n" : '');

$headers = implode("\r\n", [
    'From: Bhojan Mitra Website <' . LEAD_FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);
$mailed = @mail(LEAD_TO, $subject, $body, $headers, '-f' . LEAD_FROM);

if (!$mailed && !$saved) {
    respond(false, ['Could not send your request. Please WhatsApp us on +91 97316 15178.'], $wantsJson, 500);
}
respond(true, [], $wantsJson);
