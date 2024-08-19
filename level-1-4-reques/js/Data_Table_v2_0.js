'use strict';

/**
 * Takes the date of the birthday in the ISO format and returns
 * the age in the format - ${years} years; ${months} months; ${days} days
 * @param birthday is the date in the ISO format
 * @returns {string} the string with an age
 */
function getAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0) {
        years--;
        months += 12;
    } else if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    return `${years} years; ${months} months; ${days} days`;
}

/**
 * Returns string with color in the HEX format
 * @param color is the string with value of color from config
 * @returns {*} is the string contains the color in the HEX format
 */
function getColorLabel(color) {
    return color;
}

/**
 * Returns the container for future table from the DOM
 * @param containerID is the string with ID of the HTML element
 * from the DOM
 * @returns {HTMLElement} HTML element from the DOM
 */
function getContainer(containerID) {
    return document.getElementById(containerID.replace("#", ""));
}

/**
 * Creates the HTML lement "table" and add it to the container
 * @param container HTML element is the container for a table
 * @returns {HTMLTableElement} HTML element the "table"
 */
function createTable(container) {
    const table = document.createElement("table");
    container.appendChild(table);
    return table;
}

/**
 * Create column "Дії"
 * @param tr is the HTML element, the row of the table
 */
function createFieldActions(tr) {
    const th = document.createElement("th");
    th.textContent = "Дії";
    tr.appendChild(th);
}

function addContentFromArr(inputs, form) {
    inputs.forEach(input => {
        addContent(input, form);
    })
}

function createLabel(inputData) {
    const label = document.createElement("label");
    label.setAttribute("for", inputData.name);
    label.textContent = `${inputData.label}:`;
    return label;
}

function getType(type) {
    switch (type) {
        case "text":
            return "Text";
        case "number":
            return "Number";
        case "url":
            return "URL";
        default:
            return "Text";
    }
}

function createInput(inputData) {
    const input = document.createElement("input");
    input.setAttribute("type", inputData.type);
    input.setAttribute("name", inputData.name);
    input.setAttribute("id", inputData.name);
    input.setAttribute("placeholder", getType(inputData.type));

    if (inputData.hasOwnProperty("required")) {
        input.setAttribute("required", "");
    }

    return input;
}

function createSelect(input) {
    const select = document.createElement("select");
    select.setAttribute("id", input.name);
    select.setAttribute("name", input.name);

    input.options.forEach(element => {
        const option = document.createElement("option");
        if (typeof element === "string") {
            option.setAttribute("value", element);
            option.textContent = element;
        }
        select.appendChild(option);
    });

    return select;
}

function addContent(input, form) {
    form.appendChild(createLabel(input));

    if (input.type === "select") {
        form.appendChild(createSelect(input));
    } else {
        form.appendChild(document.createElement("br"));
        form.appendChild(createInput(input));
    }

    form.appendChild(document.createElement("br"));
}

function AddSubmitBtn(form) {
    const input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Submit");
    input.setAttribute("id", "submit");
    input.classList.add("add_button");
    form.appendChild(input);
    return input;
}

function loadTheData(config, form) {
    const formData = new FormData(form);
    const data = {};
   formData.forEach((value, key) => {

   })
}

function createForm(config) {
    const form = document.createElement("form");
    config.columns.forEach(column => {
        column.input instanceof Array
            ? addContentFromArr(column.input, form)
            : addContent(column.input, form);
    });
    AddSubmitBtn(form);
    form.addEventListener("submit",(event) => {
        event.preventDefault();
        loadTheData(config, form);
    });
    return form;
}

function createCloseBtn(parent) {
    const button = document.createElement("button");
    button.setAttribute("id", "close-btn");
    button.textContent = "Close";
    button.classList.add("button_style");
    button.addEventListener("click", () =>
        parent.removeChild(document.getElementById("modal-window")));
    return button;
}

function createModalWindow(parent, config) {
    const existingModalWindow = parent.querySelector("#modal-window");
    if (!existingModalWindow) {
        const container = document.createElement("div");
        container.setAttribute("id", "modal-window");
        parent.appendChild(container);
        container.appendChild(createForm(config));
        const closeButton = createCloseBtn(parent);
        container.appendChild(closeButton);
    }
}

function createBtnToAdd(config, th) {
    const button = document.createElement("button");
    th.appendChild(button);
    button.classList.add("add_button");
    button.innerText = "Додати";
    button.addEventListener("click", () => createModalWindow(th,config));
}

function createFieldToAdd(config, tHead) {
    const tr = document.createElement("tr");
    tHead.appendChild(tr);
    const th = document.createElement("th");
    tr.appendChild(th);
    th.setAttribute("colspan", config.columns.length + 1);
    th.classList.add("top_th");
    createBtnToAdd(config, th);
}

/**
 * Creates the heading for the table and fill it using the
 * data from argument the "columns"
 * @param table is the HTML element "table"
 * @param config is an array of objects with a number of the columns
 * and the data to fill the table heading
 */
function createTableHead(table, config) {
    const tHead = document.createElement("thead");
    table.appendChild(tHead);
    createFieldToAdd(config, tHead);
    const tr = document.createElement("tr");
    tHead.appendChild(tr);

    config.columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        tr.appendChild(th);
    });
    createFieldActions(tr);
}

/**
 * Function sends request to the server with "data-id" of the row
 * and using the "method: DELETE" to remove data from the server
 * and render the table again
 * @param button is the HTML element
 * @param config the object with parameters for the table
 */
function clickToDel(button, config) {
    const id = button.getAttribute("data-id");
    const request = new Request(config.apiUrl + "/" + id, {
        method: "DELETE",
    });
    fetch(request).then(() => DataTable(config));
}

/**
 * Create the button that will remove the row from the table
 * @param tr is the HTML element <tr>, the row of the table
 * @param id is the key to remove the row from the server
 * @param config the object with parameters for the table
 */
function createBtnToDel(tr, id, config) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const button = document.createElement("button");
    button.setAttribute("data-id", id);
    button.classList.add("button_style");
    button.innerText = "Видалити";
    td.appendChild(button);
    //Add Event listener to delete the row by click
    button.addEventListener("click", () => clickToDel(button, config));

}

/**
 * Fill the table row
 * @param key is the object with data for the table
 * @param data the number with element id
 * @param config is the data object with a number of the columns and the heading
 * of the table
 * @param tr the HTML element is the row of the table
 */
function fillTheRow(key, data, config, tr) {
    const obj = data[key];

    config.columns.forEach(column => {
        //Create and add the element to the row
        const td = document.createElement("td");
        tr.appendChild(td);
        //Check the value from column.value
        if (typeof column.value === "function") {
            const value = column.value(obj);
            value.startsWith("#")
                ? td.style.setProperty("background-color", value)
                : td.innerHTML = value;
        } else if (obj.hasOwnProperty(column.value)) {
            td.innerText = obj[column.value];
        } else {
            td.innerText = "";
        }
    });
    //Create button to remove the row
    createBtnToDel(tr, key, config);
}

/**
 * Creates the body of a table and fill it.
 * @param table is the HTML element, contains the future table
 * @param config is an array of objects with data about the heading of the table
 * and the number of a columns for the table
 * @param data is an array of the objects to fill the rows
 */
function createTableBody(table, config, data) {
    //Create tbody for the table
    const tBody = document.createElement("tbody");
    table.appendChild(tBody);
    //Iterrate between users
    Object.keys(data).forEach((key) => {
        //Create row for user
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        //Fill the row using information from object user
        fillTheRow(key, data, config, tr);
    });
}

/**
 * Render the table on the HTML document
 * @param config is the object contains the information about
 * container for a table, table header, the number of the columns and maybe
 * the reference with data for a table
 * @param data is the object contains the data for the table to fill the rows
 * @param table HTML element the table
 */
function renderTheTable(config, data, table) {
    createTableHead(table, config);
    createTableBody(table, config, data);
}

/**
 * Send a request to the server, parse the response data
 * and return it
 * @param apiUrl the string with URL for request
 * @returns {Promise<unknown[]>} Promise object with parsed data
 */
async function fetchData(apiUrl) {
    const promise = (await fetch(apiUrl)).json();
    return (await promise).data;
}

/**
 * Find the property "apiUrl" in the argument config and
 * returns the promise with data
 * @param config is the object contains the information about
 * container for a table, table header, the number of the columns and maybe
 * the reference with data for a table
 * @returns {Promise<unknown[]|void>} is the Promise object with data
 */
async function getData(config) {
    return config.hasOwnProperty("apiUrl")
        ? await fetchData(config.apiUrl)
        : alert(`The property "apiUrl" not found`);
}

/**
 * Creates the table based on the data from incoming the arguments.
 * The HTML document must contain the container for the table.
 * Its ID must coincide with the "parent" key value from argument
 * the "config"
 * @param config is the object, that contains the data about the number of
 * a columns for future table and headind of the table
 * @param data is an array of the objects, contains data to fill the rows for
 * the future table
 */
function DataTable(config, data = null) {
    //Get container for table if it exists
    const container = config.parent
        ? getContainer(config.parent)
        : alert(`The property "parent" not found`);
    //Find an HTML element with tag <table>
    const existingTable = container.querySelector("table");
    //Check the existing of the table
    if (existingTable) {
        container.removeChild(existingTable);
    }
    const table = createTable(container);
    //Check the second argument of the DataTable function
    !data
        ? getData(config)
            .then(data => renderTheTable(config, data, table))
        : renderTheTable(config, data, table);
}
