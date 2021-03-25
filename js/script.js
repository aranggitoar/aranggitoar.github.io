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
function whatToIndexFromThisPageURL(startIndex, endIndex) {
    return window.location.pathname.slice(startIndex, endIndex);
};
function makeRegExpOutOf(thisString) {
    return new RegExp(thisString);
};
function makeArrayOutOf(hTMLCollection) {
    return Array.from(hTMLCollection);
};
function extractContentOfArrayWithRegExp(content, regExp) {
    return content.find((elements) => regExp.test(elements));
};
function getIndexOfAnElementFromHTMLCollection(arrayOfHTMLCollection, content) {
    return arrayOfHTMLCollection.indexOf(content);
};
function changeBackgroundOfElementWithKnownIndex(hTMLCollection, index) {
    hTMLCollection[index].classList.add('on');
};

const sidebarPageElements = document.querySelectorAll('.js-sidebar-page-track');
const sidebarPageTrackerEndIndex = window.location.pathname.search(/([-][a-z0-9]{5})?\.html/);
const sidebarPageTrackerStartIndex = sidebarPageTrackerEndIndex - 5;

changeBackgroundOfElementWithKnownIndex(sidebarPageElements,
    getIndexOfAnElementFromHTMLCollection(makeArrayOutOf(sidebarPageElements),
        extractContentOfArrayWithRegExp(makeArrayOutOf(sidebarPageElements),
            makeRegExpOutOf(whatToIndexFromThisPageURL(sidebarPageTrackerStartIndex, sidebarPageTrackerEndIndex)
            )
        )
    )
);


// SWITCH HEADER STYLE AFTER SCROLLING DOWN AS MUCH AS header.offsetHeight
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (header.offsetHeight <= window.pageYOffset) {
        header.style.position = "fixed";
        header.style.backgroundColor = "var(--lt-ylw)";
        header.style.boxShadow = "0 0 10px var(--gr)";
        header.querySelector('#sidebar-link-container').classList.add('active');
        header.querySelector('.logo').setAttribute("src", "photo/byb-logo-grey-transparent.svg");
    } else {
        header.style.position = "absolute";
        header.style.backgroundColor = "#fff0";
        header.style.boxShadow = "0 0 0";
        header.querySelector('#sidebar-link-container').classList.remove('active');
        header.querySelector('.logo').setAttribute("src", "photo/byb-logo-yellow-transparent.svg");
    }
});


// HIDE HEADER WHILE SCROLLING DOWN
const mainPictureBox = document.querySelector('#main-picture-box');
let scrollPos = 0;

window.addEventListener('scroll', () => {
    if (document.body.getBoundingClientRect().top > scrollPos) {
        setTimeout(() => {
            header.style.transform = "translateY(0)";
        }, 250);
    } else if (document.body.getBoundingClientRect().top < scrollPos && (mainPictureBox.offsetHeight >= window.pageYOffset) == false) {
        setTimeout(() => {
            header.style.transform = "translateY(-70px)";
        }, 250);
    }
    scrollPos = document.body.getBoundingClientRect().top;
});


// CHANGE HEADER SIZE FOR PAGES OTHER THAN MAIN
function checkIsCurrentURLEqualsTo(regExp) {
    return regExp.test(window.location.pathname);
};
function ifNotTrueAddNotIndexClass(boolean, element) {
    if (boolean != true) {
        element.id = "not-index";
    };
};

const indexRegExp = /index|^\/$|situs-pemuridan\/index/;
const body = document.querySelector('body');

ifNotTrueAddNotIndexClass(checkIsCurrentURLEqualsTo(indexRegExp), body);


// PARALLAX ANIMATION FOR EVERY OTHER PAGE THAN K3B SUB CHAPTER PAGE
function isVisible(element) {
    let viewport = { top: window.pageYOffset };
    viewport.bottom = viewport.top + document.documentElement.clientHeight;

    let bounds = { top: element.offsetTop };
    bounds.bottom = bounds.top + element.offsetHeight;
    // ignore this code, it is used for debugging // console.log(`Viewport.top: ${viewport.top}, viewport.bottom: ${viewport.bottom}, bounds.top: ${bounds.top}, bounds.bottom: ${bounds.bottom}. Viewport.bottom < bounds.top: ${viewport.bottom < bounds.top}, viewport.top > bounds.bottom: ${viewport.top > bounds.bottom}. Is the element visible? ${(!(viewport.bottom < bounds.top || viewport.top > bounds.bottom))}`)
    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

const parallaxContainer = document.querySelectorAll('.js-picture-parallax-container');
const picturesToParallax = document.querySelectorAll('.js-picture-parallax');
const pictureLayersToParallax = document.querySelectorAll('.js-picture-layer-parallax');
const parallaxSpeed = 0.2;

window.addEventListener('scroll', function () {
    parallaxContainer.forEach(function (element) {
        if (isVisible(element) == true) {
            let elmTop = element.offsetTop;
            let shiftDistance = (window.pageYOffset - elmTop) * parallaxSpeed;
            for (let i = 0; i < picturesToParallax.length; i++) {
                picturesToParallax[i].style.transform = `translateY(${shiftDistance}px)`;
            };
            for (let i = 0; i < pictureLayersToParallax.length; i++) {
                pictureLayersToParallax[i].style.transform = `translateY(${shiftDistance}px)`;
            };
        };
    });
});


// PARALLAX ANIMATION FOR K3B SUB CHAPTER PAGE
const k3BSubChapterContainers = document.querySelectorAll("#k3b-sub-chapter-container section");

if (k3BSubChapterContainers[0] != null) {
    k3BSubChapterContainers.forEach((element) => {
        var moveDistance = (element.querySelector('p').offsetHeight) / 2;
        window.addEventListener('DOMContentLoaded', () => {
            element.querySelector('h2').style.transform = `translateY(${moveDistance}px)`;
        });

        window.addEventListener('scroll', () => {
            if (isVisible(element)) {
                element.querySelector('.picture-layer').style.opacity = "1";
                element.querySelector('.picture').style.transform = "scale(1.2)";
                element.querySelector('h2').style.transform = "scale(1.1) translateY(0)";
                element.querySelector('h2').style.opacity = "1";
                element.querySelector('p').style.opacity = "1";
            } else {
                element.querySelector('.picture-layer').style.opacity = ".15";
                element.querySelector('.picture').style.transform = "scale(1)";
                element.querySelector('h2').style.transform = `scale(1) translateY($    {moveDistance}px)`;
                element.querySelector('h2').style.opacity = "0";
                element.querySelector('p').style.opacity = "0";
            };
        });
    });
};


// CAROUSEL ANIMATIONS
const presentationSlides = document.querySelectorAll('.slide');
const dropdownSlides = document.querySelectorAll('.dropdown-slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dropdownSlidesNextBtn = document.querySelector('.dropdown-slide-next-btn');
const dropdownSlidesPrevBtn = document.querySelector('.dropdown-slide-prev-btn');

function prepareCarousel(slidesToCarousel) {
    slidesToCarousel.forEach(function (slide, index) {
        slide.style.left = `${index * 100}%`;
    });
};
function prepareCarouselAndRunCarousel(nextBtnSelector, prevBtnSelector, slidesToCarousel, intervalOrNo) {
    let counter = 0
    nextBtnSelector.addEventListener('click', function () {
        counter++;
        return runCarousel();
    });
    prevBtnSelector.addEventListener('click', function () {
        counter--;
        return runCarousel();
    });

    function runCarousel() {
        if (counter === slidesToCarousel.length) {
            counter = 0;
        } else if (counter < 0) {
            counter = slidesToCarousel.length - 1;
        }
        slidesToCarousel.forEach(function (slide) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }

    if (intervalOrNo == true) {
        setInterval(() => {
            counter++;
            if (counter < slidesToCarousel.length) {
                slidesToCarousel.forEach(function (slide) {
                    slide.style.transform = `translateX(-${counter * 100}%)`;
                })
            } else {
                counter = -1;
            };
        }, 2500);
    }
};

if (nextBtn != null) {
    prepareCarousel(presentationSlides);
    prepareCarouselAndRunCarousel(nextBtn, prevBtn, presentationSlides, true);
};
if (dropdownSlidesNextBtn != null) {
    prepareCarousel(dropdownSlides);
    prepareCarouselAndRunCarousel(dropdownSlidesNextBtn, dropdownSlidesPrevBtn, dropdownSlides, false);
};


// DROPDOWN CAROUSEL ANIMATION
const dropdownCarouselToggler = document.querySelector('.dropdown-carousel-toggler');
const dropdownCarouselContainer = document.querySelector('#dropdown-carousel-container');
const dropdownCarouselSliderContainer = document.querySelector('.dropdown-carousel-slider-container');

if (dropdownCarouselToggler != null) {
    dropdownCarouselToggler.addEventListener('click', () => {
        
        dropdownCarouselContainer.classList.toggle('on');
        
        dropdownCarouselToggler.addEventListener('click', () => {
            dropdownCarouselContainer.classList.toggle('off');
            setTimeout(() =>{
                dropdownCarouselContainer.classList.remove('off');
            }, 200);
        });
    });
};



// 3. NON-ANIMATIONS
// EVENT COUNTDOWNS
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dDay = document.querySelector('.d-day');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
const onlyDay = document.querySelector('.ongoing-abba90');

if (deadline != null) {
    let futureDate = new Date(2021, 4, 1, 00, 00, 0); // Month count starts from 0 because indexing starts from 0 // This is the starting date for ABBA 90 IV
    let futureDate2 = new Date(2021, 3, 30, 24, 00, 0); // This is the end date for ABBA 90 III

    const year = futureDate.getFullYear();
    const month = months[futureDate.getMonth()];
    const date = futureDate.getDate();
    const weekday = weekdays[futureDate.getDay()];
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();

    if (dDay != null) { dDay.textContent = `${weekday} ${date} ${month} ${year}` };

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

        if (onlyDay != null) {
            onlyDay.innerHTML = `ABBA 90 Gelombang Ketiga sedang berlangsung! Bahkan sudah berlangsung selama ${-(days2 - 90)} hari. Para peserta masih terus menekuni Firman Allah setiap hari! Kami benar-benar berharap bahwa Anda akan bergabung dalam ABBA 90 yang berikutnya. Dokumentasi untuk Gelombang Ketiga akan segera kami sediakan.`
        }

        if (t < 0) {
            clearInterval(countdown);
            deadline.innerHTML = `<h4 class="ongoing">Webinar ini sedang dimulai</h4>`
        }
    };

    let countdown = setInterval(getRemainingTime, 1000);
    getRemainingTime();
};


// AJAX FOR REGISTRATION FORM
const aBBA90RegistrationForm = document.getElementsByClassName('js-form-rgstr-abba90')[0];
const aBBA90RegistrationFormTextToChange = document.getElementsByClassName('js-form-rgstr-text-to-change')[0];
if (aBBA90RegistrationForm != null) {
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