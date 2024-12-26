import { InsertResult, UpdateResult } from 'typeorm';

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import dataBase from '@main/db'
import { Proj, ProjMod } from '@shared/db-entities/Proj';

// =====

export const projs = publicProcedure.query(async () => {

  const projs = await dataBase.getRepository(Proj).createQueryBuilder('proj').getMany()
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

  //console.log('创建proj：', insertResult.raw)

  if (projmods) {
    // 创建projmod表
    for (const projmod of projmods) {
      await dataBase.createQueryBuilder().insert().into(ProjMod).values({
        modName: projmod.modName,
        desc: projmod.desc,
        proj: insertResult.raw
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
  }).where('projmod.proj = :id', {id: id}).execute()

  return updateResult
})
