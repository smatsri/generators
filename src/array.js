import { M, createRun } from "./monad";

export const unit = x => [x]
export const bind = (xs, f) => xs.map(f).reduce((a, b) => a.concat(b), [])
export const bind2 = (f, xs) => xs.map(f).reduce((a, b) => a.concat(b), [])

export const runIter = createRun(unit, bind2)

export const ArrayM = M(unit, bind)
