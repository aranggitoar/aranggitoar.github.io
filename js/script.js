// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. CSS VARIABLE DYNAMIC SETTER
// 2. ANIMATIONS
// 3. NON-ANIMATIONS



// 1. CSS VARIABLE DYNAMIC SETTER
// SIZE OF GREY LAYER FOR FEATURE IMAGES
document.documentElement.style.setProperty("--pic-layer-height",
    `${document.querySelector('.main-picture-container > img').offsetHeight}px`);



// 2. ANIMATIONS
// UNDERLINE AND MAKE BOLD THE NAVBAR LINK FOR CURRENT PAGE
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
function changeBackgroundOfElementWithKnownIndex (hTMLCollection, index) {
    hTMLCollection[index].classList.add('on');
};

const sidebarPageElements = document.getElementsByClassName('js-sidebar-page-track');
const sidebarPageTrackerEndIndex = window.location.pathname.search(/([-][a-z0-9]{5})?\.html/);
const sidebarPageTrackerStartIndex = sidebarPageTrackerEndIndex - 5;

changeBackgroundOfElementWithKnownIndex(sidebarPageElements,
    getIndexOfAnElementFromHTMLCollection(makeArrayOutOf(sidebarPageElements),
        extractContentOfArrayWithRegExp(makeArrayOutOf(sidebarPageElements),
            makeRegExpOutOf(whatToIndexFromThisPageURL(sidebarPageTrackerStartIndex,sidebarPageTrackerEndIndex)
            )
        )
    )
);


// CHANGE HEADER SIZE FOR PAGES OTHER THAN MAIN
function checkIsCurrentURLEqualsTo (regExp) {
    return regExp.test(window.location.pathname);
};
function ifNotTrueAddNotIndexClass (boolean, element) {
    if (boolean != true) {
        element.id = "not-index";
    };
};

const indexRegExp = /index/;
const body = document.querySelector('body');

ifNotTrueAddNotIndexClass(checkIsCurrentURLEqualsTo(indexRegExp),body);


// JQUERY PARALLAX ANIMATION FOR EVERY OTHER PAGE THAN K3B SUB CHAPTER PAGE
let win = $(window);
$.fn.is_visible = function(){    
    let viewport = {top: win.scrollTop()}; //window.pageYOffset
    viewport.bottom = viewport.top + win.height(); //document.documentElement.clientHeight

    let bounds = this.offset(); // //element.offsetTop;
    bounds.bottom = bounds.top + this.outerHeight(); // element.offsetHeight;

    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function(){
    $(".js-picture-parallax-container").each(function(){ // Elemen kontainer
  	    if ($(this).is_visible()) {	
  	 	    let elmTop = $(this).offset().top; 
             let shiftDistance = (win.scrollTop() - elmTop) * 0.2; // Kecepatan
            $(".js-picture-parallax, .js-picture-layer-parallax").css("transform","translateY("+shiftDistance+"px)"); // Elemen target
        }
    })
});


// JQUERY PARALLAX ANIMATION FOR K3B SUB CHAPTER PAGE
const k3BSubChapterContainers = document.querySelectorAll("#k3b-sub-chapter-container section");

k3BSubChapterContainers.forEach((element) => {
    var moveDistance = (element.querySelector('p').offsetHeight)/2;
    window.addEventListener('DOMContentLoaded', () => {
        element.querySelector('h2').style.transform = `translateY(${moveDistance}px)`;
    });

    window.addEventListener('scroll', () => {
        if($(element).is_visible()) {
            element.querySelector('.picture-layer').style.opacity = "1";
            element.querySelector('.picture').style.transform = "scale(1.2)";
            element.querySelector('h2').style.transform = "scale(1.1) translateY(0)";
            element.querySelector('h2').style.opacity = "1";
            element.querySelector('p').style.opacity = "1";
        } else {
            element.querySelector('.picture-layer').style.opacity = ".15";
            element.querySelector('.picture').style.transform = "scale(1)";
            element.querySelector('h2').style.transform = `scale(1) translateY(${moveDistance}px)`;
            element.querySelector('h2').style.opacity = "0";
            element.querySelector('p').style.opacity = "0";
        }
    });
});


// CAROUSEL ANIMATIONS
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
        slidesToCarousel.forEach(function(slide) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }

    setInterval(() => {
        counter++;
        slidesToCarousel.forEach(function(slide) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }, 2500);
};


// FOOTER FORM ANIMATION
const contactUsBtn = document.querySelector('#contact-us-btn');
const contactUsForm = document.getElementsByClassName('js-form-contact-us')[0];

contactUsBtn.addEventListener('click', function (){
        contactUsForm.classList.toggle('on');
        this.removeEventListener('click', arguments.callee);
    });



// 3. NON-ANIMATIONS
// EVENT COUNTDOWNS
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dDay = document.querySelector('.d-day');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

if (deadline != null) {
    let futureDate = new Date(2021,4,1,00,00,0); // Bulan dimulai dari 0 karena index array dimulai dari 0

    const year = futureDate.getFullYear();
    const month = months[futureDate.getMonth()];
    const date = futureDate.getDate();
    const weekday = weekdays[futureDate.getDay()];
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();

    if (dDay != null) {dDay.textContent = `${weekday} ${date} ${month} ${year}`};

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
            };
            return item;
        };
        items.forEach(function(item, index){
            item.innerHTML = format(values[index]);
        });
        if(t < 0){
            clearInterval(countdown);
            deadline.innerHTML = `<h4 class="ongoing">Webinar ini sedang dimulai</h4>`
        }
    };

    let countdown = setInterval(getRemainingTime,1000);
    getRemainingTime();
};


// AJAX FOR CONTACT US FORM
contactUsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('e-mail').value;
    var message = document.getElementById('message').value;

    var parameters = `name=${name}&e-mail=${email}&message=${message}`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'contact-us.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(parameters);

    contactUsForm.classList.toggle('off');
    setTimeout(() =>  {
        contactUsForm.classList.remove('on');
        contactUsForm.classList.remove('off');
        contactUsBtn.innerHTML = "Terima kasih atas pesan Anda.";
    }, 500);
});


// AJAX FOR REGISTRATION FORM
const aBBA90RegistrationForm = document.getElementsByClassName('js-form-rgstr-abba90')[0];
const aBBA90RegistrationFormTextToChange = document.getElementsByClassName('js-form-rgstr-text-to-change')[0];
if(aBBA90RegistrationForm != null) {
    aBBA90RegistrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        var email = document.getElementById('e-mail').value;
        var name = document.getElementById('name').value;
        var gender = document.querySelector('input[name="gender"]').value;
        var age = document.getElementById('age').value;
        var phoneNumber = document.getElementById('phone-number').value;
        var homeAddress = document.getElementById('home-address').value;

        var parameters = `e-mail=${email}&name=${name}&gender=${gender}&age=${age}&phone-number=${phoneNumber}&home-address=${homeAddress}`;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'event-rgstr-abba90.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.send(parameters);

        aBBA90RegistrationForm.classList.add('off');
        setTimeout(() => {
            aBBA90RegistrationForm.parentNode.removeChild(aBBA90RegistrationForm);
            var textChange = document.createTextNode("Anda telah terdaftar, tunggu e-mail dari kami!");
            aBBA90RegistrationFormTextToChange.innerHTML = "";
            aBBA90RegistrationFormTextToChange.style.fontSize = "1.6rem";
            aBBA90RegistrationFormTextToChange.style.fontWeight = "bold";
            aBBA90RegistrationFormTextToChange.style.marginTop = "3.5rem";
            aBBA90RegistrationFormTextToChange.style.textAlign = "center";
            aBBA90RegistrationFormTextToChange.appendChild(textChange);
        }, 500);
    });
};