export const M = (pure, bind) => {

    const run = (iter) => {
        const doNext = (iter,input) =>{
            let {value, done} = iter.next(input)
            if(done) {
                return pure(value)
            }
            return bind(i=> {
                let a = doNext(iter,i)
                return a;
            }, value)
        }
        
        return doNext(iter)
    }


    return {
        Create: gen => (...args) => run(gen(...args)),
        Run: gen => run(gen())
    }
}


export const createRun = (unit, bind) => {
    const run = (iter, input) => {
        let { done, value } = iter.next(input)
        if (done) {
            return unit(value)
        }
        return bind(i => run(iter, i), value)
    }
    return run
}
