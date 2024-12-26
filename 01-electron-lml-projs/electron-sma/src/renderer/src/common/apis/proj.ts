import { trpc } from './trpcClient/index'
import { Proj, ProjMod } from '@shared/db-entities/Proj'

export const getProjs = async() => {

  return await trpc.projs.query()
}

export const addProj = async(proj: Proj) => {
  return await trpc.projCreate.mutate(proj)
}

export const updateProj = async (proj: Proj) => {
  return await trpc.projUpdate.mutate(proj)
}

export const deleteProj =async (projID: number) => {
  return await trpc.projDelete.mutate({id: projID})
}
