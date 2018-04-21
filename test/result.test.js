import { ResultM, Success, Fail, Result, run } from "../src/result"
import { expect, assert } from 'chai'

describe("Result", function () {
    describe('bind', function () {
        const CannotDivideByZero = 'cannot devide by zero'
        let divide = (x, y) => (y == 0) ? Fail(CannotDivideByZero) : Success(x / y)

        it('Success(10) / Success(5) + Success(2) == Success(4)', function () {

            let res = run(function* () {
                let x = yield Success(10)
                let y = yield Success(5)
                let div = yield divide(x, y)
                let z = yield Success(2)
                return div + z;
            })

            expect(res).to.deep.equal(Success(4))
        })

        it('Success(10) / Success(0) + Success(2) == Fail', function () {
            let result = run(function* () {
                let x = yield Success(5)
                let y = yield Success(0)
                let div = yield divide(x, y)
                let z = yield Success(2)
                return div + z;
            });
            assert.isFalse(result.success)
            expect(result.error).to.equal(CannotDivideByZero)
        })
    })

})
