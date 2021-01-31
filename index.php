<!DOCTYPE html>
<html>
    <head>
        <?php
        
            echo "<title>Benih Yang Baik</title>";


        ?>
    </head>
    <body>

        <?php
          /* Penggunaan Variabel */
          $namaKarakter1 = "Budi";
          $namaKarakter2 = "Ibud";
          $jumlahPertemuan  = "15";
          echo "$namaKarakter1 pergi ke pasar <br>";
          echo "Pasar didatangi $namaKarakter1 ke-$jumlahPertemuan kalinya dalam minggu ini <br>";
          echo "$namaKarakter1 bertemu $namaKarakter2 di pasar ke-$jumlahPertemuan kalinya dalam minggu ini <br>";
          echo "$namaKarakter2 berkata kepada $namaKarakter1, '?rabak apA' <br>";

          echo "<br>";
          echo "<br>";
          echo "<hr>";

          /* Tipe Data: huruf, angka, angka dengan desimal,
          boolean (nilainya hanya true/false), dan (null) untuk tanpa nilai */
          $frasa = "Menguatkan Jemaat dalam Prinsip-prinsip dasar Alkitab";
          $umur = 99;
          $ipk = 3.3;
          $setujuAtauTidak = true;
          echo $ipk;
        
          echo "<br>";
          echo "<br>";
          echo "<hr>";

          /* String adalah nilai yang ada di dalam tanda petik php.
          Ada beberapa kode untuk modifikasi string.*/
          echo str_replace("Alkitab", "Kitab Suci", $frasa);

          echo "<br>";
          echo "<br>";

          echo strtoupper($frasa);

          echo "<br>";
          echo "<br>";

          echo strtolower($frasa);

          echo "<br>";
          echo "<br>";

          echo substr($frasa, 24, 7);

          echo "<br>";
          echo "<br>";

          $frasa[48] = "q";
          echo $frasa;

          echo "<br>";
          echo "<br>";
          echo "<hr>";

        /*Penggunaan Angka.
        Integer (penuh) atau desimal dapat dikerjakan dengan segala aritmetika dasar,
        mod (sisa dari operasi pembagian). Seperti peraturan dalam aritmetika pada umumnya,
        dalam sebuah aritmetika tingkat (entah sebutan ini benar atau tidak) perkalian dan
        pembagian dikerjakan terlebih dahulu tetapi kalau penjumlahan atau pengurangan
        dimasukkan ke dalam kurung berarti itu yang dikerjakan terlebih dahulu.*/
          echo -33.77+77;

          echo "<br>";
          echo "<br>";
          echo -33.77-77;

          echo "<br>";
          echo "<br>";
          echo 2.3 * 5;

          echo "<br>";
          echo "<br>";
          echo 1000 / 10;

          echo "<br>";
          echo "<br>";
          echo 28 % 3;
          
          echo "<br>";
          echo "<br>";
          $ang = 7;
          $ang++;
          echo $ang;

          echo "<br>";
          echo "<br>";
          $ang = 7;
          $ang--;
          echo $ang;

          echo "<br>";
          echo "<br>";
          $ang = 7;
          $ang = $ang * $ang;
          echo $ang;

          echo "<br>";
          echo "<br>";
          $ang = 7;
          $ang +=$ang;
          echo $ang;

          /*Beberapa Fungsi Matematika*/
          echo  "<br>";
          echo  "<br>";
          echo abs(-100);

          echo  "<br>";
          echo  "<br>";
          echo pow(3, 5);

          echo  "<br>";
          echo  "<br>";
          echo sqrt(81);

          echo  "<br>";
          echo  "<br>";
          echo max(3, 91);

          echo  "<br>";
          echo  "<br>";
          echo min(3, 91);

          echo  "<br>";
          echo  "<br>";
          echo round(99.501);

          echo  "<br>";
          echo  "<br>";
          echo ceil(99.9999);

          echo  "<br>";
          echo  "<br>";
          echo floor(99.9999);

          echo "<br>";
          echo "<br>";
          echo "<hr>";

        ?>

        <!--Formulir HTML dan PHP-->

          <form action="index.php" method="get">
              Nama: <input type="text" name="nama">
              <br>
              Umur: <input type="number" name="umur">
              <input type="submit">
          </form>
          <br>
              Nama Anda adalah <?php echo $_GET["nama"] ?>
          <br>
              Umur Anda adalah <?php echo $_GET["umur"] ?>

    </body>
</html>