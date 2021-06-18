(function()
{



window.addEventListener ('load', () => {
    loadingAnimationDiv.style.transform = "translateY(-2000px)";
    setTimeout(() => {document.body.removeChild (loadingAnimationDiv)}, 800);
})

// Creating elements for the page loading animation.
const loadingAnimationDiv = document.createElement ('div'),
      loadingAnimationText = document.createElement ('h1'),
      loadingAnimationText2 = document.createElement ('h1'),
      loadingAnimationText3 = document.createElement ('h1'),
      loadingAnimationText4 = document.createElement ('h1'),
      loadingAnimationText5 = document.createElement ('h1'),
      loadingAnimationText6 = document.createElement ('h1');

      
// Add contents to the created element and append the elements to the page.
function runLoadingScreen () {
    loadingAnimationDiv.classList.add ('loading-text-container');
    loadingAnimationText.innerText = "M";
    loadingAnimationText2.innerText = "e";
    loadingAnimationText3.innerText = "m";
    loadingAnimationText4.innerText = "u";
    loadingAnimationText5.innerText = "a";
    loadingAnimationText6.innerText = "t";
    loadingAnimationDiv.appendChild (loadingAnimationText);
    loadingAnimationDiv.appendChild (loadingAnimationText2);
    loadingAnimationDiv.appendChild (loadingAnimationText3);
    loadingAnimationDiv.appendChild (loadingAnimationText4);
    loadingAnimationDiv.appendChild (loadingAnimationText5);
    loadingAnimationDiv.appendChild (loadingAnimationText6);
    document.body.appendChild (loadingAnimationDiv);
}


// Header and footer will be loaded first.
const scriptLoaderPromise = new Promise (function(resolve, reject)
{
    
    function loadHtml (parentElementSelector, filePath, runPromise) {
        const xhr = new XMLHttpRequest ();
        xhr.open ('GET', filePath, true);
        xhr.onload = function () {
            runLoadingScreen ();
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                document.querySelector (parentElementSelector).innerHTML = response;
                if (runPromise === true) {
                    resolve (xhr.response);
                }
            } else {
                if (runPromise === true) {
                    reject (xhr.status);
                }
            }
        };
        xhr.send ();
    }
    loadHtml ('header', 'header.html', false);
    loadHtml ('footer', 'footer.html', true);

});


// Maybe doing module imports will be better than creating a script element.
function generateScript (scriptName, scriptType)
{
    let script = document.createElement ('script');
    script.src = `src/${scriptName}.js`;
    script.type = scriptType;
    script.setAttribute ("defer", "");
    document.head.appendChild (script);
}


// Only after the header and footer is loaded
// the other scripts will be loaded.
scriptLoaderPromise
    .then(() => {
        generateScript ("animations", "text/javascript");
        // If the page is the Study Bible page,
        // add the following script too.
        if (/study/.test (window.location.pathname) === true) {
            generateScript ("studyBibleLogic", "text/javascript");
        // If the page is the STBAI Survey page.
        } else if (/event-srvey/.test (window.location.pathname) === true) {
            generateScript ("surveyFormAJAX?version=0.6.1", "text/javascript");
        // If the page is the ABBA90 Registration page.
        } else if (/event-rgstr/.test (window.location.pathname) === true) {
            generateScript ("registrationFormAJAX", "text/javascript");
            generateScript ("countdown", "text/javascript");
        }
    })
    .catch(() => {
        alert ('Ada masalah dengan server kami, mohon memuat ulang halaman sejenak.');
    })



}());