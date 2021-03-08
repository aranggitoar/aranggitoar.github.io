// FILE JS INI TERBAGI MENJADI 5 BAGIAN
// 1. PENGATUR VARIABEL CSS SECARA DINAMIS
// 2. ANIMASI UNTUK TABLET DAN LAPTOP
// 3. ANIMASI UNTUK PONSEL
// 4. ANIMASI UNTUK SEMUA
// 5. NON-ANIMASI

// 1. PENGATUR VARIABEL CSS SECARA DINAMIS
// UKURAN LAYER ABU UNTUK MEDIA QUERY DALAM VARIABEL
document.documentElement.style.setProperty("--layer-height",
    `${document.querySelector('.footer').offsetTop}px`);

// UKURAN LAYER ABU UNTUK GAMBAR FITUR
document.documentElement.style.setProperty("--pic-layer-height",
    `${document.querySelector('#title-box > div > img').offsetHeight}px`);



// 2. ANIMASI UNTUK TABLET DAN LAPTOP
// UBAH WARNA BACKGROUND SIDEBAR/NAVBAR SESUAI HALAMAN SEKARANG
function whatToIndexFromThisPageURL (startIndex, endIndex) {
    return window.location.pathname.slice(startIndex,endIndex);
};
function makeRegExpOutOf (thisString) {
    return new RegExp(thisString);
};
function makeArrayOutOf (hTMLCollection) {
    return Array.from(hTMLCollection);
};
function extractContentOfArrayWithRegExp (content, regExp) {
    return content.find((elements) => regExp.test(elements));
};
function getIndexOfAnElementFromHTMLCollection (arrayOfHTMLCollection,content) {
    return arrayOfHTMLCollection.indexOf(content);
};
function changeBackgroundAndTextColorPlusOfElementWithKnownIndex (hTMLCollection, index, bGColor, txtColor) {
    hTMLCollection[index].style.backgroundColor = bGColor;
    hTMLCollection[index].style.color = txtColor;
    hTMLCollection[index].classList.toggle('on');
};

const sidebarPageElements = document.getElementsByClassName('js-sidebar-page-track');
const sidebarPageTrackerStartIndex = 17;
const sidebarPageTrackerEndIndex = 21;
const sidebarElementBackgroundColor = "var(--mw)";
const sidebarElementTextColor = "var(--gr)";

changeBackgroundAndTextColorPlusOfElementWithKnownIndex(sidebarPageElements, getIndexOfAnElementFromHTMLCollection(makeArrayOutOf(sidebarPageElements),extractContentOfArrayWithRegExp(makeArrayOutOf(sidebarPageElements),makeRegExpOutOf(whatToIndexFromThisPageURL(sidebarPageTrackerStartIndex,sidebarPageTrackerEndIndex)))),sidebarElementBackgroundColor,sidebarElementTextColor);


// EFEK DROPDOWN DAN PERGANTIAN WARNA LOGO
function clickEventListenerForNavbarOnTabletAndLaptop (mouseOverListener, mouseOutListener, elementsToToggle) {
        mouseOverListener.addEventListener('mouseover',function() {
            // console.log("mouseover");
            elementsToToggle.classList.remove('off');
            elementsToToggle.classList.add('on');
        })
        mouseOutListener.addEventListener('mouseleave',function() {
            // console.log("mouseleave");
            elementsToToggle.classList.add('off');
            })
}
function scrollEventListenerToToggleLogoColorOnNavbar (listener,element1,element2) {
    window.addEventListener('scroll',function () {
        if (listener.offsetTop <= window.pageYOffset) {
            element1.style.display = "flex";
            element2.style.display = "none";
        } else {
            element1.style.display = "none";
            element2.style.display = "flex";
        }
    })
}

const tabletAndDesktopNavBarDropDown = document.getElementsByClassName('js-dropdown')[0];
const dropDownOnToggler = document.querySelector('.js-hover-fn-dropdown');
const dropDownOffToggler = document.querySelector('.header');
const navBarStyleToggler = document.querySelector('.text-box, #text-box-announcement');
const navBarLogoWhite = document.getElementsByClassName('logo-white')[0];
const navBarLogoYellow = document.getElementsByClassName('logo-yellow')[0];

if (visualViewport.width > 768) {
    clickEventListenerForNavbarOnTabletAndLaptop(dropDownOnToggler, dropDownOffToggler, tabletAndDesktopNavBarDropDown);
    scrollEventListenerToToggleLogoColorOnNavbar(navBarStyleToggler,navBarLogoYellow,navBarLogoWhite);
}



// 3. ANIMASI UNTUK PONSEL
// AKTIVASI TOMBOL BURGER SIDEBAR
function clickEventListenerForNavbarOnPhone (listener,animations){
    listener.addEventListener('click',function() {
        listener.classList.remove('off');
        animations.classList.remove('off');
    
        listener.classList.toggle('on');
        animations.classList.toggle('on');
    
        listener.addEventListener('click',function() {
            listener.classList.toggle('off');
            animations.classList.toggle('off');
        });
    });    
};

const burgerClickToggle = document.getElementsByClassName('js-click-fn-burger')[0];
const sidebarAnimation = document.getElementsByClassName('sidebar-animation')[0];
clickEventListenerForNavbarOnPhone(burgerClickToggle,sidebarAnimation);



// 4. ANIMASI UNTUK SEMUA
// EFEK PARALLAX JQUERY
let win = $(window);
$.fn.is_visible = function(){    
    let viewport = {top: win.scrollTop()}; //window.pageYOffset
    viewport.bottom = viewport.top + win.height(); //document.documentElement.clientHeight

    let bounds = this.offset(); // //element.offsetTop();
    bounds.bottom = bounds.top + this.outerHeight(); // element.offsetHeight;

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
const slidesToCarousel = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if (nextBtn != null) {
    slidesToCarousel.forEach(function(slide, index) {
        slide.style.left = `${index * 100}%`;
    });

    let counter = 0;
    nextBtn.addEventListener('click',function(){
        counter++;
        carousel();
    });
    prevBtn.addEventListener('click',function(){
        counter--;
        carousel();
    });

    function carousel(){
        if(counter === slidesToCarousel.length) {
            counter = 0;
        } else if (counter < 0) {
            counter = slidesToCarousel.length - 1;
        }
        slidesToCarousel.forEach(function(slide){
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }
};


// AKTIVASI FORM FOOTER
const contactUsBtn = document.getElementsByClassName('contact-us-btn')[0];
const contactUsForm = document.getElementsByClassName('js-form-contact-us')[0];

contactUsBtn.addEventListener('click', function (){
        contactUsForm.classList.toggle('on');
        this.removeEventListener('click', arguments.callee);
    });
// function elementOnToggler(element){
//     element.classList.toggle('on');
// }



// 5. NON-ANIMASI
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


// AJAX UNTUK FORM HUBUNGI KAMI
contactUsForm.addEventListener('submit', getContactUsMessage);

function getContactUsMessage(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('e-mail').value;
    var message = document.getElementById('message').value;

    var parameters = "name="+name+"&e-mail="+email+"&message="+message;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'contact-us.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // xhr.onload = function () {
    //     console.log(this.responseText);
    // }       

    xhr.send(parameters);
    contactUsForm.classList.toggle('off');
    setTimeout(() => {if(contactUsForm.classList.contains('off') === true) {
        contactUsForm.classList.remove('on');
        contactUsForm.classList.remove('off');
        contactUsBtn.innerHTML = "Terima kasih atas pesan Anda, harap menunggu balasan dari kami.";
    }}, 500);
}