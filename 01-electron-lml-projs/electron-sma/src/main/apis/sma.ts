// SMA图所需要的api

import { InsertResult, UpdateResult } from 'typeorm';

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import dataBase from '@main/db'
import { SMAComboModule} from '@shared/db-entities/SMACombos';
import { ProjMod } from '@shared/db-entities/Proj';
import { G6Combo } from '@shared/db-entities/SMAG6Element';
import { SMANodeCodeFunc } from '@shared/db-entities';


//#region sma-combo-module: 模块

/**
 * // 获取到smaModules
 *
 * 参数：projModId
 *
 */
export const smaModulesApi = publicProcedure.input(z.object({
  projModId: z.number()
})).query(async ({input: {projModId}}) => {

  console.log('main:', projModId) // SMAComboModule

  const modules = await dataBase.getRepository(SMAComboModule)
  .createQueryBuilder('smaComboModule')
  .innerJoin('smaComboModule.combo', 'combo')
  .innerJoin('combo.projMod', 'projMod')
  .where("projMod.isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("projMod.id = :projModId", { projModId: projModId })
  .leftJoinAndSelect('SMAComboModule.combo', 'combo')
  .getMany()

  return modules
})

/**
 * 获取所有的带有codefuncs的modules
 */
export const smaModulesWithCodefuncsApi = publicProcedure.input(z.object({
  projModId: z.number()
})).query(async ({input: {projModId}}) => {

  const modules = await dataBase.getRepository(SMAComboModule)
  .createQueryBuilder('smaComboModule')
  .innerJoin('smaComboModule.combo', 'combo')
  .innerJoin('combo.projMod', 'projMod')
  .where("projMod.isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("projMod.id = :projModId", { projModId: projModId })
  .leftJoinAndSelect('smaComboModule.codeFuncs', 'codeFuncs')
  .getMany()

  return modules
})

/**
 * 查询出modules + codefuncs + edges
 * @param projModId
 * @returns
 */
export const smaModulesWithCodefuncsAndEdgesApi = publicProcedure.input(z.object({
  projModId: z.number()
})).query(async ({input: {projModId}}) => {

  const modules = await dataBase.getRepository(SMAComboModule)
  .createQueryBuilder('smaComboModule')
  .innerJoin('smaComboModule.combo', 'combo')
  .innerJoin('combo.projMod', 'projMod')
  .where("projMod.isDeleted = :isDeleted", { isDeleted: false })
  .andWhere("projMod.id = :projModId", { projModId: projModId })
  .leftJoinAndSelect('smaComboModule.combo', 'comboAlias')
  .leftJoinAndSelect('smaComboModule.codeFuncs', 'codeFuncs')
  .leftJoinAndSelect('codeFuncs.node', 'node')
  .leftJoinAndSelect('node.edgeSources', 'edgeSources')
  .leftJoinAndSelect('node.edgeTargets', 'edgeTargets')
  .getMany()

  // 处理结果，将 edges 移动到 modules 下面
  const processedModules = modules.map(module => {
    const edges = module.codeFuncs!.flatMap(codeFunc => {
      const edgeSources = codeFunc.node.edgeSources ?? []; // 确保是数组
      const edgeTargets = codeFunc.node.edgeTargets ?? []; // 确保是数组
      return [
        ...edgeSources,
        ...edgeTargets
      ];
    });

    return {
      ...module,
      edges // 将 edges 添加到 modules 下面
    };
  });

  return processedModules;
})

/**
 * 创建module
 */
export const smaModuleCreateApi = publicProcedure.input(z.object({
  projModId: z.number(), // 需要传入所属 ProjMod 的 ID
  moduleName: z.string(),
  path: z.string(), // 新增 path 字段
  desc: z.string().optional(),
  parentId: z.number().optional(), // 如果有父模块，可以传入父模块的 ID
})).mutation(async ({input: {projModId, moduleName, path, desc, parentId}}) => {

  // 需要： 1.获取ProjMod实例  2.创建Combo实例  3.创建SMAComboModule实例

  // 1.获取ProjMod实例
  const projMod = await dataBase.getRepository(ProjMod).createQueryBuilder('projMod')
  .where("id= :projModId", { projModId })
  .getOne();

  if (!projMod) {
    throw new Error('ProjMod not found');
  }

  // 2.创建 G6Combo 实体
  const g6ComboInstance = new G6Combo(projMod);
  const comboResult = await dataBase.getRepository(G6Combo).createQueryBuilder('g6Combo').insert().into(G6Combo).values(g6ComboInstance).execute()

  // 3.创建SMAComboModule实例

  let parentModule: SMAComboModule | null = null
  if(parentId) {
    parentModule = await dataBase.getRepository(SMAComboModule).createQueryBuilder('SMAComboModule')
    .where("id= :parentId", {parentId: parentId})
    .getOne()
  }

  const smaModule = new SMAComboModule(
    comboResult.raw,
    moduleName,
    path,
    desc,
    parentModule,

  );

  const insertResult = await dataBase.getRepository(SMAComboModule).createQueryBuilder('SMAComboModule')
  .insert().into(SMAComboModule).values(smaModule).execute()

  return insertResult
})

export const smaModuleUpdateApi = publicProcedure.input(z.object({
  id: z.number().optional(),
  moduleName: z.string(),
  path: z.string().optional(),
  desc: z.string().optional(),
  parentId: z.number().optional(), // 如果修改父模块，可以传入父模块的 ID
})).mutation(async({input: {id, moduleName, desc, path, parentId}}) => {

  // 1.先取出module
  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(SMAComboModule).set({
    moduleName: moduleName,
    desc: desc,
    path: path,
    parentId: parentId
  }).where('proj.id = :id', {id: id}).execute()

  return updateResult

})

// 软删除
export const smaModuleDeleteApi = publicProcedure.input(
  z.object({
    id: z.number()
  })
).mutation( async ({ input: { id } }) => {

  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(SMAComboModule).set({
    isDeleted: true
  }).where('id = :id', {id: id}).execute()

  return updateResult
})


//#endregion


//#region sma-node-codefunc: 代码块

/**
 * 获取codefuncs
 * 参数：moduleId（所属模块ID）
 */
export const smaCodefuncsApi = publicProcedure.input(z.object({
  moduleId: z.number()
})).query(async ({input: {moduleId}}) => {

  console.log('main:', moduleId)

  const codefuncs = await dataBase.getRepository(SMANodeCodeFunc)
  .createQueryBuilder('smaNodeCodeFunc')
  .where("module.id = :moduleId", { moduleId: moduleId })  // TODO: 待验证：是否是module.id
  .getMany()

  return codefuncs
})

export const smaCodefunsCreateApi = publicProcedure.input(
  z.object({
    moduleId: z.number(),
    codefuncs: z.array(z.object({
      path: z.string(),
      codefuncName: z.string(),
      desc: z.string().optional()
    }))
  })
).mutation(async ({ input: {
  moduleId,
  codefuncs
} }) => {
  console.log(moduleId, codefuncs)

  const insertResults: InsertResult[] = []

  // 1.先取出module
  const module = await dataBase.getRepository(SMAComboModule).createQueryBuilder('smaComboModule')
  .where("id= :moduleId", { moduleId })
  .getOne();

  // 2.遍历创建codefunc
  for (let codefunc of codefuncs) {
    //console.log(codefunc);
    const codefuncInstance = new SMANodeCodeFunc(
      codefunc.path,
      codefunc.codefuncName,
      codefunc.desc,
      module
    )

    const insertResult = await dataBase.getRepository(SMANodeCodeFunc).createQueryBuilder('smaNodeCodeFunc')
    .insert().into(SMANodeCodeFunc).values(codefuncInstance).execute()

    insertResults.push(insertResult)
  }

  return insertResults
})

export const smaCodefunCreateApi = publicProcedure.input(
  z.object({
    moduleId: z.number(),
    codefunc: z.object({
      path: z.string(),
      codefuncName: z.string(),
      desc: z.string().optional()
    })
  })
).mutation(async ({ input: {
  moduleId,
  codefunc
} }) => {

  // 1.先取出module
  const module = await dataBase.getRepository(SMAComboModule).createQueryBuilder('smaComboModule')
  .where("id= :moduleId", { moduleId })
  .getOne();

  // 2.遍历创建codefunc
  const codefuncInstance = new SMANodeCodeFunc(
    codefunc.path,
    codefunc.codefuncName,
    codefunc.desc,
    module
  )

  const insertResult = await dataBase.getRepository(SMANodeCodeFunc).createQueryBuilder('smaNodeCodeFunc')
  .insert().into(SMANodeCodeFunc).values(codefuncInstance).execute()

  return insertResult
})

export const smaCodefunUpdateApi = publicProcedure.input(z.object({
  id: z.number(),
  moduleId: z.number(),
  path: z.string(),
  codefuncName: z.string(),
  desc: z.string().optional()
}))
.mutation(async ({input: {id, moduleId, path, codefuncName, desc}}) => {

  // const codefuncInstance = new SMANodeCodeFunc(

  // )

  const updateResult = await dataBase.createQueryBuilder().update(SMANodeCodeFunc)
  .set({
    id,
    path,
    codefuncName,
    desc,
    module: moduleId  // TODO: 验证: 是否直接可以①外键直接给定id就行？ ②是否可以这样写键值对
  })
  .where('id = :id', {id: id})
  .execute()

  return updateResult
})

export const smaCodefunDeleteApi = publicProcedure.input(
  z.object({
    id: z.number()
  })
).mutation( async ({ input: { id } }) => {

  const updateResult: UpdateResult = await dataBase.createQueryBuilder().update(SMAComboModule).set({
    isDeleted: true
  }).where('id = :id', {id: id}).execute()

  return updateResult
})


//#endregion


