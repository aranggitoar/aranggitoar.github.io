// UKURAN LAYER ABU UNTUK MEDIA QUERY DALAM VARIABEL
document.documentElement.style.setProperty("--layer-height",
    `${document.querySelector('.footer').offsetTop}px`);



// UBAH WARNA BACKGROUND SIDEBAR/NAVBAR SESUAI HALAMAN SEKARANG
const sidebarPageTrack = document.getElementsByClassName('js-sidebar-page-track');

let findPageURL = window.location.pathname.slice(17,27);
let thisPageRegEx = new RegExp(findPageURL);
/* Bagaimana dengan halaman yang tidak tercatat dalam navbar?
Sewaktu websitus ini sudah menyala di tempat hosting setiap halaman akan punya
URL uniknya sendiri dan semua halaman yang tidak tercatat dalam navbar pasti
adalah bagian dari salah satu yang tercatata dalam navbar sehingga dapat dibuatkan
URL sebagai anak dari orangtuanya di bagian navbar.

Lalu nanti RegEx di atas akan mencari orangtua dari halaman yang tidak tercatat ini
dengan mengatur index yang akan di .slice(). Index yang di .slice() sekarang adalah
17, 27 karena window.location.pathname untuk sekarang adalah
/situs-pemuridan/index.html sedangkan besok hanya akan semacam /beranda. */
for (let c = 0; c <= sidebarPageTrack.length; c++) {
    if (thisPageRegEx.test(sidebarPageTrack[c]) === true) {
        sidebarPageTrack[c].style.backgroundColor = "var(--mw)";
        sidebarPageTrack[c].style.color = "var(--gr)";
    }
};



// EFEK DROPDOWN DAN PERGANTIAN WARNA LOGO UNTUK TABLET DAN DESKTOP
const tabletAndDesktopNavBarDropDown = document.getElementsByClassName('js-dropdown')[0];
const dropDownToggle = document.querySelectorAll('.js-click-fn-dropdown');
const navBarStyleToggler = document.querySelector('.text-box, #text-box-announcement');
const navBarLogoWhite = document.getElementsByClassName('logo-white')[0];
const navBarLogoYellow = document.getElementsByClassName('logo-yellow')[0];

if (visualViewport.width > 768) {
    dropDownToggle.forEach(function(item) {
        item.addEventListener('click',function() {
            tabletAndDesktopNavBarDropDown.classList.toggle('on');
            item.addEventListener('click',function() {
                tabletAndDesktopNavBarDropDown.classList.toggle('off');
                tabletAndDesktopNavBarDropDown.classList.remove('off');
            })
        })
    })

    window.addEventListener('scroll',function () {
        if (navBarStyleToggler.offsetTop <= window.pageYOffset) {
            navBarLogoYellow.style.display = "flex";
            navBarLogoWhite.style.display = "none";
        } else {
            navBarLogoYellow.style.display = "none";
            navBarLogoWhite.style.display = "flex";
        }
    })
};



// AKTIVASI TOMBOL BURGER SIDEBAR
const burgerClickToggle = document.getElementsByClassName('js-click-fn-burger')[0];
const sidebarAnimation = document.getElementsByClassName('sidebar-animation')[0];

burgerClickToggle.addEventListener('click',function() {
    burgerClickToggle.classList.remove('off');
    sidebarAnimation.classList.remove('off');

    burgerClickToggle.classList.toggle('on');
    sidebarAnimation.classList.toggle('on');

    burgerClickToggle.addEventListener('click',function() {
        burgerClickToggle.classList.toggle('off');
        sidebarAnimation.classList.toggle('off');
    });
});



/* EFEK PARALLAX JQUERY DENGAN PROPERTI CSS TRANSFORM NILAI TRANSLATEY
Masukkan selektor dengan format jQuery dan kecepatan animasi. */
let win = $(window);
$.fn.is_visible = function(){    
    let viewport = {top: win.scrollTop()};
    viewport.bottom = viewport.top + win.height();

    let bounds = this.offset();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function(){
    $("#title-box, .text-picture-box").each(function(){ // Elemen kontainer
  	    if ($(this).is_visible()) {	
  	 	    let elmTop = $(this).offset().top; 
            let shiftDistance = (elmTop - win.scrollTop()) * .2; // Kecepatan
            $(".picture").css("transform","translateY("+-shiftDistance+"px)"); // Elemen target
        }
    })
});



// CAROUSEL UNTUK HALAMAN ABBA90 DAN GA90
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.prev-btn');

if (nextBtn != null) {
    slides.forEach(function(slide, index) {
        slide.style.left = `${index * 100}%`;
    });

    let counter = 0;
    nextBtn.addEventListener('click',function(){
        counter++;
        carousel();
    });
    previousBtn.addEventListener('click',function(){
        counter--;
        carousel();
    });

    function carousel(){
        if(counter === slides.length) {
            counter = 0;
        } else if (counter < 0) {
            counter = slides.length - 1;
        }
        slides.forEach(function(slide){
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }
};



// COUNTDOWN
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dDay = document.querySelector('.d-day');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

if (deadline != null) {
    let futureDate = new Date(2021,2,13,19,30,0); // Bulan dimulai dari 0 karena index array dimulai dari 0

    const year = futureDate.getFullYear();
    const month = months[futureDate.getMonth()];
    const date = futureDate.getDate();
    const weekday = weekdays[futureDate.getDay()];
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();

    if (dDay != null) {dDay.textContent = `Webinar akan berlangsung pada ${weekday} ${date} ${month} ${year} ${hours}:${minutes}`};

    const futureTime = futureDate.getTime();

    function getRemainingTime(){
        const today = new Date().getTime();
        const t = futureTime - today;

        const oneDay = 24 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;
        const oneMinute = 60 * 1000;

        let days = t / oneDay;
        days = Math.floor(days);
        let hours = Math.floor((t % oneDay) / oneHour);
        let minutes = Math.floor((t % oneHour) / oneMinute);
        let seconds = Math.floor((t % oneMinute) / 1000);

        const values = [days, hours, minutes, seconds];
        function format(item){
            if(item < 10){
                return item = `0${item}`;
            }
            return item;
        }
        items.forEach(function(item, index){
            item.innerHTML = format(values[index]);
        });
        if(t < 0){
            clearInterval(countdown);
            deadline.innerHTML = `<h4 class="ongoing">Webinar ini sedang dimulai</h4>`
        }
    }

    let countdown = setInterval(getRemainingTime,1000);
    getRemainingTime();
}



// AKTIVASI FORM FOOTER
const contactUsBtn = document.getElementsByClassName('contact-us-btn')[0];
const contactUsFormToggle = document.getElementsByClassName('js-form-contact-us')[0];
const contactUsSendBtnToggle = document.getElementsByClassName('js-contact-us-send-btn')[0];
const contactUsFormToggleInsert = document.getElementsByClassName('js-form-contact-us-on')[0];

contactUsBtn.addEventListener('click',function() {
    contactUsFormToggle.classList.toggle('active');
    if (contactUsFormToggle.active === true) {
        contactUsSendBtnToggle.addEventListener('click',function() {
            contactUsFormToggleInsert.toggle();
        })
    }
});