import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, Unique } from 'typeorm'
import { SMANodeCodeFunc } from './SMANodes';
import { ProjMod } from './Proj';

export const SMAComboTypeMap = {
  SMAComboModule: 'SMAComboModule',
  SMAComboFuncodeAggregation: 'SMAComboFuncodeAggregation'
}

// 1对1到Combo
@Entity()
@Unique(['path', 'moduleName'])
export class SMAComboModule {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaComboModules)
  projMod: ProjMod

  @Column({
    type: 'varchar',
  })
  path: string

  @Column({
    type: 'varchar',
  })
  moduleName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string

  @ManyToOne(type => SMAComboModule)
  parent: SMAComboModule | undefined

  @OneToMany(type => SMANodeCodeFunc, codeFunc => codeFunc.module)
  codeFuncs: SMANodeCodeFunc[] | undefined

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

  constructor(projMod: ProjMod, moduleName: string = '', path: string, desc: string | undefined = '',  parent: SMAComboModule| undefined) {

    this.projMod = projMod
    this.moduleName = moduleName
    this.desc = desc
    this.path = path
    this.parent = parent
  }
}

// 1对1到Combo
@Entity()
@Unique(['type', 'aggregationName'])  // eg. 服务侧api-procedure
export class SMAComboFuncodeAggregation {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaComboFuncodeAggregations)
  projMod: ProjMod

  // 类型
  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  aggregationName: string

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string

  @ManyToOne(type => SMAComboFuncodeAggregation)
  parent?: SMAComboFuncodeAggregation

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

  constructor(projMod: ProjMod, aggregationName: string = '', desc: string | undefined = '') {
    this.projMod = projMod
    this.aggregationName = aggregationName
    this.desc = desc
  }
}
