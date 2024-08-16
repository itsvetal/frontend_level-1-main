'use strict'

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

const config2 = {
    parent: '#productsTable',
    columns: [
        {title: 'Назва', value: 'title'},
        {title: 'Ціна', value: (product) => `${product.price} ${product.currency}`},
        {title: 'Колір', value: (product) => getColorLabel(product.color)}, // функцію getColorLabel вам потрібно створити
    ],
    apiUrl: "https://mock-api.shpp.me/vkryskiv/products"
};

// DataTable(config, users);
// DataTable(config1);
DataTable(config2);