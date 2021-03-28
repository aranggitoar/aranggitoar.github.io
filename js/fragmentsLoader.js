const scriptLoaderPromise = new Promise(function(resolve, reject) {

    function loadHtml(parentElementSelector, filePath, runPromise) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                document.querySelector(parentElementSelector).innerHTML = response;
                if (runPromise === true) {
                    resolve(xhr.response);
                }
            } else {
                if (runPromise === true) {
                    reject(xhr.status);
                }
            }
        };
        xhr.send();
    }

    loadHtml('header', 'header.html', false);
    loadHtml('footer', 'footer.html', true);

});

scriptLoaderPromise
    .then(() => {
        let script = document.createElement('script');
        script.src = "js/script.js";
        script.type = "text/javascript";
        script.setAttribute("defer", "");
        document.getElementsByTagName('head')[0].appendChild(script);
        if (/study/.test(window.location.pathname) === true) {
            let script = document.createElement('script');
            script.src = "js/studyBible.js";
            script.type = "text/javascript";
            script.setAttribute("defer", "");
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    })
    .catch(() => {
        alert('Ada masalah dengan server kami, mohon memuat ulang halaman sejenak.')
    })