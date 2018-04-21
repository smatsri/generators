
export const M = (pure, bind) => {
    const run = (iter) => {
        const doNext = (iter, input) => {
            let { value, done } = iter.next(input)
            if (done) {
                return pure(value)
            }
            return bind(i => doNext(iter, i), value)
        }
    
        return doNext(iter)
    }

    return {
        Create: gen => (...args) => run(gen(...args)),
        Run: gen => run(gen())
    }
}