import { curry, compose } from "lodash/fp";
import { M } from "./m";

export const Maybe = (isSome, value) => ({ isSome, value })

export const Some = (value) => Maybe(true, value)
export const None = Maybe()

export const bind = (f, m) => m.isSome ? f(m.value) : None

export const MaybeM = M(Some, bind)

