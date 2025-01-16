import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'

import { SMAComboFuncodeAggregation, SMAComboModule } from './SMACombos'
import { SMAEdgeCAIImplement, SMAEdgeCAIInherit, SMAEdgeCommonSupport } from './SMAEdges'
import { SMANodeAPI, SMANodeCAIClass, SMANodeCAIInterface, SMANodeCodeFunc, SMANodeDataStruct, SMANodeRequirement } from './SMANodes'

@Entity()
export class Proj {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({
    type: 'varchar',
    unique: true, // 通过添加unique选项设置为唯一约束
  })
  projName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @OneToMany(type => ProjMod, projmod => projmod.proj)
  projmods?: ProjMod[]

  @Column({
    default: false,
    type: 'boolean'
  })
  selected: boolean | undefined

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

  constructor(projName: string = '', desc: string | undefined = '') {
    this.projName = projName
    this.desc = desc
  }
}


@Entity()
export class ProjMod {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar'
  })
  modName: string

  @Column({
    type: 'boolean'
  })
  isMain: boolean

  @Column({
    type: 'text',
    nullable: true
  })
  desc?: string | undefined

  @ManyToOne(type => Proj, proj => proj.projmods)
  proj: Proj

  @Column({
    default: false,
    type: 'boolean'
  })
  selected: boolean | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  //#region
  @OneToMany(type => SMAComboModule, smaComboModule => smaComboModule.projMod)
  smaComboModules: SMAComboModule[] | undefined

  @OneToMany(type => SMAComboFuncodeAggregation, smaComboFuncodeAggregation => smaComboFuncodeAggregation.projMod)
  smaComboFuncodeAggregations: SMAComboModule[] | undefined

  @OneToMany(type => SMAEdgeCommonSupport, smaEdgeCommonSupport => smaEdgeCommonSupport.projMod)
  smaEdgeCommonSupports: SMAComboModule[] | undefined

  @OneToMany(type => SMAEdgeCAIInherit, smaEdgeCAIInherit => smaEdgeCAIInherit.projMod)
  smaEdgeCAIInherits: SMAComboModule[] | undefined

  @OneToMany(type => SMAEdgeCAIImplement, smaEdgeCAIImplement => smaEdgeCAIImplement.projMod)
  smaEdgeCAIImplements: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeCodeFunc, smaNodeCodeFunc => smaNodeCodeFunc.projMod)
  smaNodeCodeFuncs: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeDataStruct, smaNodeDataStruct => smaNodeDataStruct.projMod)
  smaNodeDataStructs: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeRequirement, smaNodeRequirement => smaNodeRequirement.projMod)
  smaNodeRequirements: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeAPI, smaNodeAPI => smaNodeAPI.projMod)
  smaNodeAPIs: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeCAIClass, smaNodeCAIClass => smaNodeCAIClass.projMod)
  smaNodeCAIClasses: SMAComboModule[] | undefined

  @OneToMany(type => SMANodeCAIInterface, smaNodeCAIInterface => smaNodeCAIInterface.projMod)
  smaNodeCAIInterfaces: SMAComboModule[] | undefined

  //#endregion

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(
    modName: string = '',
    isMain: boolean = false,
    desc: string | undefined = '',
    proj:Proj
    ) {

    this.modName = modName

    this.isMain = isMain
    this.desc = desc
    this.proj = proj
  }
}
