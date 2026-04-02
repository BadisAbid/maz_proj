<?php
include 'db.php';

$username = 'Admin';
$email = 'admin@cafe.com';
$password = 'admin123';
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query = "DELETE FROM users WHERE email = '$email'";
mysqli_query($conn, $query);

$query = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$hashed_password', 'admin')";

if (mysqli_query($conn, $query)) {
    echo "<h1>Admin Account Fixed!</h1>";
    echo "<p>User: <strong>$email</strong></p>";
    echo "<p>Password: <strong>$password</strong></p>";
    echo "<p><a href='signin.php'>Go to Login</a></p>";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
