<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$host = "localhost";
$dbname = "cybaemtech_contact_form_v2";
$username = "cybaemtech_contact_user_v2";
$password = "Cybaem@2025";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Create admin_users table if not exists
$conn->query("CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    verify_token VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Auto-add columns if table already exists (migration)
$conn->query("ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS email_verified TINYINT(1) NOT NULL DEFAULT 0");
$conn->query("ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS verify_token VARCHAR(255) DEFAULT NULL");

function sendVerificationEmail($email, $token) {
    $verifyUrl = 'https://cybaemtech.com/auth.php?action=verify&token=' . urlencode($token);
    
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: CybaemTech <no-reply@cybaemtech.com>\r\n";
    $headers .= "Reply-To: info@cybaemtech.com\r\n";

    $subject = "Verify Your Email - Cybaem Tech Admin";
    $body = '
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:20px; }
    .container { max-width:600px; margin:auto; background:#ffffff; border-radius:12px; 
                 box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden; }
    .header { background:#0f172a; padding:20px; text-align:center; }
    .header img { max-width:160px; }
    .content { padding:30px; color:#333333; text-align:center; }
    .content h2 { margin-top:0; color:#0f172a; font-size:22px; }
    .content p { font-size:15px; line-height:1.6; color:#555; }
    .btn { display:inline-block; margin-top:20px; padding:14px 32px; background:#0f172a; 
           color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px; }
    .footer { background:#f9fafb; padding:15px; text-align:center; font-size:13px; color:#666; }
    .footer a { color:#0f172a; text-decoration:none; font-weight:600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://cybaemtech.com/images/cybaem-logo.png" alt="Cybaem Tech Logo" width="160" style="max-width:160px;">
    </div>
    <div class="content">
      <h2>Verify Your Email Address</h2>
      <p>Thank you for creating an admin account on Cybaem Tech.</p>
      <p>Please click the button below to verify your email address and activate your account.</p>
      <a href="' . $verifyUrl . '" class="btn" style="color:#ffffff;">Verify Email Address</a>
      <p style="margin-top:20px; font-size:13px; color:#888;">If the button doesn\'t work, copy and paste this link in your browser:<br>
      <a href="' . $verifyUrl . '" style="color:#0f172a; word-break:break-all;">' . $verifyUrl . '</a></p>
    </div>
    <div class="footer">
      &copy; ' . date('Y') . ' <a href="https://www.cybaemtech.com">Cybaem Tech</a> — All Rights Reserved
    </div>
  </div>
</body>
</html>';

    return @mail($email, $subject, $body, $headers);
}

// Get action from query string or JSON body
$action = $_GET['action'] ?? '';

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
$input = [];
if (strpos($contentType, 'application/json') !== false) {
    $input = json_decode(file_get_contents("php://input"), true) ?? [];
}

// Simple token generation/validation using HMAC
$SECRET_KEY = "cybaem_auth_secret_2025_x9k2m";

function generateToken($userId, $email, $role) {
    global $SECRET_KEY;
    $payload = json_encode([
        "id" => $userId,
        "email" => $email,
        "role" => $role,
        "exp" => time() + 86400 // 24 hours
    ]);
    $signature = hash_hmac('sha256', $payload, $SECRET_KEY);
    return base64_encode($payload) . "." . $signature;
}

function validateToken($token) {
    global $SECRET_KEY;
    $parts = explode(".", $token);
    if (count($parts) !== 2) return null;
    
    $payload = base64_decode($parts[0]);
    $signature = $parts[1];
    
    $expectedSig = hash_hmac('sha256', $payload, $SECRET_KEY);
    if (!hash_equals($expectedSig, $signature)) return null;
    
    $data = json_decode($payload, true);
    if (!$data || $data['exp'] < time()) return null;
    
    return $data;
}

function getTokenFromHeader() {
    // Try getallheaders() first
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    // Fallback: Apache often strips Authorization header
    // Check server variables set by .htaccess RewriteRule or SetEnvIf
    if (empty($auth)) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'] 
            ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] 
            ?? '';
    }
    
    // Fallback: Check for Apache mod_rewrite environment variable
    if (empty($auth) && function_exists('apache_request_headers')) {
        $apacheHeaders = apache_request_headers();
        $auth = $apacheHeaders['Authorization'] ?? $apacheHeaders['authorization'] ?? '';
    }
    
    if (str_starts_with($auth, 'Bearer ')) {
        return substr($auth, 7);
    }
    return null;
}

switch ($action) {
    case 'login':
        $email = $input['email'] ?? '';
        $password_raw = $input['password'] ?? '';
        
        if (empty($email) || empty($password_raw)) {
            http_response_code(400);
            echo json_encode(["error" => "Email and password are required"]);
            exit();
        }
        
        $stmt = $conn->prepare("SELECT id, email, password_hash, role, email_verified FROM admin_users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();
        
        if (!$user || !password_verify($password_raw, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(["error" => "Invalid email or password"]);
            exit();
        }
        
        if (empty($user['email_verified']) || !$user['email_verified']) {
            http_response_code(403);
            echo json_encode(["error" => "Please verify your email before signing in. Check your inbox for the verification link."]);
            exit();
        }
        
        $token = generateToken($user['id'], $user['email'], $user['role']);
        echo json_encode([
            "success" => true,
            "token" => $token,
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
        break;
        
    case 'register':
        $email = $input['email'] ?? '';
        $password_raw = $input['password'] ?? '';
        
        if (empty($email) || empty($password_raw)) {
            http_response_code(400);
            echo json_encode(["error" => "Email and password are required"]);
            exit();
        }
        
        if (strlen($password_raw) < 6) {
            http_response_code(400);
            echo json_encode(["error" => "Password must be at least 6 characters"]);
            exit();
        }
        
        // Check if user exists
        $stmt = $conn->prepare("SELECT id FROM admin_users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            http_response_code(409);
            echo json_encode(["error" => "An account with this email already exists"]);
            $stmt->close();
            exit();
        }
        $stmt->close();
        
        $hash = password_hash($password_raw, PASSWORD_DEFAULT);
        $role = 'admin';
        $verifyToken = bin2hex(random_bytes(32));
        
        $stmt = $conn->prepare("INSERT INTO admin_users (email, password_hash, role, email_verified, verify_token) VALUES (?, ?, ?, 0, ?)");
        $stmt->bind_param("ssss", $email, $hash, $role, $verifyToken);
        
        if ($stmt->execute()) {
            // Send verification email
            sendVerificationEmail($email, $verifyToken);
            
            echo json_encode([
                "success" => true,
                "message" => "Account created! Please check your email to verify your account before signing in."
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to create account"]);
        }
        $stmt->close();
        break;
    
    case 'verify':
        $token = $_GET['token'] ?? '';
        if (empty($token)) {
            http_response_code(400);
            echo '<html><body style="font-family:Arial;text-align:center;padding:60px;"><h2>Invalid verification link.</h2></body></html>';
            exit();
        }
        
        $stmt = $conn->prepare("SELECT id, email FROM admin_users WHERE verify_token = ? AND email_verified = 0");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();
        $verifyUser = $result->fetch_assoc();
        $stmt->close();
        
        if (!$verifyUser) {
            header("Content-Type: text/html");
            echo '<html><head><style>body{font-family:Arial,sans-serif;background:#f4f6f9;margin:0;padding:60px;text-align:center;}.box{max-width:500px;margin:auto;background:#fff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,.08);}.logo{max-width:140px;margin-bottom:20px;}h2{color:#0f172a;}p{color:#666;}</style></head><body><div class="box"><img src="https://cybaemtech.com/images/cybaem-logo.png" alt="Cybaem Tech" class="logo"><h2>Link Expired or Already Verified</h2><p>This verification link is no longer valid. If you\'ve already verified, you can <a href="https://cybaemtech.com/login" style="color:#0f172a;font-weight:600;">sign in here</a>.</p></div></body></html>';
            exit();
        }
        
        $stmt2 = $conn->prepare("UPDATE admin_users SET email_verified = 1, verify_token = NULL WHERE id = ?");
        $stmt2->bind_param("i", $verifyUser['id']);
        $stmt2->execute();
        $stmt2->close();
        
        header("Content-Type: text/html");
        echo '<html><head><style>body{font-family:Arial,sans-serif;background:#f4f6f9;margin:0;padding:60px;text-align:center;}.box{max-width:500px;margin:auto;background:#fff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,.08);}.logo{max-width:140px;margin-bottom:20px;}h2{color:#0f172a;}p{color:#555;line-height:1.6;}.btn{display:inline-block;margin-top:20px;padding:14px 32px;background:#0f172a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;}</style></head><body><div class="box"><img src="https://cybaemtech.com/images/cybaem-logo.png" alt="Cybaem Tech" class="logo"><h2>Email Verified Successfully! &#10003;</h2><p>Your email <strong>' . htmlspecialchars($verifyUser['email']) . '</strong> has been verified.<br>You can now sign in to the admin dashboard.</p><a href="https://cybaemtech.com/login" class="btn">Sign In Now</a></div></body></html>';
        break;
        
    case 'check':
        $token = getTokenFromHeader();
        if (!$token) {
            http_response_code(401);
            echo json_encode(["error" => "No token provided"]);
            exit();
        }
        
        $userData = validateToken($token);
        if (!$userData) {
            http_response_code(401);
            echo json_encode(["error" => "Invalid or expired token"]);
            exit();
        }
        
        echo json_encode([
            "valid" => true,
            "user_id" => $userData['id'],
            "email" => $userData['email'],
            "role" => $userData['role']
        ]);
        break;
        
    default:
        http_response_code(400);
        echo json_encode(["error" => "Invalid action. Use ?action=login|register|verify|check"]);
        break;
}

$conn->close();
?>
