import { trpc } from './trpcClient/index'

export const usersApi = async() => {
  console.log('before getUsers')
  return await trpc.usersApi.query()
}

export const userCreateApi = async() => {
  const user = await trpc.userCreateApi.mutate({
    name: 'New User',
    dateCreated: new Date()
  });

  return user
}
