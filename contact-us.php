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
    
    if(!empty($_POST['name'].$_POST['e-mail'].$_POST['message'])){
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $email = mysqli_real_escape_string($conn, $_POST['e-mail']);
        $message = mysqli_real_escape_string($conn, $_POST['message']);

        $sql = "INSERT INTO contact_us_form(name,email,message) VALUES ('$name', '$email', '$message')";
        
        if(mysqli_query($conn, $sql)){
            echo 'Message Added...';
        } else {
            echo 'ERROR: '. mysqli_error($conn);
        }
    }

    mysqli_close($conn);
?>