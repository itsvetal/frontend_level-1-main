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

function createFieldActions(tr) {
    const th = document.createElement("th");
    th.textContent = "Дії";
    tr.appendChild(th);
}

/**
 * Creates the heading for the table and fill it using the
 * data from argument the "columns"
 * @param table is the HTML element "table"
 * @param columns is an array of objects with a number of the columns
 * and the data to fill the table heading
 */
function createTableHead(table, columns) {
    const tHead = document.createElement("thead");
    table.appendChild(tHead);
    const tr = document.createElement("tr");
    tHead.appendChild(tr);
    createFieldActions(tr);
    columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        tr.appendChild(th);
    });
}

function removeTableRow(button, config) {
   const id =  button.getAttribute("data-id");
   const request = new Request(config.apiUrl + "/" + id, {
       method: "DELETE",
   });
    console.log(request);
    // const promise = fetch(request);
    // DataTable(config);
}

function createDeleteButton(tr, id, config) {
    const td = document.createElement("td");
    tr.appendChild(td);
    const button = document.createElement("button");
    button.setAttribute("data-id", id + 1);
    button.classList.add("button_style");
    button.innerText = "Видалити";
    td.appendChild(button);
    button.addEventListener("click", () => removeTableRow(button, config));

}

/**
 * Fill the table row
 * @param element is the object with data for the table
 * @param id the number with element id
 * @param config is the data object with a number of the columns and the heading
 * of the table
 * @param tr the HTML element is the row of the table
 */
function fillTheRow(element, id, config, tr) {
    createDeleteButton(tr, id, config);
    config.columns.forEach(column => {
        //Create and add the element to the row
        const td = document.createElement("td");
        tr.appendChild(td);
        //Check the value from column.value
        if (typeof column.value === "function") {
            const value = column.value(element);
            value.startsWith("#")
                ? td.style.setProperty("background-color", value)
                : td.innerHTML = column.value(element);
        } else if (element.hasOwnProperty(column.value)) {
            td.textContent = element[column.value];
        } else {
            td.textContent = "";
        }
    });
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
    console.log(data);
    data.forEach((element, id) => {
        //Create row for user
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        //Fill the row using information from object user
        fillTheRow(element, id, config, tr);
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
    createTableHead(table, config.columns);
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
    const obj = (await promise).data;
    return Object.values(obj);
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
    if (existingTable) {
        container.removeChild(existingTable);
        console.log("Yes");
    } {
        console.log("No");
    }

    const table = createTable(container);
    !data
        ? getData(config)
            .then(data => renderTheTable(config, data, table))
            .catch((err) => alert(err))
        : renderTheTable(config, data, table);
}
