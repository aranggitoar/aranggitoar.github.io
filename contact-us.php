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
      
      $name = $_REQUEST['name'];
      $email = $_REQUEST['e-mail'];
      $message = $_REQUEST['message'];
      $sql = "INSERT INTO contact_us_form(name,email,message) VALUES ('$name', '$email', '$message')";

      if (mysqli_query($conn, $sql)) {
            echo "Sukses BRO";
      } else {
            echo mysqli_error($conn);
      }

      mysqli_close($conn);
?>