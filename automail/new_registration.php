<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );

    $registrar_email = htmlspecialchars($_POST['e-mail']);
    $registrar_name = htmlspecialchars($_POST['name']);

    $email = new PHPMailer(true);
    $email->SetFrom('info@benihyangbaik.com', 'Benih Yang Baik');
    $email->Subject   = 'Selamat Berkabung! 👋';
    include("email_template.php");
    $email->Body      = $email_body;
    $email->IsHTML(true);
    
    $email->AddAddress( $registrar_email, $registrar_name );
    $email->AddBCC( 'manoel@benihyangbaik.com' );

    return $email->Send();
?>