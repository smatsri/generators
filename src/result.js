import { curry, compose } from "lodash/fp";
import { M } from "./monad";
export const Result = (success, value, error) => ({ success, value, error })

export const Success = (value) => Result(true, value)
export const Fail = error => Result(false, undefined, error)

export const bind = curry((f, r) => r.success ? f(r.value) : r)
export const map = bind(Success)

export const ResultM = M(Success, bind)

