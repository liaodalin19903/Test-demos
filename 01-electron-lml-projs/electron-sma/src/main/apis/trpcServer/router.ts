import {initTRPC} from '@trpc/server';
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

import {
  users,
  userById,
  userCreate,

  winShow,
  winHide,
  publishEvent,
} from '..'

export const appRouter = t.router({
  users: users,
  userById: userById,
  userCreate: userCreate,

  winShow: winShow,
  winHide: winHide,
  publishEvent: publishEvent,
})

export type AppRouter = typeof appRouter;
