import { trpc } from './trpcClient/index'
import { Proj, ProjMod } from '@shared/db-entities/Proj'

export const getProjs = async() => {

  console.log('getProjs： 123')
  return await trpc.projs.query()
}

export const addProj = async(proj: Proj) => {
  return await trpc.projCreate.mutate(proj)
}

export const updateProj = async (proj: Proj) => {
  return await trpc.projUpdate.mutate(proj)
}

export const deleteProj = async (projID: number) => {
  return await trpc.projDelete.mutate({id: projID})
}

export const projSetSelectApi = async (projId: number) => {
  return await trpc.projSetSelectApi.mutate({projId: projId})
}

// ===== ProjMod

export const getMainProjMod = async(projId: number) => {
  return await trpc.mainProjModByProjId.query({projId})
}

export const getProjMods = async(projId: number) => {
  return await trpc.projModsByProjIdApi.query({projId})
}

export const addProjMod = async(projMod: ProjMod, projId: number) => {
  return await trpc.projModCreateApi.mutate({
    modName: projMod.modName,
    desc: projMod.desc,
    isMain: projMod.isMain,
    projId: projId
  })
}

export const updateProjMod = async (projMod: ProjMod) => {
  return await trpc.projModUpdate.mutate(projMod)
}

export const deleteProjMod =async (projModID: number) => {
  return await trpc.projModDelete.mutate({id: projModID})
}

export const projModSetSelectApi = async (projModId: number) => {
  return await trpc.projModSetSelectApi.mutate({projModId: projModId})
}
