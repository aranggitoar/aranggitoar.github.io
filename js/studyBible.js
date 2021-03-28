// const bibleBookContents = {"1": {}, "Markus": {}, "Lukas": {}, "Yohanes": {}, "Kisah Para Rasul": {}, "Roma": {}, "1 Korintus": {}, "2 Korintus": {}, "Galatia": {}, "Efesus": {}, "Filipi": {}, "Kolose": {}, "1 Tesalonika": {}, "2 Tesalonika": {}, "1 Timotius": {}, "2 Timotius": {}, "Titus": {}, "Filemon": {}, "Ibrani": {}, "Yakobus": {}, "1 Petrus": {}, "2 Petrus": {}, "1 Yohanes": {}, "2 Yohanes": {}, "3 Yohanes": {}, "Yudas": {}, "Wahyu": {}};

// Arrays of bible books
const pickeringFamily35NTContents = [];

// Addresses of the .json files
const pickeringFamily35NTAddress = ['assets/pickeringfamily35nt_json/MAT.json', 'assets/pickeringfamily35nt_json/MRK.json', 'assets/pickeringfamily35nt_json/LUK.json', 'assets/pickeringfamily35nt_json/JHN.json', 'assets/pickeringfamily35nt_json/ACT.json', 'assets/pickeringfamily35nt_json/ROM.json', 'assets/pickeringfamily35nt_json/1CO.json', 'assets/pickeringfamily35nt_json/2CO.json', 'assets/pickeringfamily35nt_json/GAL.json', 'assets/pickeringfamily35nt_json/EPH.json', 'assets/pickeringfamily35nt_json/PHI.json', 'assets/pickeringfamily35nt_json/COL.json', 'assets/pickeringfamily35nt_json/1TH.json', 'assets/pickeringfamily35nt_json/2TH.json', 'assets/pickeringfamily35nt_json/1TI.json', 'assets/pickeringfamily35nt_json/2TI.json', 'assets/pickeringfamily35nt_json/TIT.json', 'assets/pickeringfamily35nt_json/PHM.json', 'assets/pickeringfamily35nt_json/HEB.json', 'assets/pickeringfamily35nt_json/JAS.json', 'assets/pickeringfamily35nt_json/1PE.json', 'assets/pickeringfamily35nt_json/2PE.json', 'assets/pickeringfamily35nt_json/1JN.json', 'assets/pickeringfamily35nt_json/2JN.json', 'assets/pickeringfamily35nt_json/3JN.json', 'assets/pickeringfamily35nt_json/JUD.json', 'assets/pickeringfamily35nt_json/REV.json']

// Bible book array populator function
// function populateBibleBookContentsArray(contentsArray, addressArray) {
//     var xhr = new XMLHttpRequest();
//     getContents(xhr, 0, addressArray, contentsArray);
// }
// function getContents(xhr, iterator, addressArray, contentsArray) {
//     if (iterator >= addressArray.length) {
//         return;
//     }
//     xhr.open('GET', addressArray[iterator], true);
//     xhr.onload = function() {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 contentsArray.push(JSON.parse(xhr.responseText));
//                 console.log(iterator);
//                 getContents(xhr, iterator + 1, addressArray, contentsArray);
//         }
//     }
//     xhr.send();
// }

// DOM selectors
const bookAndChapterPickerContainer = document.querySelector('#book-and-chapter-picker');
const bookPicker = document.querySelector('#book-picker');
const chapterPicker = document.querySelector('#chapter-picker');
const contentsContainer = document.querySelector('#bible-contents');

// Bible book staging function
const stagedBook = {};
function stageBibleBook(stagedBookContainerVariable, addressArray) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', addressArray, true);
    xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Object.assign(stagedBookContainerVariable, JSON.parse(xhr.responseText));
        }
        return stagedBookContainerVariable;
    }
    xhr.send();
}
function chapterPickerGenerator(stagedBookContainerVariable) {
    console.log(stagedBookContainerVariable.chapters.length);
    chapterPicker.textContent = '';
    for (let i = 0; i < stagedBookContainerVariable.chapters.length; i++) {
        var optionElement = document.createElement('option');
        optionElement.setAttribute('value', i + 1);
        optionElement.textContent = i + 1;
        chapterPicker.appendChild(optionElement);
    }
}
function chapterContentsGenerator(stagedBookContainerVariable, chapterIndex) {
    contentsContainer.textContent = '';
    var contentsObject = stagedBookContainerVariable.chapters[chapterIndex].contents;
    for (let i = 0; i < contentsObject.length; i++) {
        if (contentsObject[i].verseNumber !== null && contentsObject[i].verseText !== undefined) {
            var newTextContainer = document.createElement('div');
            var newSuperscript = document.createElement('sup');
            var newParagraph = document.createElement('p');

            newSuperscript.textContent = contentsObject[i].verseNumber;
            newParagraph.textContent = contentsObject[i].verseText;

            contentsContainer.appendChild(newTextContainer);
            newTextContainer.appendChild(newSuperscript);
            newTextContainer.appendChild(newParagraph);
        }
    }
}

// Listeners
bookPicker.addEventListener('change', (e) => {
    e.preventDefault();
    var bookIndex = bookPicker.value;
    stageBibleBook(stagedBook, pickeringFamily35NTAddress[bookIndex]);
    setTimeout(() => {
        chapterPickerGenerator(stagedBook);
    }, 100);
});

chapterPicker.addEventListener('change', (e) => {
    e.preventDefault();
    var chapterIndex = chapterPicker.value;
    chapterContentsGenerator(stagedBook, chapterIndex);
});