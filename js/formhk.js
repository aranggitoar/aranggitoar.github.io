const tombolHKToggle = document.getElementsByClassName('tombolHK')[0];
const formHK = document.getElementsByClassName('formHK')[0];
const kirimHK = document.getElementsByClassName('kirimHK')[0];

tombolHKToggle.addEventListener('click', () => {
    formHK.classList.toggle('active');
    if (formHK.active === true) {
    kirimHK.addEventListener('click', () => {
        formHK.classList.toggle('disable');
    });
}});