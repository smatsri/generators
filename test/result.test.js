import { ResultM, Success, Fail, Result } from "../src/result"
import { expect, assert } from 'chai'

describe("Result", function () {
    describe('bind', function () {
        let divide = (x, y) =>{
            return (y == 0) ? Fail('cannot devide by zero') : Success(x / y);
        }
           


        it('Success(10) / Success(5) + Success(2) == Success(4)', function () {
            
            let res = ResultM.Run(function* () {
                const x = yield Success(10)
                const y = yield Success(5)
                const div = yield divide(x, y)
                const z = yield Success(2)
                return div + z;
            }) 
            
            expect(res).to.deep.equal(Success(4))
        })

        it('Success(10) / Success(0) + Success(2) == Fail', function () {
            let result = ResultM.Run(function* () {
                const x = yield Success(5)
                const y = yield Success(0)
                const div = yield divide(x, y)
                const z = yield Success(2)
                return div + z;
            });
            assert.isFalse(result.success)
        })
    })

})
