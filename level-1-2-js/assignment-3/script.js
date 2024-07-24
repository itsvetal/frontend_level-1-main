'use strict';

// let str = "How are you"
//     .toLowerCase()
//     .split("")
//     .filter(element => /[a-z]/.test(element))
//     .map(element => element.charCodeAt(0))
//     .reduce((acum, element) => {
//         acum[element] = (acum[element] || 0) + 1;
//         return acum;
//     }, [])
//     .slice("a".charCodeAt())
//     .map((value, idx) => ({value, idx, letter: String.fromCharCode(idx + 97)}))
//     .sort((a, b) => (b.value || 0) - (a.value || 0))
//     .filter(value => value !== undefined)
//     .map(({value, letter}) => `${letter} - ${value}`)
//     .join("\n");
//
// console.log(str);


function parseCsv(csvText) {
    const csvObj = csvText
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
    console.log(csvObj);
    return (string) => {
       const cityIndexes = findIndexes(string, csvObj);
       return cityIndexes.length > 0 ? "Yes" : "Місто не входить до топ 10 по населенню"

    }
}

function findIndexes(string, csvObj) {
    return Object.keys(csvObj).reduce((acc, element, idx) => {
        if (string.indexOf(element) !== -1) {
            acc = {
                indexInString: string.indexOf(element),
                indexInCities: idx
            };
        }
        return acc;
    }, {});
}

let csv =
    `48.30,32.16,Кропивницький,200000,
    49.04,28.12,Жмеринка,37349,
    47.53,35.23,Запоріжжя,815256,
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

let test_string =
    `Відповідно до Зведеної схеми районного
     планування України, Покровськ займає важливе
     місце в регіональній системі розселення і виконує функції обласного,
     міжнародного і районного центрів, кожний з яких має свою зону міжселищного обслуговування.`;

let parse = parseCsv(csv)
let result = parse(test_string);
console.log(result);

