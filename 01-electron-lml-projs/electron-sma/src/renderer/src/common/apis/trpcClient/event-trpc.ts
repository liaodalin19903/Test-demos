import {createTRPCProxyClient, loggerLink } from '@trpc/client';

import type {AppRouter} from '@main/apis/trpcServer/router'
import superjson from 'superjson';

// 事件监听的 trpc


// TODO: 卡点 2024-12-07 17:03 不知道eventTrpc如何做
export const eventTrpc = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
  ],
  transformer: new superjson(), // 添加 transformer 属性
});
