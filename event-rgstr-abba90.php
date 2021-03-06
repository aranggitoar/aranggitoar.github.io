<?php
      $servername = "localhost";
      $username = "root";
      $password = "";
      $dbname = "rgstrabba90";
      $conn = mysqli_connect($servername, $username, $password, $dbname);
      if (!$conn) {
            die("ERROR: Tidak bisa terhubung. " 
            . mysqli_connect_error());
      }
      
      $email = $_REQUEST['e-mail'];
      $name = $_REQUEST['name'];
      $gender = $_REQUEST['gender'];
      $age = $_REQUEST['age'];
      $phonenumber = $_REQUEST['phone-number'];
      $homeaddress = $_REQUEST['home-address'];
      $sql = "INSERT INTO rgstrabba90_2021g2(email, name, gender, age, phonenumber, homeaddress) VALUES ('$email', '$name', '$gender', '$age', '$phonenumber', '$homeaddress')";

      if (mysqli_query($conn, $sql)) {
            echo "<script>window.location = 'rgsts.html'</script>";
      } else {
            echo mysqli_error($conn);
      }

      mysqli_close($conn);
?>