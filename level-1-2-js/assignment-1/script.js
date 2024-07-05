'use strict';

function hideByCss() {
    document.getElementById("square").style.display = 'none';
}

function hideByJs() {
    document.getElementById("square").remove();
}

function hideByJsAndCss() {
    document.getElementById("square").classList.add("hidden");
}

function hideSquare() {
    const element = document.querySelector("#square");
    const isHidden = element.classList.contains("hidden");

    !isHidden
        ? element.classList.add("hidden")
        : element.classList.remove("hidden");
}

function hideFiveBlackSquares() {
    const container = document.getElementById("task_3");
    const elements = Array.from(container.getElementsByClassName("container_for_square")[0].children);
    const isHidden = elements.every((e) => e.classList.contains("hidden"));

    elements.forEach((e) =>
        isHidden
            ? e.classList.remove("hidden")
            : e.classList.add("hidden")
    )
}

function hideBySelector() {
    const form = document.getElementById("selectorsForm");
    const value = form.querySelector("#selector").value;

    if (!value) {
        alert("Please enter a selector");
        return;
    }

    const elements = document.querySelectorAll(value);

    if (!elements.length) {
        alert("No elements with given selector");
        return;
    }

    elements.forEach((e) => e.style.display = e.style.display === "none" ? "" : "none")
}

function showMessageForYellowSquare() {
    const element = document.getElementById("for_yellow_square");

    if (!element.getAttribute("data-clicked")) {
        element.setAttribute("data-clicked", '1');
        alert("Привіт");
    } else {
        document.getElementById("yellow_square").classList.add("hidden");
    }
}

function setOpacity(id, value) {
    document.getElementById(id).style.opacity = value;
}

function showImageByLink() {
    const value = document.forms["task_8_form"]["task_8_input"].value;

    if (!value) {
        alert("Please enter a link");
        return;
    }

    creatImg(createContainerForImg(), value);
}

function createContainerForImg() {
    const container = document.createElement("div");
    document.getElementById("task_8").appendChild(container);
    container.classList.add("task_8-img_container");
    return container;
}

function creatImg(container, src) {
    const image = document.createElement("img");
    image.src = src;
    container.appendChild(image);
}