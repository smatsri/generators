import { Some, None } from "./maybe";
import { Success, Fail, ResultM, bind } from "./result";
import { compose } from "lodash/fp";



export const between = (min, max) => n => Math.max(Math.min(n, max), min)
export const range = (start, len) => {
    let arr = []
    for (let i = start; i < start + len; i++) {
        arr.push(i)
    }
    return arr
}
export const cycle = function* (arr = [0]) {
    let i = 0
    while (true) {
        yield arr[i++ % arr.length]
    }
}

// model
export const X = 1
export const O = 2
export const Pos = between(0, 8)
export const Player = (p = X) => p == O ? O : X
export const Cell = (pos = Pos(0), player = None) => ({ pos, player })
export const SetCell = (player = Player(X), pos = Pos(0)) => ({ type: 'SetCell', pos, player })
export const Turn = Player
export const Board = (cells = emptyCells, turn = Player(X)) => ({ cells, turn })

// errors
export const CellAlreadySet = "cell not empty"
export const NotPlayerTurn = "not player turn"

// helpers
const getCell = (board, pos) => board.cells.find(c => c.pos == pos)
const emptyCells = range(0, 8).map(i => Cell(Pos(i)))
const nextTurn = cur => cur == Player(X) ? Player(O) : Player(X)
const getPlayer = (turn, player) => turn == player ? Success(player) : Fail(NotPlayerTurn)
const setPlayer = (cell = Cell(), player = X) =>
    cell.player == None ? Success(Cell(cell.pos, player)) : Fail(CellAlreadySet)


// actions
const setCell = ResultM.Create(function* (board = Board(), action = SetCell()) {
    let player = yield getPlayer(board.turn, action.player)
    let cell = getCell(board, action.pos)
    let updatedCell = yield setPlayer(cell, action.player)

    let cells = board.cells.map(c => c.pos == action.pos ? updatedCell : c)
    let turn = nextTurn(board.turn)

    return Board(cells, turn)
})

export const act = (board, action) => {
    switch (action.type) {
        case 'SetCell':
            return setCell(board, action)

        default:
            return Fail("not implemented")
    }
}












