'use strict';

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
    columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        tr.appendChild(th);
    });
}

/**
 * Fill the table row
 * @param element is the object with data for the table
 * @param columns is the data object with a number of the columns and the heading
 * of the table
 * @param tr the HTML element is the row of the table
 */
function fillTheRow(element, columns, tr) {
    columns.forEach(column => {
        const td = document.createElement("td");
        tr.appendChild(td);
        /*
        Take the property value with name "value"
        from the "column" and find the property name with this value
        in the object of the "user"
         */
        element.hasOwnProperty(column.value)
            ? td.textContent = element[column.value]
            : td.textContent = "";
    });
}

/**
 * Creates the body of a table and fill it.
 * @param table is the HTML element, contains the future table
 * @param columns is an array of objects with data about the heading of the table
 * and the number of a columns for the table
 * @param data is an array of the objects to fill the rows
 */
function createTableBody(table, columns, data) {
    //Create tbody for the table
    const tBody = document.createElement("tbody");
    table.appendChild(tBody);
    //Iterrate between users
    data.forEach(element => {
        //Create row for user
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        //Fill the row using information from object user
        fillTheRow(element, columns, tr);
    });
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
function DataTable(config, data) {
    const table = config.parent
        ? createTable(getContainer(config.parent))
        : alert(`The property "parent" not found`) ;
    createTableHead(table, config.columns);
    createTableBody(table, config.columns, data);
}
