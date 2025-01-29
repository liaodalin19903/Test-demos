import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'

// =====

export const usersApi = publicProcedure.query(() => {
  return [1, 2, 3, 4];  // TODO
})

export const userByIdApi = publicProcedure.input((val: unknown) => {
  if (typeof val !== 'number') {
    throw new Error('invalid input');
  }
  return val;
}).query(({input: id}) => {
  return {}  // TODO
})

// 注意：这里的{input: {name, dateCreated}} 里面的 {name, dateCreated} 就是`t.procedure.input()`里面的东西。
export const userCreateApi = publicProcedure.input(z.object({
  name: z.string(),
  dateCreated: z.date(),
})).mutation(async ({input: {name, dateCreated}}) => {
  console.log("Creating user on ", dateCreated.toLocaleString());
  const user = {}  // TODO

  return user;
})
