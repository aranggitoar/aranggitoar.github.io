const loadHtml = function(parentElementSelector, filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true)
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            document.querySelector(parentElementSelector).innerHTML = response;
        }
    };
    xhr.send();
};

loadHtml('header', 'header.html');
loadHtml('footer', 'footer.html');