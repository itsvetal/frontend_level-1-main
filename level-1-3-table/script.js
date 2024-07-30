'use strict';

function createContainer(config) {
    const container = document.createElement("div");
    container.setAttribute("id", config.parent);
    document.body.appendChild(container);
    return container;
}

function createTable(container, data) {
    const table = document.createElement("table");
    container.appendChild(table);
    return table;

}

function fillTableHead(tr, config) {
    const tableTitile = config.columns;
    console.log(tableTitile);
}

function createTableHead(table, config) {
    const tHead = document.createElement("thead");
    table.appendChild(tHead);
    const tr = document.createElement("tr");
    tHead.appendChild(tr);
    fillTableHead(tr, config);
}

function DataTable(config, data) {
    const table = createTable(createContainer(config));
    createTableHead(table, config);
    // createTableBody(table, data);
}

const config1 = {
    parent: '#usersTable',
    columns: [
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