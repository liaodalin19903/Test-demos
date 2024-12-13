
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './02-client/client';

import Demo from './components/Demo'

function App() {

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001/',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: 'authorization',
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
        <div style={{ backgroundColor: '#eee', width: '100vw', height: '100vh' }}>
          <Demo></Demo>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
   
  )
}

export default App
