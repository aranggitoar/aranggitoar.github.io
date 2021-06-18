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
?>