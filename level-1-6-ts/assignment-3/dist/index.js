"use strict";
function summ(a) {
    return Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === 'undefined')
            return 2021;
        if (typeof elem.cvalue === 'string')
            return +elem.cvalue || 2021;
        if (typeof elem.cvalue === 'object')
            return summ(elem.cvalue);
        return typeof elem.cvalue === 'number' ? elem.cvalue : 2021;
    }).reduce((sum, elem) => sum + elem, 0);
}
const arg = {
    hello: { cvalue: 1 },
    world: {
        cvalue: { yay: { cvalue: "2" } }
    }
};
console.log(summ(arg));
