const scriptLoaderPromise = new Promise(function(resolve, reject) {

    function loadHtml(parentElementSelector, filePath) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true)
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                document.querySelector(parentElementSelector).innerHTML = response;
                resolve(xhr.response);
            } else {
                reject(xhr.status);
            }
        };
        xhr.send();
    };

    loadHtml('header', 'header.html');
    loadHtml('footer', 'footer.html');

});

scriptLoaderPromise
    .then(() => {
        let script = document.createElement('script');
        script.src = "js/script.js";
        script.type = "text/javascript";
        document.getElementsByTagName('head')[0].appendChild(script);
    })
    .catch(() => {
        alert('Ada masalah dengan server kami, mohon memuat ulang halaman sejenak.')
    })