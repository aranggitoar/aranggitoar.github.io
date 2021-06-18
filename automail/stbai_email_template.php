<?php

	include("date_localizations.php");

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
					Kontribusi Anda sangat berharga di mata Allah!
				</span>
	

				<div style="font-style: italic; padding-top: 8px;">
					<div style="width: 100%; max-width: 750px; padding: 0 1rem; margin: 0 auto;">
						<div style="width: 100%; margin-top: 1rem;">
							<img style="display: block; height: 100px; width: 115px; margin: 0 auto;"
								 src="https://benihyangbaik.com/photo/byb-logo-grey-transparent.png"
								 alt="Benih Yang Baik">
						</div>
						<div style="display: inline-block; width: 45%;">
							<p>Kepada:</p>
							<p>'.$participant_name.'</p>
						</div>
						<div style="display: inline-block; width: 45%; text-align: right;">
							<p>'.$sent_date.'</p>
						</div>
					</div>
				</div>


				<div style="background-color: #fff; border-top: 1px solid #333; border-bottom: 1px solid #333;">
					<div style="width: 100%; max-width: 750px; padding: 0 1rem; margin: 0 auto;">
						<h1 style="text-align: center; font-size: 40px; font-weight: 800; padding: 1rem 0 .5rem;">Terima kasih!</h1>

						<p>Salam sejahtera '.$participant_name.'</p>
						<p>Anda telah selesai menjawahb survei STBAI, atas kerjasama Anda, Benih Yang Baik berterima kasih. Doa kami adalah supaya Tuhan memberkati hidup dan pelayanan Anda.</p>
						<p>Terima kasih.</p>

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


				<div>
					<div style="width: 100%; padding: 0 1rem; max-width: 700px; margin: 0 auto;">
						<div style="padding: 32px 0;">
							<table cellspacing="1" width="550px" style="margin: 0 auto;">
								<tr>
									<td style="text-align: center;">
										<a style="color: #4976FF; margin: 0 auto;" href="mailto:info@benihyangbaik.com"
										 target="_blank">
											<img style="display: inline-block; margin: 0 auto; height: 20px; width: 20px;"
											 src="https://benihyangbaik.com/photo/email.png"
											 alt="Benih Yang Baik">
										</a>
									</td>
									<td style="text-align: center;">
										<a style="color: #4976FF;" href="https://www.youtube.com/channel/UCYmdc7ETZkkGY1CJmsm1Oiw/featured"
										target="_blank">
											<img style="display: inline-block; height: 20px; width: 20px;"
											 src="https://benihyangbaik.com/photo/youtube.png"
											alt="Benih Yang Baik">
										</a>
									</td>
									<td style="text-align: center;">
										<a style="color: #4976FF;" href="http://www.instagram.com/benih.info/"
										 target="_blank">
											<img style="display: inline-block; height: 20px; width: 20px;"
											 src="https://benihyangbaik.com/photo/instagram.png"
											 alt="Benih Yang Baik">
										</a>
									</td>
									<td style="text-align: center;">
										<a style="color: #4976FF;" href="http://www.facebook.com/byb.byb.54966"
										 target="_blank">
											<img style="display: inline-block; height: 20px; width: 20px;"
											 src="https://benihyangbaik.com/photo/facebook.png"
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
								Kalasan, Yogyakarta, Indonesia
							</p>
						</div>
					</div>
				</div>
			</div>
		</html>
    ';
?>