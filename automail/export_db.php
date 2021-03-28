<?php
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rgstrabba90";
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("ERROR: Tidak bisa terhubung. " 
        . mysqli_connect_error());
    }

    $result = $conn->query('SELECT * FROM `rgstrabba90_2021g2`');
    if (!$result) die('Couldn\'t fetch records');
    $headers = array();
    while ($fieldinfo = mysqli_fetch_field($result)) {
        $headers[] = $fieldinfo->name;
    }
    
    $db_file_name = 'peserta_abba90_iv.csv';
    $fp = fopen($db_file_name, 'w');
    if ($fp && $result) {
        $db_file_contents = fputcsv($fp, $headers);
        while ($row = $result->fetch_array(MYSQLI_NUM)) {
            $db_file_contents = fputcsv($fp, array_values($row));
        }
        die;
    }

    file_put_contents($db_file_name, $db_file_contents);
    
    mysqli_close($conn);
?>