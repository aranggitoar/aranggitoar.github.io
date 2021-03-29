// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. REQUIRED VARIABLES/OBJECTS/ARRAYS
// 2. FUNCTIONS
// 3. FUNCTION CALLS



// 1. REQUIRED VARIABLES/OBJECTS/ARRAYS
// ARRAYS OF THE BIBLE TRANSLATIONS
const pickeringFamily35NTContents = [];

// ADDRESSES OF THE BIBLE TRANSLATIONS IN .JSON FORMAT
const pickeringFamily35NTAddress = ['assets/pickeringfamily35nt_json/MAT.json', 'assets/pickeringfamily35nt_json/MRK.json', 'assets/pickeringfamily35nt_json/LUK.json', 'assets/pickeringfamily35nt_json/JHN.json', 'assets/pickeringfamily35nt_json/ACT.json', 'assets/pickeringfamily35nt_json/ROM.json', 'assets/pickeringfamily35nt_json/1CO.json', 'assets/pickeringfamily35nt_json/2CO.json', 'assets/pickeringfamily35nt_json/GAL.json', 'assets/pickeringfamily35nt_json/EPH.json', 'assets/pickeringfamily35nt_json/PHI.json', 'assets/pickeringfamily35nt_json/COL.json', 'assets/pickeringfamily35nt_json/1TH.json', 'assets/pickeringfamily35nt_json/2TH.json', 'assets/pickeringfamily35nt_json/1TI.json', 'assets/pickeringfamily35nt_json/2TI.json', 'assets/pickeringfamily35nt_json/TIT.json', 'assets/pickeringfamily35nt_json/PHM.json', 'assets/pickeringfamily35nt_json/HEB.json', 'assets/pickeringfamily35nt_json/JAS.json', 'assets/pickeringfamily35nt_json/1PE.json', 'assets/pickeringfamily35nt_json/2PE.json', 'assets/pickeringfamily35nt_json/1JN.json', 'assets/pickeringfamily35nt_json/2JN.json', 'assets/pickeringfamily35nt_json/3JN.json', 'assets/pickeringfamily35nt_json/JUD.json', 'assets/pickeringfamily35nt_json/REV.json']

// DOM SELECTORS
const bookAndChapterPickerContainer = document.querySelector('#book-and-chapter-picker');
const bookPicker = document.querySelector('#book-picker');
const chapterPicker = document.querySelector('#chapter-picker');
const contentsContainer = document.querySelector('#bible-contents');

// OTHER GLOBAL VARIABLES
const stagedBook = {};



// 2. FUNCTIONS
// The books are staged individually per request, there is no reason to load every book at once
// because we read portion of the books one at a time.
// The books can be loaded verse by verse or paragraph by paragraph per request.
// -> default is verse by verse.
// The books can be shown with or without section headers per request.
// -> default is with section headers.
// The books can be shown with or without footnotes per request.
// -> default is with footnotes.
// 2a. Stage the requested book
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

// In the future per-book display can be implemented
// 2. b. Generate the picker for chapters of the requested book
function chapterPickerGenerator(stagedBookContainerVariable) {
    chapterPicker.textContent = '';
    for (let i = 0; i < stagedBookContainerVariable.chapters.length; i++) {
        var optionElement = document.createElement('option');
        optionElement.setAttribute('value', i);
        optionElement.textContent = i + 1;
        chapterPicker.appendChild(optionElement);
    }
}

// 2. c. Generate the contents
// for the requested chapter of the requested book
function chapterContentsGenerator(stagedBookContainerVariable, chapterIndex, byVerseOrByParagraph) {
    contentsContainer.textContent = '';
    var chapterContentsObject = stagedBookContainerVariable.chapters[chapterIndex].contents;
    if (byVerseOrByParagraph === 'byVerse') { // Apakah pilihan dengan atau tidak dengan judul perikop serta footnote dibuat di sini? Kalau begitu berarti fungsi if dan else if ini diubah menjadi fungsi switch?
        verseByVerse(chapterContentsObject, contentsContainer);
    } else if (byVerseOrByParagraph === 'byParagraph') {
        paragraphByParagraph(chapterContentsObject, contentsContainer);
    }
}
// 2. c. 1. Verse by verse
function verseByVerse(bookObject, container) {
    for (let i = 0; i < bookObject.length; i++) {
        if (bookObject[i].verseNumber !== null && bookObject[i].verseText !== undefined) {
                var newTextContainer = document.createElement('div');
                var newSuperscript = document.createElement('sup');
                var newParagraph = document.createElement('p');

                newSuperscript.textContent = bookObject[i].verseNumber;
                newParagraph.textContent = bookObject[i].verseText;

                container.appendChild(newTextContainer);
                newTextContainer.appendChild(newSuperscript);
                newTextContainer.appendChild(newParagraph);
        }
    }
}
// 2. c. 2. Paragraph by paragraph
function paragraphByParagraph(bookObject, container) {
    var index;
    markupCheckRecursions(index, bookObject, container);
}
function markupCheckRecursions (index, bookObject, container) {
    if (index >= bookObject.length) {
        return;
    } else {
        if (bookObject[0]) {
            var newParagraph = document.createElement('p');

        } else if (bookObject[i].verseNumber !== null && bookObject[i].verseText !== undefined) {
                var newSuperscript = document.createElement('sup');

                newSuperscript.textContent = bookObject[i].verseNumber;
                newParagraph.textContent = bookObject[i].verseText;

            switch (checkIfFollowedByParagraphOrMargin(stagedBookContainerVariable, chapterIndex, i)) {
                case 'paragraph':


            }
                container.appendChild(newSuperscript);
                container.appendChild(newParagraph);
        }
    }
}
// 2. c. 2. a. Separate the requested contents by
// new paragraphs and continuation paragraphs
// in the USFM syntax: p and m.
function checkIfFollowedByParagraphOrMargin(stagedBookContainerVariable, chapterIndex, verseIndex) {
    var newParagraphNotation = 'p';
    var continuationParagraphNotation = 'm';
    var isItFollowedByANewParagraph;
    var isItFollowedByAContinuationParagraph;

    for (let i = 0; i < stagedBookContainerVariable.chapters[chapterIndex].contents[verseIndex].contents.length; i++) {
        if (stagedBookContainerVariable.chapters[chapterIndex].contents[verseIndex].contents[i].hasOwnProperty(newParagraphNotation)) {
            isItFollowedByANewParagraph = true;
            break;
        } else if (stagedBookContainerVariable.chapters[chapterIndex].contents[verseIndex].contents[i].hasOwnProperty(continuationParagraphNotation)) {
            isItFollowedByAContinuationParagraph = true;
            break;
        } else {
            isItFollowedByANewParagraph = false;
            isItFollowedByAContinuationParagraph = false;
        }
    }

    return (isItFollowedByANewParagraph === true ? 'paragraph' : (
        isItFollowedByAContinuationParagraph === true ? 'margin' : 'none'));
}



// 3. FUNCTION CALLS
bookPicker.addEventListener('change', (e) => {
    e.preventDefault();
    var bookIndex = bookPicker.value;
    stageBibleBook(stagedBook, pickeringFamily35NTAddress[bookIndex]);
    setTimeout(() => { // Wait for the chosen book to be staged
        chapterPickerGenerator(stagedBook);
        setTimeout(() => { // Wait for the default chapters to be staged
            var chapterIndex = chapterPicker.value;
            chapterContentsGenerator(stagedBook, chapterIndex, 'byVerse');
        }, 200);
    }, 200);
});
chapterPicker.addEventListener('change', (e) => {
    e.preventDefault();
    var chapterIndex = chapterPicker.value;
    chapterContentsGenerator(stagedBook, chapterIndex, 'byVerse');
});