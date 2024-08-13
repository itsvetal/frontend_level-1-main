'use strict';

const config = {
    parent: '#usersTable',
    columns: [
        {title: '№', value: "id"},
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
    {id: 30052, name: 'Антон', surname: 'Іванов', age: 7},
    {id: 30053, name: 'Оксана', surname: 'Крисків', age: 18},
    {id: 30054, name: 'Григорій', surname: 'Ушаков', age: 35}
];

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: (user) => getAge(user.birthday)}, // функцію getAge вам потрібно створити
        {title: 'Фото', value: (user) => `<img src="${user.avatar}" alt="${user.name} ${user.surname}"/>`}
    ],
    apiUrl: "https://mock-api.shpp.me/vkryskiv/users"
};

DataTable1(config1);

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
    console.log(data);
    data.forEach(element => {
        //Create row for user
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        //Fill the row using information from object user
        fillTheRow(element, columns, tr);
    });
}

async function parseData(promise) {
    const obj = (await promise).data;
    return Object.values(obj);
}

async function getData(apiUrl) {
   const promise =  (await fetch(apiUrl)).json();
   return await parseData(promise);
}

async function findData(config) {
   return config.hasOwnProperty("apiUrl")
        ? await getData(config["apiUrl"])
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
function DataTable1(config, data = null) {
    const table = config.parent
        ? createTable(getContainer(config.parent))
        : alert(`The property "parent" not found`);

    if (!data) {
        findData(config).then(data => {
            createTableHead(table, config.columns);
            createTableBody(table, config.columns, data);
        });
        console.log(data);
    }
}
