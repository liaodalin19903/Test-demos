import { SMAComboModule } from './SMACombos';
// 标准化： https://www.yuque.com/markemotionact/txyhqy/rqmetn4m86mbi9zr?inner=ub9923b59

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm'
import { ProjMod } from './Proj';

export const SMANodeTypeMap = {
  SMANodeCodeFunc: 'SMANodeCodeFunc',
  SMANodeDataStruct: 'SMANodeDataStruct',

  SMANodeRequirement: 'SMANodeRequirement',
  SMANodeAPI: 'SMANodeAPI',

  SMANodeCAIClass: 'SMANodeCAIClass',
  SMANodeCAIInterface: 'SMANodeCAIInterface'
}

// 1对1到Node
@Entity()
@Unique(['path', 'codefuncName'])
export class SMANodeCodeFunc {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeCodeFuncs)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  codefuncName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  // @ManyToOne(type => SMANodeCodeFunc)
  // parent?: SMANodeCodeFunc | undefined

  // 所属模块
  @ManyToOne(type => SMAComboModule, module => module.codeFuncs)
  module: SMAComboModule | null

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod,  path: string, codefuncName: string = '', desc: string | undefined = '', module: SMAComboModule | null) {

    this.projMod = projMod
    this.path = path
    this.codefuncName = codefuncName
    this.desc = desc
    this.module = module
  }
}

// 1对1到Node
@Entity()
@Unique(['path', 'dataStructName'])
export class SMANodeDataStruct {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeDataStructs)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  dataStructName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod, dataStructName: string = '', desc: string | undefined = '') {

    this.projMod = projMod
    this.dataStructName = dataStructName
    this.desc = desc
  }
}

// 1对1到Node
@Entity()
@Unique(['type', 'requirementName'])  // eg. `账号管理: 注销`
export class SMANodeRequirement {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeRequirements)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  requirementName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @ManyToOne(type => SMANodeRequirement)
  parent?: SMANodeRequirement

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod, requirementName: string = '', desc: string | undefined = '', parent: SMANodeRequirement| undefined) {

    this.projMod = projMod
    this.requirementName = requirementName
    this.desc = desc
    this.parent = parent
  }
}

// 1对1到Node
@Entity()
@Unique(['type', 'apiName'])  // eg. `绑定系统: 计算结构`
export class SMANodeAPI {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeAPIs)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
    //unique: true, // 通过添加unique选项设置为唯一约束
  })
  apiName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod, apiName: string = '', desc: string | undefined = '') {

    this.projMod = projMod
    this.apiName = apiName
    this.desc = desc
  }
}

// 1对1到Node
@Entity()
@Unique(['path', 'className'])
export class SMANodeCAIClass {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeCAIClasses)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  className: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod, className: string = '', desc: string | undefined = '') {

    this.projMod = projMod
    this.className = className
    this.desc = desc
  }
}

// 1对1到Node
@Entity()
@Unique(['path', 'interfaceName'])
export class SMANodeCAIInterface {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaNodeCAIInterfaces)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  interfaceName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod, interfaceName: string = '', desc: string | undefined = '') {

    this.projMod = projMod
    this.interfaceName = interfaceName
    this.desc = desc
  }
}
