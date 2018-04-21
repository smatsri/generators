import { M } from "./monad";

export const resolve = value => new Promise(res => res(value))
export const bind = (f, m) => m.then(value => f(value))

export const PromiseM = M(resolve, bind)