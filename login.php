<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['email']) && !empty($data['password'])) {
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = $data['password'];
    $role = isset($data['role']) ? mysqli_real_escape_string($conn, $data['role']) : '';

    // Query to find user by email
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Password matching
        if (password_verify($password, $user['password'])) {
            
            // Check role mismatch
            if (!empty($role) && strcasecmp($user['role'], $role) !== 0) {
                echo json_encode([
                    "success" => false, 
                    "message" => "This email is registered as '" . $user['role'] . "'. Please select the correct role!"
                ]);
            } else {
                unset($user['password']);
                echo json_encode([
                    "success" => true, 
                    "message" => "Login Successful!", 
                    "user" => $user
                ]);
            }

        } else {
            echo json_encode(["success" => false, "message" => "Invalid password. Please try again!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email address not registered. Please sign up first!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email and Password are required!"]);
}
?>