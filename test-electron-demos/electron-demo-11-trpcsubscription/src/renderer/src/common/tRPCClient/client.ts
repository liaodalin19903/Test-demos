import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client';
import type { AppRouter } from '../path/to/server/trpc';
// create persistent WebSocket connection
const wsClient = createWSClient({
  url: `ws://localhost:6002`,
});
// configure TRPCClient to use WebSockets transport
const client = createTRPCProxyClient<AppRouter>({
  links: [
    wsLink({
      client: wsClient,
    }),
  ],
});
