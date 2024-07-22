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
    lines.forEach(line =>
        creatImg(createContainerForImg("task_9", "task_9-img_container"), line)
    );
}

function drawCoordinates({pageY, pageX}) {
    document.getElementById("coordinates").innerHTML = `X: ${pageX} Y: ${pageY}`
}

function onContentLoaded() {
    document.body.addEventListener("mouseover", (event) => drawCoordinates(event));

    //Information about browser's language
    document.getElementById("browser_lang").innerHTML = `Browser lang: ${navigator.language.toUpperCase()}`;

    //User geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("position").innerHTML = "Geolocation is not supported in your browser.";
    }

    //Load from local storage
    loadFromLocalStorage();

    //Load from cookies
    loadFromCookies();

    //Load from local storage
    loadFromSessionStorage();

    //Add Event listeners to the squares for task 13
    document.getElementById("task_15_red_square")
        .addEventListener("click", (event) => showAlert("Click from red square", event));
    document.getElementById("task_15_green_square")
        .addEventListener("click", () => showAlert("Click from green square"));

    //Make an input button not reload the page
    const taskForm = document.getElementById("task_17_form");
    taskForm.addEventListener("submit", (event) => event.preventDefault());

    //Drag-n-Drop
    const input = document.getElementById("nice_input");
    input.style.display = "none";
    document.getElementById("nice_input").addEventListener("change", () => {
        uploadFile(input);
    });
    const dropZone = document.getElementById("label_text");
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    dropZone.addEventListener("dragenter", () => {
        setRedBorder(true);
    });
    dropZone.addEventListener("dragleave", () => {
        setRedBorder(false);
    });
    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        setRedBorder(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            setStyle(true, input);
        }
    });
}

document.addEventListener("DOMContentLoaded", onContentLoaded);

function showPosition(position) {
    document.getElementById("position")
        .innerHTML = `Latitude: ${position.coords.latitude}, Longitude:${position.coords.longitude}`;
}

function saveToLocalStorage(elementsId) {
    const value = document.getElementById("first_input").innerHTML;
    localStorage.setItem(elementsId, value);
}

function loadFromLocalStorage() {
    document.getElementById("first_input").innerHTML = localStorage.getItem("first_input");
}

function saveToCookies(elementsId) {
    const value = document.getElementById("second_input").innerHTML;
    setCookie(elementsId, value);
}

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}
function loadFromCookies() {
    document.getElementById("second_input").innerHTML = getCookie("second_input");
}

function getCookie(name) {
    name = name + "=";
    const allCookies = document.cookie.split(';');
    const value = allCookies.find((key) => !key.trim().indexOf(name));
    if (value) {
        return value.split('=')[1];
    }
}

function saveToSessionStorage(elementsId) {
    const value = document.getElementById("third_input").innerHTML;
    sessionStorage.setItem(elementsId, value);
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
    link.addEventListener("click", () => setScroll("scroll-behavior", "smooth"));
    link.innerHTML = "Click me";
}

function showAlert(message, event = null) {
    if (event) {
        event.stopPropagation();
    }
    alert(message);
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
    const element = document.getElementsByTagName("html")[0];
    element.style.setProperty(property, value);
}

function hideGreyrect() {
    document.getElementById("grey_rect").style.zIndex = "-1";
    setScroll("overflow", "scroll");
}

function setStyle(bool, input) {
    const container = document.getElementById("input_container");
    const label = document.getElementById("task_18_label");
    const info = document.getElementById("task_18_text");
    if (bool) {
        label.classList.add("task_18_label_selected");
        container.classList.add("input_container_selected");
        info.classList.add("task_18_text_selected");
        document.getElementById("label_text").innerText = "File selected";
        document.getElementById("task_18_text").innerHTML = "The name of the file is: " +
            input.files[0].name;
        return;
    }
    label.classList.remove("task_18_label_selected");
    container.classList.remove("input_container_selected");
    info.classList.remove("task_18_text_selected");
    document.getElementById("label_text").innerText = "Choose file to upload"
    document.getElementById("task_18_text").innerHTML = "No files selected";
}

function uploadFile(input) {
    input.files.length
        ? setStyle(true, input)
        : setStyle();
}

function setRedBorder(bool) {
    bool
    ? document.getElementById("input_container").classList.add("border")
    : document.getElementById("input_container").classList.remove("border");
}




