<?php
/**
 * Copy this file to "config.php" (same folder as contact.php) on the SERVER only,
 * fill in the real values below, and make sure config.php is:
 *   - NOT committed to git / your repo
 *   - NOT publicly downloadable
 *
 * contact.php automatically picks these up if config.php exists.
 * If you'd rather use your hosting panel's "Environment Variables" feature,
 * you can skip this file entirely and set SMTP_HOST / SMTP_PORT / SMTP_SECURE /
 * SMTP_USER / SMTP_PASS / LEAD_TO_EMAIL as environment variables instead -
 * contact.php checks both.
 *
 * ---- Using Gmail / Google Workspace (e.g. rahul@absoluteranking.com) ----
 * SMTP_USER must be the full email address.
 * SMTP_PASS must be a 16-character "App Password" (NOT the normal Gmail login
 * password) - generate one at https://myaccount.google.com/apppasswords
 * after turning on 2-Step Verification for that account.
 */

return [
    'SMTP_HOST'     => 'smtp.gmail.com',
    'SMTP_PORT'     => 465,          // 465 for SSL, or 587 if you switch SMTP_SECURE to 'tls'
    'SMTP_SECURE'   => 'ssl',        // 'ssl' (port 465) or 'tls' (port 587)
    'SMTP_USER'     => 'rahul@absoluteranking.com',
    'SMTP_PASS'     => 'itgbsichmdoibhtv',
    'LEAD_TO_EMAIL' => 'info@absoluteranking.com',
];