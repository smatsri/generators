import { curry, compose } from "lodash/fp";
import { M } from "./monad";

export const Maybe = (isSome, value) => ({ isSome, value })

export const Some = (value) => Maybe(true, value)
export const None = Maybe()

export const bind = (f, m) => m.isSome ? f(m.value) : None

export const MaybeM = M(Some, bind)

