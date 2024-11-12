import {createTRPCProxyClient, httpBatchLink, loggerLink} from '@trpc/client';
import type {AppRouter} from "@main/trpcServer/router";
import {IpcRequest} from '@shared/types';
import superjson from 'superjson';

//console.log('AppRouter: ')

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: '/trpc',

      // custom fetch implementation that sends the request over IPC to Main process
      fetch: async (input, init) => {
        const req: IpcRequest = {
          url: input instanceof URL ? input.toString() : typeof input === 'string' ? input : input.url,
          method: input instanceof Request ? input.method : init?.method!,
          headers: input instanceof Request ? input.headers : init?.headers!,
          body: input instanceof Request ? input.body : init?.body!,
        };

        const resp = await window.api.trpc(req);
        // Since all tRPC really needs is the JSON, and we already have the JSON deserialized,
        // construct a "fake" fetch Response object
        return {
          json: () => Promise.resolve(resp.body)
        }
      },
      transformer: new superjson(),
    }),
  ],
});


