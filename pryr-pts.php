<?php
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "situs-pemuridan";
      $conn = mysqli_connect($servername, $username, $password, $dbname);
      if (!$conn) {
            die("ERROR: Tidak bisa terhubung. " 
            . mysqli_connect_error());
      }
      
      $email = $_REQUEST['e-mail'];
      $name = $_REQUEST['name'];
      $prayerpoints = $_REQUEST['prayer-points'];
      $sql = "INSERT INTO contact_us_form(email,name,prayerpoints) VALUES ('$email', '$name', '$prayerpoints')";

      if (mysqli_query($conn, $sql)) {
            echo "Sukses BRO";
      } else {
            echo mysqli_error($conn);
      }

      mysqli_close($conn);
?>