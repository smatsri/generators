
log = (title = "") => o => console.log(title, o)


function* infinity() {
    var index = 0;
    while (true)
        yield index++;
}

unit = v => new Promise(res => res(v))

defer = () => {
    let resolve
    let promise = new Promise(res => resolve = res)

    return { resolve, promise }
}

combine = (...arr) => {
    let d = defer()
    let res = new Array(arr.length)
    let ctr = 0
    const set = i => v => {
        res[i] = v
        ctr++
        if (ctr == arr.length) {
            d.resolve(res)
        }
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i].then(set(i))

    }

    return d.promise
}

//combine(unit(1), unit(2), unit(3)).then(log("[1,2,3]"))

run = (iter, val = null, done = defer()) => {
    const next = iter.next(val)
    if (!next.done) {
        next.value.then(result => run(iter, result, done))
    } else {
        done.resolve(next.value)
    }

    return done.promise
}

asyncAdd = function* (pX, pY) {
    let x = yield pX
    let y = yield pY
    return x + y;
}


asyncAddAndDouble = function* (pX, pY) {
    let x = yield run(asyncAdd(pX, pY))
    return x * x
}

//run(asyncAddAndDouble(unit(1),unit(2))).then(log("(1 + 2) ^ 2 ="))

cycle = function* (size = 3, i = 0) {
    while (true) {
        yield (i++ % size)
    }
}

take = function* (count, iter) {
    let ctr = 0
    for (const o of iter) {
        yield o
        ctr++
        if (ctr == count) break;
    }
}

skip = function* (count, iter) {
    let ctr = 0
    for (const o of iter) {
        if (ctr >= count)
            yield o
        ctr++
    }
}


iter = (action, iter) => {
    for (const x of iter) {
        action(x)
    }
}

//iter(log(), take(4, skip(2, cycle())))


Maybe = (isSome, value) => ({ isSome, value })

Some = (value) => Maybe(true, value)
None = Maybe()

bind = f => m => m.isSome ? f(m.value) : None
map = f => bind(v => Some(f(v)))

add2 = map(x => x + 2)
res = add2(Some(1))

runMaybe = (iter) => {
    //let iter = iterator()
    let next = iter.next()
    while (!next.done) {
        if (next.value.isSome) {
            next = iter.next(next.value.value)
        } else {
            break
        }
    }
    return next.value == None ? None : Some(next.value)
}


addMaybe = function* (mX, mY) {
    let x = yield mX
    let y = yield mY

    return x + y
}

r = runMaybe(addMaybe(Some(1), Some(2)))

console.log(r)



