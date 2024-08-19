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
        {
            title: 'Ім’я',
            value: 'name',
            input: {type: 'text', name: 'name', label: 'Ім’я', required: true}
        },
        {
            title: 'Прізвище',
            value: 'surname',
            input: {type: 'text', name: 'surname', label: 'Прізвище', required: true}
        },
        {
            title: 'Вік',
            value: (user) => getAge(user["birthday"]), // функцію getAge вам потрібно створити
            input: {type: 'datetime-local', name: 'birthday', label: 'День народження', required: true}
        },
        {
            title: 'Фото',
            value: (user) => `<img src="${user["avatar"]}" alt="${user.name} ${user.surname}"/>`,
            input: {type: 'url', name: 'avatar', label: 'Фото', required: true}
        }
    ],
    apiUrl: "https://mock-api.shpp.me/vkryskiv/users"
};

const config2 = {
    parent: '#productsTable',
    columns: [
        {
            title: 'Назва',
            value: 'title',
            input: {type: 'text', name: 'title', label: 'Назва', required: true}
        },
        {
            title: 'Ціна',
            value: (product) => `${product["price"]} ${product.currency}`,
            input: [
                {type: 'number', name: 'price', label: 'Ціна', required: true},
                {
                    type: 'select', name: 'currency', label: 'Валюта', options: ['$', '€', '₴'],
                    required: true,
                }
            ]
        },
        {
            title: 'Колір',
            value: (product) => getColorLabel(product.color),
            input: {type: 'color', name: 'color', label: 'Колір', required: true}
        },
    ],
    apiUrl: "https://mock-api.shpp.me/vkryskiv/products"
};

// DataTable(config, users);
 DataTable(config1);
DataTable(config2);