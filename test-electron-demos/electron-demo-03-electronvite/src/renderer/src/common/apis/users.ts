import { trpcClient as trpc } from '../trpcClient/index'

export const getUsers = async() => {
  console.log('before getUsers')
  return await trpc.users.query()
}

export const addUser = async() => {
  const user = await trpc.userCreate.mutate({
    name: 'New User',
    dateCreated: new Date()
  });

  return user
}
