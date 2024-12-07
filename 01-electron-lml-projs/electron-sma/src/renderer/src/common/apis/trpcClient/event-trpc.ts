import {createTRPCProxyClient, httpBatchLink, loggerLink, wsLink, WebSocketLinkOptions} from '@trpc/client';
import type {AppRouter} from '@main/apis/trpcServer/router'
import {IpcRequest} from '@shared/@types';
import superjson from 'superjson';

// 事件监听的 trpc
// TODO: 卡点 2024-12-07 17:03 不知道eventTrpc如何做
export const eventTrpc = createTRPCProxyClient<AppRouter>({
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
    wsLink()
  ],
  transformer: new superjson(), // 添加 transformer 属性
});
