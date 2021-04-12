<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
  
  
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
  
  
    $registrar_email = htmlspecialchars($_POST['e-mail']);
    $registrar_name = htmlspecialchars($_POST['name']);
    // Updateable variables
    $email_subject = 'Selamat Bergabung!';
    $which_wave = 'Gelombang IV';
    $start_date = '1 Mei 2021';
    $end_date = '30 Juli 2021';
  
  
    // Email details
    $email = new PHPMailer(true);
    $email->SetFrom('info@benihyangbaik.com', 'Benih Yang Baik');
    $email->Subject   = $email_subject;
  
    include("email_template.php");
    $email->Body      = $email_body;
    $email->IsHTML(true);
  
    $email->AddAddress( $registrar_email, $registrar_name );
    $email->AddBCC( 'manoel@benihyangbaik.com' );
  
  
    return $email->Send();
?>