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

    $result = $conn->query('SELECT * FROM `table_name`');
    if (!$result) die('Couldn\'t fetch records');
    $headers = array();
    while ($fieldinfo = mysqli_fetch_field($result)) {
        $headers[] = $fieldinfo->name;
    }
    
    $db_file_name = '';
    $fp = fopen($db_file_name, 'w');
    if ($fp && $result) {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename=""');
        header('Pragma: no-cache');
        header('Expires: 0');
        $db_file_contents = fputcsv($fp, $headers);
        while ($row = $result->fetch_array(MYSQLI_NUM)) {
            $db_file_contents = fputcsv($fp, array_values($row));
        }
        die;
    }
    
    file_put_contents($db_file_name, $db_file_contents);
    
    mysqli_close($conn);
?>