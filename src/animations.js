(function()
{


    


// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. CSS VARIABLE DYNAMIC SETTER
// 2. ANIMATIONS




// 1. CSS VARIABLE DYNAMIC SETTER
// SIZE OF GREY LAYER FOR FEATURE IMAGES
document.documentElement.style.setProperty ("--pic-layer-height",
    `${document.querySelector ('.main-picture-container > img').offsetHeight}px`);



// 2. ANIMATIONS
// UNDERLINE AND MAKE BOLD THE NAVBAR LINK FOR CURRENT PAGE
function whatToIndexFromThisPageURL (startIndex, endIndex)
{
    return window.location.pathname.slice (startIndex, endIndex);
}

function makeRegExpOutOf (thisString)
{
    return new RegExp (thisString);
}

function makeArrayOutOf (hTMLCollection)
{
    return Array.from (hTMLCollection);
}

function extractContentOfArrayWithRegExp (content, regExp)
{
    return content.find ((elements) => regExp.test (elements));
}

function getIndexOfAnElementFromHTMLCollection (arrayOfHTMLCollection, content)
{
    return arrayOfHTMLCollection.indexOf (content);
}

function changeBackgroundOfElementWithKnownIndex (hTMLCollection, index)
{
    hTMLCollection[index].classList.add ('on');
}

const sidebarPageElements =
        document.querySelectorAll ('.js-sidebar-page-track'), 
    sidebarPageTrackerEndIndex =
        window.location.pathname.search (/([-][a-z0-9]{5})?\.html/),
    sidebarPageTrackerStartIndex =
        sidebarPageTrackerEndIndex - 5;

sidebarPageElements.onload = function ()
{
    changeBackgroundOfElementWithKnownIndex (
        sidebarPageElements,
            getIndexOfAnElementFromHTMLCollection (makeArrayOutOf (
            sidebarPageElements),
            extractContentOfArrayWithRegExp (makeArrayOutOf (
                sidebarPageElements),
                makeRegExpOutOf (whatToIndexFromThisPageURL (
                    sidebarPageTrackerStartIndex, sidebarPageTrackerEndIndex)
                )
            )
        )
    )
};


// SWITCH HEADER STYLE AFTER SCROLLING DOWN AS MUCH AS header.offsetHeight
const header = document.querySelector ('header');

window.addEventListener ('scroll', () =>
{
    if (header.offsetHeight <= window.pageYOffset) {
        header.style.position = "fixed";
        header.style.backgroundColor = "var(--lt-ylw)";
        header.style.boxShadow = "0 0 10px var(--gr)";
        header.querySelector ('#sidebar-link-container').
            classList.add ('active');
        header.querySelector ('.logo').
            setAttribute ("src", "photo/byb-logo-grey-transparent.svg");
    } else {
        header.style.position = "absolute";
        header.style.backgroundColor = "#fff0";
        header.style.boxShadow = "0 0 0";
        header.querySelector ('#sidebar-link-container').
            classList.remove ('active');
        header.querySelector ('.logo').
            setAttribute ("src", "photo/byb-logo-yellow-transparent.svg");
    }
});


// HIDE HEADER WHILE SCROLLING DOWN
const mainPictureBox = document.querySelector ('#main-picture-box');
let scrollPos = 0;

window.addEventListener ('scroll', () =>
{
    if (document.body.getBoundingClientRect ().top > scrollPos) {
        setTimeout (() => {
            header.style.transform = "translateY(0)";
        }, 250);
    } else if (document.body.getBoundingClientRect ().top < scrollPos &&
    (mainPictureBox.offsetHeight >= window.pageYOffset) === false) {
        setTimeout (() => {
            header.style.transform = "translateY(-100px)";
        }, 250);
    }
    scrollPos = document.body.getBoundingClientRect ().top;
});


// CHANGE HEADER SIZE FOR PAGES OTHER THAN MAIN
function checkIsCurrentURLEqualsTo (regExp)
{
    return regExp.test(window.location.pathname);
}

function ifNotTrueAddNotIndexClass (boolean, element)
{
    if (boolean !== true) {
        element.id = "not-index";
    }
}

const indexRegExp = /index|^\/$|situs-pemuridan\/index/,
    body = document.querySelector ('body');

ifNotTrueAddNotIndexClass (checkIsCurrentURLEqualsTo (indexRegExp), body);


// PARALLAX ANIMATION FOR EVERY OTHER PAGE THAN K3B SUB CHAPTER PAGE
function isVisible (element)
{
    let viewport = { top: window.pageYOffset };
    viewport.bottom = viewport.top + document.documentElement.clientHeight;

    let bounds = { top: element.offsetTop };
    bounds.bottom = bounds.top + element.offsetHeight;
    // ignore the following code, it is used for debugging
    // console.log(`Viewport.top: ${viewport.top}, viewport.bottom: ${viewport.bottom}, bounds.top: ${bounds.top}, bounds.bottom: ${bounds.bottom}. Viewport.bottom < bounds.top: ${viewport.bottom < bounds.top}, viewport.top > bounds.bottom: ${viewport.top > bounds.bottom}. Is the element visible? ${(!(viewport.bottom < bounds.top || viewport.top > bounds.bottom))}`)
    return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
}

const parallaxContainer =
        document.querySelectorAll ('.js-picture-parallax-container'),
    picturesToParallax =
        document.querySelectorAll ('.js-picture-parallax'),
    pictureLayersToParallax =
        document.querySelectorAll ('.js-picture-layer-parallax'),
    parallaxSpeed = 0.2;

window.addEventListener ('scroll', function ()
{
    parallaxContainer.forEach (function (element) {
        if (isVisible (element) === true) {
            let elmTop = element.offsetTop;
            let shiftDistance =
                (window.pageYOffset - elmTop) * parallaxSpeed;
            for (let i = 0; i < picturesToParallax.length; i++) {
                picturesToParallax[i].style.transform =
                `translateY(${shiftDistance}px)`;
            }
            for (let i = 0; i < pictureLayersToParallax.length; i++) {
                pictureLayersToParallax[i].style.transform =
                `translateY(${shiftDistance}px)`;
            }
        }
    });
});


// PARALLAX ANIMATION FOR K3B SUB CHAPTER PAGE
const k3BSubChapterContainers =
    document.querySelectorAll ("#k3b-sub-chapter-container section");

if (k3BSubChapterContainers[0] !== null)
{
    k3BSubChapterContainers.forEach ((element) => {
        var moveDistance = (element.querySelector('p').offsetHeight) / 2;

        window.addEventListener ('DOMContentLoaded', () => {
            element.querySelector ('h2').style.transform =
                `translateY(${moveDistance}px)`;
        });

        window.addEventListener ('scroll', () => {
            if (isVisible (element)) {
                element.querySelector ('.picture-layer').style.opacity = "1";
                element.querySelector ('.picture').
                    style.transform = "scale(1.2)";
                element.querySelector ('h2').
                    style.transform = "scale(1.1) translateY(0)";
                element.querySelector ('h2').style.opacity = "1";
                element.querySelector ('p').style.opacity = "1";
            } else {
                element.querySelector ('.picture-layer').style.opacity = ".15";
                element.querySelector ('.picture')
                    .style.transform = "scale(1)";
                element.querySelector ('h2').
                    style.transform = `scale(1) translateY(${moveDistance}px)`;
                element.querySelector ('h2').style.opacity = "0";
                element.querySelector('p').style.opacity = "0";
            }
        });
    });
}


// CAROUSEL ANIMATIONS
const presentationSlides = document.querySelectorAll ('.slide'),
    dropdownSlides = document.querySelectorAll ('.dropdown-slide'),
    nextBtn = document.querySelector ('.next-btn'),
    prevBtn = document.querySelector ('.prev-btn'),
    dropdownSlidesNextBtn = document.querySelector ('.dropdown-slide-next-btn'),
    dropdownSlidesPrevBtn = document.querySelector ('.dropdown-slide-prev-btn');

function prepareCarousel (slidesToCarousel)
{
    slidesToCarousel.forEach (function (slide, index) {
        slide.style.left = `${index * 100}%`;
    })
}

function prepareCarouselAndRunCarousel (
    nextBtnSelector, prevBtnSelector, slidesToCarousel, intervalOrNo)
{
    let counter = 0;

    nextBtnSelector.addEventListener ('click', function () {
        counter++;
        return runCarousel ();
    });

    prevBtnSelector.addEventListener('click', function () {
        counter--;
        return runCarousel ();
    });

    function runCarousel () {
        if (counter === slidesToCarousel.length) {
            counter = 0;
        } else if (counter < 0) {
            counter = slidesToCarousel.length - 1;
        }
        slidesToCarousel.forEach (function (slide) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        })
    }

    if (intervalOrNo === true) {
        setInterval (() => {
            counter++;
            if (counter < slidesToCarousel.length) {
                slidesToCarousel.forEach (function (slide) {
                    slide.style.transform = `translateX(-${counter * 100}%)`;
                })
            } else {
                counter = -1;
            }
        }, 10000);
    }
}

if (nextBtn !== null && nextBtn !== undefined)
{
    prepareCarousel (presentationSlides);
    prepareCarouselAndRunCarousel (
        nextBtn, prevBtn, presentationSlides, true);
}

if (dropdownSlidesNextBtn !== null && dropdownSlidesNextBtn !== undefined)
{
    prepareCarousel (dropdownSlides);
    prepareCarouselAndRunCarousel (
        dropdownSlidesNextBtn, dropdownSlidesPrevBtn, dropdownSlides, false);
}


// DROPDOWN CAROUSEL ANIMATION
const dropdownCarouselToggler =
        document.querySelector ('.dropdown-carousel-toggler'), 
    dropdownCarouselContainer =
        document.querySelector ('#dropdown-carousel-container'), 
    dropdownCarouselSliderContainer =
        document.querySelector ('.dropdown-carousel-slider-container');

if (dropdownCarouselToggler !== null && dropdownCarouselToggler !== undefined)
{
    dropdownCarouselToggler.addEventListener ('click', () => {
        dropdownCarouselContainer.classList.toggle ('on');

        dropdownCarouselToggler.addEventListener ('click', () => {
            dropdownCarouselContainer.classList.toggle ('off');
            setTimeout (() => {
                dropdownCarouselContainer.classList.remove ('off');
            }, 200);
        });
    });
}





}());