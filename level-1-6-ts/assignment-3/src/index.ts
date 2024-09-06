interface BigOject {
    [a: string]: { cvalue: number | string | undefined | BigOject } | undefined
}

function summ(a: BigOject): number {
    return Object.keys(a).map((k) => {
        const elem = a[k];
        if (!elem) return 2021;
        if ( elem.cvalue === 'string') return +elem.cvalue || 2021;
        if (typeof elem.cvalue === 'object') return summ(elem.cvalue as BigOject);
        return typeof elem.cvalue === 'number' ? elem.cvalue : 2021;
    }).reduce((sum, elem) => sum + elem, 0);
}

const arg: BigOject = {
    hello: {cvalue: 1},
    world: {
        cvalue:
            {yay: {cvalue: "2"}}
    }
}

console.log(summ(arg));