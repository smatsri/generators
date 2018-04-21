import { expect } from "chai";
import { run, createRun } from "../src/monad";
import { unit, bind } from "../src/array";


// xdescribe('monad', function () {
//     describe('run', function () {
//         it('should work', function () {
//             let fn = run(unit, bind, function* () {
//                 let x = yield [1]
//                 return x;
//             });
//             let x = fn()
//             expect(x).to.deep.equal([1])

//         })
//     })
// })