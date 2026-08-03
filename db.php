<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Configuration
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "lms_db";
$port = 3307; // Aapka XAMPP MySQL port

// Exception handling enable taake fatal crash se bacha ja sakay
mysqli_report(MYSQLI_REPORT_OFF);

$conn = @new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "message" => "Database Connection Failed! Make sure XAMPP MySQL is running on port 3307."
    ]);
    exit();
}
?>