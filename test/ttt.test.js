import { assert, expect } from "chai";
import { Pos, Player, X, O, Cell, Board, CellAlreadySet, NotPlayerTurn, cycle, range, SetCell, act } from "../src/ttt";
import { None, Some } from "../src/maybe";
import { ResultM } from "../src/result";

describe("tic tac toe", () => {
    it('pos must be between 0 and 8', () => {
        expect(Pos(-1)).to.equal(Pos(0))
        expect(Pos(9)).to.equal(Pos(8))
        expect(Pos(1)).to.equal(Pos(1))
        expect(Pos(2)).to.equal(Pos(2))
    })
    it("player cann only be X or O", () => {
        expect(Player()).to.equal(Player(X))
        expect(Player(O)).to.equal(Player(O))
        expect(Player(123)).to.equal(Player(X))
    })

    describe('act', () => {
        describe('set cell', () => {
            it('cannot set same pos more then once', () => {
                let res = ResultM.Run(function* () {
                    let board = Board()
                    board = yield act(board, SetCell(Player(X), Pos(0)))
                    board = yield act(board, SetCell(Player(O), Pos(0)))
                    return board
                })
            
                assert.isFalse(res.success)
                expect(res).to.deep.equal(CellAlreadySet)

            })

            it('cannot play out of turn', () =>{
                let res = ResultM.Run(function* () {
                    let board = Board()
                    board = yield act(board, SetCell(Player(X), Pos(0)))
                    board = yield act(board, SetCell(Player(X), Pos(1)))
                    return board
                })
            
                assert.isFalse(res.success)
                expect(res).to.deep.equal(NotPlayerTurn)

            })
        })
    })
 
    describe('helpers', () => {
        it('cycle', () => {
            let iter = cycle([X, O])
            expect(iter.next().value).to.equal(X)
            expect(iter.next().value).to.equal(O)
            expect(iter.next().value).to.equal(X)
            expect(iter.next().value).to.equal(O)
        })

        it('range', () => {
            expect(range(2, 2)).to.deep.equal([2, 3])
        })
    })
})