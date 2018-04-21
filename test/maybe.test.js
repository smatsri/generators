import { MaybeM, Some, None } from "../src/maybe"
import { expect, assert } from 'chai'

describe("MaybeM",function () {
    describe('bind', function(){
        it('Some(1) + Some(2) == Some(3)', function () {
            let result = MaybeM.Run(function* () {
                const y = yield Some(2)
                const x = yield Some(1)
                return x + y
            });
            expect(result).to.deep.equal(Some(3))
        })

        it('Some(1) + None == None', function () {
            let result = MaybeM.Run(function* () {
                const y = yield Some(2)
                const x = yield None
                return x + y
            });
            expect(result).to.deep.equal(None)
        })
    })

})




// function prop(o, key) {
//     let value = o[key]
//     return value ? Some(value) : None;
// }


// const getFullName = MaybeM.Create(function* (o) {
//     let firstName = yield prop(o, 'firstName')
//     let lastName = yield prop(o, 'lastName')
//     return firstName + ' ' + lastName
// })

// const person = {
//     firstName: 'shai',
//     lastName: 'm'
// }

// const person2 = {
//     firstName: 'shai',
//     _lastName: 'm'
// }

// let fullNameM = getFullName(person)
// fullNameM = getFullName(person2)
