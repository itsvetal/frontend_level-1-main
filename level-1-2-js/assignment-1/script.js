'use strict';

/**
 * Task 1. Hide an object by CSS
 */
function hideByCss() {
    document.getElementById("square").style.display = 'none';
}

/**
 * Task 1. Hide an object by JS
 */
function hideByJs() {
    document.getElementById("square").remove();
}

/**
 * Task 1. Hide an object by CSS+JS
 */
function hideByJsAndCss() {
    document.getElementById("square").classList.add("hidden");
}

/**
 * Task 2. Hide and show an object on click
 */
function hideSquare() {
    const element = document.querySelector("#square");
    const isHidden = element.classList.contains("hidden");

    !isHidden
        ? element.classList.add("hidden")
        : element.classList.remove("hidden");
}

/**
 * Task 3. Hide and show for five objects on click
 */
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

/**
 * Task 4. Hide elements by selector
 */
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

/**
 * Task 5. Add a yellow rectangle, hide it on click and show a message on second click
 */
function showMessageForYellowSquare() {
    const element = document.getElementById("yellow_square");

    if (!element.getAttribute("data-clicked")) {
        element.setAttribute("data-clicked", '1');
        alert("Привіт");
    } else {
        document.getElementById("yellow_square").classList.add("hidden");
    }
}

/**
 * Task 6-7.
 * Hide or show an element using arguments
 * @param id id of an element
 * @param value the value for opacity
 */
function setOpacity(id, value) {
    document.getElementById(id).style.opacity = value;
}

/**
 * Task 8. Display image by the link from user input
 */
function showImageByLink() {
    const src = document.forms["task_8_form"]["task_8_input"].value;
    //Check the value from user's input
    if (!value) {
        alert("Please enter a link");
        return;
    }
    //Create HTML elements for image
    creatImg(createContainerForImg("task_8", "task_8-img_container"), src);
}

/**
 * Create container for image in the DOM
 * @param task the string with id of the parent for image container
 * @param img_container the string with class for image container
 * @returns {HTMLDivElement} div container for image with class "task_8-img_container"
 */
function createContainerForImg(task, img_container) {
    const container = document.createElement("div");
    document.getElementById(task).appendChild(container);
    container.classList.add(img_container);
    return container;
}

/**
 * Creates an HTML element img for image from argument "src"
 * @param container is the HTML div element, that is the container for image
 * @param src the string with a link of the image
 */
function creatImg(container, src) {
    const image = document.createElement("img");
    image.src = src;
    container.appendChild(image);
}

/**
 * Task 9.
 * Display image using the links written by user in the HTML text area element
 */
function showImageFromTextArea() {
    const value = document.forms["task_9_form"]["task_9_area"].value;
    const lines = value.split("\n");
    lines.forEach(line =>
        //Create container for an image and HTML img element
        creatImg(createContainerForImg("task_9", "task_9-img_container"), line)
    );
}

/**
 * Task 10.
 * Displays coordinates of the cursor in the upper right corner of the window
 * @param pageY coordinate from axis Y from the event
 * @param pageX coordinate from axis X from the event
 */
function drawCoordinates({pageY, pageX}) {
    document.getElementById("coordinates").innerHTML = `X: ${pageX} Y: ${pageY}`
}

/**
 * The function that is executed when the page is loaded
 */
function onContentLoaded() {

    //Add EventListener for mouse cursor
    document.body.addEventListener("mouseover", (event) => drawCoordinates(event));

    /*
    Task 11.
    Displays browser language in the upper right corner of the window
     */
    document.getElementById("browser_lang").innerHTML = `Browser lang: ${navigator.language.toUpperCase()}`;

    /*
    Task 12.
    Check if theuser's browser supports the geolocation.
    If the position is successfully received, the showPosition function
    is called
     */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("position").innerHTML = "Geolocation is not supported in your browser.";
    }

    //Load from local storage for task 13
    loadFromLocalStorage();

    //Load from cookies for task 13
    loadFromCookies();

    //Load from local storage for task 13
    loadFromSessionStorage();

    //Add Event listener to the document for task 14
    document.addEventListener("scroll", checkTheBottom);

    //Add Event listeners to the squares for task 15
    document.getElementById("task_15_red_square")
        .addEventListener("click", (event) => showAlert("Click from red square", event));
    document.getElementById("task_15_green_square")
        .addEventListener("click", () => showAlert("Click from green square"));

    /*
    Task 17.
    Make an input button not reload the page
     */
    const taskForm = document.getElementById("task_17_form");
    taskForm.addEventListener("submit", (event) => event.preventDefault());

    /*
    Task 18
    Hide the standart input HTML element
     */
    const input = document.getElementById("nice_input");
    input.style.display = "none";

    /*
    Add event listener on change. When the file is changed, calls the function uploadFile()
     */
    document.getElementById("nice_input").addEventListener("change", () => {
        chooseStyle(input);
    });

    //Get HTML element of the drop zone
    const dropZone = document.getElementById("label_text");

    //Add event listener on dragover and cancel default behavior
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    /*
    Add event listener on dragenter and call function setRedBorder()
    on this event
     */
    dropZone.addEventListener("dragenter", () => {
        setRedBorder(true);
    });

    /*
    Add event listener on dragleave and call function setRedBorder()
    on this event
     */
    dropZone.addEventListener("dragleave", () => {
        setRedBorder(false);
    });

    /*
    Add event listener on drop and call function setRedBorder()
    on this event and cancel default behavior
     */
    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        setRedBorder(false);
        //Gets the files from the event
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            setStyle(true, input);
        }
    });
}

/**
 * Add listener for event "DOMContentLoaded", that execute function onContentLoaded
 * when the HTML document is loaded
 */
document.addEventListener("DOMContentLoaded", onContentLoaded);

/**
 * Task 12.
 * Displays coordinates of user's position in the upper right corner of the window
 * @param position coordinates from getCurrentPosition() method
 */
function showPosition(position) {
    document.getElementById("position")
        .innerHTML = `Latitude: ${position.coords.latitude}, Longitude:${position.coords.longitude}`;
}

/**
 *Task 13.
 * Saving user data using local storage
 * @param elementsId id of HTML element
 */
function saveToLocalStorage(elementsId) {
    const value = document.getElementById("first_input").innerHTML;
    localStorage.setItem(elementsId, value);
}

/**
 * Loading user data from local storage
 */
function loadFromLocalStorage() {
    document.getElementById("first_input").innerHTML = localStorage.getItem("first_input");
}

/**
 * Task 13.
 * Saving user data using cookies
 * @param name the HTML element's id
 */
function saveToCookies(name) {
    const value = document.getElementById("second_input").innerHTML;
    document.cookie = name + "=" + value + "; path=/";
}

/**
 * Task 13.
 * Loading user data from cookies
 */
function loadFromCookies() {
    document.getElementById("second_input").innerHTML = getCookie("second_input");
}

/**
 * Parse cookies and get the value from it
 * @param name the key to find and get cookie value
 * @returns {string} the value saved in the cookies
 */
function getCookie(name) {
    name = name + "=";
    const allCookies = document.cookie.split(';');
    const value = allCookies.find((key) => !key.trim().indexOf(name));
    if (value) {
        return value.split('=')[1];
    }
}

/**
 * Task 13.
 * Saving user data using session storage
 * @param elementsId the HTML element's id
 */
function saveToSessionStorage(elementsId) {
    const value = document.getElementById("third_input").innerHTML;
    sessionStorage.setItem(elementsId, value);
}

/**
 * Task 13.
 * Loading user data from session storage
 */
function loadFromSessionStorage() {
    document.getElementById("third_input").innerHTML = sessionStorage.getItem("third_input");
}

/**
 * Task 14.
 * Check the scroll position, and if it's at the bottom of the window,
 * create button there
 */
function checkTheBottom() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight;
    if (scrollPosition >= maxScroll - 1) {
        console.log("Bottom");
        document.removeEventListener("scroll", checkTheBottom);
        //Create the button
        createTheButton();
    }
}

/**
 * Create the button at the bottom of the window
 */
function createTheButton() {
    const button = document.createElement("button");
    const parent = document.getElementById("task_14");
    parent.appendChild(button);
    button.classList.add("button_style");
    button.setAttribute("id", "task_14_btn");
    addLink();
}

/**
 * Added a link to the button and event listener on click to the link.
 * It calls a function setScroll on click to the button
 */
function addLink() {
    const link = document.createElement("a");
    const parent = document.getElementById("task_14_btn");
    parent.appendChild(link);
    link.setAttribute("href", "#heading");
    link.addEventListener("click", () => setScroll("scroll-behavior", "smooth"));
    link.innerHTML = "Click me";
}

/**
 * Set CSS property to the scroll using arguments
 * @param property is the string with CSS property
 * @param value is the string value of CSS property
 */
function setScroll(property, value) {
    const element = document.getElementsByTagName("html")[0];
    element.style.setProperty(property, value);
}

/**
 * Task 15.
 * Displays alert for green and red square.
 * If an event is passed in the function arguments, the propaganation is stoped
 * @param message the string of the message for function alert()
 * @param event is passed by event listener
 */
function showAlert(message, event = null) {
    if (event) {
        event.stopPropagation();
    }
    alert(message);
}

/**
 * Task 16.
 * Shows the gray rectangle on the entire window and
 * blocks the scrolling on the first click.
 */
function showGreyRect() {
    const rect = createGreyRect();
    rect.addEventListener("click", removeGreyRect);
}

/**
 * Task 16.
 * Creates the gray rectangle
 * @returns {HTMLDivElement} is the HTML div element like as the gray
 * rectangle
 */
function createGreyRect() {
    const child = document.createElement("div");
    child.setAttribute("id", "grey_rect");
    document.getElementById("task_16").appendChild(child);
    setScroll("overflow", "hidden");
    return child;
}


/**
 * Task 16.
 * Hide the gray rectangle on the second click and unblock
 * the scrollling
 */
function removeGreyRect() {
    document.getElementById("grey_rect").remove();
    setScroll("overflow", "scroll");
}

/**
 * Show informtion about the files in the drop zone
 * @param input HTML element input
 */
function showInfo(input = null) {
    if (input) {
        document.getElementById("label_text").innerText = "File selected";
        document.getElementById("task_18_text").innerHTML = "The name of the file is: " +
            input.files[0].name;
    } else {
        document.getElementById("label_text").innerText = "Choose file to upload"
        document.getElementById("task_18_text").innerHTML = "No files selected";
    }
}

/**
 * Sets the style of the drop zone, depending on the "bool" argument
 * @param bool is the boolean
 * @param input HTML element input
 */
function setStyle(bool, input) {
    const container = document.getElementById("input_container");
    const label = document.getElementById("task_18_label");
    const info = document.getElementById("task_18_text");

    if (bool) {
        label.classList.add("task_18_label_selected");
        container.classList.add("input_container_selected");
        info.classList.add("task_18_text_selected");
        //Show info about the files
        showInfo(input);
        return;
    }
    label.classList.remove("task_18_label_selected");
    container.classList.remove("input_container_selected");
    info.classList.remove("task_18_text_selected");
    //Show info about the files
    showInfo();
}

/**
 * Calls the function setStyle(), depending on the argument "input",
 * if the argument is empty, the setStyle() function will be called without arguments
 * @param input HTML element input
 */
function chooseStyle(input) {
    input.files.length
        ? setStyle(true, input)
        : setStyle();
}

/**
 * Set red border for drop zone if argument is true or unset if it is false
 * @param bool is the boolean
 */
function setRedBorder(bool) {
    bool
        ? document.getElementById("input_container").classList.add("border")
        : document.getElementById("input_container").classList.remove("border");
}