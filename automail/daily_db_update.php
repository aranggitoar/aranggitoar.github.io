<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    
    $bodytext = "Selamat pagi, e-mail ini mengandung lampiran file informasi peserta <b>ABBA 90 IV</b> yang terbaru, yaitu untuk tanggal " . date('d') . ", bulan ke-" . date('m') . " tahun 20" . date('y') . ". Silahkan.<br><br><br>
        Salam damai sejahtera,<br>
        <i>Benih Yang Baik</i><br>
        <u>benihyangbaik.com</u>";

    $email = new PHPMailer();
    $email->SetFrom('info@benihyangbaik.com', 'Benih Yang Baik');
    $email->Subject   = 'File Informasi Peserta ABBA 90 IV';
    $email->Body      = $bodytext;
    $email->IsHTML(true);
    $email->AddAddress( 'manoelindonesia@gmail.com', 'aranggi.josef@gmail.com' );

    $db_file_name = 'peserta_abba90_iv.csv';
    $email->AddAttachment( $db_file_name, 'peserta_abba90_iv-' . date('l_dmy') . '.csv' );

    return $email->Send();
?>