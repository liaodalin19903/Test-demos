import {initTRPC} from '@trpc/server';
import * as z from 'zod';
// HACK: The `superjson` library is ESM-only (does not support CJS), while our codebase is CJS.
// This is a workaround to still get to use the latest version of the library from our codebase.
// https://github.com/blitz-js/superjson/issues/268
// https://www.npmjs.com/package/fix-esm
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const fixESM = require("fix-esm");
import type SuperJSON from "superjson";
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const superjson: SuperJSON = fixESM.require("superjson");

const t = initTRPC.create({
  transformer: superjson
});

// =====

export const users = t.procedure.query(() => {
  return [1, 2, 3, 4];  // TODO
})



export const userById = t.procedure.input((val: unknown) => {
  if (typeof val !== 'number') {
    throw new Error('invalid input');
  }
  return val;
}).query(({input: id}) => {
  return {}  // TODO
})

// 注意：这里的{input: {name, dateCreated}} 里面的 {name, dateCreated} 就是`t.procedure.input()`里面的东西。
export const userCreate = t.procedure.input(z.object({
  name: z.string(),
  dateCreated: z.date(),
})).mutation(async ({input: {name, dateCreated}}) => {
  console.log("Creating user on ", dateCreated.toLocaleString());
  const user = {}  // TODO

  return user;
})
