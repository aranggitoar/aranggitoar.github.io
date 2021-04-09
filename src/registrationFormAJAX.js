(function ()
{




const abba90RegistrationForm =
        document.querySelector ('.js-form-rgstr-abba90'),
    abba90RegistrationFormTextToChange =
        document.querySelector ('.js-form-rgstr-text-to-change');


abba90RegistrationForm.addEventListener ('submit', (e) =>
{
    e.preventDefault ();


    var email = document.getElementById ('e-mail').value, 
        name = document.getElementById ('name').value, 
        gender;
    if (document.getElementById ('man').checked === true) {
        gender = document.getElementById ('man').value;
    } else if (document.getElementById ('women').checked === true) {
        gender = document.getElementById ('women').value;
    }
    var age = document.getElementById ('age').value,
        phoneNumber = document.getElementById ('phone-number').value,
        homeAddress = document.getElementById ('home-address').value;

    var databaseParameters = `e-mail=${email}&name=${name}&gender=
                              ${gender}&age=${age}&phone-number=
                              ${phoneNumber}&home-address=${homeAddress}`,
        emailAutomationParameters = `e-mail=${email}&name=${name}`;


    var databaseXHR = new XMLHttpRequest();
    databaseXHR.open ('POST', 'event-rgstr-abba90.php', true);
    databaseXHR.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    databaseXHR.onload = function () {
            if (databaseXHR.readyState === databaseXHR.DONE) {
                switch (true) {
                    case databaseXHR.status > 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, ada permasalahan dengan server kami. Mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
    
                    case databaseXHR.status >= 400 && databaseXHR.status < 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, tolong muat ulang halaman dan mengisi kembali formulir pendaftaran. Kalau tetap bermasalah, mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
    
                    default:
                        // If the registrar is registered: get his/her name
                        // and send an onsite alert about it.
                        if (databaseXHR.responseText !== "null") {
                            let checkResultReturnValue = {};
                            Object.assign (checkResultReturnValue,
                                           JSON.parse (databaseXHR.responseText));
                            alert (`Maaf, tetapi Saudara/i ${checkResultReturnValue.name} sudah terdaftar dalam ABBA90 Gelombang IV. Silahkan langsung hubungi kami di 0878 1279 0477 (Aranggi Toar) atau 0896 2639 7931 (Manoel Leasa) kalau memang ada satu masalah atau yang lain. Terima kasih!`);
                        } else {
                            abba90RegistrationForm.classList.add ('off');
                            setTimeout(() => {
                                abba90RegistrationForm.parentNode.
                                    removeChild (abba90RegistrationForm);
                                abba90RegistrationFormTextToChange.
                                    innerHTML = "Anda telah terdaftar, tunggu e-mail dari kami!";
                            }, 500);

                            var successfulRegistrationEmailAutomationXHR =
                                new XMLHttpRequest ();
                            successfulRegistrationEmailAutomationXHR.
                                open ('POST',
                                      'automail/new_registration.php',
                                       true);
                            successfulRegistrationEmailAutomationXHR.
                                setRequestHeader ('Content-Type',
                                                  'application/x-www-form-urlencoded');
                            successfulRegistrationEmailAutomationXHR.
                                send (emailAutomationParameters);
                        }

            }
        }
    }
    databaseXHR.send (databaseParameters);
});




}());