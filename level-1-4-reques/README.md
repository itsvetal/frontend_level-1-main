# Level-1-4-reque. DataTable mini library

## Description
This directory contains the mini library for creating the table.
For creating the table you must to call the function DataTable with one or two arguments:

1. The **first argument** is the object that contains information about the container id for table,
the header of the table. Can contains the field of mock-api server url with data to fill table
and the fields for user`s input

2. The **second argument** may not exist. Its contains the data to fill the server

## Types of arguments
1. Case with two arguments:

```ruby
const config = {
    parent: '#usersTable',
    columns: [
        {title: '№', value: "id"},
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};
```

```ruby
const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
    {id: 30052, name: 'Антон', surname: 'Іванов', age: 7},
    {id: 30053, name: 'Оксана', surname: 'Крисків', age: 18},
    {id: 30054, name: 'Григорій', surname: 'Ушаков', age: 35}
];
```

```ruby
DataTable(config, users);
```
> [!IMPORTANT]
> The property **parent** contains the id of container for the table in the HTML document.

2. Case with one argument:

```ruby
const config = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: (user) => getAge(user['birthday'])},
        {title: 'Фото', value: (user) => `<img src="${user['avatar']}" alt="${user.name} ${user.surname}"/>`}
    ],
    apiUrl: "https://mock-api.shpp.me/<user>/users"
};
```

```ruby
DataTable(config)
```
> [!IMPORTANT]
> The property **apiUrl** contains the url of mock api server to get the data for the table. <br>
> The logic of the functions in properities you must write yourself.


3. Case with user inputs to fill the table:

```ruby
const config3 = {
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
            value: (user) => getAge(user["birthday"]),
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
```

```ruby
DataTable(config)
```
Use **input** property to add a table fill feature.

> [!IMPORTANT]
> The logic of the functions in properities you must write yourself. <br>
> Use **input** property to add a table fill feature.


## HTML documnet content
For building the table you must bind the "Data_Table_v2_0.js" to your HTML document:
  ```
  <script src="js/Data_Table_v2_0.js"></script>
```
...and "css/style.css" for the default style of the table.
```
<link rel="stylesheet" href="css/style.css">
```
The HTML document must also contain the HTML div element with "id" attribute.
This HTML element will be a container for future table:
```
<div id="usersTable"></div>
```


<p>You must call the function DataTable(config, users).<br>
Function takes two arguments with data to fill table: <br>
1. The "config" argument must contain an object with two keys: "parent"
   and "columns". The "parent" key value contains the container ID
   for a table. The "columns" key value contains the reference to an array
   of the objects with the number of the columns for future table and its headings<br>
2. The "data" argument must contain an array of the objects with data to fill
 the rows with the table</p>

 <p>This project contains the file test.js and index.html for testing the work of the library.
 The file index.html contains container for future table. All needed files are binded.
 The file test.js contains an example how of working with a library</p>

