'use strict';

/**
 * Test string in the CSV format
 * @type {string}
 */
const csv =
    `48.30,32.16,Кропивницький,200000,
    49.04,28.12,Жмеринка,37349,
    47.53,35.23,Запоріжжя,758011,
    45.11,33.28,Євпаторія,105915,
    48.56,24.53,Івано-Франківськ,218359,
    48.43,26.45,Камянець-Подільський,99610,
    44.38,34.33,Алушта,31440,
    49.46,30.17,Біла Церква,200131,
    46.29,30.44,Одеса,1029049,
    48.03,37.47,Донецьк,1016194,
    49.54,28.49,Бердичів,87575,#некоммент

    #
    46.49,36.58,#Бердянськ,121692,
    49.15,28.41,Вінниця,356665,
    50.39,26.26,Рівне,248813,
    #45.40,34.29,Джанкой,43343,
    49.07,33.35,Кременчук,234073,
    47.54,33.33,Кривий Ріг,668980,
    48.36,39.22,Луганськ,463097,
    50.49,25.26,Луцьк,208816,
    49.53,24.16,Львів,732818,
    47.07,37.40,Маріуполь,492176,
    46.53,35.25,Мелітополь,160657,,,,,
    46.58,32.12,Миколаїв,514136,
    48.26,22.45,Мукачеве,82346,
    47.37,34.30,Нікополь,136280,

    # в цьому файлі три рядки-коментаря :)`;

/**
 * Test string with the text with a city which must be replaced
 * @type {string}
 */
const test_string =
    `Відповідно до Зведеної схеми районного
     планування України, Запоріжжя займає важливе
     місце в регіональній системі розселення і виконує функції обласного,
     міжнародного і районного центрів, кожний з яких має свою зону міжселищного обслуговування. Вінниця`;


/**
 * This function takes text in CSV format and returns the function, that takes any text
 * and changes the city names in it to the string of type ""назва міста" (Х місце в ТОП-10 найбільших
 * міст України, населення УУУУУУ людина/людини/людей)"
 * @param csvText the text in CSV format
 * @returns {function(*): *|string} the function, that takes any text and changes it
 */
function getTopRank(csvText) {

    //Create an object with top-10 of the largest cities
    const cities = csvText
        .split("\n")
        .map(e => e.trim())
        .filter(e => e.at(0) !== "#" && e !== "")
        .map(e => {
            const [x, y, name, population] = e.split(",");
            return {
                x: parseFloat(x),
                y: parseFloat(y),
                name: name,
                population: parseInt(population)
            };
        })
        .sort((a, b) => (b.population - a.population))
        .slice(0, 10)
        .reduce((acc, {name, population}, idx) => {
            acc[name] = {population: population, rating: idx + 1};
            return acc;
        }, {});

    //The string to replace the city in the text
    const replaceData = (city, rating, population) =>
        `${city} (${rating} місце в ТОП-10 найбільших міст України, населення ${population} ${people(population)})`;

    //Replace the city in the text on the replaceData and return the text
    return string => Object
        .keys(cities)
        .filter(city => string.includes(city))
        .reduce((acc, city) => acc
            .replace(city, replaceData(city, cities[city]
                .rating, cities[city]
                .population)), string);
}

/**
 * Returns the word "люди" in the correct case depending on the number in the variable
 * "population"
 * @param population is the integer with the number of the people
 * @returns {string} the string with correct case
 */
function people(population) {
    const num = (population % 100).toString();
    switch (num) {
        case num >= 10 && num <= 20:
            return "людей";
        case Number(num.at(1)) === 0:
            return "людей";
        case Number(num.at(1)) === 1:
            return "людина";
        case num.at(1) > 2 && num.at(1) < 5:
            return "людини";
        default:
            return "людей";
    }
}

//Tests the function
const cities = getTopRank(csv);
const result = cities(test_string);
console.log(result);

