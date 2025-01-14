import { InsertResult, UpdateResult } from 'typeorm';

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import dataBase from '@main/db'
import { Proj, ProjMod } from '@shared/db-entities/Proj';

// =====

export const projsApi = publicProcedure.query(async () => {

  const projs = await dataBase.getRepository(Proj)
  .createQueryBuilder('proj')
  .where("isDeleted = :isDeleted", { isDeleted: false })
  .getMany()
  return projs
})

export const projCreate = publicProcedure.input(
  z.object({
    projName: z.string(),
    desc: z.string().optional(),
    projmods: z.array(
      z.object({
        modName: z.string(),
        desc: z.string().optional()
      })
    ).optional()
  })
).mutation(async({ input: {projName, desc, projmods} }) => {
  // 创建proj表数据
  const insertResult: InsertResult = await dataBase.createQueryBuilder().insert().into(Proj).values({
    projName: projName,
    desc: desc,
  }).execute()

  // 一个proj都有一个projMod
  const insertResultProjMod = await dataBase.createQueryBuilder().insert().into(ProjMod).values({
    modName: projName + ':main',
    desc: projName + '的主模块（父模块）',
    proj: insertResult.raw
  }).execute()

  //console.log('insertResultProjMod: ', insertResultProjMod)

  // 其他的模块
  if (projmods) {
    // 创建projmod表
    for (const projmod of projmods) {
      await dataBase.createQueryBuilder().insert().into(ProjMod).values({
        modName: projmod.modName,
        desc: projmod.desc,
        proj: insertResult.raw  // 这个是proj的id
      })
    }
  }

  // 返回创建好的proj实例
  return insertResult
})

export const projUpdate = publicProcedure.input(
  z.object({
    id: z.number().optional(),
    projName: z.string(),
    desc: z.string().optional(),
  })
).mutation( async ({ input: {id, projName, desc} }) => {

  console.log('api得到参数：', {id, projName, desc} )

  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(Proj).set({
    projName: projName,
    desc: desc,
  }).where('proj.id = :id', {id: id}).execute()

  return updateResult
})

// 软删除
export const projDelete = publicProcedure.input(
  z.object({
    id: z.number()
  })
).mutation( async ({ input: { id } }) => {

  // 删除Proj
  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(Proj).set({
    isDeleted: true
  }).where('proj.id = :id', {id: id}).execute()

  // 删除Proj的projmods
  await dataBase.createQueryBuilder().update(ProjMod).set({
    isDeleted: true
  }).where('proj = :id', {id: id}).execute()

  return updateResult
})

/**
 * 设置选中
 * 如果选中一个proj，循环遍历其他所有的proj设置false
 */
export const projSetSelectApi = publicProcedure.input(z.object({
  projId: z.number()
})).mutation( async({ input: {projId} }) => {

  await dataBase.createQueryBuilder().update(Proj).set({
    selected: false
  }).execute()

  const updateResult = await dataBase.createQueryBuilder().update(Proj).set({
    selected: true
  }).where('id = :id', {id: projId}).execute()

  return updateResult
} )


// ====【ProjMod】

// 通过projId查询：proj的主mod
export const mainProjModByProjId = publicProcedure.input(z.object({
  projId: z.number()
})).query(async ({input: {projId}}) => {

  const projMod = await dataBase.getRepository(ProjMod)
  .createQueryBuilder('projMod')
  .where("isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("projId = :projId", {projId: projId})
  .getOne()
  return projMod
})

// 通过projId查询：projMods
export const projModsByProjIdApi = publicProcedure.input(z.object({
  projId: z.number()
})).query(async ({input: {projId}}) => {

  console.log('main:', projId)

  const projMods = await dataBase.getRepository(ProjMod)
  .createQueryBuilder('projMod')
  // https://jingyan.baidu.com/article/e5c39bf583fa8f39d76033b0.html
  .where("projMod.isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("projId = :projId", { projId: projId })
  .leftJoinAndSelect('projMod.proj', 'proj')
  .getMany()

  return projMods
})

export const projModCreateApi = publicProcedure.input(
  z.object({
    modName: z.string(),
    desc: z.string().optional(),
    isMain: z.boolean().optional(),
    projId: z.number()
  })
).mutation(async({ input: {modName, desc, isMain, projId} }) => {

  console.log('api server: ', {modName, desc, isMain, projId})

  const projInstance = await dataBase.getRepository(Proj)
  .createQueryBuilder('proj')
  .where('id=:id', {id: projId})
  .getOne()

  // 过滤一下，如果不存在就是非主模块
  let filteredIsMain = false
  if (isMain === true) {
    filteredIsMain = isMain
  }

  const insertResult = await dataBase.createQueryBuilder().insert().into(ProjMod).values({
    modName: modName,
    desc: desc,
    isMain: filteredIsMain,
    proj: projInstance!
  }).execute()

  // 返回创建好的proj实例
  return insertResult
})

export const projModUpdate = publicProcedure.input(
  z.object({
    id: z.number().optional(),
    modName: z.string(),
    desc: z.string().optional(),
  })
).mutation( async ({ input: {id, modName, desc} }) => {

  console.log('api得到参数：', {id, modName, desc} )

  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(ProjMod).set({
    modName: modName,
    desc: desc,
  }).where('id = :id', {id: id}).execute()

  return updateResult
})

// 软删除
export const projModDelete = publicProcedure.input(
  z.object({
    id: z.number()
  })
).mutation( async ({ input: { id } }) => {

  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(ProjMod).set({
    isDeleted: true
  }).where('id = :id', {id: id}).execute()

  return updateResult
})

/**
 * 设置选中
 * 如果选中一个proj，循环遍历其他所有的proj设置false
 */
export const projModSetSelectApi = publicProcedure.input(z.object({
  projModId: z.number()
})).mutation( async({ input: {projModId} }) => {

  await dataBase.createQueryBuilder().update(ProjMod).set({
    selected: false
  }).execute()

  const updateResult = await dataBase.createQueryBuilder().update(ProjMod).set({
    selected: true
  }).where('id = :id', {id: projModId}).execute()

  return updateResult
} )

