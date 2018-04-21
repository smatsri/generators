
// copied from https://github.com/pelotom/immutagen#readme
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
export const Monad = (o) => {
    const { pure, bind } = o
    const doNext = next => input => {
        const { value, next: nextNext } = next(input)

        if (!nextNext)
            return pure(value)

        return bind(value, doNext(nextNext))
    }

    return {
        ...o,
        Do(genFactory, ...args) {
            genFactory['gen'] = genFactory['gen'] || doNext(immutagen(genFactory))
            return genFactory['gen'](...args)
        },
        Create(genFactory) {
            return doNext(immutagen(genFactory))
        }
    }
}


const log = (...args) => console.log(...args)

export const ArrayMonad = Monad({
    pure: x => [x],
    bind: (xs, f) => xs.map(f).reduce((a, b) => a.concat(b), [])
})



log(ArrayMonad.Do(function* () {
    const x = yield [1, 2, 3]
    const y = yield [3, 4]
    return x + y
}))

const Maybe = (isSome, value) => ({ isSome, value })

export const Some = (value) => Maybe(true, value)
const None = Maybe()

export const MaybeM = Monad({
    pure: Some,
    bind: (m, f) => m.isSome ? f(m.value) : None
})

log("Some(2) + Some(1) = Some(3)", MaybeM.Do(function* () {
    const y = yield Some(2)
    const x = yield Some(1)
    return x + y
}))

function prop(o, key) {
    let value = o[key]
    return value ? Some(value) : None;
}


const getFullName = MaybeM.Create(function* (o) {
    let firstName = yield prop(o, 'firstName')
    let lastName = yield prop(o, 'lastName')
    return firstName + ' ' + lastName
})

const person = {
    firstName: 'shai',
    lastName: 'm'
}

const person2 = {
    firstName: 'shai',
    _lastName: 'm'
}

let fullNameM = getFullName(person)
fullNameM = getFullName(person2)

const resolve = value => new Promise(res => res(value))

const PromiseM = Monad({
    pure: resolve,
    bind: (m, f) => m.then(value => f(value))
})

PromiseM.Do(function* () {
    let x = yield resolve(1)
    let y = yield resolve(2)
    return x + y
}).then(r => log(`promise(1) + promise(2) = promise(${r})`))


