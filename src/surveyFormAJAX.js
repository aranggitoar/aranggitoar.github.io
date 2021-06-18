(function ()
{




const a24BiblitracySurveyFormContactInfo =
        document.querySelector ('.js-form-survey-biblitracy-contact-info'),
    a24BiblitracySurveyFormQuestions =
        document.querySelector ('.js-form-survey-biblitracy-questions'),
    a24BiblitracySurveyFormTextToChange =
        document.querySelector ('.js-form-survey-biblitracy-text-to-change');


a24BiblitracySurveyFormContactInfo.addEventListener ('submit', (e) =>
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
        origin = document.getElementById ('origin').value;

    var databaseParameters = `e-mail=${email}&name=${name}&gender=${gender}&age=${age}&phone-number=${phoneNumber}&origin=${origin}`,
        emailAutomationParameters = `?e-mail=${email}&name=${name}`;


    var databaseXHR = new XMLHttpRequest();
    databaseXHR.open ('POST', 'event-srvey-stbai.php', true);
    databaseXHR.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    databaseXHR.onload = function () {
            if (databaseXHR.readyState === databaseXHR.DONE) {
                switch (true) {
                    case databaseXHR.status > 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, ada permasalahan dengan server kami. Mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
                        break;

                    case databaseXHR.status >= 400 && databaseXHR.status < 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, tolong muat ulang halaman dan mengisi kembali formulir pendaftaran. Kalau tetap bermasalah, mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
                        break;
                        
                    default:
                        // If the registrar is registered: get his/her name
                        // and send an onsite alert about it.
                        if (databaseXHR.responseText !== "null") {
                            let checkResultReturnValue = {};
                            console.log(databaseXHR.responseText);
                            Object.assign (checkResultReturnValue,
                                           JSON.parse (databaseXHR.responseText));
                            alert (`Maaf, tetapi Saudara/i ${checkResultReturnValue.name} sudah mengisi Survey Tingkat Baca Alkitab di Indonesia. Silahkan langsung hubungi kami di 0878 1279 0477 (Aranggi Toar) atau 0896 2639 7931 (Manoel Leasa) kalau memang ada satu masalah atau yang lain. Terima kasih!`);
                        } else {
                            a24BiblitracySurveyFormContactInfo.classList.add ('off');
                            setTimeout(() => {
                                a24BiblitracySurveyFormContactInfo.parentNode.
                                    removeChild (a24BiblitracySurveyFormContactInfo);
                                a24BiblitracySurveyFormTextToChange.
                                    innerHTML = "Pertanyaan Survei";
                            }, 400);

                            a24BiblitracySurveyFormQuestions.style.display = "flex";
                            a24BiblitracySurveyFormQuestions.classList.add ('on');

                            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + emailAutomationParameters;
                            window.history.pushState({path:newurl},'',newurl);
                        }

            }
        }
    }
    databaseXHR.send (databaseParameters);
});


a24BiblitracySurveyFormQuestions.addEventListener ('submit', (e) => {
    e.preventDefault ();


    var satu = document.querySelector ('input[name="1"]:checked').value,
        dua = document.querySelector ('input[name="2"]:checked').value,
        tiga = document.querySelector ('input[name="3"]:checked').value,
        empat = document.querySelector ('input[name="4"]:checked').value,
        lima = document.querySelector ('input[name="5"]:checked').value,
        enam = document.querySelector ('input[name="6"]').value,
        tujuh = document.querySelector ('select[name="7"]').value,
        delapan = document.querySelector ('input[name="8"]').value,
        sembilan = document.querySelector ('input[name="9"]:checked').value,
        sepuluh = document.querySelector ('input[name="10"]').value,
        sebelas = document.querySelector ('input[name="11"]:checked').value,
        duabelas = document.querySelector ('input[name="12"]:checked').value,
        tigabelas = document.querySelector ('input[name="13"]:checked').value,
        empatbelas = document.querySelector ('input[name="14"]:checked').value,
        limabelas = document.querySelector ('input[name="15"]:checked').value,
        enambelas = document.querySelector ('input[name="16"]:checked').value,
        tujuhbelas = document.querySelector ('input[name="17"]').value,
        delapanbelas = document.querySelector ('input[name="18"]:checked').value,
        sembilanbelas = document.querySelector ('input[name="19"]:checked').value,
        duapuluh = document.querySelector ('input[name="20"]').value,
        duapuluhsatu = document.querySelector ('input[name="21"]:checked').value,
        duapuluhdua = document.querySelector ('input[name="22"]:checked').value,
        duapuluhtiga = document.querySelector ('input[name="23"]').value,
        duapuluhempat = document.querySelector ('input[name="24"]:checked').value;

    var databaseParameters = `satu=${satu}&dua=${dua}&tiga=${tiga}&empat=${empat}&lima=${lima}&enam=${enam}&tujuh=${tujuh}&delapan=${delapan}&sembilan=${sembilan}&sepuluh=${sepuluh}&sebelas=${sebelas}&duabelas=${duabelas}&tigabelas=${tigabelas}&empatbelas=${empatbelas}&limabelas=${limabelas}&enambelas=${enambelas}&tujuhbelas=${tujuhbelas}&delapanbelas=${delapanbelas}&sembilanbelas=${sembilanbelas}&duapuluh=${duapuluh}&duapuluhsatu=${duapuluhsatu}&duapuluhdua=${duapuluhdua}&duapuluhtiga=${duapuluhtiga}&duapuluhempat=${duapuluhempat}`;
    var identification = window.location.search.slice(window.location.search.match(/\?/).index + 1, 99);


    var databaseXHR = new XMLHttpRequest();
    databaseXHR.open ('POST', 'event-srvey-stbai-q.php', true);
    databaseXHR.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
    databaseXHR.onload = function () {
            if (databaseXHR.readyState === databaseXHR.DONE) {
                switch (true) {
                    case databaseXHR.status > 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, ada permasalahan dengan server kami. Mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
                        break;

                    case databaseXHR.status >= 400 && databaseXHR.status < 500:
                        alert (`Status: ${databaseXHR.status} ${databaseXHR.statusText}. Maaf, tolong muat ulang halaman dan mengisi kembali formulir pendaftaran. Kalau tetap bermasalah, mohon kirim tangkapan layar ini kepada kami di info@benihyangbaik.com. Mohon maaf atas ketidaknyamanannya.`);
                        break;
                        
                    default:
                        if (databaseXHR.responseText !== "") {
                            a24BiblitracySurveyFormQuestions.classList.add ('off');

                            var a24BiblitracySurveyFormThanksMessage = document.createElement('p');
                            var a24BiblitracySurveyFormEmailVerification = document.createElement('p');
                            a24BiblitracySurveyFormThanksMessage.innerHTML = "Kami akan segera mengirimkan sebuah email kepada Anda, apakah benar ini email Anda?";
                            a24BiblitracySurveyFormEmailVerification.innerHTML = identification.slice(7, identification.match(/&name=/).index);

                            setTimeout(() => {
                                a24BiblitracySurveyFormQuestions.parentNode.
                                    removeChild (a24BiblitracySurveyFormQuestions);
                                a24BiblitracySurveyFormTextToChange.
                                    innerHTML = "Terima kasih!";
                            }, 500);

                            a24BiblitracySurveyFormThanksMessage.classList.add ('on');

                            var successfulRegistrationEmailAutomationXHR =
                                new XMLHttpRequest ();
                            successfulRegistrationEmailAutomationXHR.
                                open ('POST',
                                      'automail/stbai_automail.php',
                                       true);
                            successfulRegistrationEmailAutomationXHR.
                                setRequestHeader ('Content-Type',
                                                  'application/x-www-form-urlencoded');
                            successfulRegistrationEmailAutomationXHR.
                                send (identification);
                        }
            }
        }
    }
    databaseXHR.send (`${databaseParameters}&${identification}`);
});




}());