<?php

	function weekday_localization ($D_of_date_func)
	{
		if ($D_of_date_func === "Mon") return "Senin";
		if ($D_of_date_func === "Tue") return "Selasa";
		if ($D_of_date_func === "Wed") return "Rabu";
		if ($D_of_date_func === "Thu") return "Kamis";
		if ($D_of_date_func === "Fri") return "Jumat";
		if ($D_of_date_func === "Sat") return "Sabtu";
		if ($D_of_date_func === "Sun") return "Minggu";
	}

	function month_localization ($M_of_date_func)
	{
		if ($M_of_date_func === "Jan") return "Januari";
		if ($M_of_date_func === "Feb") return "Februari";
		if ($M_of_date_func === "Mar") return "Maret";
		if ($M_of_date_func === "Apr") return "April";
		if ($M_of_date_func === "May") return "Mei";
		if ($M_of_date_func === "Jun" || $M_of_date_func === "June") return "Juni";
		if ($M_of_date_func === "Jul" || $M_of_date_func === "July") return "Juli";
		if ($M_of_date_func === "Aug") return "Agustus";
		if ($M_of_date_func === "Sep" || $M_of_date_func === "Sept") return "September";
		if ($M_of_date_func === "Oct") return "Oktober";
		if ($M_of_date_func === "Nov") return "November";
		if ($M_of_date_func === "Des") return "Desember";
	}

	$localized_weekday = date('D');
	$localized_weekday = weekday_localization($localized_weekday);
	$localized_month = date('M');
	$localized_month = month_localization($localized_month);

	$sent_date = $localized_weekday.", ".date('d')." ".$localized_month." ".date('Y');

	$email_body = '
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
<html xmlns=“https://www.w3.org/1999/xhtml”>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>'.$email_subject.'</title>
    </head>
    <div style="width: 100%; height: 100%; margin: 0; font: 500 18.4px Garamond, serif; letter-spacing: .015ch; word-spacing: .05ch; color: #333;">
        <span style="display: none !important; opacity: 0 !important; font-size: 0px !important; line-height: 0px !important; max-height: 0px !important; max-width: 0px !important; overflow: hidden !important; visibility: hidden !important;">
            Salam damai sejahtera kepada Saudara/i yang terkasih di dalam Kristus!
        </span>


        <div style="font-style: italic; padding-top: 8px; background-color: #ffd249;">
            <div style="width: 100%; max-width: 750px; padding: 0 1rem; margin: 0 auto;">
                <div style="width: 100%; margin-top: 1rem;">
                    <img style="display: block; height: 100px; width: 115px; margin: 0 auto;"
                         src="https://benihyangbaik.com/photo/byb-logo-milk-white-transparent.png"
                         alt="Benih Yang Baik">
                </div>
                <div style="display: inline-block; width: 45%;">
                    <p>Kepada:</p>
                    <p>'.$registrar_name.'</p>
                </div>
                <div style="display: inline-block; width: 45%; text-align: right;">
                    <p>'.$sent_date.'</p>
                </div>
            </div>
        </div>
        

        <div style="background-color: #fff; border-top: 1px solid #333; border-bottom: 1px solid #333;">
            <div style="width: 100%; max-width: 750px; padding: 0 1rem; margin: 0 auto;">
                <h1 style="text-align: center; font-size: 40px; font-weight: 800; padding: 1rem 0 .5rem;">Selamat bergabung!</h1>

                <p>Salam damai sejahtera '.$registrar_name.'</p>
                <p>Anda telah bergabung dalam gerakan Ayo Baca dan Belajar Alkitab dalam 90 Hari (ABBA90)!</p>
                <p>ABBA90 bertujuan untuk meningkatkan daya baca Alkitab, sehingga akan lahir suatu generasi yang menjunjung tinggi Alkitab sebagai Firman Allah.</p>
                <p>'.$which_wave.' ABBA90 telah dimulai pada tanggal '.$start_date.' dan akan berakhir pada tanggal '.$end_date.'. Untuk mengikuti gerakan ABBA90 Anda dapat mengunduh aplikasi Alkitab multiversi oleh SABDA atau YouVersion melalui Play Store bagi pengguna HP Android dan App Store bagi pengguna HP iPhone. Ada juga aplikasi Alkitab khusus versi TSI oleh Global Bible Apps dari Play Store yang dapat diunduh <a style="color: #4976FF;" href="https://play.google.com/store/apps/details?id=org.fcbh.inztsi.n2.n">melalui tautan ini</a>. Melalui komputer pribadi atau laptop Anda dapat mengunduh program Alkitab multiversi oleh SABDA <a style="color: #4976FF;" href="www.sabda.net">melalui tautan ini</a>. Atau mengakses YouVersion <a style="color: #4976FF;" href="www.youversion.com">melalui tautan ini</a>.</p>
                <p>Setelah Anda menyelesaikan tiga bulan pembacaan Alkitab Perjanjian Baru (PB) dalam versi Terjemahan Sederhana Indonesia (TSI), Anda akan mendapat satu eksemplar Alkitab TSI dan sertifikat. Apabila Anda sudah bergabung dalam ABBA90 sebelumnya, Anda akan mendapatkan sertifikat saja.</p>
                <p>Anda akan dihubungi secara pribadi oleh seorang dari panitia kami untuk melakukan laporan bacaan harian sepanjang gerakan kita ini. Selain itu, sesegera mungkin kami akan mengundang Anda ke dalam grup WhatsApp agar dapat berbagi firman dan mendorong Saudara/i lain dalam petualangan yang hebat dan mulia ini.</p>
                <p>Demikian yang dapat kami sampaikan. Terima kasih.</p>
        
                <p style="width: 100%; padding: .5rem 0 1rem; text-align: right;">
                    Dengan hormat,<br>
                    <em>Benih Yang Baik<br>
                        <a style="color: #4976FF;" href="https://benihyangbaik.com">
                            benihyangbaik.com
                        </a>
                    </em>
                </p>
            </div>
        </div>


        <div style="background-color: #ffd249;">
            <div style="width: 100%; padding: 0 1rem; max-width: 700px; margin: 0 auto;">
                <div style="padding: 32px 0;">
                    <table cellspacing="1" width="550px" style="margin: 0 auto;">
                        <tr>
                            <td style="text-align: center;">
                                <a style="color: #4976FF; margin: 0 auto;" href="mailto:info@benihyangbaik.com"
                                 target="_blank">
                                    <img style="display: inline-block; margin: 0 auto; height: 30px; width: 30px;"
                                     src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-forwardtofriend-48.png"
                                     alt="Benih Yang Baik">
                                </a>
                            </td>
                            <td style="text-align: center;">
                                <a style="color: #4976FF;" href="https://www.youtube.com/channel/UCYmdc7ETZkkGY1CJmsm1Oiw/featured"
                                target="_blank">
                                    <img style="display: inline-block; height: 30px; width: 30px;"
                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-youtube-48.png"
                                    alt="Benih Yang Baik">
                                </a>
                            </td>
                            <td style="text-align: center;">
                                <a style="color: #4976FF;" href="http://www.instagram.com/benih.info/"
                                 target="_blank">
                                    <img style="display: inline-block; height: 30px; width: 30px;"
                                     src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png"
                                     alt="Benih Yang Baik">
                                </a>
                            </td>
                            <td style="text-align: center;">
                                <a style="color: #4976FF;" href="http://www.facebook.com/byb.byb.54966"
                                 target="_blank">
                                    <img style="display: inline-block; height: 30px; width: 30px;"
                                     src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png"
                                     alt="Benih Yang Baik">
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>

                <div>
                    <p style="font-size: 14px !important; text-align: center;">
                        <em>&#169; 2021 Benih Yang Baik</em><br>
                        Anda menerima surat elektrik ini karena Anda terdaftar dalam ABBA90.
                    </p>
                    <p style="font-size: 14px !important; padding-bottom: 24px; text-align: center;">
                        <strong>Alamat pos kami:</strong><br>
                        Benih Yang Baik<br>
                        Yogyakarta, Indonesia
                    </p>
                </div>
            </div>
        </div>
    </div>
</html>
	';

?>