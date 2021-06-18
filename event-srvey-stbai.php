<?php
	ini_set( 'display_errors', 1 );
	error_reporting( E_ALL );

    $servername = "";
    $username = "";
    $password = "";
    $dbname = "";
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn) {
		die("ERROR: Tidak bisa terhubung. "
		. mysqli_connect_error());
	}

	if(!empty($_POST['e-mail'].$_POST['name'].$_POST['gender'].$_POST['age'].
       $_POST['phone-number'].$_POST['origin'])) {
		$email = mysqli_real_escape_string($conn, $_POST['e-mail']);
		$name = mysqli_real_escape_string($conn, $_POST['name']);
		$gender = mysqli_real_escape_string($conn, $_POST['gender']);
		$age = mysqli_real_escape_string($conn, $_POST['age']);
		$phonenumber = mysqli_real_escape_string($conn, $_POST['phone-number']);
		$origin = mysqli_real_escape_string($conn, $_POST['origin']);

		// Prepare queries
		$db_check_query = "SELECT email, name FROM table_name WHERE email = '$email' OR name = '$name';";
		$db_insertion_query = "INSERT INTO table_name(email,name,gender,age,phonenumber,origin) VALUES ('$email', '$name', '$gender', '$age', '$phonenumber', '$origin');";

		// Check if already registered
		$db_check_result = mysqli_query($conn, $db_check_query);
		$encoded_db_check_result = json_encode(mysqli_fetch_array($db_check_result));

		// Send back the result to AJAX
		echo $encoded_db_check_result;

		// Save to database if registrar is not already registered
		if ($encoded_db_check_result === "null") {
			mysqli_query($conn, $db_insertion_query);
		}
	}

	mysqli_close($conn);
?>
