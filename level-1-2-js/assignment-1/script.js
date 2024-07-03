'use strict';

function hideByCss() {
    document.getElementById("square").style.display = 'none';
}

function hideByJs() {
    document.getElementById("square").remove();
}

function hideByJsAndCss() {
    document.getElementById("square").setAttribute("class", "hidden");
}

function hideSquare() {
    const element = document.querySelector("#square");
    const classHidden = document.getElementsByClassName("hidden");
    if (classHidden.length === 0) {
        element.setAttribute("class", "hidden");
    } else {
        element.removeAttribute("class");
    }
}

function hideFiveBlackSquares() {
    const numOfBlackSquares = 5;
    const elemments = document.getElementsByClassName("black_square");
    const hiddenElements = document.getElementsByClassName("hidden");
    if (hiddenElements.length < numOfBlackSquares) {
        hideElements(elemments)
    } else if (hiddenElements.length >= numOfBlackSquares) {
        showElements(elemments);
    }
}

function hideElements(elemments) {
    for (const elemment of elemments) {
        elemment.setAttribute("class", "black_square hidden");
    }
}

function showElements(elemments) {
    for (const elemment of elemments) {
        elemment.setAttribute("class", "black_square");
    }
}

function hideBySelector() {
    let value = document.forms["selectorsForm"]["selector"].value;
    const elements = document.querySelectorAll(value);
    if (elements.length === 0) {
    } else {
        for (const element of elements) {
            if (element.style.display === "none") {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        }
    }
}

function showMessageForYellowSquare() {
    alert("Привіт");
    const buttonAttributes = document.getElementById("for_yellow_square")
        .attributes;
    for (const attribute of buttonAttributes) {
        if (attribute.name === "onclick") {
            attribute.value = "hideYellowSquare()";
        }
    }
}

function hideYellowSquare() {
    document.getElementById("yellow_square").setAttribute("class", "hidden");
}

function showRedSquare() {
   const element = document.getElementById("red_square");
   element.style.opacity = "1";
}

function hideRedSquare() {
    const element = document.getElementById("red_square");
    element.style.opacity = "0";
}