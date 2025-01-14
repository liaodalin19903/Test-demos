import { SMAComboModule } from './SMACombos';
// 标准化： https://www.yuque.com/markemotionact/txyhqy/rqmetn4m86mbi9zr?inner=ub9923b59

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm'
import { G6Node } from './SMAG6Element';

// 1对1到Node
@Entity()
@Unique(['path', 'codefuncName'])
export class SMANodeCodeFunc {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  codefuncName: string

  @Column({
    type: 'text'
  })
  desc?: string

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

  constructor( node: G6Node, path: string, codefuncName: string = '', desc: string | undefined = '', module: SMAComboModule | null) {

    this.node = node
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

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  dataStructName: string

  @Column({
    type: 'text'
  })
  desc?: string

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

  constructor(dataStructName: string = '', desc: string | undefined = '') {

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

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node | undefined;

  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  requirementName: string

  @Column({
    type: 'text'
  })
  desc?: string

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

  constructor(requirementName: string = '', desc: string | undefined = '', parent: SMANodeRequirement| undefined) {

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

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node | undefined;

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
    type: 'text'
  })
  desc?: string

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

  constructor(apiName: string = '', desc: string | undefined = '') {

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

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  className: string

  @Column({
    type: 'text'
  })
  desc?: string

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

  constructor(className: string = '', desc: string | undefined = '') {

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

  // 所属Combo
  @OneToOne(type => G6Node)
  @JoinColumn()
  node: G6Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  interfaceName: string

  @Column({
    type: 'text'
  })
  desc?: string

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

  constructor(interfaceName: string = '', desc: string | undefined = '') {

    this.interfaceName = interfaceName
    this.desc = desc
  }
}
