<?php
/**
 * Contact form handler for the PPC lead form.
 *
 * Credentials (SMTP username/password, recipient address) are NOT hardcoded here.
 * They are read from environment variables, or from an optional local config.php
 * that you create on the server yourself (see config.example.php). Never commit
 * real credentials to source control.
 */

// ---- CORS -------------------------------------------------------------
// Restrict to the site's own origin instead of '*'. Override with the
// CONTACT_ALLOWED_ORIGIN env var if the form is ever served from another domain.
$allowedOrigin = getenv('CONTACT_ALLOWED_ORIGIN') ?: 'https://absoluteranking.com';
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// ---- Load credentials --------------------------------------------------
// 1) Prefer a config.php that lives only on the server (not in git), if present.
// 2) Otherwise fall back to environment variables set in the hosting panel.
$smtpHost     = null;
$smtpPort     = null;
$smtpSecure   = null; // 'ssl' (port 465) or 'tls' (port 587)
$smtpUser     = null;
$smtpPass     = null;
$leadToEmail  = null;

$localConfigPath = __DIR__ . '/config.php';
if (file_exists($localConfigPath)) {
    $config = require $localConfigPath; // expected to return an associative array
    $smtpHost    = $config['SMTP_HOST'] ?? null;
    $smtpPort    = $config['SMTP_PORT'] ?? null;
    $smtpSecure  = $config['SMTP_SECURE'] ?? null;
    $smtpUser    = $config['SMTP_USER'] ?? null;
    $smtpPass    = $config['SMTP_PASS'] ?? null;
    $leadToEmail = $config['LEAD_TO_EMAIL'] ?? null;
}

// Defaults target Google Workspace / Gmail SMTP (smtp.gmail.com, port 465, SSL),
// since that's what this site currently uses. Override any of these via config.php
// or the matching environment variable (SMTP_HOST, SMTP_PORT, SMTP_SECURE, ...).
$smtpHost    = $smtpHost    ?: (getenv('SMTP_HOST') ?: 'smtp.gmail.com');
$smtpPort    = $smtpPort    ?: (getenv('SMTP_PORT') ?: 465);
$smtpSecure  = $smtpSecure  ?: (getenv('SMTP_SECURE') ?: 'ssl');
$smtpUser    = $smtpUser    ?: getenv('SMTP_USER');
$smtpPass    = $smtpPass    ?: getenv('SMTP_PASS');
$leadToEmail = $leadToEmail ?: (getenv('LEAD_TO_EMAIL') ?: 'rahul@absoluteranking.com');

if (!$smtpUser || !$smtpPass) {
    // Credentials aren't configured on the server yet - fail loudly in the logs,
    // but don't leak configuration details to the client.
    error_log('contact.php: SMTP_USER / SMTP_PASS are not configured (env vars or config.php).');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Email is not configured on the server yet.']);
    exit;
}

// ---- Read & validate input ---------------------------------------------
$name     = trim($_POST['name'] ?? '');
$emailRaw = trim($_POST['email'] ?? '');
$email    = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
$phone    = trim($_POST['phone'] ?? '');
$website  = trim($_POST['website'] ?? '');
$budget   = trim($_POST['budget'] ?? '');

$allowedBudgets = ['', 'Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹5,00,000', '₹5,00,000+'];

$errors = [];
if ($name === '' || mb_strlen($name) < 2) {
    $errors['name'] = 'Please provide a valid name.';
}
if (!$email) {
    $errors['email'] = 'Please provide a valid email address.';
}
$digitCount = preg_match_all('/\d/', $phone);
if ($phone === '' || $digitCount < 7 || $digitCount > 15) {
    $errors['phone'] = 'Please provide a valid phone number.';
}
if (!in_array($budget, $allowedBudgets, true)) {
    // Unexpected value - ignore rather than reject, since it's an optional field.
    $budget = '';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing or invalid fields', 'fields' => $errors]);
    exit;
}

// Escape only when building the HTML email body, so validation above works on raw values.
$nameHtml    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$emailHtml   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phoneHtml   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$websiteHtml = htmlspecialchars($website, ENT_QUOTES, 'UTF-8');
$budgetHtml  = htmlspecialchars($budget, ENT_QUOTES, 'UTF-8');

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = ($smtpSecure === 'tls') ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int) $smtpPort;

    $mail->setFrom($smtpUser, 'Absolute Ranking Website');
    $mail->addAddress($leadToEmail);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New PPC Enquiry from Website';
    $mail->Body = "
        <h3>New Lead Details</h3>
        <p><strong>Name:</strong> {$nameHtml}</p>
        <p><strong>Email:</strong> {$emailHtml}</p>
        <p><strong>Phone:</strong> {$phoneHtml}</p>
        <p><strong>Website:</strong> {$websiteHtml}</p>
        <p><strong>Budget:</strong> {$budgetHtml}</p>
    ";
    $mail->AltBody = "New Lead Details\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nWebsite: {$website}\nBudget: {$budget}";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (PHPMailerException $e) {
    // Log full details server-side only; never expose SMTP internals to the client.
    error_log('contact.php mail error: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'We could not send your enquiry right now. Please try again shortly.']);
}