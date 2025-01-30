import { trpc } from './trpcClient/index'

export const databasesApi = async() => {
  return await trpc.databasesApi.query()
}

export const databaseByIdApi = async(database_id: string) => {
  const user = await trpc.databaseByIdApi.query({
    database_id: database_id,
  });

  return user
}


