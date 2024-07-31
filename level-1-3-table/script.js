'use strict';

function createContainer(config) {
    const container = document.createElement("div");
    container.setAttribute("id", config.parent);
    document.body.appendChild(container);
    return container;
}

function createTable(container) {
    const table = document.createElement("table");
    container.appendChild(table);
    return table;

}

function createTableHead(table, config) {
    const tHead = document.createElement("thead");
    table.appendChild(tHead);
    const tr = document.createElement("tr");
    tHead.appendChild(tr);
    config.columns.forEach(element => {
        const col = document.createElement("th");
        col.textContent = element.title;
        tr.appendChild(col);
    });
}

function fillTheRow(user, columns, tr) {
    columns.forEach((column) => {
        const td = document.createElement("td");
        tr.appendChild(td);
        /*
        Take the property value with name "value"
        from the "column" and find the property name with this value
        in the object of the "user"
         */
        user.hasOwnProperty(column.value)
            ? td.textContent = user[column.value]
            : td.textContent = "";
    });
}

function createTableBody(table, columns, users) {
    //Create tbody for the table
    const tBody = document.createElement("tbody");
    table.appendChild(tBody);
    //Iterrate between users
    users.forEach((user) => {
        //Create row for user
        const tr = document.createElement("tr");
        tBody.appendChild(tr);
        //Fill the row using information from object user
        fillTheRow(user, columns, tr);
    });
}

function DataTable(config, data) {
    const table = config.parent
        ? createTable(createContainer(config))
        : alert(`The property "parent" not found`) ;
    // const table = createTable(createContainer(config));
    createTableHead(table, config);
    createTableBody(table, config.columns, data);
}

const config1 = {
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
];

DataTable(config1, users);