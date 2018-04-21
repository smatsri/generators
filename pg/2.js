function* func1() {
    let x = yield
    let y = yield
    return x + y
}

function* func2() {
    yield* func1();
}

const iterator = func1();



console.log(iterator.next().value);
console.log(iterator.next(1).value);
console.log(iterator.next(2).value);
//   console.log(iterator.next().value);
//   console.log(iterator.next().value);
//   console.log(iterator.next().value);
//   console.log(iterator.next().value);