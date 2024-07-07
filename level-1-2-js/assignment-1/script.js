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

    creatImg(createContainerForImg("task_8", "task_8-img_container"), value);
}

function createContainerForImg(task, img_container) {
    const container = document.createElement("div");
    document.getElementById(task).appendChild(container);
    container.classList.add(img_container);
    return container;
}

function creatImg(container, src) {
    const image = document.createElement("img");
    image.src = src;
    container.appendChild(image);
}

function showImageFromTextArea() {
    const value = document.forms["task_9_form"]["task_9_area"].value;
    const lines = value.replace(/\r\n/g).split("\n");
    console.log(lines.length);
    lines.forEach(line => {
        creatImg(createContainerForImg("task_9", "task_9-img_container"), line);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    //The coordinates of the cursor
    document.body.addEventListener("mouseover", (event) => {
        document.getElementById("coordinates").innerHTML = `X: ${event.pageX} Y: ${event.pageY}`;
    });
    //Information about browser's language
    document.getElementById("browser_lang").innerHTML = `Browser lang: ${navigator.language.toUpperCase()}`;
    //Geolocation of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("position").innerHTML = "Geolocation is not supported in your browser.";
    }
    //Load from local storage
    loadFromLocalStorage()
});

function showPosition(position) {
    document.getElementById("position").innerHTML = `Latitude: ${position.coords.latitude}, Longitude:
     ${position.coords.longitude}`;
}

function loadFromLocalStorage() {
    document.getElementById("first_input").innerHTML = localStorage.getItem("input_1");
}

function saveData() {
    const value = document.getElementById("first_input").innerHTML;
    localStorage.setItem("input_1", value);
}




