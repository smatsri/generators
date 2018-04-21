import { expect } from "chai";
import { PromiseM, resolve } from "../src/promise";

describe('PromiseM', function () {
    describe('bind', function () {
        it('Promise(1) + Promise(2) = Promise(3)', function (done) {
            let presultP = PromiseM.Run(function* () {
                let x = yield resolve(1)
                let y = yield resolve(2)
                return x + y
            })

            presultP.then(result => {
                expect(result).to.be.equal(3)
                
                done()
            })
        })
    })
})