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

      if(!empty($_POST['e-mail'].$_POST['name'].$_POST['prayer-points'])){
            $email = mysqli_real_escape_string($conn, $_POST['e-mail']);
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $prayerpoints = mysqli_real_escape_string($conn, $_POST['prayer-points']);
            
            $sql = "INSERT INTO prayer_points_form(email,name,prayerpoints) VALUES ('$email', '$name', '$prayerpoints')";
        
            if(mysqli_query($conn, $sql)){
                echo 'Message Added...';
            } else {
                echo 'ERROR: '. mysqli_error($conn);
            }
      }      

      mysqli_close($conn);
?>