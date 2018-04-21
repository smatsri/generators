import { None, Some, MaybeM } from "../../src/maybe";

let { Create: create, Run: run } = MaybeM

describe('pg1', () => {
    it('', () =>{
        run(function* () {
            let x = yield Some(1)
            let y = yield Some(2)
            console.log(x + y)
        })
    })
})