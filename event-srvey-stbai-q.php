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
	
    if(!empty($_POST['satu'].$_POST['dua'].$_POST['tiga'].$_POST['empat'].$_POST['lima'].
       $_POST['enam'].$_POST['tujuh'].$_POST['delapan'].$_POST['sembilan'].$_POST['sepuluh'].
       $_POST['sebelas'].$_POST['duabelas'].$_POST['tigabelas'].$_POST['empatbelas'].
       $_POST['limabelas'].$_POST['enambelas'].$_POST['tujuhbelas'].$_POST['delapanbelas'].
       $_POST['sembilanbelas'].$_POST['duapuluh'].$_POST['duapuluhsatu'].$_POST['duapuluhdua'].
       $_POST['duapuluhtiga'].$_POST['duapuluhempat'].$_POST['e-mail'].$_POST['name'])) {
		$satu = mysqli_real_escape_string($conn, $_POST['satu']);
		$dua = mysqli_real_escape_string($conn, $_POST['dua']);
		$tiga = mysqli_real_escape_string($conn, $_POST['tiga']);
		$empat = mysqli_real_escape_string($conn, $_POST['empat']);
		$lima = mysqli_real_escape_string($conn, $_POST['lima']);
		$enam = mysqli_real_escape_string($conn, $_POST['enam']);
		$tujuh = mysqli_real_escape_string($conn, $_POST['tujuh']);
		$delapan = mysqli_real_escape_string($conn, $_POST['delapan']);
		$sembilan = mysqli_real_escape_string($conn, $_POST['sembilan']);
		$sepuluh = mysqli_real_escape_string($conn, $_POST['sepuluh']);
		$sebelas = mysqli_real_escape_string($conn, $_POST['sebelas']);
		$duabelas = mysqli_real_escape_string($conn, $_POST['duabelas']);
		$tigabelas = mysqli_real_escape_string($conn, $_POST['tigabelas']);
        $empatbelas = mysqli_real_escape_string($conn, $_POST['empatbelas']);
		$limabelas = mysqli_real_escape_string($conn, $_POST['limabelas']);
		$enambelas = mysqli_real_escape_string($conn, $_POST['enambelas']);
		$tujuhbelas = mysqli_real_escape_string($conn, $_POST['tujuhbelas']);
		$delapanbelas = mysqli_real_escape_string($conn, $_POST['delapanbelas']);
		$sembilanbelas = mysqli_real_escape_string($conn, $_POST['sembilanbelas']);
		$duapuluh = mysqli_real_escape_string($conn, $_POST['duapuluh']);
        $duapuluhsatu = mysqli_real_escape_string($conn, $_POST['duapuluhsatu']);
		$duapuluhdua = mysqli_real_escape_string($conn, $_POST['duapuluhdua']);
		$duapuluhtiga = mysqli_real_escape_string($conn, $_POST['duapuluhtiga']);
		$duapuluhempat = mysqli_real_escape_string($conn, $_POST['duapuluhempat']);
		$email = mysqli_real_escape_string($conn, $_POST['e-mail']);
		$name = mysqli_real_escape_string($conn, $_POST['name']);

		// Prepare queries
		$db_insertion_query = "UPDATE `table_name` SET `1` = '$satu', `2` = '$dua', `3` = '$tiga', `4` = '$empat', `5` = '$lima', `6` = '$enam', `7` = '$tujuh', `8` = '$delapan', `9` = '$sembilan', `10` = '$sepuluh', `11` = '$sebelas', `12` = '$duabelas', `13` = '$tigabelas', `14` = '$empatbelas', `15` = '$limabelas', `16` = '$enambelas', `17` = '$tujuhbelas', `18` = '$delapanbelas', `19` = '$sembilanbelas', `20` = '$duapuluh', `21` = '$duapuluhsatu', `22` = '$duapuluhdua', `23` = '$duapuluhtiga', `24` = '$duapuluhempat' WHERE email = '$email' OR name = '$name';";

		// Save to database
		echo mysqli_query($conn, $db_insertion_query);
	}

	mysqli_close($conn);
?>
