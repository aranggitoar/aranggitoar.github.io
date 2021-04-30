(function() {



const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dDay = document.querySelector('.d-day');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
const onlyDay = document.querySelector('.ongoing-abba90');

let futureDate = new Date(2021, 4, 1, 00, 00, 0); // Month count starts from 0 because indexing starts from 0 // This is the starting date for ABBA 90 IV
let futureDate2 = new Date(2021, 3, 30, 24, 00, 0); // This is the end date for ABBA 90 III

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

if (dDay !== null && dDay !== undefined) { dDay.textContent = `${weekday}, ${date} ${month} ${year}` }

const futureTime = futureDate.getTime();
const futureTime2 = futureDate2.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    const t2 = futureTime2 - today;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    const values = [days, hours, minutes, seconds];

    let days2 = t2 / oneDay;
    days2 = Math.floor(days2);

    function format(item) {
        if (item < 10) {
            return item = `0${item}`;
        };
        return item;
    };
    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });

    if (onlyDay !== null && onlyDay !== undefined) {
        onlyDay.innerHTML = `ABBA 90 Gelombang Ketiga sudah selesai! Dokumentasi akan kami sediakan dalam waktu dekat. BYB mengundang Anda bergabung dalam ABBA 90 yang berikutnya.`;
    }

    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="ongoing">Webinar ini sedang dimulai</h4>`;
    }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();



}());