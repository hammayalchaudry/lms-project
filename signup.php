<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['name']) && !empty($data['email']) && !empty($data['password'])) {
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    // Role default student hoga agar pass na kiya jaye
    $role = isset($data['role']) ? mysqli_real_escape_string($conn, $data['role']) : 'student';

    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $res = $conn->query($checkEmail);

    if ($res && $res->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email pehle se registered hai!"]);
    } else {
        // Table mein role column bhi add hoga
        $sql = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$password', '$role')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Account successfully ban gaya hai!"]);
        } else {
            echo json_encode(["success" => false, "message" => "SQL Error: " . $conn->error]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Tamam fields fill karein!"]);
}
?>