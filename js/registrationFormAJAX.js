const abba90RegistrationForm = document.getElementsByClassName('js-form-rgstr-abba90')[0];
const abba90RegistrationFormTextToChange = document.getElementsByClassName('js-form-rgstr-text-to-change')[0];
abba90RegistrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = document.getElementById('e-mail').value;
    var name = document.getElementById('name').value;
    var gender;
    if (document.getElementById('man').checked === true) {
        gender = document.getElementById('man').value;
    } else if (document.getElementById('women').checked === true) {
        gender = document.getElementById('women').value;
    }

    var age = document.getElementById('age').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var homeAddress = document.getElementById('home-address').value;
    var parameters = `e-mail=${email}&name=${name}&gender=${gender}&age=${age}&phone-number=${phoneNumber}&home-address=${homeAddress}`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'event-rgstr-abba90.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status >= 200 && xhr.status < 400) {
                abba90RegistrationForm.classList.add('off');
                setTimeout(() => {
                    abba90RegistrationForm.parentNode.removeChild(abba90RegistrationForm);
                    var textChange = document.createTextNode("Anda telah terdaftar, tunggu  e-mail dari kami!");
                    abba90RegistrationFormTextToChange.innerHTML = "";
                    abba90RegistrationFormTextToChange.appendChild(textChange);
                }, 500);
            } else if (xhr.status >= 400 && xhr.status < 500) {
                alert("`Status: ${xhr.status} ${xhr.statusText}. Maaf, tolong muat ulang halaman dan mengisi kembali formulir pendaftaran. Kalau tetap bermasalah, mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.");
            } else {
                alert("`Status: ${xhr.status} ${xhr.statusText}. Maaf, ada permasalahan dengan server kami. Mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.");
            }
        }
    }
    xhr.send(parameters);
});