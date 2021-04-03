// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. REQUIRED VARIABLES/OBJECTS/ARRAYS
// 2. FUNCTIONS
// 3. FUNCTION CALLS



// 1. REQUIRED VARIABLES/OBJECTS/ARRAYS
// ARRAYS OF THE BIBLE TRANSLATIONS

// ADDRESSES OF THE BIBLE TRANSLATIONS IN .JSON FORMAT
// const pickeringFamily35NTAddress = ['assets/pickeringfamily35nt_json/MAT.json', 'assets/pickeringfamily35nt_json/MRK.json', 'assets/pickeringfamily35nt_json/LUK.json', 'assets/pickeringfamily35nt_json/JHN.json', 'assets/pickeringfamily35nt_json/ACT.json', 'assets/pickeringfamily35nt_json/ROM.json', 'assets/pickeringfamily35nt_json/1CO.json', 'assets/pickeringfamily35nt_json/2CO.json', 'assets/pickeringfamily35nt_json/GAL.json', 'assets/pickeringfamily35nt_json/EPH.json', 'assets/pickeringfamily35nt_json/PHI.json', 'assets/pickeringfamily35nt_json/COL.json', 'assets/pickeringfamily35nt_json/1TH.json', 'assets/pickeringfamily35nt_json/2TH.json', 'assets/pickeringfamily35nt_json/1TI.json', 'assets/pickeringfamily35nt_json/2TI.json', 'assets/pickeringfamily35nt_json/TIT.json', 'assets/pickeringfamily35nt_json/PHM.json', 'assets/pickeringfamily35nt_json/HEB.json', 'assets/pickeringfamily35nt_json/JAS.json', 'assets/pickeringfamily35nt_json/1PE.json', 'assets/pickeringfamily35nt_json/2PE.json', 'assets/pickeringfamily35nt_json/1JN.json', 'assets/pickeringfamily35nt_json/2JN.json', 'assets/pickeringfamily35nt_json/3JN.json', 'assets/pickeringfamily35nt_json/JUD.json', 'assets/pickeringfamily35nt_json/REV.json'];
const tsiAddress = ['assets/tsi_json/GEN.json', 'assets/tsi_json/EXO.json', 'assets/tsi_json/EST.json', 'assets/tsi_json/ECC.json', 'assets/tsi_json/MAT.json', 'assets/tsi_json/MRK.json', 'assets/tsi_json/LUK.json', 'assets/tsi_json/JHN.json', 'assets/tsi_json/ACT.json', 'assets/tsi_json/ROM.json', 'assets/tsi_json/1CO.json', 'assets/tsi_json/2CO.json', 'assets/tsi_json/GAL.json', 'assets/tsi_json/EPH.json', 'assets/tsi_json/PHI.json', 'assets/tsi_json/COL.json', 'assets/tsi_json/1TH.json', 'assets/tsi_json/2TH.json', 'assets/tsi_json/1TI.json', 'assets/tsi_json/2TI.json', 'assets/tsi_json/TIT.json', 'assets/tsi_json/PHM.json', 'assets/tsi_json/HEB.json', 'assets/tsi_json/JAS.json', 'assets/tsi_json/1PE.json', 'assets/tsi_json/2PE.json', 'assets/tsi_json/1JN.json', 'assets/tsi_json/2JN.json', 'assets/tsi_json/3JN.json', 'assets/tsi_json/JUD.json', 'assets/tsi_json/REV.json'];

// DOM SELECTORS
const bibleBookAndbibleChapterContainer = document.querySelector('#bible-book-and-chapter-picker');
const bibleBookPicker = document.querySelector('#bible-book-picker');
const bibleChapter = document.querySelector('#bible-chapter-picker');
const contentsContainer = document.querySelector('#bible-book-contents');

// OTHER GLOBAL VARIABLES
const stagedBibleBook = {};



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
function stageBibleBook(stagedBibleBookContainerVariable, addressArray) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', addressArray, true);
    xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Object.assign(stagedBibleBookContainerVariable, JSON.parse(xhr.responseText));
        }
        return stagedBibleBookContainerVariable;
    }
    xhr.send();
}

// In the future per-book display can be implemented
// 2. b. Generate the picker for chapters of the requested book
function bibleChapterGenerator(stagedBibleBookContainerVariable) {
    bibleChapter.textContent = '';
    for (let i = 0; i < stagedBibleBookContainerVariable.chapters.length; i++) {
        var optionElement = document.createElement('option');
        optionElement.setAttribute('value', i);
        optionElement.textContent = i + 1;
        bibleChapter.appendChild(optionElement);
    }
}

// 2. c. Generate the contents
// for the requested chapter of the requested book
function bibleChapterContentsGenerator(stagedBibleBookContainerVariable, bibleChaptersIndex, byVerseOrByParagraph) {
    contentsContainer.textContent = '';
    var bibleChapterContentsObject = stagedBibleBookContainerVariable.chapters[bibleChaptersIndex].contents;
    if (byVerseOrByParagraph === 'byVerse') { // Apakah pilihan dengan atau tidak dengan judul perikop serta footnote dibuat di sini? Kalau begitu berarti fungsi if dan else if ini diubah menjadi fungsi switch?
        verseByVerse(bibleChapterContentsObject, contentsContainer);
    } else if (byVerseOrByParagraph === 'byParagraph') {
        paragraphByParagraph(bibleChapterContentsObject, contentsContainer);
    }
}
// 2. c. 1. Verse by verse
function verseByVerse(bibleBookObjectChapters, container) {
    for (let i = 0; i < bibleBookObjectChapters.length; i++) {
        if (bibleBookObjectChapters[i].verseNumber !== null && bibleBookObjectChapters[i].verseText !== undefined) {
                var newTextContainer = document.createElement('div');
                var newSuperscript = document.createElement('sup');
                var newParagraph = document.createElement('p');

                newSuperscript.textContent = bibleBookObjectChapters[i].verseNumber;
                newParagraph.textContent = bibleBookObjectChapters[i].verseText;

                container.appendChild(newTextContainer);
                newTextContainer.appendChild(newSuperscript);
                newTextContainer.appendChild(newParagraph);
        }
    }
}
// 2. c. 2. Paragraph by paragraph
function paragraphByParagraph(bibleBookObjectChapters, container) {
	var objectOfParametersForRecursion = {
		index : 0,
		indentParam : undefined,
		containerContent : ""
	};
    paragraphGeneratorRecursion(objectOfParametersForRecursion, bibleBookObjectChapters);
	container.innerHTML = objectOfParametersForRecursion.containerContent;
}
function paragraphGeneratorRecursion (objectOfParameters, bibleBookObjectChapters) {
    if (objectOfParameters.index >= bibleBookObjectChapters.length) {
        return objectOfParameters.containerContent.concat("</p>");
    } else {
        console.log(objectOfParameters);
		if (bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('contents')) {

			generateParagraphSwitchCase(objectOfParameters, bibleBookObjectChapters[objectOfParameters.index]);
            console.log("passing through first check, indent parameter: " + objectOfParameters.indentParam);
            objectOfParameters.index++;
			paragraphGeneratorRecursion(objectOfParameters, bibleBookObjectChapters);

		} else if (typeof(bibleBookObjectChapters[objectOfParameters.index]) === "object" && bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('p') === false && bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('m') === false && bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('verseText') === false) {

			generatePericopes(objectOfParameters, bibleBookObjectChapters[objectOfParameters.index]);
			objectOfParameters.indentParam = undefined;
			objectOfParameters.index++;
            console.log("passing through second check" + objectOfParameters.containerContent);
			paragraphGeneratorRecursion(objectOfParameters, bibleBookObjectChapters);

		} else if (bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('p')) {

			objectOfParameters.indentParam = 'p';
			objectOfParameters.index++;
            console.log("passing through third check" + objectOfParameters.containerContent);
			paragraphGeneratorRecursion(objectOfParameters, bibleBookObjectChapters);

		} else if (bibleBookObjectChapters[objectOfParameters.index].hasOwnProperty('m')) {

			objectOfParameters.indentParam = 'm';
			objectOfParameters.index++;
            console.log("passing through fourth check" + objectOfParameters.containerContent + "with index value of" + objectOfParameters.index);
			paragraphGeneratorRecursion(objectOfParameters, bibleBookObjectChapters);
		}
    }
}
function generateParagraphSwitchCase(objectOfParameters, bibleBookObjectChapters) {
    // Cases here only works for first paragraphs
	switch (objectOfParameters.indentParam) {
		case 'p':
			return objectOfParameters.containerContent = generateNewParagraph(objectOfParameters, bibleBookObjectChapters);
		case 'm':
			return (bibleBookObjectChapters.length > 1 ?
                objectOfParameters.containerContent = generateContinuedParagraphPlus(objectOfParameters, bibleBookObjectChapters) :
                objectOfParameters.containerContent = generateContinuedParagraph(objectOfParameters, bibleBookObjectChapters));
		case undefined:
			return (bibleBookObjectChapters.length > 1 ?
                objectOfParameters.containerContent = generatePartsOfParagraphPlus(objectOfParameters, bibleBookObjectChapters) :
                objectOfParameters.containerContent = generatePartsOfParagraph(objectOfParameters, bibleBookObjectChapters));
	}
}

function generatePericopes(objectOfParameters, bibleBookObjectChapters) {
    var pericopeType = Object.keys(bibleBookObjectChapters);
    if (/ms/.test(pericopeType)) {
        return objectOfParameters.containerContent.concat(`<h2>${bibleBookObjectChapters[0].pericopeType[0]}</h2>`);
    } else if (/s/.test(pericopeType)) {
        return objectOfParameters.containerContent.concat(`<h3>${bibleBookObjectChapters[0].pericopeType[0]}</h3>`);
    }
}

function generateNewParagraph(objectOfParameters, bibleBookObjectChapters) {
    if (bibleBookObjectChapters.contents.length > 2) {
        return generateInlineFootnote(objectOfParameters, bibleBookObjectChapters.contents);
    }
	if (objectOfParameters.containerContent === "") {
		return objectOfParameters.containerContent.concat(`<p>&emsp;<sup>${bibleBookObjectChapters.verseNumber}</sup>${bibleBookObjectChapters.contents[0]}`);
	} else {
        return objectOfParameters.containerContent.concat(`</p><p>&emsp;<sup>${bibleBookObjectChapters.verseNumber}</sup>${bibleBookObjectChapters.contents[0]}`);
    }
}
function generateInlineFootnote(objectOfParameters, bibleBookObjectChaptersContent) {
    var objectOfKeysAndIndex = {};
    objectInContentsAndItsIndex(objectOfParameters, bibleBookObjectChaptersContent, objectOfKeysAndIndex);
    bibleBookObjectChaptersContent[objectOfKeysAndIndex.footnote] = `<sup data-footnote-text:"${inlineFootnoteStringify(objectOfKeysAndIndex.footnote)}">&#x203B;</sup>`;
    return objectOfParameters.containerContent.concat(bibleBookObjectChaptersContent.toString().replaceAll(",", " ").replaceAll(/\[.*?\]/g, ""));
}
function inlineFootnoteStringify(arrayOfFootnoteMarkups) {
    var footnoteString;
    for (let i = 0; i < arrayOfFootnoteMarkups.length; i++) {
        if (arrayOfFootnoteMarkups[i].hasOwnProperty(fk)) {
            footnoteString = `<i>${arrayOfFootnoteMarkups[i].fk}</i> &#8212; `;
        } else if (arrayOfFootnoteMarkups[i].hasOwnProperty(ft)) {
            footnoteString.concat(arrayOfFootnoteMarkups[i].ft);
        }
    }
    return footnoteString;
}
function objectInContentsAndItsIndex(objectOfParameters, bibleBookObjectChaptersContents, objectOfKeysAndIndex) {
    for (var i = 0; i < bibleBookObjectChaptersContents.length; i++) {
        if (typeof(bibleBookObjectChaptersContents[i]) === "object") {
            objectOfKeysAndIndex[Object.keys(bibleBookObjectChaptersContents[i])] = i;
        }
    }
    console.log("object of keys and index: " + objectOfKeysAndIndex.footnote);
    objectInContentsAndItsIndexIndentation(objectOfParameters, objectOfKeysAndIndex);
    return objectOfKeysAndIndex, objectOfParameters.indentParam;
}
function objectInContentsAndItsIndexIndentation(objectOfParameters, objectOfKeysAndIndex) {
    if (objectOfKeysAndIndex.hasOwnProperty('p')) {
        objectOfParameters.indentParam = 'p';
    } else if (objectOfKeysAndIndex.hasOwnProperty('m')) {
        objectOfParameters.indentParam = 'm';
    } else {
        objectOfParameters.indentParam = undefined;
    }
    return objectOfParameters.indentParam;
}
// function generateNewParagraph(objectOfParameters, bibleBookObject) {
// 	if (objectOfParameters.containerContent === "") {
// 		return objectOfParameters.containerContent.concat(`<p>&emsp;<sup>${bibleBookObject.verseNumber}</sup>${bibleBookObject.content[0]}`);
// 	} else {
//         return objectOfParameters.containerContent.concat(`</p><p>&emsp;<sup>${bibleBookObject.verseNumber}</sup>${bibleBookObject.content[0]}`);
//     }
// }
function generateContinuedParagraph(objectOfParameters, bibleBookObject) {
	if (objectOfParameters.containerContent === "") {
		return objectOfParameters.containerContent.concat(`<p><sup>${bibleBookObject.verseNumber}</sup>${bibleBookObject.content[0]}`);
	} else {
        return objectOfParameters.containerContent.concat(`</p><p><sup>${bibleBookObject.verseNumber}</sup>${bibleBookObject.content[0]}`);
    }
}
function generatePartsOfParagraph(objectOfParameters, bibleBookObject) {
    return objectOfParameters.containerContent.concat(` <sup>${bibleBookObject.verseNumber}</sup>${bibleBookObject.content[0]}`);
}



// 3. FUNCTION CALLS
bibleBookPicker.addEventListener('change', (e) => {
    e.preventDefault();
    var bibleBookIndex = bibleBookPicker.value;
    stageBibleBook(stagedBibleBook, tsiAddress[bibleBookIndex]);
    setTimeout(() => { // Wait for the chosen book to be staged
        bibleChapterGenerator(stagedBibleBook);
        setTimeout(() => { // Wait for the default chapters to be staged
            var bibleChaptersIndex = bibleChapter.value;
            bibleChapterContentsGenerator(stagedBibleBook, bibleChaptersIndex, 'byParagraph');
        }, 200);
    }, 200);
});
bibleChapter.addEventListener('change', (e) => {
    e.preventDefault();
    var bibleChaptersIndex = bibleChapter.value;
    bibleChapterContentsGenerator(stagedBibleBook, bibleChaptersIndex, 'byParagraph');
});