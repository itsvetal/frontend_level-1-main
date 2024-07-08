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
    //User geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("position").innerHTML = "Geolocation is not supported in your browser.";
    }
    //Load from local storage
    loadFromLocalStorage()
    //Load from cookies
    loadFromCookies();
    //Load from local storage
    loadFromSessionStorage()
    //Add Event listeners to the squares for task 13
    document.getElementById("task_15_red_square").addEventListener("click", redSquareAlert);
    document.getElementById("task_15_green_square").addEventListener("click", greenSquareAlert);
    //Make an input button not reload the page
    const taskForm = document.getElementById("task_17_form");
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
    })
});

function showPosition(position) {
    document.getElementById("position").innerHTML = `Latitude: ${position.coords.latitude}, Longitude:
     ${position.coords.longitude}`;
}

function saveToLocalStorage(elementsId) {
    const name = elementsId;
    const value = document.getElementById("first_input").innerHTML;
    localStorage.setItem(name, value);
}

function loadFromLocalStorage() {
    document.getElementById("first_input").innerHTML = localStorage.getItem("first_input");
}

function saveToCookies(elementsId) {
    const cname = elementsId;
    const cvalue = document.getElementById("second_input").innerHTML;
    setCookie(cname, cvalue);
}

function setCookie(cname, value) {
    document.cookie = cname + "=" + value + "; path=/";
}

function loadFromCookies() {
    document.getElementById("second_input").innerHTML = getCookie("second_input");
}

function getCookie(cname) {
    cname = cname + "=";
    const allCookies = document.cookie.split(';');
    for (let key of allCookies) {
        key = key.trim();
        if (key.indexOf(cname) === 0) {
            return key.substring(cname.length);
        }
    }
}

function saveToSessionStorage(elementsId) {
    const name = elementsId;
    const value = document.getElementById("third_input").innerHTML;
    sessionStorage.setItem(name, value);
}

function loadFromSessionStorage() {
    document.getElementById("third_input").innerHTML = sessionStorage.getItem("third_input");
}

function checkTheBottom() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight;
    if (scrollPosition >= maxScroll - 1) {
        document.body.removeAttribute("onscroll")
        createTheButton();
    }
}

function createTheButton() {
    const button = document.createElement("button");
    const parent = document.getElementById("task_14");
    parent.appendChild(button);
    button.classList.add("button_style");
    button.setAttribute("id", "task_14_btn");
    addLink();
}

function addLink() {
    const link = document.createElement("a");
    const parent = document.getElementById("task_14_btn");
    parent.appendChild(link);
    link.setAttribute("href", "#heading");
    link.addEventListener("click", function () {
        setScroll("scroll-behavior", "smooth");
    });
    link.innerHTML = "Click me";
}

function redSquareAlert(event) {
        event.stopPropagation();
        alert("Click from red square");
}

function greenSquareAlert() {
    alert("Click from green square");
}

function createGreyRect() {
    const rect = document.createElement("div");
    rect.setAttribute("id", "grey_rect");
    rect.addEventListener("click", hideGreyrect);
    const parent = document.getElementById("task_16");
    parent.appendChild(rect);
    setScroll("overflow", "clip");
}

function setScroll(property, value) {
    const htmlList = document.getElementsByTagName("html");
    const element = htmlList[0];
    element.style.setProperty(property, value);
}

function hideGreyrect() {
    const element = document.getElementById("grey_rect");
    element.style.zIndex = "-1";
    setScroll("overflow", "scroll");
}


