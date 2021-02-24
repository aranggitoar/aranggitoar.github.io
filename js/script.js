// AKTIVASI TOMBOL BURGER HEADER (SIDEBAR)
const sidebarClickToggle = document.getElementsByClassName('sidebar-js sjsc')[0];
const sidebarClickToggle2 = document.getElementsByClassName('sidebar-js sjsc2')[0];
const sidebarMouseLeaveToggle = document.getElementsByClassName('sidebar-js sjsml')[0];

let eventListenerClickOnOffPlus = (elm1, elm2, elmPlus) => {
elm1.addEventListener('click', () => {
    elm1.classList.remove('off');
    elm2.classList.remove('off');
    elm1.classList.toggle('on');
    elm2.classList.toggle('on');
    elm1.addEventListener('click', () => {
        elm1.classList.toggle('off');
        elm2.classList.toggle('off');
    });
    if (elm1.on === true) {
    elmPlus.addEventListener('mouseleave', () => {
        elm1.classList.toggle('off');
        elm2.classList.toggle('off');
    })};
})};

eventListenerClickOnOffPlus(sidebarClickToggle, sidebarClickToggle2, sidebarMouseLeaveToggle);

const pictureParallax = document.getElementsByClassName('picture')[0];

let eventListenerScroll = (elm, rate, trMax) => {
document.addEventListener('scroll', () => {
        let rateSet = (rate, trMax) => {
            let d = window.pageYOffset * rate;
            if (d >= trMax) {
                d = trMax;
            }
            return d;
        }
        elm.style.transform = `translateY(${rateSet(rate, trMax)}px)`;
})};

eventListenerScroll(pictureParallax, .3, 400);

const test = document.getElementsByClassName('tp-11raa-b');



// AKTIVASI FORM FOOTER
const tombolHKToggle = document.getElementsByClassName('tombolHK')[0];
const formHK = document.getElementsByClassName('formHK')[0];
const kirimHK = document.getElementsByClassName('kirimHK')[0];
const formHKInsert = document.getElementsByClassName('formHK-disable')[0];
// Ada event listener "submit"
tombolHKToggle.addEventListener('click', () => {
    formHK.classList.toggle('active');
    if (formHK.active === true) {
    kirimHK.addEventListener('click', () => {
        formHKInsert.toggle();
    });
}});