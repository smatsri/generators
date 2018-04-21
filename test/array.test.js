import { ArrayM, runIter } from "../src/array";
import { expect, assert } from 'chai'


xdescribe('ArrayM', function () {

    describe('Do', function () {
        it('[1,2] + [3,4] == [4,5,5,6]', function () {
            let result = ArrayM.Do(function* () {
                let x = yield [1, 2]
                let y = yield [3, 4]
                return x + y
            })
            expect(result).to.deep.equal([4, 5, 5, 6])
        });

        it('[1,2] + [3,4] + [2, 1] == [ 6, 5, 7, 6, 7, 6, 8, 7 ]', function () {
            let result = ArrayM.Do(function* () {
                let x = yield [1, 2]
                let y = yield [3, 4]
                let z = yield [2, 1]
                return x + y + z
            })
            expect(result).to.deep.equal([ 6, 5, 7, 6, 7, 6, 8, 7])
        });
    });

    // describe('runIter', function () {
    //     it('[1,2] + [3,4] == [4,5,5,6]', function () {
    //         let result = runIter(function* () {
    //             let x = yield [1, 2]
    //             let y = yield [3, 4]
    //             return x + y
    //         }())
    //         expect(result).to.deep.equal([4, 5, 5, 6])
    //     });
    // })

});

