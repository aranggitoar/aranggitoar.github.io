<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    
    
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    
    
    $bodytext = "E-mail ini mengandung lampiran file informasi peserta <b>ABBA 90 IV</b> yang terbaru, yaitu untuk tanggal " . date('d') . ", bulan ke-" . date('m') . " tahun 20" . date('y') . ". Silahkan.<br><br><br>
        Salam damai sejahtera,<br>
        <i>Benih Yang Baik</i><br>
        <u>benihyangbaik.com</u>";
    $db_file_name = 'peserta_abba90_iv_tambahan.csv';


    $email = new PHPMailer(true);
    $email->SetFrom('info@benihyangbaik.com', 'Benih Yang Baik');
    $email->Subject   = 'File Informasi Peserta ABBA 90 IV';
    $email->Body      = $bodytext;
    $email->IsHTML(true);
    
    // $email->AddAddress( 'aranggi.josef@gmail.com', 'Aranggi Toar' );
    $email->AddAddress( 'manoelindonesia@gmail.com', 'Manoel Pedro' );

    $email->AddAttachment( $db_file_name, 'peserta_abba90_iv_tambahan-' . date('l_dmy') . '.csv' );


    return $email->Send();
?>