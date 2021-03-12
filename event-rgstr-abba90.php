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

      if(!empty($_POST['e-mail'].$_POST['name'].$_POST['gender'].$_POST['age'].$_POST['phone-number'].$_POST['home-address'])){
            $email = mysqli_real_escape_string($conn, $_POST['e-mail']);
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $gender = mysqli_real_escape_string($conn, $_POST['gender']);
            $age = mysqli_real_escape_string($conn, $_POST['age']);
            $phonenumber = mysqli_real_escape_string($conn, $_POST['phone-number']);
            $homeaddress = mysqli_real_escape_string($conn, $_POST['home-address']);
            // echo 'SUCCESS: The data is '. $_POST['name'].$_POST['e-mail'].$_POST['message'];  
            $sql = "INSERT INTO rgstrabba90_2021g2(email,name,gender,age,phonenumber,homeaddress) VALUES ('$email', '$name', '$gender', '$age', '$phonenumber', '$homeaddress')";
        
            if(mysqli_query($conn, $sql)){
                echo 'Message Added...';
            } else {
                echo 'ERROR: '. mysqli_error($conn);
            }
      }      

      mysqli_close($conn);
?>