// 1.

function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}

// 2.

function getUserNamings(a: {name: string, surname: string}): {fullname: string, initials: string}{
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3.

interface Container {
    products?: Products[]
}

interface Products {
    name?: string
}

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a?: Container): string[] | [] {
    return a?.products?.map(prod => prod?.name || "") || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
{
    interface Person {
        name: Function,
        cuteness?: number,
        coolness?: number
    }

    function hey(a: Person): string {
        if ((a.name).toString() !== 'undefined') {
            return "hey! i'm " + a.name();
        }
        return "";
    }

    hey({name: () => "roman", cuteness: 100})
    hey({name: () => "vasyl", coolness: 100})
}

// 4.2
{
    class Animal {
        private readonly petName: string = "";

        constructor(name: string) {
            this.petName = name
        }

        name(): string {
            return this.petName;
        }
    }

    class Cat extends Animal {

        public homless: boolean = false;

        constructor(name: string, homeless: boolean) {
            super(name);
            this.homless = homeless;
        }
    }

    class Dog extends Animal {
        private _id: number = 0;

        constructor(name: string, id: number) {
            super(name);
            this._id = id;
        }
    }

    function hey(abstractPet: Animal): string {
        return "hey! i'm " + abstractPet.name();
    }

    let a = new Cat("snizhok", true)
    let b = new Dog("sirko", 333)
    hey(a)
    hey(b)
}

// 4.3
interface Animal {
    name: Function,
    type: string,
    cuteness?: number,
    coolness?: number
}

function hey(a: Animal) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey({name: () => "snizhok", type: "cat", cuteness: 100})
hey({name: () => "sirko", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a: string[] | Record<string, unknown>): string[] {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number): Promise<string> {
    return "*".repeat(a)
}
const hello = async ():Promise<string> => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))