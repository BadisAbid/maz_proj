<?php
// db.php
$servername = "127.0.0.1";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (empty)
$dbname = "coffee_shop";

// Create connection with explicit port 3307 since XAMPP is configured to use it
$conn = mysqli_connect($servername, $username, $password, $dbname, 3307);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// AUTO-SETUP: Create users table if not exists and add initial admin
$table_query = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
mysqli_query($conn, $table_query);

// AUTO-SETUP: Create contact_messages table if not exists
$messages_query = "CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
mysqli_query($conn, $messages_query);

// Check if any admin exists
$admin_check = mysqli_query($conn, "SELECT * FROM users WHERE role = 'admin'");
if (mysqli_num_rows($admin_check) == 0) {
    $admin_user = 'Admin';
    $admin_email = 'admin@cafe.com';
    $admin_pass = password_hash('admin123', PASSWORD_DEFAULT);
    $insert_admin = "INSERT INTO users (username, email, password, role) VALUES ('$admin_user', '$admin_email', '$admin_pass', 'admin')";
    mysqli_query($conn, $insert_admin);
}
?>
