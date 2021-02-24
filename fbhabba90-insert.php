<html>
<body>

    <?php

        $conn = mysqli_connect("localhost", "root", "", "situs-pemuridan");
          
        if($conn === false){
              die("ERROR: Tidak bisa terhubung. "
                    . mysqli_connect_error());
        }

         $tanggal = $_REQUEST['tanggal'];
         $nama = $_REQUEST['nama'];
         $perikop = $_REQUEST['perikop'];

        $sql = "INSERT INTO fbhabba90 VALUES ('$tanggal', '$nama', '$perikop')";

        if(mysqli_query($conn, $sql)){
              echo "<script>window.location = 'fbhabba90-d.php'</script>";
        } else{
              echo "<script>window.location = 'fbhabba90-er.php'</script>";
        }

        mysqli_close($conn);
    ?>

</body>
</html>