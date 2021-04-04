var GLOBAL = (function() {



// DISCLAIMER: FOR NOW THE NOTATION THAT COULD BE HANDLED IS SPECIFIC
// FOR TERJEMAHAN SEDERHANA INDONESIA'S BIBLE.
// THIS JAVASCRIPT FILE CAN BE THOUGHT OF BEING GROUPED IN 5 PARTS:
// 1. NECESSARY VARIABLES/OBJECTS/ARRAYS
// 2. FUNCTIONS
// 3. FUNCTION CALLS BY EVENT LISTENERS




// 1. NECESSARY VARIABLES/OBJECTS/ARRAYS

// DOM SELECTORS
const bibleBookAndBibleChapterContainer =
        document.querySelector('#bible-book-and-chapter-picker'),
    bibleBookPicker =
        document.querySelector('#bible-book-picker'),
    bibleChapter =
        document.querySelector('#bible-chapter-picker'),
    contentsContainer =
        document.querySelector('#bible-book-contents');

// BIBLE USFM FILE ADDRESSES
const pickeringFamily35NTAddress = [
        'assets/pickeringfamily35nt_json/MAT.json',
        'assets/pickeringfamily35nt_json/MRK.json',
        'assets/pickeringfamily35nt_json/LUK.json',
        'assets/pickeringfamily35nt_json/JHN.json',
        'assets/pickeringfamily35nt_json/ACT.json',
        'assets/pickeringfamily35nt_json/ROM.json',
        'assets/pickeringfamily35nt_json/1CO.json',
        'assets/pickeringfamily35nt_json/2CO.json',
        'assets/pickeringfamily35nt_json/GAL.json',
        'assets/pickeringfamily35nt_json/EPH.json',
        'assets/pickeringfamily35nt_json/PHI.json',
        'assets/pickeringfamily35nt_json/COL.json',
        'assets/pickeringfamily35nt_json/1TH.json',
        'assets/pickeringfamily35nt_json/2TH.json',
        'assets/pickeringfamily35nt_json/1TI.json',
        'assets/pickeringfamily35nt_json/2TI.json',
        'assets/pickeringfamily35nt_json/TIT.json',
        'assets/pickeringfamily35nt_json/PHM.json',
        'assets/pickeringfamily35nt_json/HEB.json',
        'assets/pickeringfamily35nt_json/JAS.json',
        'assets/pickeringfamily35nt_json/1PE.json',
        'assets/pickeringfamily35nt_json/2PE.json',
        'assets/pickeringfamily35nt_json/1JN.json',
        'assets/pickeringfamily35nt_json/2JN.json',
        'assets/pickeringfamily35nt_json/3JN.json',
        'assets/pickeringfamily35nt_json/JUD.json',
        'assets/pickeringfamily35nt_json/REV.json'
    ],
    tsiAddress = [
        'assets/tsi_json/GEN.json',
        'assets/tsi_json/EXO.json',
        'assets/tsi_json/EST.json',
        'assets/tsi_json/ECC.json',
        'assets/tsi_json/MAT.json',
        'assets/tsi_json/MRK.json',
        'assets/tsi_json/LUK.json',
        'assets/tsi_json/JHN.json',
        'assets/tsi_json/ACT.json',
        'assets/tsi_json/ROM.json',
        'assets/tsi_json/1CO.json',
        'assets/tsi_json/2CO.json',
        'assets/tsi_json/GAL.json',
        'assets/tsi_json/EPH.json',
        'assets/tsi_json/PHI.json',
        'assets/tsi_json/COL.json',
        'assets/tsi_json/1TH.json',
        'assets/tsi_json/2TH.json',
        'assets/tsi_json/1TI.json',
        'assets/tsi_json/2TI.json',
        'assets/tsi_json/TIT.json',
        'assets/tsi_json/PHM.json',
        'assets/tsi_json/HEB.json',
        'assets/tsi_json/JAS.json',
        'assets/tsi_json/1PE.json',
        'assets/tsi_json/2PE.json',
        'assets/tsi_json/1JN.json',
        'assets/tsi_json/2JN.json',
        'assets/tsi_json/3JN.json',
        'assets/tsi_json/JUD.json',
        'assets/tsi_json/REV.json'
    ];

// EMPTY OBJECT FOR THE BIBLE WHAT WILL BE INITIALIZED
const stagedBibleBook = {};




// 2. FUNCTIONS
    // The books are staged individually per request,
    // there is no reason to load every book at once
    // because we read portion of the books one at a time.

    // The books can be loaded verse by verse or
    // paragraph by paragraph per request.
    // -> default is verse by verse.

    // The books can be shown with or without section headers per request.
    // -> default is with section headers.

    // The books can be shown with or without footnotes per request.
    // -> default is with footnotes.

// STAGE THE REQUESTED BOOK
function stageBibleBook (stagedBibleBookContainerVariable, addressArray)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', addressArray, true);
    xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Object.assign(
                    stagedBibleBookContainerVariable,
                    JSON.parse(xhr.responseText));
        }
        return stagedBibleBookContainerVariable;
    }
    xhr.send();
}


// GENERATE THE PICKER FOR CHAPTERS OF THE REQUESTED BOOK
    // In the future per-book display can be implemented
function bibleChapterGenerator (stagedBibleBookContainerVariable)
{
    bibleChapter.textContent = '';
    for (let i = 0; i < stagedBibleBookContainerVariable.chapters.length; i++)
    {
        var optionElement = document.createElement('option');
        optionElement.setAttribute('value', i);
        optionElement.textContent = i + 1;
        bibleChapter.appendChild(optionElement);
    }
}


// GENERATE THE CONTENTS FOR THE REQUESTED CHAPTER OF THE REQUESTED BOOK
function bibleChapterContentsGenerator (
    stagedBibleBookContainerVariable,
    bibleChaptersIndex,
    byVerseOrByParagraph)
{
    contentsContainer.textContent = '';
    var bibleChapterContentsObject =
        stagedBibleBookContainerVariable.chapters[bibleChaptersIndex].contents;
    if (byVerseOrByParagraph === 'byVerse')
    {
        verseByVerse (bibleChapterContentsObject, contentsContainer);
    } else if (byVerseOrByParagraph === 'byParagraph')
    {
        paragraphByParagraph (bibleChapterContentsObject, contentsContainer);
    }
}


function verseByVerse (bibleBookObjectChapters, container)
{
    for (let i = 0; i < bibleBookObjectChapters.length; i++)
    {
        if (bibleBookObjectChapters[i].verseNumber !== null &&
            bibleBookObjectChapters[i].verseText !== undefined)
        {
                var newTextContainer = document.createElement('div');
                var newSuperscript = document.createElement('sup');
                var newParagraph = document.createElement('p');

                newSuperscript.textContent =
                    bibleBookObjectChapters[i].verseNumber;
                newParagraph.textContent =
                    bibleBookObjectChapters[i].verseText;

                container.appendChild(newTextContainer);
                newTextContainer.appendChild(newSuperscript);
                newTextContainer.appendChild(newParagraph);
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


// CREATE THE WHOLE CHAPTER CONTENTS
    // Recursive function is used because
    // some parameters in a content's array
    // is only initialized in the next
    // content's array. For example: paragraph,
    // margin, and pericope headers.
function paragraphGeneratorRecursion (
    objectOfParameters,
    bibleBookObjectChapters)
{
    if (objectOfParameters.index >= bibleBookObjectChapters.length)
    {
        return objectOfParameters.containerContent.concat("</p>");
    } else
    {
        console.log(objectOfParameters);
        switch (true) 
        {
		    case bibleBookObjectChapters[objectOfParameters.index].
                hasOwnProperty('contents'):
                // Creating the paragraph contents
		    	generateParagraphSwitchCase (
                    objectOfParameters,
                    bibleBookObjectChapters[objectOfParameters.index]);
                console.log (
                    "passing through first check, content now: " +
                    objectOfParameters.containerContent);
                objectOfParameters.index++;
                console.log (
                    "|| INDEX NOW: " +
                    objectOfParameters.index);
		    	return paragraphGeneratorRecursion (
                    objectOfParameters,
                    bibleBookObjectChapters);

		    case typeof (
                bibleBookObjectChapters[objectOfParameters.index][0]) ===
                "object":
                // Creating a Pericope
		    	generatePericopes (
                    objectOfParameters,
                    bibleBookObjectChapters[objectOfParameters.index][0].s);
		    	objectOfParameters.indentParam = undefined;
		    	objectOfParameters.index++;
                console.log (
                    "passing through second check, content now: " +
                    objectOfParameters.containerContent);
		    	return paragraphGeneratorRecursion (
                    objectOfParameters,
                    bibleBookObjectChapters);

		    case bibleBookObjectChapters[objectOfParameters.index].
                hasOwnProperty('p'):
                 // Adding a paragraph definition value
                 // to be consumed in the following recursion
		    	objectOfParameters.indentParam = 'p';
		    	objectOfParameters.index++;
                console.log (
                    "passing through third check, content now: " +
                    objectOfParameters.containerContent);
		    	return paragraphGeneratorRecursion (
                    objectOfParameters,
                    bibleBookObjectChapters);

		    case bibleBookObjectChapters[objectOfParameters.index].
                hasOwnProperty('m'):
                // Idem
		    	objectOfParameters.indentParam = 'm';
		    	objectOfParameters.index++;
                console.log (
                    "passing through fourth check, content now: " +
                    objectOfParameters.containerContent);
		    	return paragraphGeneratorRecursion (
                    objectOfParameters,
                    bibleBookObjectChapters);
		}
    }
}


function generatePericopes (
    objectOfParameters,
    bibleBookObjectChaptersPericope)
{
    return objectOfParameters.containerContent =
    objectOfParameters.containerContent.
        concat (`<h2>${
            bibleBookObjectChaptersPericope[0]}<sup data-footnote-text:"${
            inlinePericopeCrossReferenceStringify (
                bibleBookObjectChaptersPericope[1]["cross-ref"])}">&#x203B;</sup></h2>`);
}


function inlinePericopeCrossReferenceStringify (
    bibleBookObjectChaptersPericopeCrossReferenceArray)
{
    let crossReferenceString = [];
    for (let i = 0; i < bibleBookObjectChaptersPericopeCrossReferenceArray.
        length; i++)
    {
        if (bibleBookObjectChaptersPericopeCrossReferenceArray[i].
            hasOwnProperty ('xo'))
        {
            crossReferenceString.push (
                bibleBookObjectChaptersPericopeCrossReferenceArray[i].
                xo);
        } else if (bibleBookObjectChaptersPericopeCrossReferenceArray[i].
            hasOwnProperty('xt'))
        {
            crossReferenceString.push (
                ` ${bibleBookObjectChaptersPericopeCrossReferenceArray[i].
                    xt}`);
        }
    }
    return String(crossReferenceString).replace(',', ' ');
}


function generateParagraphSwitchCase (
    objectOfParameters,
    bibleBookObjectChapters)
{
	switch (true)
    {
		case objectOfParameters.indentParam === 'p':
			return objectOfParameters.containerContent =
                generateNewParagraph (
                    objectOfParameters,
                    bibleBookObjectChapters);

		case objectOfParameters.indentParam === 'm':
			return (bibleBookObjectChapters.length > 1 ?
                objectOfParameters.containerContent =
                    generateContinuedParagraphPlus (
                        objectOfParameters,
                        bibleBookObjectChapters) :
                objectOfParameters.containerContent =
                generateContinuedParagraph (
                    objectOfParameters,
                    bibleBookObjectChapters));

		case objectOfParameters.indentParam === undefined:
			return (bibleBookObjectChapters.length > 1 ?
                objectOfParameters.containerContent =
                    generatePartsOfParagraphPlus (
                        objectOfParameters,
                        bibleBookObjectChapters) :
                objectOfParameters.containerContent =
                generatePartsOfParagraph (
                    objectOfParameters,
                    bibleBookObjectChapters));
	}
}


function generateNewParagraph(objectOfParameters, bibleBookObjectChapters)
{
    switch (true)
    {
    case bibleBookObjectChapters.contents.length > 2:
        return generateFootnoteOrPericopesFromInsideParagraph (
            objectOfParameters,
            bibleBookObjectChapters.contents);

	case objectOfParameters.containerContent === "" ||
        /[<.?>]$/.test(objectOfParameters.containerContent):
		return objectOfParameters.containerContent =
        objectOfParameters.containerContent.
            concat (
                `<p>&emsp;<sup>${
                    bibleBookObjectChapters.verseNumber}</sup>${
                        bibleBookObjectChapters.contents[0]}`);

	default:
        return objectOfParameters.containerContent =
        objectOfParameters.containerContent.
        concat (
            `</p><p>&emsp;<sup>${
                bibleBookObjectChapters.verseNumber}</sup>${
                    bibleBookObjectChapters.contents[0]}`);
    }
}


function generateFootnoteOrPericopesFromInsideParagraph (
    objectOfParameters,
    bibleBookObjectChaptersContent)
{
    let objectOfKeysAndIndex = {};
    objectInContentsAndItsIndex (
        objectOfParameters,
        bibleBookObjectChaptersContent,
        objectOfKeysAndIndex);

    switch (true)
    {
        case objectOfKeysAndIndex.hasOwnProperty("0"):
            return objectOfParameters.containerContent =
            objectOfParameters.containerContent.
                concat ((generatePericopes (
                    objectOfParameters,
                    bibleBookObjectChaptersContent[
                        objectOfKeysAndIndex["0"]][0].s)).
                toString().replaceAll(",", ""));

        case objectOfKeysAndIndex.hasOwnProperty("footnote,closing"):
            return objectOfParameters.containerContent =
            objectOfParameters.containerContent.
                concat ((`<sup data-footnote-text:"${
                inlineFootnoteStringify (
                bibleBookObjectChaptersContent[
                    objectOfKeysAndIndex["footnote,closing"]].
                    footnote)}">&#x203B;</sup>`).toString().replaceAll(",", ""));
    }
}


function inlineFootnoteStringify(arrayOfFootnoteMarkups)
{
    let footnoteString = "";
    for (let i = 0; i < arrayOfFootnoteMarkups.length; i++)
    {
        console.log(arrayOfFootnoteMarkups);
        switch (true)
        {
            case arrayOfFootnoteMarkups[i].hasOwnProperty("fk"):
                footnoteString = footnoteString.
                    concat (`${arrayOfFootnoteMarkups[i].fk}&#8212;`);
            case arrayOfFootnoteMarkups[i].hasOwnProperty("ft"):
                footnoteString = footnoteString.
                    concat (arrayOfFootnoteMarkups[i].ft);
        }
    }
    return footnoteString.replace('undefined', '');
}


function objectInContentsAndItsIndex (
    objectOfParameters,
    bibleBookObjectChaptersContents,
    objectOfKeysAndIndex)
{
    for (var i = 0; i < bibleBookObjectChaptersContents.length; i++)
    {
        if (typeof(bibleBookObjectChaptersContents[i]) === "object") {
            objectOfKeysAndIndex[
                Object.keys(bibleBookObjectChaptersContents[i])] = i;
        }
    }

    console.log(objectOfKeysAndIndex);

    objectInContentsAndItsIndexIndentation (
        objectOfParameters,
        objectOfKeysAndIndex);
    return objectOfKeysAndIndex, objectOfParameters.indentParam;
}


function objectInContentsAndItsIndexIndentation (
    objectOfParameters,
    objectOfKeysAndIndex)
{
    if (objectOfKeysAndIndex.hasOwnProperty('p'))
    {
        objectOfParameters.indentParam = 'p';
    } else if (objectOfKeysAndIndex.hasOwnProperty('m'))
    {
        objectOfParameters.indentParam = 'm';
    } else
    {
        objectOfParameters.indentParam = undefined;
    }
    return objectOfParameters.indentParam;
}


function generateContinuedParagraph(objectOfParameters, bibleBookObject)
{
	if (objectOfParameters.containerContent === "")
    {
		return objectOfParameters.containerContent =
        objectOfParameters.containerContent.
        concat (
            `<p><sup>${bibleBookObject.verseNumber}</sup>
            ${bibleBookObject.content[0]}`);
	} else
    {
        return objectOfParameters.containerContent =
        objectOfParameters.containerContent.
        concat (
            `</p><p><sup>${bibleBookObject.verseNumber}</sup>
            ${bibleBookObject.content[0]}`);
    }
}


function generatePartsOfParagraph(objectOfParameters, bibleBookObject)
{
    return objectOfParameters.containerContent =
    objectOfParameters.containerContent.
    concat (
        ` <sup>${bibleBookObject.verseNumber}</sup>
        ${bibleBookObject.contents[0]}`);
}




// 3. FUNCTION CALLS BY EVENT LISTENERS
bibleBookPicker.addEventListener('change', (e) =>
{
    e.preventDefault();
    var bibleBookIndex = bibleBookPicker.value;
    stageBibleBook(stagedBibleBook, tsiAddress[bibleBookIndex]);
    setTimeout(() => { // Wait for the chosen book to be staged
        bibleChapterGenerator(stagedBibleBook);
        setTimeout(() => { // Wait for the default chapters to be staged
            var bibleChaptersIndex = bibleChapter.value;
            bibleChapterContentsGenerator (
                stagedBibleBook,
                bibleChaptersIndex,
                'byParagraph');
        }, 200);
    }, 200);
});


bibleChapter.addEventListener('change', (e) =>
{
    e.preventDefault();
    var bibleChaptersIndex = bibleChapter.value;
    bibleChapterContentsGenerator (
        stagedBibleBook,
        bibleChaptersIndex,
        'byParagraph');
});



return {stagedBibleBook: stagedBibleBook};
}());