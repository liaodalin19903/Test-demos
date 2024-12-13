import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';

import cors from 'cors';

// appRouter实例里面，我们是传入procedure
const appRouter = router({

  // Use publicProcedure.query() to add a query procedure to the router.
  userList: publicProcedure.query(() => {
    console.log('后端')
    const users = ['john', 'jack', 'mark']
    return users
  })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
});
 

server.listen(3001);