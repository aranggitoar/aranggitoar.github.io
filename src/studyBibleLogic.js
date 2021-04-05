var GLOBAL = (function ()
{

    


// DISCLAIMER: FOR NOW THE NOTATION THAT COULD BE HANDLED IS SPECIFIC
// FOR TERJEMAHAN SEDERHANA INDONESIA'S BIBLE.
// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. NECESSARY VARIABLES/OBJECTS/ARRAYS
// 2. FUNCTIONS
// 3. FUNCTION CALLS BY EVENT LISTENERS




// 1. NECESSARY VARIABLES/OBJECTS/ARRAYS

// DOM SELECTORS
const bibleBookAndbibleChapterPicker =
        document.querySelector ('#bible-book-and-chapter-picker'),
    bibleBookPicker =
        document.querySelector ('#bible-book-picker'),
    bibleChapterPicker =
        document.querySelector ('#bible-chapter-picker'),
    contentsContainer =
        document.querySelector ('#bible-book-contents');


// BIBLE USFM FILE ADDRESSES
const pickeringFamily35NTAddress = [
        'assets/json_bible_files/pickeringfamily35nt_json/MAT.json',
        'assets/json_bible_files/pickeringfamily35nt_json/MRK.json',
        'assets/json_bible_files/pickeringfamily35nt_json/LUK.json',
        'assets/json_bible_files/pickeringfamily35nt_json/JHN.json',
        'assets/json_bible_files/pickeringfamily35nt_json/ACT.json',
        'assets/json_bible_files/pickeringfamily35nt_json/ROM.json',
        'assets/json_bible_files/pickeringfamily35nt_json/1CO.json',
        'assets/json_bible_files/pickeringfamily35nt_json/2CO.json',
        'assets/json_bible_files/pickeringfamily35nt_json/GAL.json',
        'assets/json_bible_files/pickeringfamily35nt_json/EPH.json',
        'assets/json_bible_files/pickeringfamily35nt_json/PHI.json',
        'assets/json_bible_files/pickeringfamily35nt_json/COL.json',
        'assets/json_bible_files/pickeringfamily35nt_json/1TH.json',
        'assets/json_bible_files/pickeringfamily35nt_json/2TH.json',
        'assets/json_bible_files/pickeringfamily35nt_json/1TI.json',
        'assets/json_bible_files/pickeringfamily35nt_json/2TI.json',
        'assets/json_bible_files/pickeringfamily35nt_json/TIT.json',
        'assets/json_bible_files/pickeringfamily35nt_json/PHM.json',
        'assets/json_bible_files/pickeringfamily35nt_json/HEB.json',
        'assets/json_bible_files/pickeringfamily35nt_json/JAS.json',
        'assets/json_bible_files/pickeringfamily35nt_json/1PE.json',
        'assets/json_bible_files/pickeringfamily35nt_json/2PE.json',
        'assets/json_bible_files/pickeringfamily35nt_json/1JN.json',
        'assets/json_bible_files/pickeringfamily35nt_json/2JN.json',
        'assets/json_bible_files/pickeringfamily35nt_json/3JN.json',
        'assets/json_bible_files/pickeringfamily35nt_json/JUD.json',
        'assets/json_bible_files/pickeringfamily35nt_json/REV.json'
    ],
    tsiAddress = [
        'assets/json_bible_files/tsi_json/GEN.json',
        'assets/json_bible_files/tsi_json/EXO.json',
        'assets/json_bible_files/tsi_json/EST.json',
        'assets/json_bible_files/tsi_json/ECC.json',
        'assets/json_bible_files/tsi_json/MAT.json',
        'assets/json_bible_files/tsi_json/MRK.json',
        'assets/json_bible_files/tsi_json/LUK.json',
        'assets/json_bible_files/tsi_json/JHN.json',
        'assets/json_bible_files/tsi_json/ACT.json',
        'assets/json_bible_files/tsi_json/ROM.json',
        'assets/json_bible_files/tsi_json/1CO.json',
        'assets/json_bible_files/tsi_json/2CO.json',
        'assets/json_bible_files/tsi_json/GAL.json',
        'assets/json_bible_files/tsi_json/EPH.json',
        'assets/json_bible_files/tsi_json/PHI.json',
        'assets/json_bible_files/tsi_json/COL.json',
        'assets/json_bible_files/tsi_json/1TH.json',
        'assets/json_bible_files/tsi_json/2TH.json',
        'assets/json_bible_files/tsi_json/1TI.json',
        'assets/json_bible_files/tsi_json/2TI.json',
        'assets/json_bible_files/tsi_json/TIT.json',
        'assets/json_bible_files/tsi_json/PHM.json',
        'assets/json_bible_files/tsi_json/HEB.json',
        'assets/json_bible_files/tsi_json/JAS.json',
        'assets/json_bible_files/tsi_json/1PE.json',
        'assets/json_bible_files/tsi_json/2PE.json',
        'assets/json_bible_files/tsi_json/1JN.json',
        'assets/json_bible_files/tsi_json/2JN.json',
        'assets/json_bible_files/tsi_json/3JN.json',
        'assets/json_bible_files/tsi_json/JUD.json',
        'assets/json_bible_files/tsi_json/REV.json'
    ];


// EMPTY OBJECT FOR THE BIBLE WHAT WILL BE INITIALIZED
const stagedBibleBook = {};




// 2. FUNCTIONS
    // The books are staged individually per request,
    // there is no reason to load every book at once
    // because we read portion of the books one at a time.
    // But this feature could be implemented simply
    // by wrapping the current chapter generator in another
    // recursive function.

    // The books should be loaded by the indentation that's written
    // in the USFM file.

    // The books can be shown with or without section headers per request.
    // -> default is with section headers.

    // The books can be shown with or without footnotes per request.
    // -> default is with footnotes.

// PREPARE THE REQUESTED BOOK
function prepareBibleBook (stagedBibleBookContainerVariable, addressArray)
{
    var xhr = new XMLHttpRequest ();
    xhr.open ('GET', addressArray, true)
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            Object.assign (stagedBibleBookContainerVariable,
                    JSON.parse (xhr.responseText));
        }
        return stagedBibleBookContainerVariable;
    }
    xhr.send ();
}


// GENERATE CHAPTER PICKER OF THE REQUESTED BOOK
function bibleChapterGenerator (stagedBibleBookContainerVariable, chapterPickerContainer)
{
    chapterPickerContainer.textContent = '';
    
    for (let i = 0; i < stagedBibleBookContainerVariable.chapters.length; i++) {
        var optionElement = document.createElement ('option');
        optionElement.setAttribute ('value', i);
        optionElement.textContent = i + 1;
        chapterPickerContainer.appendChild (optionElement);
    }
}


// GENERATE THE CONTENTS FOR THE REQUESTED CHAPTER OF THE REQUESTED BOOK
function bibleChapterContentsGenerator (stagedBibleBookContainerVariable,
    chosenBibleChapterIndex, byVerseOrByParagraph)
{
    contentsContainer.textContent = '';

    var bibleChapterContentsObject =
        stagedBibleBookContainerVariable.chapters[chosenBibleChapterIndex].contents;

    console.log (bibleChapterContentsObject);
    if (byVerseOrByParagraph === 'byVerse') {
        verseByVerse (bibleChapterContentsObject, contentsContainer);
    } else if (byVerseOrByParagraph === 'byParagraph') {
        paragraphByParagraph (bibleChapterContentsObject, contentsContainer);
    }
}


function verseByVerse (bibleBookObjectChapters, container)
{
    for (let i = 0; i < bibleBookObjectChapters.length; i++) {
        if (bibleBookObjectChapters[i].verseNumber !== null &&
            bibleBookObjectChapters[i].verseText !== undefined) {

                var newTextContainer = document.createElement ('div');
                var newSuperscript = document.createElement ('sup');
                var newParagraph = document.createElement ('p');

                newSuperscript.textContent =
                    bibleBookObjectChapters[i].verseNumber;
                newParagraph.textContent =
                    bibleBookObjectChapters[i].verseText;

                container.appendChild (newTextContainer);
                newTextContainer.appendChild (newSuperscript);
                newTextContainer.appendChild (newParagraph);
        }
    }
}


function paragraphByParagraph (bibleBookObjectChapters, container)
{
	var objectOfParametersForRecursion = {
		index : 0,
		indentParam : undefined,
		containerContent : ""
	};

    paragraphGeneratorRecursion (
        objectOfParametersForRecursion, bibleBookObjectChapters);

	container.innerHTML = objectOfParametersForRecursion.containerContent;
}


// GENERATE THE WHOLE CHAPTER'S CONTENTS
    // Recursive function is used because
    // some parameters in a content's array
    // is only initialized in the next
    // content's array. For example: paragraph,
    // margin, and pericope headers.
function paragraphGeneratorRecursion (
    objectOfParameters,
    bibleBookObjectChapters)
{
    if (objectOfParameters.index >= bibleBookObjectChapters.length) {
        return objectOfParameters.containerContent.concat ("</p>");
    } else {
        // These switch statements exists only for the first few contents
        // of a chapter. Because after that, it will always pass through
        // the first switch statement.
        switch (true) {
            case bibleBookObjectChapters[objectOfParameters.index].
            hasOwnProperty ('contents'):
                whatKindOfParagraph (objectOfParameters,
                    bibleBookObjectChapters[objectOfParameters.index]);
                objectOfParameters.index++;
                console.log ("first check passed");
                return paragraphGeneratorRecursion (
                    objectOfParameters, bibleBookObjectChapters);

            case bibleBookObjectChapters[objectOfParameters.index][0] !== null &&
            bibleBookObjectChapters[objectOfParameters.index][0] !== undefined:
                generatePericopes (objectOfParameters,
                    bibleBookObjectChapters[objectOfParameters.index][0].s);
                objectOfParameters.indentParam = undefined;
                objectOfParameters.index++;
                console.log ("second check passed");
                return paragraphGeneratorRecursion (
                    objectOfParameters, bibleBookObjectChapters);

            case bibleBookObjectChapters[objectOfParameters.index].
            hasOwnProperty ('p'):
                objectOfParameters.indentParam = 'p';
                objectOfParameters.index++;
                console.log ("third check passed");
                return paragraphGeneratorRecursion (
                    objectOfParameters, bibleBookObjectChapters);

            case bibleBookObjectChapters[objectOfParameters.index].
            hasOwnProperty ('m'):
                objectOfParameters;
                objectOfParameters.index++;
                console.log ("fourth check passed");
                return paragraphGeneratorRecursion (
                    objectOfParameters, bibleBookObjectChapters);
        }
    }
}

// FUNGSI UNTUK CEK ISI PROPERTI CONTENTS DARI PROPERTI CHAPTERS
// DARI OBYEK STAGED BIBLE BOOK:
    // ARRAY BERISI LEBIH DARI SATU HAL
    // HANYA ARRAY BERISI SATU HAL
function whatKindOfParagraph (objectOfParameters,
    bibleBookObjectChapterContents)
{
    switch (true) {
        case bibleBookObjectChapterContents.length > 1:
            return objectOfParameters.containerContent =
            generateComplexParagraph (objectOfParameters,
                bibleBookObjectChapterContents);

        default:
            return objectOfParameters.containerContent =
            generateSimpleParagraph (objectOfParameters,
                bibleBookObjectChapterContents);
    }
}


// FUNGSI UNTUK MENCIPTAKAN PERIKOP DAN REFERENSI SILANGNYA
// (KALAU ADA) DENGAN MEMANGGIL FUNGSI LAIN
function generatePericopes (objectOfParameters,
    bibleBookObjectChaptersPericope)
{
    switch (true) {
        case bibleBookObjectChaptersPericope.length > 1:
            return objectOfParameters.containerContent =
            objectOfParameters.containerContent.
            concat (`<h2>${bibleBookObjectChaptersPericope[0]}${
                generateCrossReference (bibleBookObjectChaptersPericope[1]
                ['cross-ref'])}</h2>`);
        // REFACTOR: simply add an if statement that adds the cross reference
        // content when the .length > 1. That way the return statement will
        // exist outside the if statement.
        default:
            return objectOfParameters.containerContent =
            objectOfParameters.containerContent.
            concat (`<h2>${bibleBookObjectChaptersPericope[0]}</h2>`);
    }
}


// FUNGSI YANG DIPANGGIL PENCIPTA PERIKOP UNTUK
// MENCIPTAKAN REFERENSI SILANG
function generateCrossReference (bibleBookObjectChaptersCRArray) 
{
    let crossReferenceString = "<sup data-footnote-text:'";

    for (i in bibleBookObjectChaptersCRArray) {
        switch (true) {
            case bibleBookObjectChaptersCRArray[i].hasOwnProperty ('xo'):
                crossReferenceString = crossReferenceString.
                concat (bibleBookObjectChaptersCRArray[i].xo);

            case bibleBookObjectChaptersCRArray[i].hasOwnProperty ('xt'):
                crossReferenceString = crossReferenceString.
                concat (bibleBookObjectChaptersCRArray[i].xt);
        }
    }

    return crossReferenceString.replace ('undefined', ' ').
    concat ("'>&#x203B;<sup>");
}


function generateSimpleParagraph (objectOfParameters,
    bibleBookObjectChapterContents)
{
    // If the string is the first one or after a pericope
    if (objectOfParameters.containerContent !== "" ||
    /[<.?>]$/.test (objectOfParameters.containerContent) === false) {
        objectOfParameters.containerContent =
        objectOfParameters.containerContent.
        concat ('</p>');
    }

    switch (true) {
        case objectOfParameters.indentParam === 'p':
            objectOfParameters.containerContent =
            objectOfParameters.containerContent.
            concat ('<p>&emsp;');
            break;

        case objectOfParameters.indentParam === 'm':
            objectOfParameters.containerContent =
            objectOfParameters.containerContent.
            concat ('<p>');
            break;

        case objectOfParameters.indentParam === undefined:
            break;
    }

    return objectOfParameters.containerContent =
    objectOfParameters.containerContent.
    concat (`<sup>${bibleBookObjectChapterContents.verseNumber}</sup>${
        bibleBookObjectChapterContents.contents[0]}`);
}


// FUNGSI UNTUK MENCIPTAKAN PARAGRAF KOMPLEX, HAL-HAL YANG PERLU DICEK:
    // APAKAH MENGANDUNG PERIKOP?
    // APAKAH MENGANDUNG KETERANGAN INDENTASI?
    // APAKAH MENGANDUNG CATATAN KAKI?
    // APAKAH MENGANDUNG KALIMAT DENGAN MARKUP KUTIPAN? (q#)
function generateComplexParagraph (objectOfParameters,
    bibleBookObjectChapterContents)
{
    // If the string is the first one or after a pericope
    if (objectOfParameters.containerContent !== "" ||
    /[<.?>]$/.test (objectOfParameters.containerContent) === false) {
        objectOfParameters.containerContent =
        objectOfParameters.containerContent.
        concat ('</p>');
    }

    for (i in bibleBookObjectChapterContents) {
        switch (true) {
            // Transfer the value right away to main recursion's parameter.
            case bibleBookObjectChapterContents[i].hasOwnProperty ('p'):
                objectOfParameters.indentParam = 'p';
            // Idem
            case bibleBookObjectChapterContents[i].hasOwnProperty ('m'):
                objectOfParameters.indentParam = 'm';
            // Pericopes will always be at the end of the contents object,
            // so concatenating them just like this wouldn't yield any problem.
            case bibleBookObjectChapterContents[i][0] !== null &&
            bibleBookObjectChapterContents[i][0] !== undefined:
                objectOfParameters.containerContent =
                objectOfParameters.containerContent.
                concat (generatePericopes (objectOfParameters,
                    bibleBookObjectChapterContents[i][0].s));
        
            case bibleBookObjectChapterContents[i].hasOwnProperty ('cross-ref'):
                objectOfParameters.containerContent =
                objectOfParameters.containerContent.
                concat (generateCrossReference (
                    bibleBookObjectChapterContents[i]['cross-ref']));
        
            case bibleBookObjectChapterContents[i].hasOwnProperty ('footnote'):
                objectOfParameters.containerContent =
                objectOfParameters.containerContent.
                concat (generateFootnote (
                    bibleBookObjectChapterContents[i].footnote));

            default:
                objectOfParameters.containerContent =
                objectOfParameters.containerContent.
                concat (bibleBookObjectChapterContents[i]);
        }
    }

    return objectOfParameters;
}


function generateFootnote (bibleBookObjectFootnoteArray)
{
    let footnoteString = "<sup data-footnote-text:'";

    for (i in bibleBookObjectFootnoteArray.length) {
        switch (true) {
            case bibleBookObjectFootnoteArray[i].hasOwnProperty ("fk"):
                footnoteString = footnoteString.
                concat (bibleBookObjectFootnoteArray[i].fk);

            case bibleBookObjectFootnoteArray[i].hasOwnProperty ("ft"):
                footnoteString = footnoteString.
                concat (bibleBookObjectFootnoteArray[i].ft);
        }
    }

    return footnoteString.replace ('undefined', '').
    concat ("'>&#x203B;<sup>");
}




// 3. FUNCTION CALLS BY EVENT LISTENERS
bibleBookPicker.addEventListener ('change', (event) =>
{
    event.preventDefault ();

    var bibleBookIndex = bibleBookPicker.value;

    prepareBibleBook (stagedBibleBook, tsiAddress[bibleBookIndex]);

    setTimeout (() => { // Wait for the chosen book to be staged
        bibleChapterGenerator (stagedBibleBook, bibleChapterPicker);

        setTimeout (() => { // Wait for the default chapters to be staged
            var chosenBibleChapterIndex = bibleChapterPicker.value;
            bibleChapterContentsGenerator (stagedBibleBook,
                chosenBibleChapterIndex, 'byParagraph');
        }, 200);
    }, 200);
});


bibleChapterPicker.addEventListener ('change', (event) =>
{
    event.preventDefault ();

    var chosenBibleChapterIndex = bibleChapterPicker.value;

    bibleChapterContentsGenerator (stagedBibleBook,
        chosenBibleChapterIndex, 'byParagraph');
});




return {stagedBibleBook: stagedBibleBook};
}());