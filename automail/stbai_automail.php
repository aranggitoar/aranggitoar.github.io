<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
  
  
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
  
  
    $participant_email = htmlspecialchars($_POST['e-mail']);
    $participant_name = htmlspecialchars($_POST['name']);
    // $answer_one = htmlspecialchars($_POST['satu']);
    // $answer_two = htmlspecialchars($_POST['dua']);
    // $answer_three = htmlspecialchars($_POST['tiga']);
    // $answer_four = htmlspecialchars($_POST['empat']);
    // $answer_five = htmlspecialchars($_POST['lima']);
    // $answer_six = htmlspecialchars($_POST['enam']);
    // $answer_seven = htmlspecialchars($_POST['tujuh']);
    // $answer_eight = htmlspecialchars($_POST['delapan']);
    // $answer_nine = htmlspecialchars($_POST['sembilan']);
    // $answer_ten = htmlspecialchars($_POST['sepuluh']);
    // $answer_eleven = htmlspecialchars($_POST['sebelas']);
    // $answer_twelve = htmlspecialchars($_POST['duabelas']);
    // $answer_thirteen = htmlspecialchars($_POST['tigabelas']);
    // $answer_fourteen = htmlspecialchars($_POST['empatbelas']);
    // $answer_fifteen = htmlspecialchars($_POST['limabelas']);
    // $answer_sixteen = htmlspecialchars($_POST['enambelas']);
    // $answer_seventeen = htmlspecialchars($_POST['tujuhbelas']);
    // $answer_eighteen = htmlspecialchars($_POST['delapanbelas']);
    // $answer_nineteen = htmlspecialchars($_POST['sembilanbelas']);
    // $answer_twenty = htmlspecialchars($_POST['duapuluh']);
    // $answer_twentyone = htmlspecialchars($_POST['duapuluhsatu']);
    // $answer_twentytwo = htmlspecialchars($_POST['duapuluhdua']);
    // $answer_twentythree = htmlspecialchars($_POST['duapuluhtiga']);
    // $answer_twentyfour = htmlspecialchars($_POST['duapuluhempat']);


    // Updateable variables
    $email_subject = 'Terima kasih!';
    // $participant_count;


    // Getting the participant count from database
    // $servername = "";
    // $username = "";
    // $password = "";
    // $dbname = "";
    // $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    // if (!$conn) {
    //     die("ERROR: Tidak bisa terhubung. "
    //     . mysqli_connect_error());
    // }

    // if ($result = mysqli_query($conn, "SELECT COUNT(*) FROM table_name")) {
    //     while ($row = mysqli_fetch_row($result)) {
    //         $participant_count = $row[0];
    //     }
    // }

    // mysqli_close($conn);
  
  
    // Email details
    $email = new PHPMailer(true);
    $email->SetFrom('info@benihyangbaik.com', 'Benih Yang Baik');
    $email->Subject   = $email_subject;
  
    include("stbai_email_template.php");
    $email->Body      = $email_body;
    $email->IsHTML(true);
  
    $email->AddAddress( $participant_email, $participant_name );
    $email->AddBCC( 'info@benihyangbaik.com', 'BYB' );
    $email->AddBCC( 'manoel@benihyangbaik.com', 'Manoel Pedro' );
  
  
    return $email->Send();
?>
