// SMA图所需要的api

import { InsertResult, UpdateResult } from 'typeorm';

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import dataBase from '@main/db'
import { SMAComboModulesGraphModule} from '@shared/db-entities/SMACombos';
import { ProjMod } from '@shared/db-entities/Proj';
import { G6Combo } from '@shared/db-entities/SMAG6Element';



/**
 * // 获取到smaModules
 *
 * 参数：projModId
 *
 */
export const smaModules = publicProcedure.input(z.object({
  projModId: z.number()
})).query(async ({input: {projModId}}) => {

  console.log('main:', projModId) // SMAComboModulesGraphModule

  const projMods = await dataBase.getRepository(SMAComboModulesGraphModule)
  .createQueryBuilder('smaComboModulesGraphModule')
  // https://jingyan.baidu.com/article/e5c39bf583fa8f39d76033b0.html
  .where("combo.projMod.isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("combo.projMod.id = :projModId", { projModId: projModId })
  .leftJoinAndSelect('smaComboModulesGraphModule.combo', 'combo')
  .getMany()

  return projMods
})

/**
 * 创建module
 */
export const smaModuleCreate = publicProcedure.input(z.object({
  moduleName: z.string(),
  desc: z.string().optional(),
  path: z.string(), // 新增 path 字段
  projModId: z.number(), // 需要传入所属 ProjMod 的 ID
  parentId: z.number().optional(), // 如果有父模块，可以传入父模块的 ID
})).mutation(async ({input: {moduleName, desc, path, projModId, parentId}}) => {

  // 需要： 1.获取ProjMod实例  2.创建Combo实例  3.创建SMAComboModulesGraphModule实例

  // 1.获取ProjMod实例
  const projMod = await dataBase.getRepository(ProjMod).createQueryBuilder('projMod')
  .where("id= :projModId", { projModId })
  .getOne();

  if (!projMod) {
    throw new Error('ProjMod not found');
  }

  // 2.创建 G6Combo 实体
  const g6ComboInstance = new G6Combo(projMod);
  await dataBase.getRepository(G6Combo).createQueryBuilder('g6Combo').insert().into(G6Combo).values(g6ComboInstance).execute()

  // 3.创建SMAComboModulesGraphModule实例

  let parentModule: SMAComboModulesGraphModule | null = null
  if(parentId) {
    parentModule = await dataBase.getRepository(SMAComboModulesGraphModule).createQueryBuilder('smaComboModulesGraphModule')
    .where("id= :parentId", {parentId: parentId})
    .getOne()
  }

  const smaModule = new SMAComboModulesGraphModule(moduleName, desc, path, parentModule);

  const insertResult = await dataBase.getRepository(SMAComboModulesGraphModule).createQueryBuilder('smaComboModulesGraphModule')
  .insert().into(SMAComboModulesGraphModule).values(smaModule).execute()

  return insertResult
})


