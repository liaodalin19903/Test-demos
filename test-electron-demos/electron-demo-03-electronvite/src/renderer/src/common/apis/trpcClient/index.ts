import {createTRPCProxyClient, httpBatchLink, loggerLink} from '@trpc/client';
import type {AppRouter} from '@main/apis/trpcServer/router'
import {IpcRequest} from '@shared/@types';
import superjson from 'superjson';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: '/trpc',
      fetch: async (input, init) => {
        const req: IpcRequest = {
          url: input instanceof URL ? input.toString() : typeof input === 'string' ? input : input.url,
          method: input instanceof Request ? input.method : init?.method!,
          headers: input instanceof Request ? input.headers : init?.headers!,
          body: input instanceof Request ? input.body : init?.body!,
        };

        const resp = await window.api.trpc(req);
        return {
          json: () => Promise.resolve(resp.body),
        };
      },
    }),
  ],
  transformer: new superjson(), // 添加 transformer 属性
});
