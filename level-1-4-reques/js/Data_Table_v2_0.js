'use strict';

/**
 * Takes the date of the birthday in the ISO format and returns
 * the age in the format - ${years} years; ${months} months; ${days} days
 * @param birthday is the date in the ISO format
 * @returns {string} the string with an age
 */
function getAge(birthday) {
    const birthDate = new Date(birthday);
    if (!birthDate.getDate()) {
        return "Incorrect date";
    }
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (birthDate > today) {
        return "Incorrect date of the birthday, is not yet born";
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
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
 * Creates the new object FormData, parse data from it
 * and returns it
 * @param form HTML element
 * @returns {{}} an object with all keys and values from the form
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};

    //Parse FormData
    formData.forEach((value, key) => {

        //Check if the key is a "price" and if it's true, convert key's value to a number
        if (data.hasOwnProperty("price")) {
            data.price = +data["price"];
        }
        data[key] = value;
    });

    return data;
}

/**
 * Check response on errors
 * @param response the Response object with server's answer
 */
function checkData(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

/**
 * Send a request to the server, parse the response data
 * and return it
 * @param apiUrl the string with URL for request
 * @returns {Promise<unknown[]>} Promise object with parsed data
 */
async function fetchData(apiUrl) {
    try {
        const response = (await fetch(apiUrl));
        checkData(response);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Something wrong", error);
        return null;
    }
}

/**
 * Check if the property "apiUrl" in the argument config is existed and
 * returns the promise with data
 * @param config the object contains the information about
 * container for a table, table header, the number of the columns and maybe
 * the reference with data for a table
 * @returns {Promise<unknown[]|void>} is the Promise object with data from
 * a server
 */
async function getData(config) {
    return config.hasOwnProperty("apiUrl")
        ? await fetchData(config.apiUrl)
        : null;
}

/**
 * Function sends request to the server with "data-id" of the row
 * using the "method: DELETE" to remove data from the server
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
    button.setAttribute("id", `delete-btn-${config.parent}`);
    button.innerText = "Видалити";
    td.appendChild(button);

    //Add Event Listener to the button and run clickToDel function on the click
    button.addEventListener("click", () => clickToDel(button, config));
}

/**
 * Fill the table row using the data from arguments
 * @param key is the property of object to get the data for a table
 * @param data the number with element id
 * @param config is the data object with a number of the columns and the heading
 * of the table
 * @param tr the HTML element is the row of the table
 * @param flag is the boolean
 */
function fillTheRow(key, data, config, tr, flag) {

    //Get an object to fill the row
    const obj = data[key];

    //Get fields from property columns
    config.columns.forEach(column => {

        //Create and add the element to the row
        const td = document.createElement("td");
        tr.appendChild(td);

        //If a column value is a function, call this function with argument "obj"
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

    //Check if the DataTable function has second argument
    if (!flag) {
        //Create button to remove the row
        createBtnToDel(tr, key, config);
    }
}

/**
 * Creates the body of a table and fill it.
 * @param table is the HTML element, contains the future table
 * @param config is an array of objects with data about the heading of the table
 * and the number of a columns for the table
 * @param data is the object to fill the rows
 * @param flag is the boolean
 */
function createTableBody(table, config, data, flag) {

    //Create tbody for the table
    const tBody = document.createElement("tbody");
    table.appendChild(tBody);

    //Iterrate between properties
    Object.keys(data).forEach((key) => {

        //Create row for data
        const tr = document.createElement("tr");
        tBody.appendChild(tr);

        //Fill the row using information from the data
        fillTheRow(key, data, config, tr, flag);
    });
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

/**
 * Create the button "Додати" in the table's header
 * @param config is an object with data about the heading of the table
 * and the number of a columns for the table
 * @param parent HTML element "th" is the container for a button
 */
function createBtnToAdd(config, parent) {
    const button = document.createElement("button");
    parent.appendChild(button);
    button.classList.add("add_button");
    button.setAttribute("id", `add-btn-${config.parent}`);
    button.innerText = "Додати";
}

/**
 * Create the field in the table's header as the container for a button
 * @param config is an object with data about the heading of the table
 * and the number of a columns for the table
 * @param parent HTML element "tHead"
 */
function createFieldToAdd(config, parent) {
    const tr = document.createElement("tr");
    parent.appendChild(tr);
    const th = document.createElement("th");
    tr.appendChild(th);
    th.setAttribute("colspan", config.columns.length + 1);
    th.setAttribute("id", `top-th-${config.parent}`);

    //Creates the button "Додати"
    createBtnToAdd(config, th);
}

/**
 * Creates the heading for the table and fill it using the
 * data from argument the "columns"
 * @param table is the HTML element "table"
 * @param config is an array of objects with a number of the columns
 * and the data to fill the table heading
 * @param flag is the boolean
 */
function createTableHead(table, config, flag) {
    const tHead = document.createElement("thead");
    table.appendChild(tHead);
    const tr = document.createElement("tr");
    tHead.appendChild(tr);

    //Fill the head by values of "title" properties from columns
    config.columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        tr.appendChild(th);
    });

    //Check if DataTable has second argument
    if (!flag) {
        createFieldToAdd(config, tHead);
        createFieldActions(tr);
    }
}

/**
 * Create HTML element "label" for the element from argument "inputData"
 * @param obj the object contains information
 * about HTML elements, that will be created
 * @returns {HTMLLabelElement} HTML element "label"
 */
function createLabel(obj) {
    const label = document.createElement("label");
    label.setAttribute("for", obj.name);
    label.textContent = `${obj.label}:`;
    return label;
}

/**
 * Creates a drop-down "select" list with "options"
 * @param obj the object contains information
 * about HTML elements, that will be created
 * @returns {HTMLSelectElement} HTML element "select"
 */
function createSelect(obj) {
    const select = document.createElement("select");
    select.setAttribute("id", obj.name);
    select.setAttribute("name", obj.name);

    //Add HTML elements "option"
    obj.options.forEach(element => {
        const option = document.createElement("option");
        if (typeof element === "string") {
            option.setAttribute("value", element);
            option.textContent = element;
        }
        select.appendChild(option);
    });

    return select;
}

/**
 * Function returns the value for placeholder based on the type of future
 * input from config
 * @param type the string with type of the config
 * @returns {string} value for placeholder
 */
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

/**
 * Create HTML element "input" for the form using
 * information from argument
 * @param obj the object contains information
 * about HTML elements, that will be created
 * @returns {HTMLInputElement} HTMl element "input"
 */
function createInput(obj) {
    const input = document.createElement("input");
    input.setAttribute("type", obj.type);
    input.setAttribute("name", obj.name);
    input.setAttribute("id", obj.name);
    input.setAttribute("placeholder", getType(obj.type));

    /*
    Set attribute "required" if in arguments of the DataTable function
    specified "required: true"
     */
    if (obj.hasOwnProperty("required") && obj.required === true) {
        input.setAttribute("required", "");
    }

    return input;
}

/**
 * Create the child for the "form" HTML element.
 * The type of the element specified in the argument "obj"
 * @param obj is the object contains information
 * about HTML elements, that will be created
 * @param form HTML element "form"
 * @param form
 */
function addContent(obj, form) {

    //Create the label for child of the form
    form.appendChild(createLabel(obj));

    // Check the type of the HTML element from the object obj
    if (obj.type === "select") {
        form.appendChild(createSelect(obj));
    } else {
        form.appendChild(document.createElement("br"));
        form.appendChild(createInput(obj));
    }

    form.appendChild(document.createElement("br"));
}

/**
 * Add contant from the array "inputs" in the form
 * @param inputs is an array of objects contains information
 * about HTML elements, that will be created
 * @param form HTML element "form"
 */
function addContentFromArr(inputs, form) {
    inputs.forEach(obj => {

        //Create and fill an HTML element specified in the "obj"
        addContent(obj, form);
    })
}

/**
 * Create submit button for the form
 * @param form HTML element form
 */
function addSubmitBtn(form) {
    const input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Submit");
    input.setAttribute("id", "submit");
    input.classList.add("add_button");
    form.appendChild(input);
}

/**
 * Create the form for a modal window and add all elements
 * specified in the argument "config"
 * @param config is the object contains all information
 * about the table configuration
 * @returns {HTMLFormElement} form for a modal window
 */
function createForm(config) {
    const form = document.createElement("form");
    form.setAttribute("name", "table-form");
    form.setAttribute("id", "table-form");

    /*
    Itterate between columns and add to the form elements, that
    specified in the values of the properties "input"
     */
    config.columns.forEach(column => {
        column.input instanceof Array
            ? addContentFromArr(column.input, form)
            : addContent(column.input, form);
    });

    //Add submit button to the form
    addSubmitBtn(form);
    return form;
}

/**
 * Creates the button, that will be to close the modal window and
 * sets the logic of the animation, when the window will be closed
 * or opened
 * @param parent HTML element "th" is the container for modal window
 * @param config is the object contains all information
 * about the table configuration
 * @param addBtn is the button "Додати"
 * @returns {HTMLButtonElement} is the button for closing of the modal window
 */
function createCloseBtn(parent, config, addBtn) {
    const button = document.createElement("button");
    button.setAttribute("id", "close-btn");
    button.textContent = "Close";
    button.classList.add("button_style");

    //Add event listener to the close button
    button.addEventListener("click", () => {
        addBtn.classList.remove("on-add");
        const modal = document.getElementById(`modal-window-${config.parent}`);
        modal.classList.remove("open");

        //Set timeout for animation
        setTimeout(() => {
            parent.removeChild(modal);
        }, 300);
    });

    return button;
}

/**
 * Create the modal window for the form
 * @param parent HTML element "th" is the container for modal window
 * @param config is the object contains all information
 * about the table configuration
 * @param button is the button "Додати"
 */
function createModalWindow(parent, config, button) {
    //Find a modal window
    const existingModalWindow = parent.querySelector("div");

    //Check the modal window for existence
    if (!existingModalWindow) {
        const container = document.createElement("div");
        container.setAttribute("id", `modal-window-${config.parent}`);
        container.classList.add("modal-window");
        parent.appendChild(container);
        container.appendChild(createForm(config));
        button.classList.add("on-add")

        //Create the button for closing the modal window
        const closeButton = createCloseBtn(parent, config, button);
        container.appendChild(closeButton);

        //Set timeout for the opening of the modal window
        setTimeout(() => {
            container.classList.add("open");
        }, 10);
    }
}

/**
 * Function loads the data to the mock-api server
 * @param config is the object contains all information
 * about the table configuration
 * @param form the HTML element "form"
 */
function loadTheData(config, form) {

    //Parse the data from the form
    const data = getFormData(form);

    //Create a Request object to post the data to the server
    const request = new Request(config.apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });

    //Post the data to the server
    fetch(request).then(() => DataTable(config));
}

/**
 * Find in the columns the property "input"
 * @param columns an array of objects, contains columns for the table
 * @returns {*} is the boolean
 */
function inputExistence(columns) {
    return columns.some(column => column.hasOwnProperty("input"));
}

/**
 * Add event listeners to the button "додати" and to the form
 * @param config is the object contains all information
 * about the table configuration
 */
function addlistenersForToPost(config) {

    //The button "Додати"
    const addBtn = document.getElementById(`add-btn-${config.parent}`);

    //Add event listener to the button "Додати"
    addBtn.addEventListener("click", () => {
        const parent = document.getElementById(`top-th-${config.parent}`);

        if (inputExistence(config.columns)) {
            //Create a modal window with the form
            createModalWindow(parent, config, addBtn);

            //The form for user input
            const form = document.getElementById("table-form");

            //Add event listener to the form
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                //Load data to the server
                loadTheData(config, form);
            });
        } else {
            alert("There is no fields with name \"input\" in your config for adding data");
        }
    });
}

/**
 * Render the table on the HTML document
 * @param config is the object contains the information about
 * container for a table, table header, the number of the columns and maybe
 * the reference with data for a table
 * @param data is the object contains the data for the table to fill the rows
 * @param table HTML element the table
 * @param flag is the boolean
 */
function renderTheTable(config, data, table, flag) {
    createTableHead(table, config, flag);
    createTableBody(table, config, data, flag);
    if (!flag) {
        addlistenersForToPost(config);
    }
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
    data
        ? renderTheTable(config, data, table, true)
        : getData(config)
            .then(data => {
                data === null
                    ? console.log(`The property "apiUrl" not found`)
                    : renderTheTable(config, data, table, false)
            }).catch(error => console.log(error));
}
