<?php

	$servername = "localhost";
	$username = "root";
    $password = "root";
    $dbname = "r_db";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset('utf8');
	$conn->query("SET collation_connection = utf8_general_ci");
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
?>