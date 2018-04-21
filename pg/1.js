const ld = require('lodash/fp')

const { curry, compose } = ld


const immutagen = genFun => {
    const nextFor = history => input => {
        const
            newHist = history.concat([input]),
            gen = genFun(newHist[0]),
            { value, done } = newHist.map(x => gen.next(x))[history.length]

        return {
            value,
            next: done ? undefined : nextFor(newHist),
            mutable: gen
        }
    }
    return nextFor([])
}

// copied from https://github.com/pelotom/burrido#readme
const M = (pure, bind) => {
    const doNext = next => input => {
        const { value, next: nextNext } = next(input)

        if (!nextNext)
            return pure(value)

        return bind(doNext(nextNext), value)
    }

    return {

        Do(genFactory, ...args) {
            genFactory['gen'] = genFactory['gen'] || doNext(immutagen(genFactory))
            return genFactory['gen'](...args)
        },
        Create(genFactory) {
            return doNext(immutagen(genFactory))
        }
    }
}

createRun = (pure, bind, genFactory) => {
    const doNext = next => input => {
        const { value, next: nextNext } = next(input)

        if (!nextNext)
            return pure(value)

        return bind(doNext(nextNext), value)
    }

    const run = doNext(immutagen(genFactory))
    return (...args) => run(...args)
}


unit = ID = value => ({ value })
bind = curry((fn, id) => {
    return fn(id.value)
})
map = curry((fn, id) => bind(compose(unit, fn), id))

id1 = ID(1)
id2 = ID(2)

id3 = map(x => x * 10, id1)


addIds = function* (a, b) {
    let x = yield ID(a)
    let y = yield ID(b)

    return x + y;
}

console.log(M(unit, bind).Do(addIds,1,2))

// run = createRun(unit,bind,addIds)
// x =  run(1,2)
// console.log(x)

