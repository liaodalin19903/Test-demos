import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../01-backend/server'
 
export const trpc = createTRPCReact<AppRouter>();